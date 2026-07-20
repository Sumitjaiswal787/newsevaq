import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import '../core/animation/transition_manager.dart';
import '../core/animation/haptic_service.dart';
import '../core/animation/motion_controller.dart';
import '../core/theme/design_tokens.dart';
import '../providers/auth_provider.dart';
import 'otp_login_screen.dart';

// ─────────────────────────────────────────────────────────────────
//  SEVAQ Login Screen — Video Background + Slide-Up Card
//  Layout : Video fills top portion, dark card slides up from bottom
//  Video  : assets/login_bg.mp4 (looping, muted, autoplay)
//  Card   : Deep emerald card with transparent phone input
//  Motion : Card slides up on entry, stagger within card
// ─────────────────────────────────────────────────────────────────

const Color _bgDeep    = Color(0xFF1D5247);
const Color _bgCard    = Color(0xFF163D30);
const Color _textMuted = Color(0xFFB5CFC9);

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with TickerProviderStateMixin {
  final _phoneController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  // ── Video player ──────────────────────────────────────────────
  late VideoPlayerController _videoController;
  bool _videoReady = false;

  // ── Card slide-up animation ───────────────────────────────────
  late AnimationController _cardController;
  late Animation<Offset> _cardSlide;
  late Animation<double> _cardFade;

  // ── Stagger within card ───────────────────────────────────────
  late AnimationController _staggerController;
  late List<Animation<double>> _fadeAnims;
  late List<Animation<Offset>> _slideAnims;

  // ── Pulse (brand dot) ─────────────────────────────────────────
  late AnimationController _pulseController;
  late Animation<double> _pulseAnim;

  static const int _n         = 4;
  static const int _staggerMs = 80;
  static const int _durMs     = 320;

  @override
  void initState() {
    super.initState();

    // Video
    _videoController = VideoPlayerController.asset('assets/login_bg.mp4')
      ..initialize().then((_) {
        if (!mounted) return;
        setState(() => _videoReady = true);
        _videoController.setLooping(true);
        _videoController.setVolume(0);
        _videoController.play();
      });

    // Card slide-up
    _cardController = AnimationController(
      duration: const Duration(milliseconds: 560),
      vsync: this,
    );
    _cardSlide = Tween<Offset>(
      begin: const Offset(0, 0.35),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _cardController,
      curve: MotionController.emphasis,
    ));
    _cardFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _cardController,
          curve: const Interval(0.0, 0.6, curve: Curves.easeOut)),
    );

    // Stagger inside card (delayed after card arrives)
    final totalMs = _durMs + (_n - 1) * _staggerMs;
    _staggerController = AnimationController(
      duration: Duration(milliseconds: totalMs),
      vsync: this,
    );
    _fadeAnims = List.generate(_n, (i) {
      final s = (i * _staggerMs) / totalMs;
      final e = (i * _staggerMs + _durMs) / totalMs;
      return Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
        parent: _staggerController,
        curve: Interval(s.clamp(0.0, 1.0), e.clamp(0.0, 1.0),
            curve: MotionController.emphasis),
      ));
    });
    _slideAnims = List.generate(_n, (i) {
      final s = (i * _staggerMs) / totalMs;
      final e = (i * _staggerMs + _durMs) / totalMs;
      return Tween<Offset>(
        begin: const Offset(0, 0.06),
        end: Offset.zero,
      ).animate(CurvedAnimation(
        parent: _staggerController,
        curve: Interval(s.clamp(0.0, 1.0), e.clamp(0.0, 1.0),
            curve: MotionController.emphasis),
      ));
    });

    // Pulse dot
    _pulseController = AnimationController(
      duration: MotionController.heroBreathing,
      vsync: this,
    )..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 0.3, end: 1.0).animate(
      CurvedAnimation(parent: _pulseController, curve: MotionController.subtle),
    );

    // Start entrance sequence
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _cardController.forward().then((_) {
        _staggerController.forward();
      });
    });
  }

  // ── Stagger helper ────────────────────────────────────────────
  Widget _s(int i, Widget child) => FadeTransition(
        opacity: _fadeAnims[i],
        child: SlideTransition(position: _slideAnims[i], child: child),
      );

  // ── Build ─────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    // Card takes ~58% of screen; video fills the rest above
    final cardHeight = size.height * 0.58;

    return Scaffold(
      backgroundColor: _bgDeep,
      body: Stack(
        children: [
          // ── Video background (top portion + full bleed) ──────
          if (_videoReady)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              // Video fills everything except card area + overlap
              height: size.height - cardHeight + 64,
              child: _VideoFit(controller: _videoController),
            )
          else
            // Fallback while video loads: grain bg
            Positioned.fill(
              child: CustomPaint(painter: _EmeraldGrainPainter()),
            ),

          // ── Gradient fade video → card ───────────────────────
          Positioned(
            bottom: cardHeight - 80,
            left: 0,
            right: 0,
            height: 120,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    _bgDeep.withOpacity(0.6),
                    _bgDeep.withOpacity(0.95),
                  ],
                ),
              ),
            ),
          ),

          // ── Slide-up login card ──────────────────────────────
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            height: cardHeight,
            child: SlideTransition(
              position: _cardSlide,
              child: FadeTransition(
                opacity: _cardFade,
                child: _loginCard(context),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ── Brand tag over video ──────────────────────────────────────
  Widget _brandTag() => Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.35),
          borderRadius: BorderRadius.circular(DesignTokens.radiusFull),
          border: Border.all(color: Colors.white.withOpacity(0.2)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: const Center(
                child: Text('S',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    )),
              ),
            ),
            const SizedBox(width: 8),
            const Text('SevaQ',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.2,
                )),
          ],
        ),
      );

  // ── Login card ────────────────────────────────────────────────
  Widget _loginCard(BuildContext context) => Container(
        decoration: const BoxDecoration(
          color: _bgDeep,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            padding: EdgeInsets.fromLTRB(
              DesignTokens.spacingXl,
              DesignTokens.spacingXl,
              DesignTokens.spacingXl,
              MediaQuery.of(context).padding.bottom + DesignTokens.spacingXl,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Handle bar
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: DesignTokens.spacingXl),

                // [0] Heading
                _s(0, _heading()),
                const SizedBox(height: DesignTokens.spacingXl),

                // [1] Phone input
                _s(1, _phoneInput()),
                const SizedBox(height: DesignTokens.spacingXl),

                // [2] CTA Button
                _s(2, _ctaButton(context)),
                const SizedBox(height: DesignTokens.spacingLg),

                // [3] Trust card
                _s(3, _trustCard()),

                const SizedBox(height: DesignTokens.spacingMd),
                Text(
                  'Protected by enterprise-grade verification systems',
                  style: DesignTokens.metadata.copyWith(
                    color: Colors.white.withOpacity(0.30),
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      );

  // ── Heading ───────────────────────────────────────────────────
  Widget _heading() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Reliable support\nfor your home.',
            style: TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.w700,
              height: 1.15,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: DesignTokens.spacingSm),
          Text(
            'Trusted support for modern households.',
            style: DesignTokens.label.copyWith(
              color: _textMuted,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      );

  // ── Transparent phone input ────────────────────────────────────
  Widget _phoneInput() => Container(
        height: 60,
        decoration: BoxDecoration(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(DesignTokens.radiusFull),
          border: Border.all(
            color: Colors.white.withOpacity(0.28),
            width: 1.2,
          ),
        ),
        child: Row(
          children: [
            const SizedBox(width: DesignTokens.spacingLg),
            const Text('🇮🇳', style: TextStyle(fontSize: 20)),
            const SizedBox(width: DesignTokens.spacingSm),
            Text(
              '+91',
              style: DesignTokens.label.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(width: DesignTokens.spacingSm),
            Container(
                width: 1, height: 22, color: Colors.white.withOpacity(0.28)),
            const SizedBox(width: DesignTokens.spacingMd),
            Expanded(
              child: TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                autofillHints: const [AutofillHints.telephoneNumberNational],
                cursorColor: Colors.white,
                style: DesignTokens.label.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 1.0,
                ),
                decoration: InputDecoration(
                  hintText: 'Phone number',
                  hintStyle: DesignTokens.label.copyWith(
                    color: Colors.white.withOpacity(0.40),
                    fontWeight: FontWeight.w400,
                  ),
                  filled: true,
                  fillColor: Colors.transparent,
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                  isDense: true,
                ),
                validator: (v) {
                  if (v == null || v.isEmpty) return 'Enter phone number';
                  final c = v.replaceAll(RegExp(r'\D'), '');
                  if (c.length != 10) return 'Enter a valid 10-digit number';
                  return null;
                },
                onChanged: (v) {
                  final c = v.replaceAll(RegExp(r'\D'), '');
                  if (c.length > 5) {
                    final f = '${c.substring(0, 5)} ${c.substring(5)}';
                    _phoneController.value = TextEditingValue(
                      text: f,
                      selection: TextSelection.collapsed(offset: f.length),
                    );
                  }
                },
              ),
            ),
            const SizedBox(width: DesignTokens.spacingLg),
          ],
        ),
      );

  // ── CTA Button ────────────────────────────────────────────────
  Widget _ctaButton(BuildContext context) => SizedBox(
        height: 58,
        child: ElevatedButton(
          onPressed: _isLoading
              ? null
              : () async {
                  HapticService.lightTap();
                  if (_formKey.currentState!.validate()) {
                    setState(() => _isLoading = true);
                    final clean =
                        _phoneController.text.replaceAll(RegExp(r'\D'), '');
                    final phone = '+91$clean';
                    try {
                      await Navigator.push(
                        context,
                        TransitionManager.createFadeScaleRoute(
                          OtpLoginScreen(phoneNumber: phone),
                        ),
                      );
                    } finally {
                      if (mounted) setState(() => _isLoading = false);
                    }
                  }
                },
          style: ElevatedButton.styleFrom(
            backgroundColor: _bgCard,
            foregroundColor: Colors.white,
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(DesignTokens.radiusFull),
            ),
          ),
          child: _isLoading
              ? const SizedBox(
                  height: 20,
                  width: 20,
                  child: CircularProgressIndicator(
                      strokeWidth: 2, color: Colors.white),
                )
              : const Text(
                  'Continue securely',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.2,
                  ),
                ),
        ),
      );

  // ── Trust card ────────────────────────────────────────────────
  Widget _trustCard() => Container(
        padding: const EdgeInsets.symmetric(
          horizontal: DesignTokens.spacingLg,
          vertical: DesignTokens.spacingMd,
        ),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.16),
          borderRadius: BorderRadius.circular(DesignTokens.radiusSm),
          border: Border.all(color: Colors.white.withOpacity(0.10)),
        ),
        child: Row(
          children: [
            AnimatedBuilder(
              animation: _pulseAnim,
              builder: (_, __) => Container(
                width: 7,
                height: 7,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFF4CAF78)
                      .withOpacity(0.4 + 0.6 * _pulseAnim.value),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF4CAF78)
                          .withOpacity(0.4 * _pulseAnim.value),
                      blurRadius: 6,
                      spreadRadius: 1,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: DesignTokens.spacingSm),
            Text(
              'OTP secured  •  No password needed',
              style: DesignTokens.support.copyWith(
                color: Colors.white.withOpacity(0.55),
              ),
            ),
          ],
        ),
      );

  @override
  void dispose() {
    _phoneController.dispose();
    _videoController.dispose();
    _cardController.dispose();
    _staggerController.dispose();
    _pulseController.dispose();
    super.dispose();
  }
}

// ─────────────────────────────────────────────────────────────────
// Video fit widget — fills box, crops to cover (like BoxFit.cover)
// ─────────────────────────────────────────────────────────────────
class _VideoFit extends StatelessWidget {
  final VideoPlayerController controller;
  const _VideoFit({required this.controller});

  @override
  Widget build(BuildContext context) {
    final Size videoSize = controller.value.size;
    final double aspectRatio = (videoSize.width > 0 && videoSize.height > 0)
        ? videoSize.width / videoSize.height
        : 16 / 9;

    return ClipRect(
      child: SizedOverflowBox(
        size: Size.infinite,
        alignment: Alignment.center,
        child: FittedBox(
          fit: BoxFit.cover,
          child: SizedBox(
            width: videoSize.width > 0 ? videoSize.width : 1080,
            height: videoSize.height > 0 ? videoSize.height : 1920,
            child: VideoPlayer(controller),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// Fallback grain painter (shown while video loads)
// ─────────────────────────────────────────────────────────────────
class _EmeraldGrainPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Paint()..color = _bgDeep,
    );
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.025)
      ..style = PaintingStyle.fill;
    for (int c = 0; c < 25; c++) {
      final cx = (c * 137.0 * 3.7) % size.width;
      final cy = (c * 97.0 * 4.1) % size.height;
      for (int p = 0; p < 10; p++) {
        final angle = (p / 10) * 2 * math.pi;
        final r = (p * 31.0 + c * 7.0) % 40;
        final x = cx + r * math.cos(angle);
        final y = cy + r * math.sin(angle);
        canvas.drawCircle(Offset(x, y), 0.7 + (p % 3) * 0.3, paint);
      }
    }
  }

  @override
  bool shouldRepaint(_EmeraldGrainPainter old) => false;
}
