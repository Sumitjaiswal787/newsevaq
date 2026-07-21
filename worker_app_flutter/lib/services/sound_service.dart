import 'dart:io';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
import 'package:vibration/vibration.dart';

class SoundService {
  static final SoundService _instance = SoundService._internal();
  factory SoundService() => _instance;
  SoundService._internal();

  final AudioPlayer _audioPlayer = AudioPlayer();

  // Sound asset paths - using actual file from flutter_assets
  static const String _newBookingSound =
      'alert-ascending-chime-betacut-1-00-02.mp3';
  static const String _alertSound = 'alert-ascending-chime-betacut-1-00-02.mp3';

  /// Initialize sound service
  Future<void> initialize() async {
    try {
      await _audioPlayer.setAudioContext(
        AudioContext(
          android: const AudioContextAndroid(
            isSpeakerphoneOn: true,
            stayAwake: true,
            contentType: AndroidContentType.sonification,
            usageType: AndroidUsageType.alarm,
            audioFocus: AndroidAudioFocus.gain,
          ),
          iOS: const AudioContextIOS(
            category: AVAudioSessionCategory.playback,
          ),
        ),
      );
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      await _audioPlayer.setVolume(1.0);

      if (kDebugMode) {
        print('Sound service initialized with Alarm stream');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error initializing sound service: $e');
      }
    }
  }

  /// Play new booking sound
  Future<void> playNewBookingSound() async {
    try {
      await _audioPlayer.setAudioContext(
        AudioContext(
          android: const AudioContextAndroid(
            isSpeakerphoneOn: true,
            stayAwake: true,
            contentType: AndroidContentType.sonification,
            usageType: AndroidUsageType.alarm,
            audioFocus: AndroidAudioFocus.gain,
          ),
        ),
      );
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      await _audioPlayer.setVolume(1.0);
      await _vibrate();
      await _playSound(_newBookingSound);

      if (kDebugMode) {
        print('Played new booking sound');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error playing new booking sound: $e');
      }
    }
  }

  /// Play alert sound
  Future<void> playAlertSound() async {
    try {
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      await _audioPlayer.setVolume(1.0);
      await _vibrate();
      await _playSound(_alertSound);
    } catch (e) {
      if (kDebugMode) {
        print('Error playing alert sound: $e');
      }
    }
  }

  /// Play notification with custom sound
  Future<void> playNotification(String? customSound) async {
    if (customSound != null && customSound.isNotEmpty) {
      try {
        await _audioPlayer.setReleaseMode(ReleaseMode.loop);
        await _audioPlayer.setVolume(1.0);
        await _audioPlayer.play(AssetSource(customSound));
      } catch (e) {
        await playNewBookingSound();
      }
    } else {
      await playNewBookingSound();
    }
  }

  /// Vibrate the device
  Future<void> _vibrate() async {
    try {
      final hasVibrator = await Vibration.hasVibrator() ?? false;
      if (hasVibrator) {
        await Vibration.vibrate(
          pattern: [0, 800, 200, 800, 200, 800],
          repeat: 0,
        );
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error vibrating: $e');
      }
    }
  }

  /// Play sound from asset or URL
  Future<void> _playSound(String assetPath) async {
    try {
      await _audioPlayer.play(
        UrlSource('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg'),
        volume: 1.0,
      );
    } catch (e) {
      try {
        await _audioPlayer.play(
          UrlSource('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'),
          volume: 1.0,
        );
      } catch (e2) {
        if (kDebugMode) {
          print('Sound playback failed: $e2');
        }
      }
    }
  }

  /// Stop any playing sound and vibration
  Future<void> stop() async {
    try {
      await _audioPlayer.stop();
      await Vibration.cancel();
    } catch (e) {
      if (kDebugMode) {
        print('Error stopping sound: $e');
      }
    }
  }

  /// Set volume (0.0 to 1.0)
  Future<void> setVolume(double volume) async {
    await _audioPlayer.setVolume(volume.clamp(0.0, 1.0));
  }

  /// Cleanup
  void dispose() {
    _audioPlayer.dispose();
  }
}
