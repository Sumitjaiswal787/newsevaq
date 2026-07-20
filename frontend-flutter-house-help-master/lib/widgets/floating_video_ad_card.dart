import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import '../services/api_service.dart';
import '../theme.dart';
import '../utils/api.dart';

/// Floating Video Ad Card widget.
/// Fetches active ad from backend and plays in a 20px rounded floating overlay.
/// If no ad is configured, it falls back to a clean kitchen-themed mock video url.
class FloatingVideoAdCard extends StatefulWidget {
  final ApiService apiService;
  final VoidCallback onClose;

  const FloatingVideoAdCard({
    Key? key,
    required this.apiService,
    required this.onClose,
  }) : super(key: key);

  @override
  State<FloatingVideoAdCard> createState() => _FloatingVideoAdCardState();
}

class _FloatingVideoAdCardState extends State<FloatingVideoAdCard> {
  VideoPlayerController? _controller;
  bool _isMuted = true;
  bool _isLoading = true;
  bool _hasError = false;
  bool _hasActiveAd = false;
  String? _videoUrl;
  String? _redirectUrl;
  String? _title;
  double _left = 24.0;
  double _top = 0.0;
  bool _positionInitialized = false;

  @override
  void initState() {
    super.initState();
    _fetchAndInitializeAd();
  }

  Future<void> _fetchAndInitializeAd() async {
    try {
      final response = await widget.apiService.get('advertisements/active');
      if (response != null &&
          response['status'] == 'success' &&
          response['data'] != null) {
        final adData = response['data'];
        _videoUrl = adData['videoUrl'];
        _redirectUrl = adData['redirectUrl'];
        _title = adData['title'];
        _hasActiveAd = true;
      }
    } catch (e) {
      debugPrint('🔍 DEBUG: Error fetching advertisement: $e');
    }

    if (!_hasActiveAd) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
      return;
    }

    if (!mounted) return;

    try {
      String targetUrl = _videoUrl!;
      if (targetUrl.startsWith('/')) {
        final uriBase = Uri.parse(ApiConfig.baseUrl);
        final origin = '${uriBase.scheme}://${uriBase.host}:${uriBase.port}';
        targetUrl = '$origin$targetUrl';
      } else if (targetUrl.contains('localhost:3000') || targetUrl.contains('127.0.0.1:3000')) {
        final uriBase = Uri.parse(ApiConfig.baseUrl);
        final origin = '${uriBase.scheme}://${uriBase.host}:${uriBase.port}';
        targetUrl = targetUrl
            .replaceAll('http://localhost:3000', origin)
            .replaceAll('http://127.0.0.1:3000', origin);
      }
      debugPrint('🎬 AD CARD: Playing video from resolved URL: $targetUrl');
      final uri = Uri.parse(targetUrl);
      if (targetUrl.startsWith('http')) {
        _controller = VideoPlayerController.networkUrl(uri);
      } else {
        _controller = VideoPlayerController.asset(targetUrl);
      }

      await _controller!.initialize();
      await _controller!.setLooping(true);
      await _controller!.setVolume(0.0); // Muted by default for auto-play compliance
      await _controller!.play();

      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    } catch (e) {
      debugPrint('🔍 DEBUG: Error initializing video player: $e');
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
        });
      }
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  void _toggleMute() {
    if (_controller == null) return;
    setState(() {
      _isMuted = !_isMuted;
      _controller!.setVolume(_isMuted ? 0.0 : 1.0);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_hasActiveAd) {
      return const SizedBox.shrink();
    }

    if (!_positionInitialized) {
      final screenSize = MediaQuery.of(context).size;
      _left = 24.0;
      _top = screenSize.height - 165.0 - 24.0 - MediaQuery.of(context).padding.bottom;
      _positionInitialized = true;
    }

    // 3:4 Vertical aspect ratio for standard ad format
    const double cardWidth = 121.0;
    const double cardHeight = 165.0;

    return Positioned(
      left: _left,
      top: _top,
      child: GestureDetector(
        onPanUpdate: (details) {
          setState(() {
            _left += details.delta.dx;
            _top += details.delta.dy;
          });
        },
        child: Container(
      width: cardWidth,
      height: cardHeight,
      decoration: BoxDecoration(
        color: AppTheme.charcoalBlack,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: Colors.white.withOpacity(0.15),
          width: 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Stack(
          children: [
            // Video / Loader / Error state
            Positioned.fill(
              child: _buildVideoContent(),
            ),

            // Top-right close button
            Positioned(
              top: 10,
              right: 10,
              child: GestureDetector(
                onTap: widget.onClose,
                child: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: const BoxDecoration(
                    color: Colors.black45,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.close_rounded,
                    color: Colors.white,
                    size: 18,
                  ),
                ),
              ),
            ),

            // Bottom-left mute button
            if (_controller != null && _controller!.value.isInitialized)
              Positioned(
                bottom: 10,
                left: 10,
                child: GestureDetector(
                  onTap: _toggleMute,
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: const BoxDecoration(
                      color: Colors.black45,
                      shape: BoxShape.circle,
                  ),
                    child: Icon(
                      _isMuted
                          ? Icons.volume_off_rounded
                          : Icons.volume_up_rounded,
                      color: Colors.white,
                      size: 18,
                    ),
                  ),
                ),
              ),

            // Brand / Title overlay in center (if loading or paused)
            if (_title != null && _title!.isNotEmpty && _isLoading)
              Center(
                child: Text(
                  _title!,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
          ],
        ),
      ),
    ),
   ),
  );
}

  Widget _buildVideoContent() {
    if (_isLoading) {
      return Container(
        color: AppTheme.emeraldGreen,
        child: const Center(
          child: CircularProgressIndicator(
            color: Colors.white,
            strokeWidth: 2,
          ),
        ),
      );
    }

    if (_hasError || _controller == null || !_controller!.value.isInitialized) {
      // Fallback beautiful poster if video player fails
      return Container(
        color: AppTheme.emeraldGreen,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.play_circle_outline_rounded,
              color: Colors.white,
              size: 40,
            ),
            const SizedBox(height: 8),
            Text(
              _title ?? 'SevaQ Ads',
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 16,
              ),
            ),
          ],
        ),
      );
    }

    // Video aspect ratio fit inside the container
    return SizedBox.expand(
      child: FittedBox(
        fit: BoxFit.cover,
        clipBehavior: Clip.hardEdge,
        child: SizedBox(
          width: _controller!.value.size.width,
          height: _controller!.value.size.height,
          child: VideoPlayer(_controller!),
        ),
      ),
    );
  }
}
