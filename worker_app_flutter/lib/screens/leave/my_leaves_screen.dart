import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../models/worker_leave.dart';
import 'apply_leave_screen.dart';
import 'package:intl/intl.dart';

class MyLeavesScreen extends StatefulWidget {
  @override
  _MyLeavesScreenState createState() => _MyLeavesScreenState();
}

class _MyLeavesScreenState extends State<MyLeavesScreen> {
  List<WorkerLeave> _leaves = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchLeaves();
  }

  Future<void> _fetchLeaves() async {
    setState(() => _isLoading = true);
    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final workerId = authProvider.worker?.id;
      if (workerId == null) return;

      final apiService = ApiService();
      final response = await apiService.getMyLeaves(workerId);
      
      if (response is List) {
        setState(() {
          _leaves = response.map((json) => WorkerLeave.fromJson(json)).toList();
        });
      }
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to load leaves')));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'APPROVED': return Colors.green;
      case 'REJECTED': return Colors.red;
      default: return Colors.orange;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Leaves'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () async {
              final result = await Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => ApplyLeaveScreen()),
              );
              if (result == true) {
                _fetchLeaves();
              }
            },
          )
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _leaves.isEmpty
              ? Center(child: Text('No leave applications found'))
              : ListView.builder(
                  itemCount: _leaves.length,
                  itemBuilder: (context, index) {
                    final leave = _leaves[index];
                    return Card(
                      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: ListTile(
                        title: Text('${leave.startDate} to ${leave.endDate}'),
                        subtitle: Text(leave.reason ?? 'No reason provided'),
                        trailing: Chip(
                          label: Text(
                            leave.status,
                            style: TextStyle(color: Colors.white, fontSize: 12),
                          ),
                          backgroundColor: _getStatusColor(leave.status),
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ApplyLeaveScreen()),
          );
          if (result == true) {
            _fetchLeaves();
          }
        },
        icon: Icon(Icons.add),
        label: Text('Apply for Leave'),
      ),
    );
  }
}
