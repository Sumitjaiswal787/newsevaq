import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../theme.dart';
import '../core/animation/transition_manager.dart';
import '../core/animation/haptic_service.dart';
import '../core/animation/motion_controller.dart';
import '../core/theme/design_tokens.dart';
import '../services/firebase_auth_service.dart';
import '../providers/auth_provider.dart';
import 'auth_wrapper.dart';
import 'profile_completion_screen.dart';

// ─────────────────────────────────────────────────────────────────
//  SEVAQ OTP Screen — Deep Emerald Archetype (matches Login screen)
//  - 6 individual digit boxes (hidden TextField + overlay technique)
//  - Animated blinking cursor on active box
//  - 60s countdown timer for resend
//  - Staggered entrance @70ms per element
//  - All Firebase auth logic preserved intact
// ─────────────────────────────────────────────────────────────────

const Color _bgDeep    = Color(0xFF1D5247);
const Color _bgCard    = Color(0xFF163D30);
const Color _boxBg     = Color(0xFFF0F7F4);  // same cream as login input
const Color _textMuted = Color(0xFFB5CFC9);

class OtpLoginScreen extends StatefulWidget {
  final String phoneNumber;
  final String? verificationId;
  final String? firstName;
  final String? lastName;

  const OtpLoginScreen({
    Key? key,
    required this.phoneNumber,
    this.verificationId,
    this.firstName,
    this.lastName,
  }) : super(key: key);

  @override
  State<OtpLoginScreen> createState() => _OtpLoginScreenState();
}

class _OtpLoginScreenState extends State<OtpLoginScreen>
    with TickerProviderStateMixin {
  // ── Auth state ─────────────────────────────────────────────────
  final TextEditingController _otpController = TextEditingController();
  final FocusNode _otpFocusNode = FocusNode();

  bool _isLoading = false;
  bool _isSendingOTP = false;
  String? _verificationId;
  String _errorMessage = '';
  int _resendToken = 0;

  // ── Resend countdown ───────────────────────────────────────────
  int _resendCountdown = 60;
  Timer? _countdownTimer;

  // ── Animations ─────────────────────────────────────────────────
  late AnimationController _staggerController;
  late List<Animation<double>> _fadeAnims;
  late List<Animation<Offset>> _slideAnims;

  late AnimationController _pulseController;
  late Animation<double> _pulseAnim;  // for cursor blink + trust dot

  static const int _n        = 5;
  static const int _staggerMs = 70;
  static const int _durMs    = 320;

  // ── Init ──────────────────────────────────────────────────────
  @override
  void initState() {
    super.initState();

    // React to OTP text changes to rebuild boxes
    _otpController.addListener(_onOtpChanged);

    // Stagger animation setup
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
        begin: const Offset(0, 0.04),
        end: Offset.zero,
      ).animate(CurvedAnimation(
        parent: _staggerController,
        curve: Interval(s.clamp(0.0, 1.0), e.clamp(0.0, 1.0),
            curve: MotionController.emphasis),
      ));
    });

    // Pulse for cursor blink and trust card dot
    _pulseController = AnimationController(
      duration: MotionController.heroBreathing,
      vsync: this,
    )..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 0.2, end: 1.0).animate(
      CurvedAnimation(parent: _pulseController, curve: MotionController.subtle),
    );

    // Start auth + entrance
    if (widget.verificationId != null) {
      _verificationId = widget.verificationId;
      _startCountdown();
    } else {
      _sendOTP();
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _staggerController.forward();
      // Auto-show keyboard on OTP screen
      _otpFocusNode.requestFocus();
    });
  }

  void _onOtpChanged() {
    setState(() {});
    // Auto-submit when all 6 digits entered
    if (_otpController.text.length == 6 && !_isLoading) {
      HapticService.lightTap();
      _verifyOTP();
    }
  }

  // ── Countdown ─────────────────────────────────────────────────
  void _startCountdown() {
    _resendCountdown = 60;
    _countdownTimer?.cancel();
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) { timer.cancel(); return; }
      setState(() {
        if (_resendCountdown > 0) {
          _resendCountdown--;
        } else {
          timer.cancel();
        }
      });
    });
  }

  // ── Auth logic (preserved from original) ─────────────────────
  Future<void> _sendOTP() async {
    if (!mounted) return;
    setState(() { _isSendingOTP = true; _errorMessage = ''; });

    try {
      await FirebaseAuthService.verifyPhoneNumber(
        phoneNumber: widget.phoneNumber,
        onCodeSent: (verificationId, resendToken) {
          if (!mounted) return;
          setState(() {
            _verificationId = verificationId;
            _resendToken = resendToken ?? 0;
            _isSendingOTP = false;
          });
          _startCountdown();
          debugPrint('OTP sent, verificationId: $verificationId');
        },
        onVerificationCompleted: (credential) async {
          debugPrint('Verification completed automatically');
          await _handleVerificationSuccess();
        },
        onVerificationFailed: (exception) {
          if (!mounted) return;
          setState(() {
            _isSendingOTP = false;
            _errorMessage = exception.message ?? 'Verification failed';
          });
        },
        onCodeAutoRetrievalTimeout: (verificationId) {
          debugPrint('Auto-retrieval timeout for: $verificationId');
        },
      );
    } catch (e) {
      if (!mounted) return;
      setState(() { _isSendingOTP = false; _errorMessage = 'Failed to send OTP: $e'; });
    }
  }

  Future<void> _verifyOTP() async {
    final otp = _otpController.text;
    if (otp.length < 6) {
      setState(() => _errorMessage = 'Please enter all 6 digits');
      return;
    }

    setState(() { _isLoading = true; _errorMessage = ''; });

    if (_verificationId == null) {
      setState(() {
        _errorMessage = 'Verification ID not received. Please resend OTP.';
        _isLoading = false;
      });
      return;
    }

    try {
      await FirebaseAuthService.signInWithOTP(
        verificationId: _verificationId!,
        smsCode: otp,
      );
      await _handleVerificationSuccess();
    } catch (e) {
      if (!mounted) return;
      setState(() { _isLoading = false; _errorMessage = 'Invalid OTP. Please try again.'; });
    }
  }

  Future<void> _handleVerificationSuccess([String? overrideToken]) async {
    try {
      final idToken = overrideToken ?? await FirebaseAuthService.getIdToken();
      debugPrint('Got Firebase ID token');

      final success = await Provider.of<AuthProvider>(context, listen: false)
          .loginWithFirebase(
            phone: widget.phoneNumber,
            idToken: idToken,
            firstName: widget.firstName,
            lastName: widget.lastName,
          );

      if (!mounted) return;

      if (success) {
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        if (authProvider.needsProfileCompletion) {
          if (mounted) {
            Navigator.pushAndRemoveUntil(
              context,
              TransitionManager.createFadeScaleRoute(
                const ProfileCompletionScreen()),
              (route) => false,
            );
          }
        } else {
          if (mounted) {
            Navigator.pushAndRemoveUntil(
              context,
              TransitionManager.createFadeScaleRoute(const AuthWrapper()),
              (route) => false,
            );
          }
        }
      } else {
        setState(() { _isLoading = false; _errorMessage = 'Failed to login. Please try again.'; });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() { _isLoading = false; _errorMessage = 'Login failed: $e'; });
    }
  }

  // ── Animation helper ──────────────────────────────────────────
  Widget _s(int i, Widget child) => FadeTransition(
        opacity: _fadeAnims[i],
        child: SlideTransition(position: _slideAnims[i], child: child),
      );

  // ── Build ─────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: _bgDeep,
      body: Stack(
        children: [
          // Pixel-level grain
          Positioned.fill(child: CustomPaint(painter: _EmeraldGrainPainter())),

          // Top-right highlight
          Positioned(
            top: -size.width * 0.22,
            right: -size.width * 0.15,
            child: Container(
              width: size.width * 0.8,
              height: size.width * 0.8,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(colors: [
                  Colors.white.withOpacity(0.07),
                  Colors.transparent,
                ]),
              ),
            ),
          ),

          SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // ── Back button ──────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: DesignTokens.spacingLg,
                    vertical: DesignTokens.spacingMd,
                  ),
                  child: GestureDetector(
                    onTap: () {
                      HapticService.lightTap();
                      Navigator.pop(context);
                    },
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                ),

                // ── Scrollable content ───────────────────────────
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: DesignTokens.spacingXl,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const SizedBox(height: DesignTokens.spacingLg),

                        // [0] Heading + subtitle
                        _s(0, _heading()),

                        const SizedBox(height: DesignTokens.spacingXxl),

                        // [1] 6 OTP boxes (hidden TextField overlay)
                        _s(1, _otpBoxes()),

                        const SizedBox(height: DesignTokens.spacingXxl),

                        // [2] Verify button
                        _s(2, _verifyButton()),

                        const SizedBox(height: DesignTokens.spacingLg),

                        // [3] Resend row
                        _s(3, _resendRow()),

                        // Error message
                        if (_errorMessage.isNotEmpty) ...[
                          const SizedBox(height: DesignTokens.spacingLg),
                          Container(
                            padding: const EdgeInsets.all(DesignTokens.spacingMd),
                            decoration: BoxDecoration(
                              color: Colors.red.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(DesignTokens.radiusSm),
                              border: Border.all(color: Colors.red.withOpacity(0.3)),
                            ),
                            child: Text(
                              _errorMessage,
                              style: DesignTokens.support.copyWith(
                                color: Colors.red[300],
                              ),
                            ),
                          ),
                        ],

                        const SizedBox(height: DesignTokens.spacingXl),

                        // [4] Trust card
                        _s(4, _trustCard()),

                        const SizedBox(height: DesignTokens.spacingLg),

                        // Footer
                        Text(
                          'Protected by enterprise-grade verification systems',
                          style: DesignTokens.metadata.copyWith(
                            color: Colors.white.withOpacity(0.32),
                          ),
                          textAlign: TextAlign.center,
                        ),

                        const SizedBox(height: DesignTokens.spacingXxl),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Widgets ───────────────────────────────────────────────────

  Widget _heading() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Enter verification\ncode',
            style: TextStyle(
              color: Colors.white,
              fontSize: 30,
              fontWeight: FontWeight.w700,
              height: 1.15,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: DesignTokens.spacingMd),
          RichText(
            text: TextSpan(
              style: DesignTokens.label.copyWith(
                color: _textMuted,
                fontWeight: FontWeight.w400,
              ),
              children: [
                const TextSpan(text: 'We sent a 6-digit code to '),
                TextSpan(
                  text: widget.phoneNumber,
                  style: DesignTokens.label.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ],
      );

  // 6-box OTP input using hidden TextField + overlay boxes
  Widget _otpBoxes() {
    final text = _otpController.text;

    return SizedBox(
      height: 68,
      child: Stack(
        children: [
          // Hidden TextField (size 0, invisible, receives keyboard input)
          Opacity(
            opacity: 0.0,
            child: TextField(
              controller: _otpController,
              focusNode: _otpFocusNode,
              keyboardType: TextInputType.number,
              maxLength: 6,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: const InputDecoration(counterText: ''),
            ),
          ),

          // Visible 6 boxes
          GestureDetector(
            onTap: () {
              HapticService.lightTap();
              _otpFocusNode.requestFocus();
            },
            behavior: HitTestBehavior.opaque,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (i) {
                final hasChar = i < text.length;
                final isActive = i == text.length && i < 6;
                final char = hasChar ? text[i] : '';

                return AnimatedContainer(
                  duration: MotionController.statusCrossfade,
                  width: (MediaQuery.of(context).size.width - 48 - 5 * 10) / 6,
                  height: 68,
                  decoration: BoxDecoration(
                    color: hasChar
                        ? _boxBg
                        : Colors.white.withOpacity(isActive ? 0.18 : 0.1),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(
                      color: isActive
                          ? Colors.white.withOpacity(0.75)
                          : hasChar
                              ? Colors.transparent
                              : Colors.white.withOpacity(0.15),
                      width: isActive ? 2 : 1,
                    ),
                  ),
                  child: Center(
                    child: hasChar
                        ? Text(
                            char,
                            style: TextStyle(
                              color: _bgDeep,
                              fontSize: 26,
                              fontWeight: FontWeight.w700,
                              height: 1.0,
                            ),
                          )
                        : isActive
                            ? _cursorBlink()
                            : null,
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  // Blinking cursor using pulse animation
  Widget _cursorBlink() => AnimatedBuilder(
        animation: _pulseAnim,
        builder: (_, __) => Container(
          width: 2,
          height: 26,
          color: Colors.white.withOpacity(_pulseAnim.value),
        ),
      );

  Widget _verifyButton() {
    final canVerify = _otpController.text.length == 6;

    return SizedBox(
      height: 58,
      child: ElevatedButton(
        onPressed: (_isLoading || !canVerify)
            ? null
            : () {
                HapticService.lightTap();
                _verifyOTP();
              },
        style: ElevatedButton.styleFrom(
          backgroundColor: canVerify ? _bgCard : Colors.white.withOpacity(0.12),
          foregroundColor: Colors.white,
          disabledBackgroundColor: Colors.white.withOpacity(0.12),
          disabledForegroundColor: Colors.white.withOpacity(0.4),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(DesignTokens.radiusFull),
          ),
        ),
        child: _isLoading
            ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(
                    height: 18, width: 18,
                    child: CircularProgressIndicator(
                        strokeWidth: 2, color: Colors.white),
                  ),
                  const SizedBox(width: DesignTokens.spacingMd),
                  Text('Verifying...',
                    style: DesignTokens.label.copyWith(color: Colors.white)),
                ],
              )
            : const Text(
                'Verify & Continue',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.2,
                ),
              ),
      ),
    );
  }

  Widget _resendRow() => Center(
        child: _resendCountdown > 0
            ? Text(
                "Didn't receive code? Resend in ${_resendCountdown}s",
                style: DesignTokens.support.copyWith(color: _textMuted),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Didn't receive code? ",
                    style: DesignTokens.support.copyWith(color: _textMuted),
                  ),
                  GestureDetector(
                    onTap: _isSendingOTP
                        ? null
                        : () {
                            HapticService.lightTap();
                            _otpController.clear();
                            _sendOTP();
                          },
                    child: Text(
                      'Resend OTP',
                      style: DesignTokens.support.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        decoration: TextDecoration.underline,
                        decorationColor: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
      );

  Widget _trustCard() => Container(
        padding: const EdgeInsets.all(DesignTokens.spacingLg),
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.16),
          borderRadius: BorderRadius.circular(DesignTokens.radiusSm),
          border: Border.all(color: Colors.white.withOpacity(0.1)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Pulsing status dot
                AnimatedBuilder(
                  animation: _pulseAnim,
                  builder: (_, __) => Container(
                    width: 7,
                    height: 7,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppTheme.emeraldGreen
                          .withOpacity(0.4 + 0.6 * _pulseAnim.value),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.emeraldGreen
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
                  'Secure verification',
                  style: DesignTokens.support.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: DesignTokens.spacingXs + 2),
            Text(
              'Encrypted verification  •  Automatic OTP detection',
              style: DesignTokens.support.copyWith(
                color: Colors.white.withOpacity(0.52),
              ),
            ),
          ],
        ),
      );

  // ── Dispose ───────────────────────────────────────────────────
  @override
  void dispose() {
    _otpController.removeListener(_onOtpChanged);
    _otpController.dispose();
    _otpFocusNode.dispose();
    _staggerController.dispose();
    _pulseController.dispose();
    _countdownTimer?.cancel();
    super.dispose();
  }
}

// ─────────────────────────────────────────────────────────────────
// Pixel-level grain painter — deep emerald surface texture
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
