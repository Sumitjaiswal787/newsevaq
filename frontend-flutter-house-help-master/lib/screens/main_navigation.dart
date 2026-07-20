import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../widgets/floating_navigation.dart';
import 'home_screen.dart';
import 'history_screen.dart';
import 'profile_screen.dart';
import 'monitoring_dashboard_screen.dart';

import 'main_screen.dart';

/// MainNavigation - A PURE navigation shell that handles tab navigation.
///
/// This widget is NOT responsible for auth/location gating logic.
/// It should ONLY be used when the user is authenticated AND location is set.
///
/// All auth/location gating is handled by AuthWrapper which creates this widget
/// under the provider scope.
class MainNavigation extends StatelessWidget {
  final int initialIndex;

  const MainNavigation({super.key, this.initialIndex = 0});

  @override
  Widget build(BuildContext context) {
    return MainScreen(initialIndex: initialIndex);
  }
}
