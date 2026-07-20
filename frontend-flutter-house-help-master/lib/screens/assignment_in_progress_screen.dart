import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'dart:async';
import '../models/worker.dart';
import '../models/service.dart';
import '../models/booking.dart';
import 'package:flutter_house_help/models/location.dart';
import '../providers/auth_provider.dart';
import '../providers/location_provider.dart';
import '../services/api_service.dart';
import '../widgets/booking_status_timeline.dart';
import '../theme.dart';
import 'assignment_confirmed_screen.dart';
import 'assignment_delayed_screen.dart';
import 'professional_assigned_screen.dart';
import 'service_clarification_screen.dart';

/// Assignment In Progress Screen
/// Trust buffer between scheduling and payment.
/// Designed to match homepage design language exactly.
class AssignmentInProgressScreen extends StatefulWidget {
  final Worker worker;
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const AssignmentInProgressScreen({
    Key? key,
    required this.worker,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  State<AssignmentInProgressScreen> createState() =>
      _AssignmentInProgressScreenState();
}

class _AssignmentInProgressScreenState
    extends State<AssignmentInProgressScreen>
    with SingleTickerProviderStateMixin {
  late ApiService _apiService;
  late AuthProvider _authProvider;
  bool _isAssigned = false;
  bool _hasError = false;
  bool _showTimeoutMessage = false;
  Timer? _timeoutTimer;
  Timer? _checkStatusTimer;
  static const int ASSIGNMENT_TIMEOUT_MINUTES = 3;

  // Entrance animation (same pattern as OperationalHero)
  late AnimationController _entranceCtrl;
  late Animation<double> _entranceFade;
  late Animation<double> _entranceSlide;

  @override
  void initState() {
    super.initState();
    _apiService = ApiService();
    _authProvider = AuthProvider.instance;

    // Staggered entrance – same as homepage OperationalHero
    _entranceCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 700),
    );
    _entranceFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _entranceCtrl, curve: Curves.easeOut),
    );
    _entranceSlide = Tween<double>(begin: 24.0, end: 0.0).animate(
      CurvedAnimation(parent: _entranceCtrl, curve: Curves.easeOutCubic),
    );
    _entranceCtrl.forward();

    _startTimeoutTimer();
    _checkStatusTimer = Timer(const Duration(seconds: 3), _checkAssignmentStatus);
  }

  void _startTimeoutTimer() {
    _timeoutTimer = Timer(Duration(minutes: ASSIGNMENT_TIMEOUT_MINUTES), () {
      if (mounted) setState(() => _showTimeoutMessage = true);
    });
  }

  @override
  void dispose() {
    _timeoutTimer?.cancel();
    _checkStatusTimer?.cancel();
    _entranceCtrl.dispose();
    super.dispose();
  }

  Future<void> _checkAssignmentStatus() async {
    if (_isAssigned || _hasError) return;
    try {
      final user = _authProvider.user;
      if (user == null) throw Exception('User not logged in');

      final response = await _apiService.get('assignments/status/latest');
      if (response != null) {
        final status = response['status'] ?? response['assignmentState'];
        if (status == 'assigned') {
          setState(() => _isAssigned = true);
          Future.delayed(const Duration(seconds: 2), () {
            if (mounted) {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => ProfessionalAssignedScreen(
                    worker: widget.worker,
                    service: widget.service,
                    startTime: widget.startTime,
                    endTime: widget.endTime,
                    amount: widget.amount,
                  ),
                ),
              );
            }
          });
        }
      }
    } on TokenExpiredException {
      if (mounted) await _authProvider.handleTokenExpired();
    } catch (e) {
      setState(() => _hasError = true);
    }
  }

  void _viewRequestDetails() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Request details would be shown here'),
        backgroundColor: const Color(0xFF1D5247),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showSupportOptions() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFFF6F7F5),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.fromLTRB(24, 12, 24, 32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Drag handle — same as homepage bottom sheets
            Container(
              width: 36,
              height: 4,
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: AppTheme.stoneGray,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Text(
              'Need help?',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: AppTheme.charcoalBlack,
                letterSpacing: -0.3,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Choose how you\'d like to get assistance:',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: AppTheme.secondaryText,
              ),
            ),
            const SizedBox(height: 20),
            _buildSupportTile(
              context,
              icon: Icons.chat_bubble_outline_rounded,
              title: 'Chat with support',
              subtitle: 'Get help in real-time',
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: const Text('Chat support would open here'),
                    backgroundColor: const Color(0xFF1D5247),
                    behavior: SnackBarBehavior.floating,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 8),
            _buildSupportTile(
              context,
              icon: Icons.phone_outlined,
              title: 'Call support',
              subtitle: 'Speak with our team',
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: const Text('Call support would open here'),
                    backgroundColor: const Color(0xFF1D5247),
                    behavior: SnackBarBehavior.floating,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: OutlinedButton(
                onPressed: () => Navigator.pop(context),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: AppTheme.stoneGray, width: 1.0),
                  foregroundColor: AppTheme.charcoalBlack,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: Text(
                  'Cancel',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSupportTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          // Same subtle gradient as TrustLayer card
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.stoneGray, width: 1.0),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppTheme.emeraldGreen.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppTheme.emeraldGreen, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.charcoalBlack,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                      color: AppTheme.secondaryText,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.chevron_right_rounded,
              color: AppTheme.secondaryText,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Same scaffold background as homepage
      backgroundColor: const Color(0xFFF6F7F5),
      body: AnimatedBuilder(
        animation: Listenable.merge([_entranceFade, _entranceSlide]),
        builder: (context, _) {
          return FadeTransition(
            opacity: _entranceFade,
            child: Transform.translate(
              offset: Offset(0, _entranceSlide.value),
              child: SafeArea(
                child: SingleChildScrollView(
                  // Same 24px horizontal padding as homepage
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),

                      // ── Header ───────────────────────────────────────────
                      _buildHeader(),

                      const SizedBox(height: 8),

                      // ── Proactive status chip (mirrors ProactiveMessage) ─
                      _buildStatusChip(),

                      const SizedBox(height: 16),

                      // ── Hero surface — dark emerald gradient card ─────────
                      _buildHeroCard(),

                      const SizedBox(height: 12),

                      // ── Booking Status Timeline ───────────────────────────
                      BookingStatusTimeline(
                        currentState: _isAssigned
                            ? BookingAssignmentState.assigned
                            : BookingAssignmentState.pending,
                        showLabels: true,
                      ),

                      const SizedBox(height: 10),

                      // ── Service Summary (TrustLayer style) ───────────────
                      _buildServiceSummary(),

                      const SizedBox(height: 10),

                      // ── What Happens Next ─────────────────────────────────
                      _buildWhatHappensNext(),

                      const SizedBox(height: 20),

                      // ── Support Row ───────────────────────────────────────
                      _buildSupportRow(),

                      const SizedBox(height: 16),

                      // ── Primary CTA ───────────────────────────────────────
                      _buildPrimaryCTA(),

                      const SizedBox(height: 20),

                      // ── Trust banner (homepage muted strip) ──────────────
                      _buildTrustBanner(),

                      const SizedBox(height: 20),

                      // ── Timeout message ───────────────────────────────────
                      if (_showTimeoutMessage && !_isAssigned) ...[
                        _buildTimeoutCard(),
                        const SizedBox(height: 20),
                      ],

                      // ── Reassurance footer ────────────────────────────────
                      Opacity(
                        opacity: 0.72,
                        child: Text(
                          _isAssigned
                              ? 'If anything changes, we\'ll handle it and keep you informed.'
                              : 'If assignment takes longer than expected, we\'ll continue working on it and keep you updated.',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: AppTheme.secondaryText,
                            height: 1.5,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  // ── Header — same weight/size as homepage section headers ────────────────
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Assigning a professional',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.5,
            height: 1.2,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'We\'re assigning a verified professional for your service.',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  // ── Proactive status chip — mirrors ProactiveMessage widget ──────────────
  Widget _buildStatusChip() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF5FAF8), // Same as ProactiveMessage bg
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: _isAssigned
                ? const Icon(Icons.check_circle_outline, color: AppTheme.emeraldGreen, size: 13)
                : const Icon(Icons.access_time_outlined, color: AppTheme.emeraldGreen, size: 13),
          ),
          const SizedBox(width: 8),
          Text(
            _isAssigned ? 'Assignment complete' : 'Assignment in progress',
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppTheme.charcoalBlack,
              letterSpacing: 0.1,
            ),
          ),
        ],
      ),
    );
  }

  // ── Hero card — dark emerald gradient (same as OperationalHero) ──────────
  Widget _buildHeroCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF193F37), // darkest — top-left (homepage hero)
            Color(0xFF1F6B5F), // primary emerald — bottom-right
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          stops: [0.0, 1.0],
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppTheme.heroShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: _isAssigned
                    ? const Icon(Icons.check_rounded, color: Colors.white, size: 22)
                    : SizedBox(
                        width: 22,
                        height: 22,
                        child: Padding(
                          padding: const EdgeInsets.all(9),
                          child: CircularProgressIndicator(
                            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                            strokeWidth: 2.5,
                          ),
                        ),
                      ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _isAssigned ? 'Professional Found' : 'Finding your professional',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _isAssigned
                          ? 'Background-checked & system-matched.'
                          : 'Consistent. Reliable. Seamless.',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.white.withOpacity(0.72),
                        letterSpacing: 0.1,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Divider
          Container(height: 1, color: Colors.white.withOpacity(0.12)),
          const SizedBox(height: 16),
          // Stat pills — same pattern as homepage _buildMutedStatPill
          Row(
            children: [
              _buildHeroStatPill(Icons.verified_outlined, 'Verified'),
              const SizedBox(width: 16),
              _buildHeroStatPill(Icons.schedule_outlined, 'On-time'),
              const SizedBox(width: 16),
              _buildHeroStatPill(Icons.thumb_up_outlined, 'Guaranteed'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeroStatPill(IconData icon, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white.withOpacity(0.8), size: 14),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: Colors.white.withOpacity(0.8),
            letterSpacing: 0.2,
          ),
        ),
      ],
    );
  }

  // ── Service summary — TrustLayer gradient card pattern ───────────────────
  Widget _buildServiceSummary() {
    return Container(
      height: 76,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
          stops: [0.0, 1.0],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Row(
        children: [
          Container(
            width: 22,
            height: 22,
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.12),
              borderRadius: BorderRadius.circular(11),
            ),
            child: const Icon(
              Icons.home_repair_service_outlined,
              color: AppTheme.emeraldGreen,
              size: 14,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  widget.service?.name ?? 'Home Service',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${DateFormat('EEE, d MMM').format(widget.startTime)} · ${_getTimeWindowText()}  ·  ₹${widget.amount.toStringAsFixed(0)}/visit',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6B6B6B),
                    letterSpacing: 0.1,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── What Happens Next — same card gradient as TrustLayer ─────────────────
  Widget _buildWhatHappensNext() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.stoneGray, width: 1.0),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'What happens next',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: AppTheme.charcoalBlack,
              letterSpacing: -0.1,
            ),
          ),
          const SizedBox(height: 14),
          _buildNextStep(
            icon: Icons.person_search_outlined,
            title: 'We assign a verified professional',
            subtitle: 'Matched based on location & service',
          ),
          _buildStepDivider(),
          _buildNextStep(
            icon: Icons.notifications_none_rounded,
            title: 'You\'ll be notified once assigned',
            subtitle: 'Push notification + SMS confirmation',
          ),
          _buildStepDivider(),
          _buildNextStep(
            icon: Icons.credit_card_outlined,
            title: 'Payment after assignment',
            subtitle: 'Secure checkout before service begins',
          ),
        ],
      ),
    );
  }

  Widget _buildStepDivider() => Padding(
    padding: const EdgeInsets.symmetric(vertical: 10),
    child: Divider(color: AppTheme.stoneGray, height: 1, thickness: 1),
  );

  Widget _buildNextStep({
    required IconData icon,
    required String title,
    required String subtitle,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: AppTheme.emeraldGreen.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppTheme.emeraldGreen, size: 16),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.charcoalBlack,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w400,
                  color: AppTheme.secondaryText,
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ── Support row — same gradient card ────────────────────────────────────
  Widget _buildSupportRow() {
    return InkWell(
      onTap: _showSupportOptions,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.fromLTRB(14, 6, 10, 6),
        height: 60,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF5FAF8), Color(0xFFF0F7F4)],
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: AppTheme.emeraldGreen.withOpacity(0.12),
                borderRadius: BorderRadius.circular(11),
              ),
              child: const Icon(
                Icons.help_outline_rounded,
                color: AppTheme.emeraldGreen,
                size: 14,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Text(
                    'Need help?',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.charcoalBlack,
                    ),
                  ),
                  SizedBox(height: 2),
                  Text(
                    'Chat or call our support team',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFF6B6B6B),
                      letterSpacing: 0.1,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.chevron_right_rounded,
              color: AppTheme.secondaryText,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }

  // ── Primary CTA — 52px height, 16px radius ───────────────────────────────
  Widget _buildPrimaryCTA() {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: OutlinedButton(
        onPressed: _viewRequestDetails,
        style: OutlinedButton.styleFrom(
          foregroundColor: AppTheme.emeraldGreen,
          side: const BorderSide(color: AppTheme.emeraldGreen, width: 1.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: const Text(
          'View request details',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: AppTheme.emeraldGreen,
          ),
        ),
      ),
    );
  }

  // ── Trust banner — same as homepage _buildTrustBannerCard ────────────────
  Widget _buildTrustBanner() {
    return Opacity(
      opacity: 0.72,
      child: Column(
        children: [
          Container(height: 1, color: AppTheme.stoneGray),
          const SizedBox(height: 20),
          const Text(
            'Your home is in expert hands',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: AppTheme.secondaryText,
              letterSpacing: 0.2,
            ),
          ),
          const SizedBox(height: 16),
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
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: [
              _buildMutedChip('Verified helpers'),
              _buildMutedChip('On-time arrival'),
              _buildMutedChip('Satisfaction guaranteed'),
            ],
          ),
          const SizedBox(height: 20),
          Container(height: 1, color: AppTheme.stoneGray),
        ],
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
            color: Color(0xFF5F6361),
            height: 1.1,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
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
        color: AppTheme.stoneGray,
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _buildMutedChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: const Color(0xFFF0F1EF),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        '\u2713  $label',
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w400,
          color: Color(0xFF5F6361),
          height: 1.3,
        ),
      ),
    );
  }

  // ── Timeout card ─────────────────────────────────────────────────────────
  Widget _buildTimeoutCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8E8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.warningColor, width: 1.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.access_time_outlined, color: AppTheme.warningColor, size: 18),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Assignment taking longer than expected',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            'We\'re still working on finding the perfect professional for you.',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: AppTheme.secondaryText,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: SizedBox(
                  height: 44,
                  child: OutlinedButton(
                    onPressed: () {
                      setState(() => _showTimeoutMessage = false);
                      _checkAssignmentStatus();
                    },
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AppTheme.emeraldGreen, width: 1.0),
                      foregroundColor: AppTheme.emeraldGreen,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'Try Again',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: SizedBox(
                  height: 44,
                  child: ElevatedButton(
                    onPressed: () {
                      final userId = _authProvider.user?.id;
                      final locationProvider = Provider.of<LocationProvider>(
                        context,
                        listen: false,
                      );
                      final initialLocation = locationProvider.currentLocationData;
                      final authProvider = Provider.of<AuthProvider>(
                        context,
                        listen: false,
                      );
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => MultiProvider(
                            providers: [
                              ChangeNotifierProvider<AuthProvider>.value(value: authProvider),
                              ChangeNotifierProvider<LocationProvider>.value(value: locationProvider),
                            ],
                            child: ServiceClarificationScreen(
                              userId: userId,
                              initialLocation: initialLocation,
                              backendService: widget.service,
                            ),
                          ),
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.emeraldGreen,
                      foregroundColor: Colors.white,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'Browse Pros',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _getTimeWindowText() {
    final startStr = DateFormat('hh:mm a').format(widget.startTime);
    final endStr = DateFormat('hh:mm a').format(widget.endTime);
    return '$startStr\u2013$endStr';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy public aliases — kept so other files that import old class names
// continue to compile without any changes needed there.
// ─────────────────────────────────────────────────────────────────────────────
class ServiceSummaryCard extends StatelessWidget {
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const ServiceSummaryCard({
    Key? key,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class WhatHappensNextSection extends StatelessWidget {
  const WhatHappensNextSection({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class SupportSection extends StatelessWidget {
  final VoidCallback onHelpPressed;
  const SupportSection({Key? key, required this.onHelpPressed}) : super(key: key);
  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class PrimaryCTA extends StatelessWidget {
  final VoidCallback onDetailsPressed;
  const PrimaryCTA({Key? key, required this.onDetailsPressed}) : super(key: key);
  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class TimeoutMessage extends StatelessWidget {
  final VoidCallback onRetry;
  final VoidCallback onManualSelection;
  const TimeoutMessage({
    Key? key,
    required this.onRetry,
    required this.onManualSelection,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

class DelayMessage extends StatelessWidget {
  final String message;
  const DelayMessage({Key? key, required this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8E8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.warningColor, width: 1.0),
      ),
      child: Row(
        children: [
          const Icon(Icons.access_time_outlined, color: AppTheme.warningColor, size: 18),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: const TextStyle(
                fontSize: 14,
                color: AppTheme.charcoalBlack,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
