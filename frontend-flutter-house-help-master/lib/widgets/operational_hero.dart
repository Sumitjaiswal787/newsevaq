import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:math' as math;
import '../theme.dart';
import '../core/animation/haptic_service.dart';
import '../core/theme/dark_theme.dart';

// ─── Dynamic Hero Section ──────────────────────────────────────────────────
// Auto-rotating message carousel, breathing ambient orbs, shimmer CTA.
// All colours are Sevaq design-system tokens from AppTheme.
// ──────────────────────────────────────────────────────────────────────────

class OperationalHero extends StatefulWidget {
  final VoidCallback? onRequestSupport;

  const OperationalHero({Key? key, this.onRequestSupport}) : super(key: key);

  @override
  State<OperationalHero> createState() => _OperationalHeroState();
}

class _OperationalHeroState extends State<OperationalHero>
    with TickerProviderStateMixin {

  // ── Carousel data ──────────────────────────────────────────────────────
  static const _headlines = [
    'Managed support\nfor your home.',
    'Verified helpers.\nOn-time, every time.',
    'Satisfaction guaranteed\nor re-service free.',
  ];

  static const _subheadlines = [
    'Consistent. Reliable. Seamless.',
    'Background-checked & system-matched.',
    'We stand behind every visit.',
  ];

  int _currentIndex = 0;

  // ── Controllers ────────────────────────────────────────────────────────
  late AnimationController _carouselCtrl;   // auto-advance ticker
  late AnimationController _fadeCtrl;       // text cross-fade
  late AnimationController _orbCtrl;        // slow-breathing ambient orbs
  late AnimationController _gradientCtrl;   // moving gradient sweep
  late AnimationController _shimmerCtrl;    // CTA shimmer sweep
  late AnimationController _entranceCtrl;  // staggered entrance on mount

  // ── Animations ─────────────────────────────────────────────────────────
  late Animation<double> _fadeIn;
  late Animation<double> _fadeOut;
  late Animation<double> _orb1Anim;
  late Animation<double> _orb2Anim;
  late Animation<double> _gradientAnim;
  late Animation<double> _shimmerAnim;
  late Animation<double> _entranceFade;
  late Animation<double> _entranceSlide;

  // ── Shimmer sweep on CTA ───────────────────────────────────────────────
  bool _isCarouselFadingOut = false;

  @override
  void initState() {
    super.initState();

    // ─── Entrance ────────────────────────────────────────────────────────
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

    // ─── Carousel fade ────────────────────────────────────────────────────
    _fadeCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
      value: 1.0,
    );
    _fadeIn = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeCtrl, curve: Curves.easeIn),
    );
    _fadeOut = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(parent: _fadeCtrl, curve: Curves.easeOut),
    );

    // ─── Carousel auto-advance ticker ─────────────────────────────────────
    _carouselCtrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10), // Calmer: 10 seconds interval
    );
    _carouselCtrl.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _advanceCarousel();
      }
    });
    _carouselCtrl.forward();

    // ─── Ambient orbs ────────────────────────────────────────────────────
    _orbCtrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 30), // Calmer: extremely slow 30s cycle
    )..repeat(reverse: true);
    _orb1Anim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _orbCtrl, curve: Curves.easeInOutSine),
    );
    _orb2Anim = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(parent: _orbCtrl, curve: Curves.easeInOutSine),
    );

    // ─── Gradient sweep ───────────────────────────────────────────────────
    _gradientCtrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 40), // Calmer: static-like 40s cycle
    )..repeat(reverse: true);
    _gradientAnim = Tween<double>(begin: 0.0, end: 0.0).animate(
      CurvedAnimation(parent: _gradientCtrl, curve: Curves.easeInOut),
    );

    // ─── Shimmer sweep ───────────────────────────────────────────────────
    _shimmerCtrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 15), // Calmer: sweeps only once every 15s
    )..repeat();
    _shimmerAnim = Tween<double>(begin: -2.5, end: 3.5).animate(
      CurvedAnimation(parent: _shimmerCtrl, curve: Curves.easeInOut),
    );
  }

  Future<void> _advanceCarousel() async {
    if (!mounted) return;
    setState(() => _isCarouselFadingOut = true);
    await _fadeCtrl.animateTo(0.0, duration: const Duration(milliseconds: 350));
    if (!mounted) return;
    setState(() {
      _currentIndex = (_currentIndex + 1) % _headlines.length;
      _isCarouselFadingOut = false;
    });
    await _fadeCtrl.animateTo(1.0, duration: const Duration(milliseconds: 350));
    if (!mounted) return;
    _carouselCtrl.forward(from: 0.0);
  }

  @override
  void dispose() {
    _carouselCtrl.dispose();
    _fadeCtrl.dispose();
    _orbCtrl.dispose();
    _gradientCtrl.dispose();
    _shimmerCtrl.dispose();
    _entranceCtrl.dispose();
    super.dispose();
  }

  // ── Greeting ───────────────────────────────────────────────────────────
  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  IconData get _greetingIconData {
    final hour = DateTime.now().hour;
    if (hour < 12) return Icons.wb_sunny_outlined;
    if (hour < 17) return Icons.cloud_queue_outlined;
    return Icons.nights_stay_outlined;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return AnimatedBuilder(
      animation: Listenable.merge([
        _gradientAnim,
        _orb1Anim,
        _orb2Anim,
        _entranceFade,
        _entranceSlide,
        _shimmerAnim,
        _fadeCtrl,
      ]),
      builder: (context, _) {
        return FadeTransition(
          opacity: _entranceFade,
          child: Transform.translate(
            offset: Offset(0, _entranceSlide.value),
            child: Container(
              decoration: BoxDecoration(
                gradient: isDark
                    ? DarkTheme.heroGradient
                    : LinearGradient(
                        colors: const [
                          Color(0xFF193F37), // darkest — top-left
                          Color(0xFF1F6B5F), // primary emerald
                          Color(0xFF215C52), // mid-tone
                        ],
                        begin: Alignment(
                          -0.6 + _gradientAnim.value,
                          -0.7,
                        ),
                        end: Alignment(
                          0.6 + _gradientAnim.value,
                          0.7,
                        ),
                      ),
                borderRadius: BorderRadius.circular(28),
                boxShadow: isDark
                    ? DarkTheme.cardShadow
                    : [
                        BoxShadow(
                          color: const Color(0xFF2A655A).withOpacity(0.28),
                          blurRadius: 32,
                          offset: const Offset(0, 12),
                        ),
                        BoxShadow(
                          color: Colors.black.withOpacity(0.08),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(28),
                child: Stack(
                  children: [
                    // ── Ambient orb 1 — top-left ───────────────────────
                    Positioned(
                      top: -40 + (_orb1Anim.value * 20),
                      left: -40,
                      child: Container(
                        width: 180,
                        height: 180,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: [
                              Colors.white.withOpacity(
                                  0.07 + (_orb1Anim.value * 0.04)),
                              Colors.transparent,
                            ],
                          ),
                        ),
                      ),
                    ),
                    // ── Ambient orb 2 — bottom-right ───────────────────
                    Positioned(
                      bottom: -30 + (_orb2Anim.value * 20),
                      right: -20,
                      child: Container(
                        width: 140,
                        height: 140,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: [
                              const Color(0xFF8FCFC4).withOpacity(
                                  0.10 + (_orb2Anim.value * 0.06)),
                              Colors.transparent,
                            ],
                          ),
                        ),
                      ),
                    ),
                    // ── Subtle noise overlay ─────────────────────────────
                    Positioned.fill(
                      child: Opacity(
                        opacity: 0.012,
                        child: CustomPaint(
                          painter: _DotGridPainter(),
                        ),
                      ),
                    ),
                    // ── Main content ─────────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.fromLTRB(22, 28, 22, 26),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // ── Greeting pill ────────────────────────────
                          _buildGreetingPill(),
                          const SizedBox(height: 20),
                          // ── Headline carousel ────────────────────────
                          _buildCarouselText(),
                          const SizedBox(height: 22),
                          // ── Carousel dots ────────────────────────────
                          _buildDots(),
                          const SizedBox(height: 20),
                          // ── WhatsApp CTA ──────────────────────────────
                          _buildShimmerCTA(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  // ── Greeting pill ─────────────────────────────────────────────────────
  Widget _buildGreetingPill() {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.14),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: Colors.white.withOpacity(0.18),
              width: 0.8,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                _greetingIconData,
                size: 13,
                color: Colors.white.withOpacity(0.90),
              ),
              const SizedBox(width: 6),
              Text(
                _greeting,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: Colors.white.withOpacity(0.90),
                  letterSpacing: 0.2,
                ),
              ),
            ],
          ),
        ),
        const Spacer(),
        // ── Live indicator ─────────────────────────────────────────────
        AnimatedBuilder(
          animation: _orbCtrl,
          builder: (_, __) => Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 7,
                height: 7,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color.lerp(
                    const Color(0xFF4FC99A),
                    const Color(0xFF7FFFCE),
                    _orb1Anim.value,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF4FC99A)
                          .withOpacity(0.5 + _orb1Anim.value * 0.3),
                      blurRadius: 6,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 5),
              Text(
                'Active',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Colors.white.withOpacity(0.80),
                  letterSpacing: 0.3,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ── Carousel headline ──────────────────────────────────────────────────
  Widget _buildCarouselText() {
    return AnimatedBuilder(
      animation: _fadeCtrl,
      builder: (_, __) {
        return Opacity(
          opacity: _fadeCtrl.value,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _headlines[_currentIndex],
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                  height: 1.20,
                  letterSpacing: -0.5,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Text(
                _subheadlines[_currentIndex],
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w400,
                  color: Colors.white.withOpacity(0.72),
                  height: 1.4,
                  letterSpacing: 0.1,
                ),
                maxLines: 1,
              ),
            ],
          ),
        );
      },
    );
  }

  // ── Dots indicator ────────────────────────────────────────────────────
  Widget _buildDots() {
    return Row(
      children: List.generate(
        _headlines.length,
        (i) => AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
          margin: const EdgeInsets.only(right: 6),
          width: i == _currentIndex ? 18 : 6,
          height: 5,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(3),
            color: i == _currentIndex
                ? Colors.white.withOpacity(0.90)
                : Colors.white.withOpacity(0.30),
          ),
        ),
      ),
    );
  }

  // ── Shimmer CTA ───────────────────────────────────────────────────────
  Widget _buildShimmerCTA() {
    return GestureDetector(
      onTap: () {
        HapticService.lightTap();
        widget.onRequestSupport?.call();
      },
      child: AnimatedBuilder(
        animation: _shimmerAnim,
        builder: (_, __) {
          return Container(
            height: 44,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(22),
              color: Colors.white.withOpacity(0.15),
              border: Border.all(
                color: Colors.white.withOpacity(0.25),
                width: 1.2,
              ),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(22),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // ── shimmer sweep ──────────────────────────────────
                  Positioned.fill(
                    child: Transform.translate(
                      offset: Offset(_shimmerAnim.value * 280, 0),
                      child: Container(
                        width: 80,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Colors.transparent,
                              Colors.white.withOpacity(0.10),
                              Colors.transparent,
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  // ── button content ─────────────────────────────────
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            // WhatsApp icon aligned to Sevaq Design System
                            Container(
                              width: 24,
                              height: 24,
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.12),
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.2),
                                  width: 1,
                                ),
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.chat_bubble_outline_rounded,
                                  size: 13,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              'Start managed support',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: Colors.white.withOpacity(0.94),
                                letterSpacing: 0.1,
                              ),
                            ),
                          ],
                        ),
                        Icon(
                          Icons.arrow_forward_ios_rounded,
                          size: 12,
                          color: Colors.white.withOpacity(0.70),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

// ── Dot-grid painter for organic texture ──────────────────────────────────
class _DotGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;

    const spacing = 18.0;
    for (double x = 0; x < size.width; x += spacing) {
      for (double y = 0; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), 0.8, paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
