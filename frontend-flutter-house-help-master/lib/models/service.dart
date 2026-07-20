class Service {
  // Backend uses UUID (String) for id, but we support both int and String for compatibility
  final dynamic id;
  final String publicId;
  final String name;
  final String description;
  final String category;
  final String? subcategory;
  final double basePrice;
  final bool isAvailable;
  final bool isFastBooking;
  final int? estimatedWaitTime;
  final int? workerCount;
  final int duration;
  final List<String> slots;

  Service({
    required this.id,
    required this.publicId,
    required this.name,
    required this.description,
    required this.category,
    this.subcategory,
    required this.basePrice,
    this.isAvailable = true,
    this.isFastBooking = false,
    this.estimatedWaitTime,
    this.workerCount,
    this.duration = 2,
    this.slots = const ['morning', 'afternoon', 'evening'],
  });

  factory Service.fromJson(Map<String, dynamic> json) {
    // Parse slots array
    List<String> parsedSlots = ['morning', 'afternoon', 'evening'];
    if (json['slots'] != null) {
      if (json['slots'] is List) {
        parsedSlots = (json['slots'] as List).map((e) => e.toString()).toList();
      } else if (json['slots'] is String) {
        // Handle postgres text array format or string format
        final cleaned = json['slots'].replaceAll('{', '').replaceAll('}', '').replaceAll('"', '');
        parsedSlots = cleaned.split(',').map((e) => e.trim()).toList();
      }
    }

    return Service(
      id: _parseId(json['id']),
      publicId: json['publicId'] ?? '',
      name: json['name']?.toString() ?? 'Unknown Service',
      description:
          json['description']?.toString() ?? 'No description available',
      category: json['category']?.toString() ?? 'General',
      subcategory: json['subcategory']?.toString(),
      basePrice: double.tryParse(json['basePrice']?.toString() ?? '0') ?? 0.0,
      isAvailable: json['isAvailable'] ?? true,
      isFastBooking: json['isFastBooking'] ?? false,
      estimatedWaitTime: json['estimatedWaitTime'] != null
          ? int.tryParse(json['estimatedWaitTime'].toString())
          : null,
      workerCount: json['workerCount'] != null
          ? int.tryParse(json['workerCount'].toString())
          : null,
      duration: int.tryParse(json['duration']?.toString() ?? '2') ?? 2,
      slots: parsedSlots,
    );
  }

  List<ServiceSlot> get parsedServiceSlots {
    return slots.map((s) => ServiceSlot.fromString(s)).toList();
  }

  /// Helper to parse id from various types (int or String UUID)
  static dynamic _parseId(dynamic value) {
    if (value == null) return 0;
    if (value is int) return value;
    if (value is String) return value;
    return 0;
  }
}

class ServiceSlot {
  final String time;
  final double surgePrice;
  final bool isAvailable;

  ServiceSlot({
    required this.time,
    required this.surgePrice,
    required this.isAvailable,
  });

  factory ServiceSlot.fromString(String slotStr) {
    final parts = slotStr.split(':');
    
    if (parts.length >= 3) {
      final availableStr = parts.last;
      final surgeStr = parts[parts.length - 2];
      final timeStr = parts.sublist(0, parts.length - 2).join(':');
      final isSurgeNumeric = double.tryParse(surgeStr) != null;
      
      if (isSurgeNumeric) {
        return ServiceSlot(
          time: timeStr,
          surgePrice: double.tryParse(surgeStr) ?? 0.0,
          isAvailable: availableStr == 'true',
        );
      }
    }
    
    if (parts.length == 2) {
      final isSurgeNumeric = double.tryParse(parts[1]) != null;
      if (isSurgeNumeric) {
        return ServiceSlot(
          time: parts[0],
          surgePrice: double.tryParse(parts[1]) ?? 0.0,
          isAvailable: true,
        );
      }
    }

    String timeLabel = slotStr;
    if (slotStr == 'morning') timeLabel = '08:00 AM';
    if (slotStr == 'afternoon') timeLabel = '12:00 PM';
    if (slotStr == 'evening') timeLabel = '04:00 PM';
    return ServiceSlot(
      time: timeLabel,
      surgePrice: 0.0,
      isAvailable: true,
    );
  }

  @override
  String toString() => '$time:$surgePrice:$isAvailable';
}
