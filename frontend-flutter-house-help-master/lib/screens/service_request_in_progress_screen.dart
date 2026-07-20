import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';
import 'dart:async';
import 'dart:math';
import 'package:intl/intl.dart';
import '../models/worker.dart';
import '../models/service.dart';
import '../services/api_service.dart';
import '../providers/auth_provider.dart';
import '../theme.dart';
import 'professional_assigned_screen.dart';
import 'assignment_failed_screen.dart';

// ─── Squiggly animated progress line ────────────────────────────────────────
// Token-updated: uses AppTheme.emeraldGreen
class SquigglyLineProgress extends StatefulWidget {
  final double height;
  final Color color;
  final double strokeWidth;

  const SquigglyLineProgress({
    Key? key,
    this.height = 4,
    this.color = AppTheme.emeraldGreen,
    this.strokeWidth = 2,
  }) : super(key: key);

  @override
  State<SquigglyLineProgress> createState() => _SquigglyLineProgressState();
}

class _SquigglyLineProgressState extends State<SquigglyLineProgress>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return CustomPaint(
          size: Size(double.infinity, widget.height),
          painter: _SquigglyLinePainter(
            progress: _animation.value,
            color: widget.color,
            strokeWidth: widget.strokeWidth,
          ),
        );
      },
    );
  }
}

class _SquigglyLinePainter extends CustomPainter {
  final double progress;
  final Color color;
  final double strokeWidth;

  _SquigglyLinePainter({
    required this.progress,
    required this.color,
    required this.strokeWidth,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();
    const waveLength = 20.0;
    const amplitude = 3.0;

    path.moveTo(0, size.height / 2);
    for (double x = 0; x < size.width; x += 2) {
      final y =
          size.height / 2 +
          amplitude * sin((x / waveLength + progress * 2 * pi) * 2);
      path.lineTo(x, y);
    }
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _SquigglyLinePainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
class ServiceRequestInProgressScreen extends StatefulWidget {
  final String serviceRequestId;
  final Service? service;
  final DateTime startTime;
  final DateTime endTime;
  final double amount;

  const ServiceRequestInProgressScreen({
    Key? key,
    required this.serviceRequestId,
    required this.service,
    required this.startTime,
    required this.endTime,
    required this.amount,
  }) : super(key: key);

  @override
  State<ServiceRequestInProgressScreen> createState() =>
      _ServiceRequestInProgressScreenState();
}

class _ServiceRequestInProgressScreenState
    extends State<ServiceRequestInProgressScreen>
    with SingleTickerProviderStateMixin {
  late ApiService _apiService;
  late Timer _pollingTimer;

  AssignmentStatus _status = AssignmentStatus.requested;
  Worker? _assignedWorker;
  String? _failureReason;

  static const int MAX_POLLING_DURATION = 180;
  static const int POLLING_INTERVAL = 3;
  int _elapsedTime = 0;

  // Entrance animation — same as OperationalHero / assignment_in_progress_screen
  late AnimationController _entranceCtrl;
  late Animation<double> _entranceFade;
  late Animation<double> _entranceSlide;

  @override
  void initState() {
    super.initState();
    _apiService = ApiService();

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

    _startPolling();
  }

  void _startPolling() {
    _pollingTimer = Timer.periodic(const Duration(seconds: POLLING_INTERVAL), (
      timer,
    ) {
      _elapsedTime += POLLING_INTERVAL;
      _checkAssignmentStatus();
    });
  }

  Future<void> _checkAssignmentStatus() async {
    if (_status != AssignmentStatus.requested) return;

    try {
      final response = await _apiService.get(
        'service-requests/${widget.serviceRequestId}',
      );

      if (response != null) {
        final status = response['assignmentStatus'];
        final statusStr = status.toString().toUpperCase();

        switch (statusStr) {
          case 'ASSIGNED':
            _handleAssignmentSuccess(response);
            break;
          case 'FAILED_TO_ASSIGN':
            _handleAssignmentFailure(response);
            break;
          case 'REQUESTED':
            if (_elapsedTime >= MAX_POLLING_DURATION) {
              _handleTimeout();
            }
            break;
          default:
            debugPrint('Unknown assignment status: $status');
        }
      }
    } on TokenExpiredException {
      debugPrint('ServiceRequestInProgressScreen: Token expired');
      _pollingTimer.cancel();
      if (mounted) {
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        await authProvider.handleTokenExpired();
      }
    } catch (e) {
      print('Polling error: $e');
    }
  }

  void _handleAssignmentSuccess(Map<String, dynamic> response) {
    _pollingTimer.cancel();
    setState(() {
      _status = AssignmentStatus.assigned;
      _assignedWorker = Worker.fromJson(response['assignedWorker']);
    });
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => MultiProvider(
              providers: [
                ChangeNotifierProvider<AuthProvider>.value(value: authProvider),
              ],
              child: ProfessionalAssignedScreen(
                worker: _assignedWorker!,
                service: widget.service,
                startTime: widget.startTime,
                endTime: widget.endTime,
                amount: widget.amount,
              ),
            ),
          ),
        );
      }
    });
  }

  void _handleAssignmentFailure(Map<String, dynamic> response) {
    _pollingTimer.cancel();
    setState(() {
      _status = AssignmentStatus.failed;
      _failureReason = response['failureReason'];
    });
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => AssignmentFailedScreen(
              serviceRequestId: widget.serviceRequestId,
              failureReason: _failureReason,
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

  void _handleTimeout() {
    _pollingTimer.cancel();
    setState(() {
      _status = AssignmentStatus.failed;
      _failureReason = 'TIMEOUT';
    });
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => AssignmentFailedScreen(
              serviceRequestId: widget.serviceRequestId,
              failureReason: 'Assignment taking longer than expected',
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

  @override
  void dispose() {
    _pollingTimer?.cancel();
    _entranceCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Homepage warm grey background
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
                  // 24px horizontal padding — same as homepage
                  padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 1️⃣ Header
                      _buildHeader(),
                      const SizedBox(height: 8),

                      // 2️⃣ Status chip — ProactiveMessage pattern
                      _buildStatusChip(),
                      const SizedBox(height: 16),

                      // 3️⃣ Hero card — dark emerald gradient
                      _buildHeroCard(),
                      const SizedBox(height: 10),

                      // 4️⃣ Service summary — TrustLayer card
                      _buildServiceSummary(),
                      const SizedBox(height: 10),

                      // 5️⃣ What happens next — TrustLayer card
                      _buildProgressDetails(),
                      const SizedBox(height: 16),

                      // 6️⃣ Reassurance footer text
                      Opacity(
                        opacity: 0.72,
                        child: Text(
                          _status == AssignmentStatus.assigned
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
                      const SizedBox(height: 10),

                      // 7️⃣ Support row — TrustLayer card
                      _buildSupportRow(),

                      const SizedBox(height: 20),

                      // 8️⃣ Trust banner — homepage muted strip
                      _buildTrustBanner(),
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

  // ── Header ─────────────────────────────────────────────────────────────────
  Widget _buildHeader() {
    final title = _status == AssignmentStatus.assigned
        ? 'Professional assigned'
        : _status == AssignmentStatus.failed
            ? 'Assignment failed'
            : 'Assigning a professional';

    final subtitle = _status == AssignmentStatus.assigned
        ? 'A verified professional has been assigned to your service.'
        : _status == AssignmentStatus.failed
            ? 'We couldn\'t find a professional for your selected time.'
            : 'We\'re assigning a verified professional for your service.';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppTheme.charcoalBlack,
            letterSpacing: -0.5,
            height: 1.2,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          subtitle,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: AppTheme.secondaryText,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  // ── Status chip — ProactiveMessage pattern ─────────────────────────────────
  Widget _buildStatusChip() {
    final IconData icon;
    final String label;
    final Color chipColor;

    if (_status == AssignmentStatus.assigned) {
      icon = Icons.check_circle_outline_rounded;
      label = 'Assignment complete';
      chipColor = AppTheme.emeraldGreen;
    } else if (_status == AssignmentStatus.failed) {
      icon = Icons.error_outline_rounded;
      label = 'Assignment failed';
      chipColor = AppTheme.warningColor;
    } else {
      icon = Icons.access_time_outlined;
      label = 'Assignment in progress';
      chipColor = AppTheme.emeraldGreen;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF5FAF8),
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
              color: chipColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: chipColor, size: 13),
          ),
          const SizedBox(width: 8),
          Text(
            label,
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

  // ── Hero card — dark emerald gradient (OperationalHero pattern) ───────────
  Widget _buildHeroCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF193F37), // darkest — top-left
            Color(0xFF1F6B5F), // primary emerald
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
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
                child: _status == AssignmentStatus.assigned
                    ? const Icon(Icons.check_rounded, color: Colors.white, size: 22)
                    : _status == AssignmentStatus.failed
                        ? const Icon(Icons.error_outline_rounded, color: Colors.white, size: 22)
                        : Padding(
                            padding: const EdgeInsets.all(9),
                            child: CircularProgressIndicator(
                              valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                              strokeWidth: 2.5,
                            ),
                          ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _status == AssignmentStatus.assigned
                          ? 'Professional Found'
                          : _status == AssignmentStatus.failed
                              ? 'No match available'
                              : 'Finding your professional',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _status == AssignmentStatus.assigned
                          ? 'Background-checked & system-matched.'
                          : _status == AssignmentStatus.failed
                              ? 'We\'ll help you find an alternate slot.'
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
          // Squiggly line — only while in progress
          if (_status == AssignmentStatus.requested) ...[
            const SizedBox(height: 16),
            SquigglyLineProgress(
              height: 4,
              color: Colors.white.withOpacity(0.6),
              strokeWidth: 2,
            ),
          ],
          const SizedBox(height: 16),
          Container(height: 1, color: Colors.white.withOpacity(0.12)),
          const SizedBox(height: 16),
          // Stat pills row — same as OperationalHero
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

  // ── Service summary — TrustLayer gradient card (76px height pattern) ──────
  Widget _buildServiceSummary() {
    final startStr = DateFormat('hh:mm a').format(widget.startTime);
    final endStr = DateFormat('hh:mm a').format(widget.endTime);

    return Container(
      height: 76,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
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
                  '${DateFormat('EEE, d MMM').format(widget.startTime)} · $startStr–$endStr  ·  ₹${widget.amount.toStringAsFixed(0)}/visit',
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

  // ── What happens next — TrustLayer gradient card ──────────────────────────
  Widget _buildProgressDetails() {
    final isAssigned = _status == AssignmentStatus.assigned;

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
          if (isAssigned) ...[
            _buildNextStep(
              icon: Icons.assignment_outlined,
              title: 'Booking is being prepared',
              subtitle: 'Details confirmed & ready',
            ),
            _buildStepDivider(),
            _buildNextStep(
              icon: Icons.credit_card_outlined,
              title: 'Complete payment to confirm',
              subtitle: 'Secure checkout before service begins',
            ),
            _buildStepDivider(),
            _buildNextStep(
              icon: Icons.check_circle_outline_rounded,
              title: 'We\'ll take care of the rest',
              subtitle: 'Monitored from start to finish',
            ),
          ] else ...[
            _buildNextStep(
              icon: Icons.person_search_outlined,
              title: 'We assign a verified professional',
              subtitle: 'Matched by location & service type',
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

  // ── Support row — TrustLayer card (60px) ──────────────────────────────────
  Widget _buildSupportRow() {
    return InkWell(
      onTap: _showSupportOptions,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 60,
        padding: const EdgeInsets.fromLTRB(14, 6, 10, 6),
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
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
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

  // ── Trust banner — homepage muted strip ────────────────────────────────────
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

  // ── Support bottom sheet — homepage bottom sheet pattern ──────────────────
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
            // Drag handle
            Container(
              width: 36,
              height: 4,
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: AppTheme.stoneGray,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const Text(
              'Need help?',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: AppTheme.charcoalBlack,
                letterSpacing: -0.3,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
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
            // 52px cancel button
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
                child: const Text(
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
}

enum AssignmentStatus { requested, assigned, failed }

// ─── Legacy alias widgets (kept for backwards compat) ─────────────────────
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
  Widget build(BuildContext context) {
    final startStr = DateFormat('hh:mm a').format(startTime);
    final endStr = DateFormat('hh:mm a').format(endTime);

    return Container(
      height: 76,
      padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
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
                  service?.name ?? 'Home Service',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.charcoalBlack,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${DateFormat('EEE, d MMM').format(startTime)} · $startStr–$endStr  ·  ₹${amount.toStringAsFixed(0)}/visit',
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
}

class SupportSection extends StatelessWidget {
  final VoidCallback onHelpPressed;

  const SupportSection({Key? key, required this.onHelpPressed})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onHelpPressed,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 60,
        padding: const EdgeInsets.fromLTRB(14, 6, 10, 6),
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
            const Expanded(
              child: Text(
                'Need help?',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.charcoalBlack,
                ),
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
}
