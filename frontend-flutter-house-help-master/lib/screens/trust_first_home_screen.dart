import 'dart:async';
import 'package:flutter/material.dart';
import '../models/service.dart';
import '../models/booking.dart';
import '../models/category_availability.dart';
import '../models/user.dart';
import 'package:flutter_house_help/models/location.dart';
import '../providers/provider_manager.dart';
import '../providers/location_provider.dart';
import '../providers/theme_provider.dart';
import '../providers/user_provider.dart';
import '../providers/service_provider.dart';
import '../providers/worker_provider.dart';
import '../providers/recommendation_provider.dart';
import '../providers/auth_provider.dart';
import '../providers/booking_provider.dart';
import '../models/recommendation.dart';
import '../services/api_service.dart';
import '../widgets/sevaq_header.dart';
import '../widgets/operational_hero.dart';
import '../widgets/active_operations.dart';
import '../widgets/trust_layer.dart';
import '../widgets/society_intelligence.dart';
import '../widgets/household_support.dart';
import '../widgets/proactive_message.dart';
import '../widgets/location_picker_dialog.dart';
import '../widgets/floating_video_ad_card.dart';
import '../core/animation/transition_manager.dart';
import '../core/animation/haptic_service.dart';
import '../theme.dart';
import 'main_screen.dart';
import 'package:url_launcher/url_launcher.dart';
import 'service_details_screen.dart';
import 'service_clarification_screen.dart';
import 'service_engagement_type_screen.dart';
import 'profile_screen.dart';
import '../models/service_option.dart';
import 'package:provider/provider.dart';

class TrustFirstHomeScreen extends StatefulWidget {
  const TrustFirstHomeScreen({Key? key}) : super(key: key);

  @override
  _TrustFirstHomeScreenState createState() => _TrustFirstHomeScreenState();
}

class _TrustFirstHomeScreenState extends State<TrustFirstHomeScreen> {
  late ApiService apiService;
  List<Service> services = [];
  List<Service> filteredServices = [];
  List<CategoryAvailability> categoryAvailability = [];
  bool _hasLoadedCategories = false;
  String searchQuery = '';
  bool isLoading = true;
  String errorMessage = '';
  ServiceProvider? _serviceProvider;
  WorkerProvider? _workerProvider;
  RecommendationProvider? _recommendationProvider;

  // New state for the trust-first layout
  String _locationText = 'Your Area';
  String _systemMessage = 'All services on track';
  Recommendation? _currentRecommendation;
  List<String> _suggestions = [];
  bool _hasLoadedWorkerStats = false;
  bool _showAdCard = false;
  final ScrollController _scrollController = ScrollController();

  String _formatLocationText(dynamic locationData) {
    // Handle different location data formats
    if (locationData is Map) {
      // Handle Map format
      final address = locationData['address'] as String?;
      final latitude = locationData['latitude'] as double?;
      final longitude = locationData['longitude'] as double?;

      if (address != null && address.isNotEmpty) {
        // Check if address contains coordinates (fallback from location provider)
        if (address.contains('Lat:') && address.contains('Lng:')) {
          // Extract coordinates and format nicely
          return _formatCoordinatesFromAddress(address);
        }
        return _truncateLocation(address);
      } else if (latitude != null && longitude != null) {
        return 'Near coordinates (${latitude.toStringAsFixed(4)}, ${longitude.toStringAsFixed(4)})';
      }
    } else if (locationData != null) {
      // Handle object format with toString
      final address = locationData.address;
      final latitude = locationData.latitude;
      final longitude = locationData.longitude;

      if (address != null && address.isNotEmpty) {
        // Check if address contains coordinates (fallback from location provider)
        if (address.contains('Lat:') && address.contains('Lng:')) {
          // Extract coordinates and format nicely
          return _formatCoordinatesFromAddress(address);
        }
        return _truncateLocation(address);
      } else if (latitude != null && longitude != null) {
        return 'Near coordinates (${latitude.toStringAsFixed(4)}, ${longitude.toStringAsFixed(4)})';
      }
    }

    return 'Your Area';
  }

  String _truncateLocation(String address) {
    // Truncate to first two parts for cleaner header display
    // e.g., "Tower A3, Greater Noida, Uttar Pradesh, India" -> "Tower A3, Greater Noida"
    final parts = address.split(', ');
    if (parts.length <= 2) {
      return address;
    }
    return '${parts[0]}, ${parts[1]}';
  }

  String _formatCoordinatesFromAddress(String address) {
    // Extract coordinates from "Lat: X, Lng: Y" format
    final latMatch = RegExp(r'Lat:\s*([0-9.-]+)').firstMatch(address);
    final lngMatch = RegExp(r'Lng:\s*([0-9.-]+)').firstMatch(address);

    if (latMatch != null && lngMatch != null) {
      final lat = double.tryParse(latMatch.group(1)!);
      final lng = double.tryParse(lngMatch.group(1)!);

      if (lat != null && lng != null) {
        // Try to get a human-readable location name for these coordinates
        return _getHumanReadableLocation(lat, lng);
      }
    }

    // Fallback to original address
    return address;
  }

  String _getHumanReadableLocation(double latitude, double longitude) {
    // For Delhi/NCR area coordinates, return human-readable names
    if (latitude >= 28.4 &&
        latitude <= 28.9 &&
        longitude >= 76.8 &&
        longitude <= 77.5) {
      if (latitude >= 28.6 &&
          latitude <= 28.8 &&
          longitude >= 77.0 &&
          longitude <= 77.3) {
        return 'New Delhi';
      } else if (latitude >= 28.4 &&
          latitude <= 28.6 &&
          longitude >= 77.2 &&
          longitude <= 77.5) {
        return 'Greater Noida';
      } else if (latitude >= 28.5 &&
          latitude <= 28.7 &&
          longitude >= 77.0 &&
          longitude <= 77.2) {
        return 'Noida';
      } else if (latitude >= 28.7 &&
          latitude <= 28.9 &&
          longitude >= 77.0 &&
          longitude <= 77.3) {
        return 'North Delhi';
      }
    }

    // For other areas, return a general area name or coordinates
    return 'Near coordinates (${latitude.toStringAsFixed(4)}, ${longitude.toStringAsFixed(4)})';
  }

  String _getOperationalStatus() {
    // Dynamic status based on recommendation and worker availability
    if (_currentRecommendation?.worker != null) {
      return 'Support available';
    } else if (services.isNotEmpty) {
      return 'Monitoring availability';
    }
    return 'System ready';
  }

  void _onHomeScroll() {
    if (!_showAdCard && _scrollController.position.pixels > 5) {
      _scrollController.removeListener(_onHomeScroll);
      setState(() {
        _showAdCard = true;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    apiService = ApiService();
    _loadHomeData();
    _scrollController.addListener(_onHomeScroll);
    Timer(const Duration(seconds: 10), () {
      if (mounted && !_showAdCard) {
        _scrollController.removeListener(_onHomeScroll);
        setState(() {
          _showAdCard = true;
        });
      }
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadRecommendations();
      _loadWorkerStats();
      // Fetch bookings and subscriptions to check for pre-service reminders
      final bookingProvider = ProviderManager.safeGetProvider<BookingProvider>(
        context,
        listen: false,
      );
      if (bookingProvider != null) {
        debugPrint(
          'TrustFirstHomeScreen: Calling fetchBookingsAndSubscriptions()',
        );
        bookingProvider.fetchBookingsAndSubscriptions(context: context);
      } else {
        debugPrint('TrustFirstHomeScreen: BookingProvider not available');
      }
    });
  }

  @override
  void dispose() {
    // Safely remove listener in case it hasn't fired yet
    _scrollController.removeListener(_onHomeScroll);
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _loadHomeData() async {
    if (!mounted) return;

    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      final response = await apiService.get('services');

      if (!mounted) return;

      setState(() {
        // Handle paginated response format: { data: [...], meta: {...} }
        final List<dynamic> servicesData = response['data'] ?? [];
        services = servicesData.map((item) => Service.fromJson(item)).toList();
        filteredServices = services;
        isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;

      setState(() {
        isLoading = false;
        errorMessage = e.toString();
      });
    }
  }

  Future<void> _loadRecommendations() async {
    final locationProvider = ProviderManager.safeGetProvider<LocationProvider>(
      context,
    );
    final workerProvider = ProviderManager.safeGetProvider<WorkerProvider>(
      context,
    );
    final serviceProvider = ProviderManager.safeGetProvider<ServiceProvider>(
      context,
    );
    final userProvider = ProviderManager.safeGetProvider<UserProvider>(context);
    final recommendationProvider =
        ProviderManager.safeGetProvider<RecommendationProvider>(context);

    if (locationProvider == null ||
        workerProvider == null ||
        serviceProvider == null ||
        userProvider == null ||
        recommendationProvider == null) {
      return;
    }

    try {
      await recommendationProvider.generateRecommendations(
        workerProvider: workerProvider,
        serviceProvider: serviceProvider,
        locationProvider: locationProvider,
        userProvider: userProvider,
      );

      // Update location text with enhanced formatting
      if (locationProvider.currentLocationData != null) {
        final locationData = locationProvider.currentLocationData!;
        setState(() {
          _locationText = _formatLocationText(locationData);
        });
      }

      // Generate system message based on availability
      final hasWorkers =
          recommendationProvider.currentRecommendation?.worker != null;
      setState(() {
        _systemMessage = 'All services operating normally';

        _currentRecommendation = recommendationProvider.currentRecommendation;

        // Generate muted suggestions (max 2)
        if (services.isNotEmpty) {
          _suggestions = ['Usually booked at this time', 'Common in your area'];
        }
      });
    } catch (e) {
      setState(() {
        errorMessage = 'Failed to load recommendations: $e';
      });
    }
  }

  /// Load live worker stats for trust layer and society intelligence
  Future<void> _loadWorkerStats() async {
    if (_hasLoadedWorkerStats) return;

    final locationProvider = ProviderManager.safeGetProvider<LocationProvider>(
      context,
      listen: false,
    );
    final workerProvider = ProviderManager.safeGetProvider<WorkerProvider>(
      context,
      listen: false,
    );

    if (locationProvider == null || workerProvider == null) return;

    final position = locationProvider.currentPosition;
    if (position != null) {
      _hasLoadedWorkerStats = true;
      await workerProvider.fetchWorkerStats(position.latitude, position.longitude);
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Re-trigger worker stats fetch when GPS becomes available after initState
    if (!_hasLoadedWorkerStats) {
      // Defer to post-frame to avoid setState() during build
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _loadWorkerStats();
      });
    }
  }

  /// Get active booking for home screen display
  Future<Map<String, dynamic>?> _getActiveBooking() async {
    final bookingProvider = ProviderManager.safeGetProvider<BookingProvider>(
      context,
      listen: false,
    );
    if (bookingProvider == null) return null;
    return bookingProvider.getActiveBooking(context: context);
  }

  void _handlePrimaryRecommendation() async {
    print('🔍 DEBUG: _handlePrimaryRecommendation called - opening WhatsApp');
    HapticService.lightTap();
    final Uri whatsappUri = Uri.parse(
      'https://wa.me/918340496841?text=Hello%20SevaQ%2C%20I%20want%20to%20start%20managed%20support%20for%20my%20home.',
    );
    try {
      if (await canLaunchUrl(whatsappUri)) {
        await launchUrl(
          whatsappUri,
          mode: LaunchMode.externalApplication,
        );
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Could not launch WhatsApp. Please check if it is installed.'),
              backgroundColor: Color(0xFFBA1A1A),
            ),
          );
        }
      }
    } catch (e) {
      debugPrint('Error launching WhatsApp: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error opening WhatsApp: $e'),
            backgroundColor: const Color(0xFFBA1A1A),
          ),
        );
      }
    }
  }

  void _navigateToServiceDetails(Service service) {
    // Find matching ServiceOption
    ServiceOption? selectedOption;
    if (service.name.toLowerCase().contains('clean') || 
        service.category.toLowerCase().contains('clean') || 
        service.category.toLowerCase().contains('maintenance')) {
      selectedOption = ServiceOption.options.firstWhere((opt) => opt.id == 'cleaning');
    } else if (service.name.toLowerCase().contains('cook') || 
               service.name.toLowerCase().contains('kitchen') || 
               service.category.toLowerCase().contains('cook') || 
               service.category.toLowerCase().contains('kitchen')) {
      selectedOption = ServiceOption.options.firstWhere((opt) => opt.id == 'cooking');
    }

    // Default fallback if no match found
    selectedOption ??= ServiceOption.options.firstWhere(
      (opt) => opt.id == 'cooking',
      orElse: () => ServiceOption.options.first,
    );

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final userId = authProvider.userId;

    if (userId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('User not logged in'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final locationProvider = Provider.of<LocationProvider>(context, listen: false);
    final Location? initialLocation = locationProvider.currentLocationData;

    HapticService.lightTap();
    Navigator.of(context).push(
      TransitionManager.createFadeScaleRoute(
        MultiProvider(
          providers: [
            ChangeNotifierProvider<AuthProvider>.value(value: authProvider),
            ChangeNotifierProvider<LocationProvider>.value(value: locationProvider),
          ],
          child: ServiceEngagementTypeScreen(
            selectedServiceOption: selectedOption,
            userId: userId,
            initialLocation: initialLocation,
            backendService: service,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final themeProvider = ProviderManager.safeGetProvider<ThemeProvider>(
      context,
    );
    final locationProvider = ProviderManager.safeGetProvider<LocationProvider>(
      context,
    );
    _serviceProvider = ProviderManager.safeGetProvider<ServiceProvider>(
      context,
    );
    _workerProvider = ProviderManager.safeGetProvider<WorkerProvider>(context);
    _recommendationProvider =
        ProviderManager.safeGetProvider<RecommendationProvider>(context);
    final authProvider = ProviderManager.safeGetProvider<AuthProvider>(context);
    final userId = authProvider?.user?.id;
    final initialLocation = locationProvider?.currentLocationData;

    final isDarkMode = themeProvider?.isDarkMode ?? false;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: isLoading
          ? _buildLoadingIndicator()
          : errorMessage.isNotEmpty
          ? _buildErrorWidget()
          : _buildTrustFirstContent(
              locationProvider ?? LocationProvider(),
              userId: userId,
              initialLocation: initialLocation,
            ),
    );
  }

  Widget _buildLoadingIndicator() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(color: Theme.of(context).primaryColor),
          SizedBox(height: 16),
          Text(
            'Loading services...',
            style: TextStyle(
              fontSize: 16,
              color: Theme.of(context).textTheme.bodyMedium?.color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildErrorWidget() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.error, size: 64, color: Colors.red),
          SizedBox(height: 16),
          Text(
            'Failed to load services',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(errorMessage),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: _loadHomeData,
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).primaryColor,
              padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
            child: Text('Retry', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Widget _buildTrustFirstContent(
    LocationProvider locationProvider, {
    required dynamic userId,
    Location? initialLocation,
  }) {
    final authProvider = ProviderManager.safeGetProvider<AuthProvider>(context);
    final user = authProvider?.user;

    return Stack(
      children: [
        // Atmospheric background gradient with subtle radial glow - Phase 4 Refinement
        Positioned.fill(
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFFF6F7F5), // Warm grey background
              gradient: RadialGradient(
                center: Alignment.topCenter,
                radius: 1.5,
                colors: [
                  const Color(0xFFF6F7F5).withOpacity(0.98),
                  const Color(0xFFF6F7F5).withOpacity(0.95),
                ],
                stops: [0.0, 1.0],
              ),
            ),
          ),
        ),
        // Soft noise texture overlay - Phase 4 Refinement
        Positioned.fill(
          child: Opacity(
            opacity: 0.02,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.white.withOpacity(0.05),
                    Colors.transparent,
                    Colors.white.withOpacity(0.02),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
            ),
          ),
        ),
        RefreshIndicator(
          onRefresh: () async {
            await _loadHomeData();
            await _loadRecommendations();
          },
          child: SingleChildScrollView(
            controller: _scrollController,
            padding: const EdgeInsets.fromLTRB(
              24,
              0,
              24,
              16, // Reduced - bottom nav is now in Scaffold
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1️⃣ COMPACT HEADER
                SevaqHeader(
                  householdName: user?.firstName ?? 'Your',
                  locationText: _locationText,
                  operationalStatus: _getOperationalStatus(),
                  onNotificationTap: () {},
                  onProfileTap: () {
                    HapticService.lightTap();
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const ProfileScreen()),
                    );
                  },
                  onLocationTap: () {
                    // Open location picker
                    showDialog(
                      context: context,
                      builder: (context) => LocationPickerDialog(
                        locationProvider: context.read<LocationProvider>(),
                      ),
                    );
                  },
                ),

                const SizedBox(
                  height: 8,
                ), // Added breathing room for location + title
                // 2️⃣ PROACTIVE SYSTEM MESSAGE
                ProactiveMessage(
                  message: _systemMessage,
                  icon: Icons.check_circle_outline,
                ),

                const SizedBox(
                  height: 16,
                ), // Added breathing room for better vertical rhythm
                // 3️⃣ OPERATIONAL HERO SURFACE
                OperationalHero(onRequestSupport: _handlePrimaryRecommendation),

                const SizedBox(height: 12), // Reduced for continuous flow
                // 4️⃣ ACTIVE HOUSEHOLD OPERATIONS
                FutureBuilder<Map<String, dynamic>?>(
                  future: _getActiveBooking(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData && snapshot.data != null) {
                      final activeBooking = snapshot.data!;
                      return ActiveOperations(
                        operationTitle:
                            activeBooking['operationTitle'] ?? 'Service',
                        assignedTo: activeBooking['assignedTo'] ?? 'Worker',
                        eta: activeBooking['eta'] ?? '24 mins',
                        status: activeBooking['status'] ?? 'ASSIGNED',
                        onViewAll: () {
                          HapticService.lightTap();
                          Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const MainScreen(initialIndex: 1),
                            ),
                            (route) => false,
                          );
                        },
                      );
                    }
                    // Return empty container if no active booking
                    return const SizedBox.shrink();
                  },
                ),

                const SizedBox(height: 4), // Reduced for continuous flow
                // 5️⃣ TRUST/RELIABILITY LAYER
                const TrustLayer(),

                const SizedBox(
                  height: 10,
                ), // Increased for better breathing room
                // 6️⃣ SUPPORT AVAILABILITY
                const SocietyIntelligence(),
                const SizedBox(
                  height: 10,
                ), // Breathing room before household support
                // 7️⃣ HOUSEHOLD SUPPORT OPTIONS
                HouseholdSupport(
                  services: const ['Kitchen Operations', 'Home Maintenance'],
                  onServiceTap: (serviceName) {
                    // Map display name → backend service name variants
                    final nameMap = {
                      'Kitchen Operations': [
                        'Kitchen Operations',
                        'Kitchen Support',
                        'Kitchen Support/Management',
                        'Cooking',
                        'Cook',
                        'Meal Preparation',
                      ],
                      'Home Maintenance': [
                        'Home Maintenance',
                        'Cleaning',
                        'Home Cleaning',
                        'House Cleaning',
                        'Housekeeping',
                      ],
                    };

                    final aliases = nameMap[serviceName] ?? [serviceName];

                    // Find a matching service from loaded list (case-insensitive)
                    Service? matched;
                    for (final alias in aliases) {
                      try {
                        matched = services.firstWhere(
                          (s) =>
                              s.name.toLowerCase() == alias.toLowerCase() ||
                              s.name
                                  .toLowerCase()
                                  .contains(alias.toLowerCase()) ||
                              alias
                                  .toLowerCase()
                                  .contains(s.name.toLowerCase()),
                        );
                        break;
                      } catch (_) {
                        matched = null;
                      }
                    }

                    if (matched != null) {
                      _navigateToServiceDetails(matched);
                    } else {
                      // Fallback: show snackbar if service not yet loaded
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('$serviceName not available in your area yet'),
                          backgroundColor: const Color(0xFF1D5247),
                          behavior: SnackBarBehavior.floating,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                      );
                    }
                  },
                ),

                const SizedBox(height: 20),
                // 8️⃣ SOCIAL PROOF / TRUST CARD
                _buildTrustBannerCard(),

                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
        if (_showAdCard)
          FloatingVideoAdCard(
            apiService: apiService,
            onClose: () {
              setState(() {
                _showAdCard = false;
              });
            },
          ),
      ],
    );
  }

  Widget _buildTrustBannerCard() {
    // Muted, ambient trust strip — no CTA, no interactions, blends into page
    return Opacity(
      opacity: 0.72,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4),
        child: Column(
          children: [
            // Divider line
            Container(
              height: 1,
              color: const Color(0xFFE6E8E7), // stoneGray
            ),
            const SizedBox(height: 20),
            // Headline — light weight, muted
            const Text(
              'Your home is in expert hands',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: Color(0xFF8A8F8D), // secondaryText
                letterSpacing: 0.2,
              ),
            ),
            const SizedBox(height: 16),
            // Stat pills row
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildMutedStatPill('6 Lakh+', 'Families'),
                const SizedBox(width: 8),
                _buildMutedDot(),
                const SizedBox(width: 8),
                _buildMutedStatPill('4.8 ★', 'Rated'),
                const SizedBox(width: 8),
                _buildMutedDot(),
                const SizedBox(width: 8),
                _buildMutedStatPill('50k+', 'Reviews'),
              ],
            ),
            const SizedBox(height: 20),
            // 3 trust signals — horizontal chips, very light
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: [
                _buildMutedChip('✓  Verified helpers'),
                _buildMutedChip('✓  On-time arrival'),
                _buildMutedChip('✓  Satisfaction guaranteed'),
              ],
            ),
            const SizedBox(height: 20),
            // Footer divider
            Container(
              height: 1,
              color: const Color(0xFFE6E8E7), // stoneGray
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMutedStatPill(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: Color(0xFF5F6361), // onSurfaceVariant
            height: 1.1,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w400,
            color: Color(0xFF8A8F8D), // secondaryText
            letterSpacing: 0.3,
          ),
        ),
      ],
    );
  }

  Widget _buildMutedDot() {
    return Container(
      width: 3,
      height: 3,
      decoration: const BoxDecoration(
        color: Color(0xFFE6E8E7), // stoneGray dot
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _buildMutedChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: const Color(0xFFF0F1EF), // secondaryContainer
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w400,
          color: Color(0xFF5F6361), // onSurfaceVariant
          height: 1.3,
        ),
      ),
    );
  }
}

