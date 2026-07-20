import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_house_help/models/service_option.dart';
import 'package:flutter_house_help/models/service.dart';
import 'package:flutter_house_help/models/location.dart';
import 'package:flutter_house_help/providers/auth_provider.dart';
import 'package:flutter_house_help/providers/location_provider.dart';
import 'package:flutter_house_help/screens/schedule_pricing_screen.dart';
import 'package:flutter_house_help/screens/subscription_profiles_screen.dart';
import 'package:flutter_house_help/screens/subscription_pricing_screen.dart';
import 'package:flutter_house_help/utils/service_mapper.dart';
import '../theme.dart';

/// Service Engagement Type Screen
/// Redesigned to fully comply with the Sevaq Design System.
class ServiceEngagementTypeScreen extends StatefulWidget {
  final ServiceOption selectedServiceOption;
  final dynamic userId;
  final Location? initialLocation;
  final Service? backendService;

  const ServiceEngagementTypeScreen({
    Key? key,
    required this.selectedServiceOption,
    required this.userId,
    this.initialLocation,
    this.backendService,
  }) : super(key: key);

  @override
  State<ServiceEngagementTypeScreen> createState() =>
      _ServiceEngagementTypeScreenState();
}

class _ServiceEngagementTypeScreenState
    extends State<ServiceEngagementTypeScreen> {
  EngagementType _selectedEngagementType = EngagementType.monthly;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.fogWhite,
      appBar: AppBar(
        backgroundColor: AppTheme.fogWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.charcoalBlack),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              const SizedBox(height: 28),
              _buildEngagementTypeOptions(),
              const SizedBox(height: 24),
              _buildWhyChooseManagedSection(),
              const SizedBox(height: 28),
              _buildPrimaryCTA(),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  // ── Header ──────────────────────────────────────────────────────────────
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Managed household support',
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: AppTheme.emeraldGreen,
            letterSpacing: 0.1,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          '${widget.selectedServiceOption.name} Support',
          style: const TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            height: 1.15,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          'Choose how SevaQ should manage this household operation.',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color: AppTheme.onSurfaceVariant.withOpacity(0.85),
            height: 1.45,
          ),
        ),
      ],
    );
  }

  // ── Engagement Type Options ──────────────────────────────────────────────
  Widget _buildEngagementTypeOptions() {
    return Column(
      children: [
        // Monthly Managed Support (Primary — Recommended)
        _buildEngagementTypeCard(
          title: 'Managed Monthly Support',
          recommendationText: 'SevaQ Recommendation',
          bulletPoints: const ['Dedicated professional', 'Backup support included'],
          footerText: 'Managed by SevaQ · Priority scheduling',
          isSelected: _selectedEngagementType == EngagementType.monthly,
          onTap: () => setState(() => _selectedEngagementType = EngagementType.monthly),
        ),

        const SizedBox(height: 14),

        // One-Time Assistance (Secondary)
        _buildEngagementTypeCard(
          title: 'One-Time Assistance',
          subtitle: 'Single professional visit',
          footerText: 'Best for urgent or temporary needs',
          isSelected: _selectedEngagementType == EngagementType.oneTime,
          onTap: () => setState(() => _selectedEngagementType = EngagementType.oneTime),
        ),
      ],
    );
  }

  Widget _buildEngagementTypeCard({
    required String title,
    String? subtitle,
    String? recommendationText,
    List<String>? bulletPoints,
    required String footerText,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    final Color cardBg = isSelected ? AppTheme.softGreen : Colors.white;
    final Color borderColor = isSelected
        ? AppTheme.emeraldGreen
        : AppTheme.stoneGray;
    final double borderWidth = isSelected ? 1.8 : 1.0;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: borderColor, width: borderWidth),
        color: cardBg,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: InkWell(
          onTap: onTap,
          splashColor: AppTheme.softGreen,
          highlightColor: AppTheme.softGreen.withOpacity(0.5),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // SevaQ Recommendation badge
                if (recommendationText != null) ...[
                  Row(
                    children: [
                      // Radio-button style indicator
                      Container(
                        width: 14,
                        height: 14,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: AppTheme.emeraldGreen,
                            width: 2,
                          ),
                        ),
                        child: Center(
                          child: Container(
                            width: 5,
                            height: 5,
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: AppTheme.emeraldGreen,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 7),
                      Text(
                        recommendationText,
                        style: const TextStyle(
                          color: AppTheme.emeraldGreen,
                          fontWeight: FontWeight.w700,
                          fontSize: 12,
                          letterSpacing: 0.1,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                ],

                // Title
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.charcoalBlack,
                    height: 1.2,
                  ),
                ),

                // Subtitle
                if (subtitle != null && subtitle.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: AppTheme.onSurfaceVariant,
                    ),
                  ),
                ],

                // Bullet points
                if (bulletPoints != null && bulletPoints.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  ...bulletPoints.map((point) => Padding(
                    padding: const EdgeInsets.only(bottom: 3),
                    child: Text(
                      point,
                      style: const TextStyle(
                        color: AppTheme.emeraldGreen,
                        fontWeight: FontWeight.w500,
                        fontSize: 14,
                        height: 1.4,
                      ),
                    ),
                  )),
                ],

                const SizedBox(height: 12),

                // Footer row: meta text + checkmark
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Text(
                        footerText,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                          color: AppTheme.secondaryText.withOpacity(0.85),
                        ),
                      ),
                    ),
                    if (isSelected) ...[
                      const SizedBox(width: 12),
                      Container(
                        width: 26,
                        height: 26,
                        decoration: const BoxDecoration(
                          color: AppTheme.emeraldGreen,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.check,
                          color: Colors.white,
                          size: 16,
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // ── Why Managed Support Section ──────────────────────────────────────────
  Widget _buildWhyChooseManagedSection() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.primaryContainer, // softGreen = #EAF4F1
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Why households choose managed support',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: AppTheme.emeraldGreen,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 12),
          _buildCheckPoint('Dedicated professional'),
          _buildCheckPoint('Backup replacements'),
          _buildCheckPoint('No long-term contracts'),
          _buildCheckPoint('Change anytime'),
        ],
      ),
    );
  }

  Widget _buildCheckPoint(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          const Text(
            '✓',
            style: TextStyle(
              color: AppTheme.emeraldGreen,
              fontWeight: FontWeight.w700,
              fontSize: 14,
            ),
          ),
          const SizedBox(width: 10),
          Text(
            text,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppTheme.emeraldGreen,
            ),
          ),
        ],
      ),
    );
  }

  // ── Primary CTA ──────────────────────────────────────────────────────────
  Widget _buildPrimaryCTA() {
    final label = _selectedEngagementType == EngagementType.monthly
        ? 'Continue with Managed Support'
        : 'Continue with One-Time Assistance';

    return SizedBox(
      width: double.infinity,
      height: 52,
      child: ElevatedButton(
        onPressed: _handleContinue,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.emeraldGreen,
          foregroundColor: Colors.white,
          elevation: 0,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.1,
          ),
        ),
        child: Text(label),
      ),
    );
  }

  // ── Navigation Logic (unchanged) ─────────────────────────────────────────
  void _handleContinue() {
    debugPrint('DEBUG: _handleContinue called');

    LocationProvider? existingLocationProvider;
    try {
      existingLocationProvider = context.read<LocationProvider>();
    } catch (e) {
      debugPrint('Could not read LocationProvider: $e');
    }

    Location? currentLocation = widget.initialLocation;
    if (currentLocation == null && existingLocationProvider != null) {
      currentLocation = existingLocationProvider.currentLocationData;
    }

    if (_selectedEngagementType == EngagementType.monthly) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => SubscriptionPricingScreen(
            serviceType: widget.selectedServiceOption.id.toLowerCase(),
            serviceName: widget.selectedServiceOption.name,
            userId: widget.userId,
            initialLocation: currentLocation,
            selectedProfile: null,
          ),
        ),
      );
    } else {
      AuthProvider? authProvider;
      try {
        authProvider = context.read<AuthProvider>();
      } catch (e) {
        debugPrint('DEBUG: Could not get AuthProvider: $e');
      }

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (ctx) => MultiProvider(
            providers: [
              ChangeNotifierProvider<AuthProvider>.value(
                value: authProvider ?? AuthProvider(),
              ),
              ChangeNotifierProvider<LocationProvider>.value(
                value: existingLocationProvider ?? LocationProvider(),
              ),
            ],
            child: SchedulePricingScreen(
              worker: null,
              service: _convertServiceOptionToService(widget.selectedServiceOption),
              source: 'ONE_TIME',
            ),
          ),
        ),
      );
    }
  }

  Service? _convertServiceOptionToService(ServiceOption serviceOption) {
    debugPrint(
      '[ServiceConversion] Converting: id=${serviceOption.id}, name=${serviceOption.name}',
    );
    final backendServiceId = ServiceMapper.getRepresentativeBackendId(serviceOption.id);
    debugPrint('[ServiceConversion] Mapped to backendServiceId: $backendServiceId');

    return Service(
      id: widget.backendService?.id ?? backendServiceId,
      publicId: widget.backendService?.publicId ?? '',
      name: widget.backendService?.name ?? serviceOption.name,
      description: widget.backendService?.description ?? serviceOption.description,
      basePrice: widget.backendService?.basePrice ?? serviceOption.basePrice,
      category: widget.backendService?.category ?? 'household',
      duration: widget.backendService?.duration ?? 2,
      slots: widget.backendService?.slots ?? const ['morning', 'afternoon', 'evening'],
    );
  }
}

enum EngagementType { monthly, oneTime }
