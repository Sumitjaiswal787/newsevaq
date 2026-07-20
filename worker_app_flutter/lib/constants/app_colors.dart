import 'package:flutter/material.dart';

/// Semantic color tokens for consistent theming across the app
class AppColors {
  AppColors._();

  // ==================== PRIMARY COLORS ====================

  /// Primary brand color - Green
  static const Color primary = Color(0xFF2A655A);

  /// Darker variant for pressed states, app bar
  static const Color primaryDark = Color(0xFF18554B);

  /// Lighter variant for backgrounds, hover states
  static const Color primaryLight = Color(0xFFEAF4F1);

  /// Surface tint for primary elements
  static const Color primarySurface = Color(0xFFEAF4F1);

  // ==================== ACCENT COLORS ====================

  /// Teal accent for highlights, links
  static const Color accent = Color(0xFF2A655A);

  /// Surface tint for accent elements
  static const Color accentSurface = Color(0xFFEAF4F1);

  // ==================== STATUS COLORS ====================

  // Success
  static const Color success = Color(0xFF2E8B57);
  static const Color successSurface = Color(0xFFEAF4F1);

  // Warning
  static const Color warning = Color(0xFFD98C00);
  static const Color warningSurface = Color(0xFFFFF3E0);

  // Error
  static const Color error = Color(0xFFD64545);
  static const Color errorSurface = Color(0xFFFFEBEE);

  // Info
  static const Color info = Color(0xFF2A655A);
  static const Color infoSurface = Color(0xFFEAF4F1);

  // Pending (orange)
  static const Color pending = Color(0xFFD98C00);
  static const Color pendingSurface = Color(0xFFFFF3E0);

  // In Progress (purple -> green)
  static const Color inProgress = Color(0xFF2E8B57);
  static const Color inProgressSurface = Color(0xFFEAF4F1);

  // Confirmed (blue -> emerald)
  static const Color confirmed = Color(0xFF2A655A);
  static const Color confirmedSurface = Color(0xFFEAF4F1);

  // Completed (green)
  static const Color completed = Color(0xFF2E8B57);
  static const Color completedSurface = Color(0xFFEAF4F1);

  // Cancelled (red)
  static const Color cancelled = Color(0xFFD64545);
  static const Color cancelledSurface = Color(0xFFFFEBEE);

  // Rejected (red)
  static const Color rejected = Color(0xFFD64545);
  static const Color rejectedSurface = Color(0xFFFFEBEE);

  // ==================== NEUTRAL COLORS ====================

  // Backgrounds
  static const Color background = Color(0xFFF7F8F7);
  static const Color surface = Colors.white;
  static const Color surfaceVariant = Color(0xFFE6E8E7);
  
  // Borders
  static const Color border = Color(0xFFE6E8E7);
  static const Color divider = Color(0xFFE6E8E7);

  // Text
  static const Color textPrimary = Color(0xFF111111);
  static const Color textSecondary = Color(0xFF5F6361);
  static const Color textDisabled = Color(0xFFBDBDBD);
  static const Color textHint = Color(0xFF8A8F8D);
  static const Color textInverse = Colors.white;

  // Shadows
  static const Color shadowLight = Color(0x0F000000);

  // ==================== ICONS ====================
  
  static const Color iconPrimary = Color(0xFF111111);
  static const Color iconSecondary = Color(0xFF5F6361);
  static const Color iconInverse = Colors.white;

  // ==================== UTILITY METHODS ====================

  /// Get color with opacity
  static Color withOpacity(Color color, double opacity) {
    return color.withOpacity(opacity);
  }

  /// Get color based on booking status
  static Color getStatusColor(String status) {
    switch (status.toUpperCase()) {
      case 'PENDING':
      case 'REQUESTED':
        return pending;
      case 'CONFIRMED':
      case 'ACCEPTED':
        return confirmed;
      case 'IN_PROGRESS':
        return inProgress;
      case 'COMPLETED':
        return completed;
      case 'CANCELLED':
      case 'REJECTED':
        return cancelled;
      default:
        return textSecondary;
    }
  }

  /// Get surface color based on booking status
  static Color getStatusSurfaceColor(String status) {
    switch (status.toUpperCase()) {
      case 'PENDING':
      case 'REQUESTED':
        return pendingSurface;
      case 'CONFIRMED':
        return confirmedSurface;
      case 'IN_PROGRESS':
      case 'ACCEPTED':
        return inProgressSurface;
      case 'COMPLETED':
        return completedSurface;
      case 'CANCELLED':
      case 'REJECTED':
        return cancelledSurface;
      default:
        return surfaceVariant;
    }
  }
}
