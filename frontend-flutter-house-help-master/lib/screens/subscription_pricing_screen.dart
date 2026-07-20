import 'package:flutter/material.dart';
import 'package:flutter_house_help/theme.dart';
import 'package:flutter_house_help/models/location.dart';
import 'package:flutter_house_help/services/pricing_service.dart';
import 'package:flutter_house_help/screens/subscription_scheduling_screen.dart';
import '../models/service_profile.dart';

/// Configure your household support screen
/// Supports both Cooking and Cleaning custom plans with pixel-perfect layouts.
/// Sticky bottom dynamic CTA button and automated price estimation.
class SubscriptionPricingScreen extends StatefulWidget {
  final String serviceType;
  final String serviceName;
  final dynamic userId;
  final Location? initialLocation;
  final ServiceProfile? selectedProfile;

  const SubscriptionPricingScreen({
    super.key,
    required this.serviceType,
    required this.serviceName,
    required this.userId,
    this.initialLocation,
    this.selectedProfile,
  });

  @override
  State<SubscriptionPricingScreen> createState() =>
      _SubscriptionPricingScreenState();
}

class _SubscriptionPricingScreenState
    extends State<SubscriptionPricingScreen> {
  final PricingService _pricingService = PricingService();

  // Cleaning options
  String? _selectedCoverage = 'daily'; // Default selected to match screenshot
  int? _selectedBhk = 3;             // Default selected (3+ BHK) to match screenshot

  // Cooking options
  int? _selectedPersons;
  String? _selectedMealPlan;

  int? _calculatedPrice;

  static const List<int> personOptions = [1, 2, 3, 4, 5, 6];

  // Cooking meal plan options
  static const List<Map<String, String>> mealPlanOptions = [
    {'id': 'BF',          'title': 'Breakfast',         'subtitle': 'Morning support'},
    {'id': 'LUNCH',       'title': 'Lunch',             'subtitle': 'Midday support'},
    {'id': 'DINNER',      'title': 'Dinner',            'subtitle': 'Evening support'},
    {'id': 'BF_LUNCH',    'title': 'Breakfast + Lunch', 'subtitle': 'Morning + Midday'},
    {'id': 'LUNCH_DINNER','title': 'Lunch + Dinner',    'subtitle': 'Midday + Evening'},
    {'id': 'FULL_DAY',    'title': 'All Meals',         'subtitle': 'Full day support'},
  ];

  // Cleaning coverage options
  static const List<Map<String, String>> cleaningCoverageOptions = [
    {'id': 'daily',     'title': 'Daily Cleaning',  'subtitle': 'Every day support'},
    {'id': 'alternate', 'title': 'Alternate Days',  'subtitle': 'Every other day'},
    {'id': 'weekly',    'title': 'Weekly Support',  'subtitle': 'One visit per week'},
    {'id': 'deep',      'title': 'Deep Cleaning',   'subtitle': 'Thorough cleaning'},
  ];

  // Cleaning apartment size options
  static const List<Map<String, dynamic>> bhkDetailedOptions = [
    {'id': 1, 'title': '1 BHK',  'subtitle': 'Compact apart...'},
    {'id': 2, 'title': '2 BHK',  'subtitle': 'Standard famil...'},
    {'id': 3, 'title': '3+ BHK', 'subtitle': 'Large househo...'},
  ];

  bool get _isCooking =>
      widget.serviceType.toLowerCase() == 'cooking' ||
      widget.serviceType.toUpperCase() == 'COOK';

  bool get _isCleaning =>
      widget.serviceType.toLowerCase() == 'cleaning' ||
      widget.serviceType.toUpperCase() == 'CLEANING';

  bool get _canProceed {
    if (_isCleaning) return _selectedBhk != null && _selectedCoverage != null;
    if (_isCooking) return _selectedPersons != null && _selectedMealPlan != null;
    return false;
  }

  @override
  void initState() {
    super.initState();
    _recalculate();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.fogWhite,
      body: Column(
        children: [
          // ── Scrollable content ────────────────────────────────────────
          Expanded(
            child: SafeArea(
              bottom: false,
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Back arrow
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: const Icon(
                        Icons.arrow_back,
                        color: AppTheme.charcoalBlack,
                        size: 24,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // ── Title ────────────────────────────────────────────
                    const Text(
                      'Configure your household\nsupport',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.charcoalBlack,
                        height: 1.2,
                        letterSpacing: -0.4,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // ── Subtitle ─────────────────────────────────────────
                    Text(
                      "Tell us about your household needs. We'll recommend the right support plan.",
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: AppTheme.secondaryText.withOpacity(0.9),
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 32),

                    // ── Service-specific content ──────────────────────────
                    if (_isCleaning) ...[
                      _buildCleaningCoverageSection(),
                      const SizedBox(height: 28),
                      _buildBhkSection(),
                    ],
                    if (_isCooking) ...[
                      _buildPersonsSection(),
                      const SizedBox(height: 28),
                      _buildMealPlanSection(),
                    ],

                    // ── Price summary (once selection complete) ───────────
                    if (_calculatedPrice != null) ...[
                      const SizedBox(height: 28),
                      _buildPriceSummary(),
                    ],

                    const SizedBox(height: 100), // Room for sticky CTA
                  ],
                ),
              ),
            ),
          ),

          // ── Sticky bottom CTA ─────────────────────────────────────────
          _buildStickyBottomCTA(),
        ],
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Cleaning Coverage (2-column grid cards)
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildCleaningCoverageSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Cleaning Coverage',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
          ),
        ),
        const SizedBox(height: 14),
        ...List.generate((cleaningCoverageOptions.length / 2).ceil(), (rowIdx) {
          final leftIdx = rowIdx * 2;
          final rightIdx = leftIdx + 1;
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Row(
              children: [
                Expanded(
                  child: _selectionCard(
                    title: cleaningCoverageOptions[leftIdx]['title']!,
                    subtitle: cleaningCoverageOptions[leftIdx]['subtitle']!,
                    isSelected: _selectedCoverage == cleaningCoverageOptions[leftIdx]['id'],
                    onTap: () => setState(() {
                      _selectedCoverage = cleaningCoverageOptions[leftIdx]['id'];
                      _recalculate();
                    }),
                  ),
                ),
                const SizedBox(width: 12),
                if (rightIdx < cleaningCoverageOptions.length)
                  Expanded(
                    child: _selectionCard(
                      title: cleaningCoverageOptions[rightIdx]['title']!,
                      subtitle: cleaningCoverageOptions[rightIdx]['subtitle']!,
                      isSelected: _selectedCoverage == cleaningCoverageOptions[rightIdx]['id'],
                      onTap: () => setState(() {
                        _selectedCoverage = cleaningCoverageOptions[rightIdx]['id'];
                        _recalculate();
                      }),
                    ),
                  )
                else
                  const Expanded(child: SizedBox()),
              ],
            ),
          );
        }),
      ],
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BHK Selection (3-column grid cards)
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildBhkSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Apartment Size',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
          ),
        ),
        const SizedBox(height: 14),
        Row(
          children: bhkDetailedOptions.map((bhk) {
            final isSelected = _selectedBhk == bhk['id'];
            return Expanded(
              child: Padding(
                padding: EdgeInsets.only(
                  right: bhk['id'] == 3 ? 0 : 10,
                ),
                child: _selectionCard(
                  title: bhk['title']!,
                  subtitle: bhk['subtitle']!,
                  isSelected: isSelected,
                  onTap: () => setState(() {
                    _selectedBhk = bhk['id'];
                    _recalculate();
                  }),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Cooking options: Persons
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildPersonsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Number of Persons',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
          ),
        ),
        const SizedBox(height: 14),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: personOptions.map((p) {
            final isSelected = _selectedPersons == p;
            return _chip(
              label: '$p ${p == 1 ? 'Person' : 'Persons'}',
              isSelected: isSelected,
              onTap: () => setState(() {
                _selectedPersons = p;
                _recalculate();
              }),
            );
          }).toList(),
        ),
      ],
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Cooking options: Meal Plan (2-column grid cards)
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildMealPlanSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Meal Plan',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
          ),
        ),
        const SizedBox(height: 14),
        ...List.generate((mealPlanOptions.length / 2).ceil(), (rowIdx) {
          final leftIdx = rowIdx * 2;
          final rightIdx = leftIdx + 1;
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Row(
              children: [
                Expanded(
                  child: _selectionCard(
                    title: mealPlanOptions[leftIdx]['title']!,
                    subtitle: mealPlanOptions[leftIdx]['subtitle']!,
                    isSelected: _selectedMealPlan == mealPlanOptions[leftIdx]['id'],
                    onTap: () => setState(() {
                      _selectedMealPlan = mealPlanOptions[leftIdx]['id'];
                      _recalculate();
                    }),
                  ),
                ),
                const SizedBox(width: 12),
                if (rightIdx < mealPlanOptions.length)
                  Expanded(
                    child: _selectionCard(
                      title: mealPlanOptions[rightIdx]['title']!,
                      subtitle: mealPlanOptions[rightIdx]['subtitle']!,
                      isSelected: _selectedMealPlan == mealPlanOptions[rightIdx]['id'],
                      onTap: () => setState(() {
                        _selectedMealPlan = mealPlanOptions[rightIdx]['id'];
                        _recalculate();
                      }),
                    ),
                  )
                else
                  const Expanded(child: SizedBox()),
              ],
            ),
          );
        }),
      ],
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Selection card widget with checkmark in top right
  // ─────────────────────────────────────────────────────────────────────────
  Widget _selectionCard({
    required String title,
    required String subtitle,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOut,
        height: 88,
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.softGreen : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? AppTheme.emeraldGreen : AppTheme.stoneGray,
            width: isSelected ? 1.6 : 1.0,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.025),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: isSelected ? AppTheme.emeraldGreen : AppTheme.charcoalBlack,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w400,
                      color: isSelected
                          ? AppTheme.emeraldGreen.withOpacity(0.75)
                          : AppTheme.secondaryText,
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Positioned(
                top: 8,
                right: 8,
                child: Container(
                  width: 16,
                  height: 16,
                  decoration: const BoxDecoration(
                    color: AppTheme.emeraldGreen,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check,
                    color: Colors.white,
                    size: 11,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  // ── Reusable pill chip (Cooking persons) ─────────────────────────────────
  Widget _chip({
    required String label,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOut,
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 11),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.softGreen : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppTheme.emeraldGreen : AppTheme.stoneGray,
            width: isSelected ? 1.6 : 1.0,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
            color: isSelected ? AppTheme.emeraldGreen : AppTheme.charcoalBlack,
          ),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Price summary card (matching screenshot box)
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildPriceSummary() {
    String bhkText = '';
    String coverageText = '';

    if (_isCleaning) {
      bhkText = _selectedBhk == 3 ? '3+ BHK' : '$_selectedBhk BHK';
      final match = cleaningCoverageOptions.firstWhere((c) => c['id'] == _selectedCoverage, orElse: () => const {});
      coverageText = match['title'] ?? '';
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFFF2F6F5),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Your Monthly Support Plan',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: AppTheme.secondaryText,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            '₹${_formatPrice(_calculatedPrice!)}/month',
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: AppTheme.emeraldGreen,
              letterSpacing: -0.4,
            ),
          ),
          if (_isCleaning) ...[
            const SizedBox(height: 12),
            Text(
              bhkText,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: AppTheme.charcoalBlack,
              ),
            ),
            Text(
              coverageText,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w400,
                color: AppTheme.secondaryText,
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Sticky bottom CTA with dynamic label
  // ─────────────────────────────────────────────────────────────────────────
  Widget _buildStickyBottomCTA() {
    final enabled = _canProceed;
    String btnLabel = 'Continue with this plan';

    if (enabled) {
      if (_isCleaning) {
        final bhkText = _selectedBhk == 3 ? '3+ BHK' : '$_selectedBhk BHK';
        final match = cleaningCoverageOptions.firstWhere((c) => c['id'] == _selectedCoverage, orElse: () => const {});
        final coverageText = match['title'] ?? '';
        btnLabel = 'Review Plan • $bhkText • $coverageText';
      } else if (_isCooking) {
        final personText = '$_selectedPersons ${_selectedPersons == 1 ? 'Person' : 'Persons'}';
        final match = mealPlanOptions.firstWhere((m) => m['id'] == _selectedMealPlan, orElse: () => const {});
        final mealText = match['title'] ?? '';
        btnLabel = 'Review Plan • $personText • $mealText';
      }
    }

    return Container(
      color: AppTheme.fogWhite,
      padding: EdgeInsets.fromLTRB(
        24,
        12,
        24,
        MediaQuery.of(context).padding.bottom + 16,
      ),
      child: SizedBox(
        width: double.infinity,
        height: 52,
        child: ElevatedButton(
          onPressed: enabled ? _handleContinue : null,
          style: ElevatedButton.styleFrom(
            backgroundColor:
                enabled ? AppTheme.emeraldGreen : AppTheme.stoneGray,
            foregroundColor: enabled ? Colors.white : AppTheme.secondaryText,
            elevation: 0,
            shadowColor: Colors.transparent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            textStyle: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.1,
            ),
          ),
          child: Text(btnLabel),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Price calculation
  // ─────────────────────────────────────────────────────────────────────────
  void _recalculate() {
    try {
      if (_isCleaning && _selectedBhk != null) {
        final base = _pricingService.calculateCleaningPrice(_selectedBhk!);
        double factor = 1.0;
        if (_selectedCoverage == 'alternate') factor = 0.7;
        if (_selectedCoverage == 'weekly') factor = 0.4;
        if (_selectedCoverage == 'deep') factor = 0.5;
        setState(() {
          _calculatedPrice = (base * factor).round();
        });
      } else if (_isCooking &&
          _selectedPersons != null &&
          _selectedMealPlan != null) {
        setState(() {
          _calculatedPrice = _pricingService.calculateCookingPrice(
            _selectedPersons!,
            _selectedMealPlan!,
          );
        });
      } else {
        setState(() {
          _calculatedPrice = null;
        });
      }
    } catch (_) {
      setState(() {
        _calculatedPrice = null;
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────────────────────────────────
  void _handleContinue() {
    if (_calculatedPrice == null) return;

    Map<String, dynamic>? customConfig;
    if (widget.selectedProfile == null) {
      customConfig = {};
      if (_isCooking) {
        customConfig['persons'] = _selectedPersons;
        customConfig['mealPlan'] = _selectedMealPlan;
      } else if (_isCleaning) {
        customConfig['bhk'] = _selectedBhk;
        customConfig['coverage'] = _selectedCoverage;
      }
    }

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => SubscriptionSchedulingScreen(
          serviceProfile: widget.selectedProfile ??
              ServiceProfile(
                id: 0,
                publicId: 'custom',
                serviceType: widget.serviceType.toUpperCase(),
                description: 'Customized subscription plan',
                scopeDefinition: 'Custom plan',
                maxCapacityHint: '',
                internalRules: {},
                monthlyPrice: _calculatedPrice!.toDouble(),
                isActive: true,
                visitPattern: 'DAILY',
                maxVisitsPerDay: 1,
              ),
          userId: widget.userId,
          initialLocation: widget.initialLocation,
          customConfig: customConfig,
        ),
      ),
    );
  }

  String _formatPrice(int price) {
    return price.toString().replaceAllMapped(
      RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
      (Match m) => '${m[1]},',
    );
  }
}
