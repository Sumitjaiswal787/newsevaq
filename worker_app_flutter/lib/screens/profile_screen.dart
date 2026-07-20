import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:location/location.dart' as loc;
import 'package:geocoding/geocoding.dart';
import '../models/worker.dart';
import '../providers/auth_provider.dart';
import '../constants/app_colors.dart';
import '../constants/app_spacing.dart';
import '../constants/app_radius.dart';
import '../constants/app_elevation.dart';
import '../widgets/section_header.dart';
import 'login_screen.dart';
import 'leave/my_leaves_screen.dart';

class WorkerProfileScreen extends StatefulWidget {
  const WorkerProfileScreen({super.key});

  @override
  State<WorkerProfileScreen> createState() => _WorkerProfileScreenState();
}

class _WorkerProfileScreenState extends State<WorkerProfileScreen> {
  void _showEditNameDialog(BuildContext context) {
    final auth = context.read<AuthProvider>();
    final worker = auth.worker;

    // Parse current name
    String currentFirstName = '';
    String currentLastName = '';
    if (worker != null && worker.name.isNotEmpty) {
      final parts = worker.name.split(' ');
      currentFirstName = parts.first;
      currentLastName = parts.length > 1 ? parts.skip(1).join(' ') : '';
    }

    final firstNameController = TextEditingController(text: currentFirstName);
    final lastNameController = TextEditingController(text: currentLastName);
    final formKey = GlobalKey<FormState>();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
        ),
        title: const Text('Edit Name'),
        content: Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextFormField(
                controller: firstNameController,
                decoration: InputDecoration(
                  labelText: 'First Name',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadius.sm),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'First name is required';
                  }
                  return null;
                },
              ),
              const SizedBox(height: AppSpacing.md),
              TextFormField(
                controller: lastNameController,
                decoration: InputDecoration(
                  labelText: 'Last Name',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadius.sm),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Last name is required';
                  }
                  return null;
                },
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                await _updateName(
                  context,
                  firstNameController.text.trim(),
                  lastNameController.text.trim(),
                );
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  Future<void> _updateName(
    BuildContext context,
    String firstName,
    String lastName,
  ) async {
    final auth = context.read<AuthProvider>();
    final success = await auth.updateWorkerName(
      firstName: firstName,
      lastName: lastName,
    );

    if (context.mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text('Name updated successfully'),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadius.sm),
            ),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update name: ${auth.error}'),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadius.sm),
            ),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          final worker = auth.worker;

          return SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.md),
            child: Column(
              children: [
                // Profile Header
                _buildProfileHeader(context, worker),
                const SizedBox(height: AppSpacing.lg),

                // Availability Toggle
                _buildAvailabilityCard(context, auth),
                const SizedBox(height: AppSpacing.md),

                // Stats Card
                _buildStatsCard(context, worker),
                const SizedBox(height: AppSpacing.md),

                // Services Card
                _buildServicesCard(context, worker),
                const SizedBox(height: AppSpacing.md),

                // Professional Details Card
                _buildProfessionalDetailsCard(context, worker),
                const SizedBox(height: AppSpacing.md),

                // Location Card
                _buildLocationCard(context, worker),
                const SizedBox(height: AppSpacing.md),

                // Leaves Card
                _buildLeaveCard(context),
                const SizedBox(height: AppSpacing.lg),

                // Logout Button
                _buildLogoutButton(context, auth),
                const SizedBox(height: AppSpacing.md),

                // App Info
                Text(
                  'SEVAQ Worker App v1.0.0',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: AppSpacing.lg),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildProfileHeader(BuildContext context, worker) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.primary,
            AppColors.primaryLight,
          ],
        ),
        borderRadius: BorderRadius.circular(AppRadius.md),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.3),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Stack(
            children: [
              Container(
                padding: const EdgeInsets.all(AppSpacing.sm),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  shape: BoxShape.circle,
                ),
                child: CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.white.withOpacity(0.3),
                  child: Icon(
                    Icons.person,
                    size: 50,
                    color: Colors.white,
                  ),
                ),
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: GestureDetector(
                  onTap: () => _showEditNameDialog(context),
                  child: Container(
                    padding: const EdgeInsets.all(AppSpacing.xs),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.edit,
                      size: 16,
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            worker?.name ?? 'Worker Name',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.phone,
                size: 14,
                color: Colors.white.withOpacity(0.9),
              ),
              const SizedBox(width: AppSpacing.xxs),
              Text(
                worker?.phone ?? 'Phone Number',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withOpacity(0.9),
                    ),
              ),
            ],
          ),
          if (worker?.location != null) ...[
            const SizedBox(height: AppSpacing.xs),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.location_on,
                  size: 14,
                  color: Colors.white.withOpacity(0.9),
                ),
                const SizedBox(width: AppSpacing.xxs),
                Text(
                  worker!.location!,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.white.withOpacity(0.8),
                      ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildAvailabilityCard(BuildContext context, AuthProvider auth) {
    final worker = auth.worker;
    final isAvailable = worker?.isAvailable ?? false;

    return Card(
      elevation: AppElevation.sm,
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: isAvailable
                    ? AppColors.successSurface
                    : AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              child: Icon(
                isAvailable ? Icons.check_circle : Icons.circle_outlined,
                color: isAvailable ? AppColors.success : AppColors.textDisabled,
                size: 28,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Availability Status',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  const SizedBox(height: AppSpacing.xxs),
                  Text(
                    isAvailable
                        ? 'Online - Receiving job notifications'
                        : 'Offline - Not receiving notifications',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppColors.textSecondary,
                        ),
                  ),
                ],
              ),
            ),
            Switch(
              value: isAvailable,
              onChanged: (_) => auth.toggleAvailability(),
              activeColor: AppColors.success,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatsCard(BuildContext context, worker) {
    return Card(
      elevation: AppElevation.sm,
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SectionHeader(title: 'Performance Stats'),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Rating',
                    worker?.rating.toStringAsFixed(1) ?? '0.0',
                    Icons.star,
                    AppColors.warning,
                  ),
                ),
                Container(
                  height: 40,
                  width: 1,
                  color: AppColors.border,
                ),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Total Jobs',
                    worker?.totalJobs.toString() ?? '0',
                    Icons.check_circle_outline,
                    AppColors.info,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context,
    String label,
    String value,
    IconData icon,
    Color color,
  ) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(AppSpacing.sm),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(AppRadius.sm),
          ),
          child: Icon(icon, color: color, size: 24),
        ),
        const SizedBox(height: AppSpacing.sm),
        Text(
          value,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: color,
              ),
        ),
        const SizedBox(height: AppSpacing.xxs),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppColors.textSecondary,
              ),
        ),
      ],
    );
  }

  Widget _buildServicesCard(BuildContext context, Worker? worker) {
    final List<String> services = worker?.services ?? [];

    return Card(
      elevation: AppElevation.sm,
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SectionHeader(title: 'Your Services'),
            const SizedBox(height: AppSpacing.sm),
            if (services.isEmpty)
              Container(
                padding: const EdgeInsets.all(AppSpacing.lg),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: Center(
                  child: Column(
                    children: [
                      Icon(
                        Icons.work_outline,
                        size: 40,
                        color: AppColors.textDisabled,
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      Text(
                        'No services assigned',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: AppColors.textSecondary,
                            ),
                      ),
                    ],
                  ),
                ),
              )
            else
              Wrap(
                spacing: AppSpacing.sm,
                runSpacing: AppSpacing.sm,
                children: services
                    .map<Widget>(
                      (service) => Chip(
                        label: Text(service),
                        backgroundColor: AppColors.primarySurface,
                        side: BorderSide(
                          color: AppColors.primary.withOpacity(0.2),
                        ),
                        labelStyle: TextStyle(
                          color: AppColors.primaryDark,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    )
                    .toList(),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildLeaveCard(BuildContext context) {
    return Card(
      elevation: AppElevation.sm,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.md),
        side: BorderSide(color: Colors.grey.withOpacity(0.2)),
      ),
      child: ListTile(
        leading: const Icon(Icons.beach_access, color: AppColors.primary),
        title: const Text('My Leaves'),
        subtitle: const Text('Apply for or view your leave requests'),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MyLeavesScreen()),
          );
        },
      ),
    );
  }

  Widget _buildLogoutButton(BuildContext context, AuthProvider auth) {
    return Card(
      elevation: AppElevation.sm,
      child: InkWell(
        onTap: () => _handleLogout(context, auth),
        borderRadius: BorderRadius.circular(AppRadius.md),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(AppSpacing.sm),
                decoration: BoxDecoration(
                  color: AppColors.errorSurface,
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: const Icon(
                  Icons.logout,
                  color: AppColors.error,
                  size: 24,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Logout',
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            color: AppColors.error,
                            fontWeight: FontWeight.w600,
                          ),
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(
                      'Sign out of your account',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: AppColors.textSecondary,
                          ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right,
                color: AppColors.textSecondary,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _handleLogout(BuildContext context, AuthProvider auth) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
        ),
        title: const Text('Logout'),
        content: const Text('Are you sure you want to logout?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.error),
            child: const Text('Logout'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await auth.logout();
      if (context.mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => const WorkerLoginScreen()),
          (route) => false,
        );
      }
    }
  }

  Widget _buildProfessionalDetailsCard(BuildContext context, Worker? worker) {
    if (worker == null) return const SizedBox.shrink();

    return Card(
      elevation: AppElevation.sm,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.md),
        side: BorderSide(color: Colors.grey.withOpacity(0.2)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const SectionHeader(title: 'Professional Details'),
                IconButton(
                  icon: const Icon(Icons.edit, size: 20, color: AppColors.primary),
                  onPressed: () => _showEditProfessionalDetailsDialog(context, worker),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            _buildDetailRow(Icons.description_outlined, 'Bio', worker.bio ?? 'Not provided'),
            const SizedBox(height: AppSpacing.sm),
            _buildDetailRow(Icons.work_outline, 'Experience', '${worker.yearsOfExperience} years'),
          ],
        ),
      ),
    );
  }

  Widget _buildLocationCard(BuildContext context, Worker? worker) {
    if (worker == null) return const SizedBox.shrink();

    return Card(
      elevation: AppElevation.sm,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.md),
        side: BorderSide(color: Colors.grey.withOpacity(0.2)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const SectionHeader(title: 'Location Area'),
                IconButton(
                  icon: const Icon(Icons.edit, size: 20, color: AppColors.primary),
                  onPressed: () => _showEditLocationDialog(context, worker),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            _buildDetailRow(Icons.location_on_outlined, 'Address', worker.location ?? 'Not provided'),
          ],
        ),
      ),
    );
  }

  void _showEditProfessionalDetailsDialog(BuildContext context, Worker worker) {
    final bioController = TextEditingController(text: worker.bio ?? '');
    final expController = TextEditingController(text: worker.yearsOfExperience.toString());
    final formKey = GlobalKey<FormState>();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
        ),
        title: const Text('Professional Details'),
        content: Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextFormField(
                controller: bioController,
                decoration: InputDecoration(
                  labelText: 'Bio / About me',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.sm)),
                ),
                maxLines: 3,
              ),
              const SizedBox(height: AppSpacing.md),
              TextFormField(
                controller: expController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  labelText: 'Years of Experience',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.sm)),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final auth = context.read<AuthProvider>();
                final success = await auth.updateWorkerProfile({
                  'bio': bioController.text.trim(),
                  'yearsOfExperience': int.tryParse(expController.text.trim()) ?? 0,
                });
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(success ? 'Details updated' : 'Failed to update details')),
                  );
                }
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditLocationDialog(BuildContext context, Worker worker) {
    final addressController = TextEditingController(text: worker.location ?? '');
    final formKey = GlobalKey<FormState>();
    double lat = 28.580453;
    double lng = 77.4392409;
    bool isLoadingLocation = false;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) {
          return AlertDialog(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadius.lg),
            ),
            title: const Text('Update Location'),
            content: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (isLoadingLocation)
                    const Padding(
                      padding: EdgeInsets.only(bottom: AppSpacing.md),
                      child: CircularProgressIndicator(),
                    ),
                  TextButton.icon(
                    icon: const Icon(Icons.my_location),
                    label: const Text('Use Current Location'),
                    onPressed: isLoadingLocation ? null : () async {
                      setState(() => isLoadingLocation = true);
                      try {
                        loc.Location location = loc.Location();
                        bool _serviceEnabled;
                        loc.PermissionStatus _permissionGranted;

                        _serviceEnabled = await location.serviceEnabled();
                        if (!_serviceEnabled) {
                          _serviceEnabled = await location.requestService();
                          if (!_serviceEnabled) {
                            throw Exception('Location service disabled');
                          }
                        }

                        _permissionGranted = await location.hasPermission();
                        if (_permissionGranted == loc.PermissionStatus.denied) {
                          _permissionGranted = await location.requestPermission();
                          if (_permissionGranted != loc.PermissionStatus.granted) {
                            throw Exception('Location permission denied');
                          }
                        }

                        final pos = await location.getLocation();
                        lat = pos.latitude ?? lat;
                        lng = pos.longitude ?? lng;
                        final placemarks = await placemarkFromCoordinates(lat, lng);
                        if (placemarks.isNotEmpty) {
                          final place = placemarks.first;
                          addressController.text = "${place.street ?? ''}, ${place.subLocality ?? ''}, ${place.locality ?? ''}, ${place.postalCode ?? ''}, ${place.country ?? ''}".replaceAll(RegExp(r',\s*,'), ',').replaceAll(RegExp(r'^,\s*|\s*,\s*$'), '');
                        }
                      } catch (e) {
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
                        }
                      } finally {
                        setState(() => isLoadingLocation = false);
                      }
                    },
                  ),
                  const SizedBox(height: AppSpacing.md),
                  TextFormField(
                    controller: addressController,
                    decoration: InputDecoration(
                      labelText: 'Full Address',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.sm)),
                    ),
                    maxLines: 2,
                    validator: (val) => val == null || val.isEmpty ? 'Address required' : null,
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState!.validate()) {
                    Navigator.pop(context);
                    final auth = context.read<AuthProvider>();
                    final success = await auth.updateWorkerServiceArea(
                      lat, 
                      lng, 
                      addressController.text.trim()
                    );
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(success ? 'Location updated' : 'Failed to update location')),
                      );
                    }
                  }
                },
                child: const Text('Save'),
              ),
            ],
          );
        }
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String title, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 20, color: AppColors.primary),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
