class WorkerLeave {
  final String id;
  final int workerId;
  final String startDate;
  final String endDate;
  final String? reason;
  final String status;
  final int? backupWorkerId;
  final DateTime createdAt;

  WorkerLeave({
    required this.id,
    required this.workerId,
    required this.startDate,
    required this.endDate,
    this.reason,
    required this.status,
    this.backupWorkerId,
    required this.createdAt,
  });

  factory WorkerLeave.fromJson(Map<String, dynamic> json) {
    return WorkerLeave(
      id: json['id'],
      workerId: json['workerId'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      reason: json['reason'],
      status: json['status'],
      backupWorkerId: json['backupWorkerId'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
