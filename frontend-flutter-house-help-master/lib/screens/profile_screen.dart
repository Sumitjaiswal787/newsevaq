import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../theme.dart';
import '../providers/auth_provider.dart';
import '../providers/theme_provider.dart';
import 'edit_profile_screen.dart';
import 'history_screen.dart';
import 'addresses_screen.dart';
import 'policy_screen.dart';
import '../policies/terms_of_use.dart';
import '../policies/refund_policy.dart';
import '../policies/privacy_policy.dart';

/// Redesigned Profile Screen complying with the Sevaq Design System.
/// Includes clean list options, styled dark-mode toggle, and centered version footer.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AuthProvider>(context).user;

    return Scaffold(
      backgroundColor: AppTheme.fogWhite,
      appBar: AppBar(
        title: const Text(
          'Profile',
          style: TextStyle(
            color: AppTheme.charcoalBlack,
            fontWeight: FontWeight.w700,
            fontSize: 20,
          ),
        ),
        backgroundColor: AppTheme.fogWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.charcoalBlack),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── User Header Info ───────────────────────────────────────────
            Center(
              child: Column(
                children: [
                  Container(
                    width: 96,
                    height: 96,
                    decoration: BoxDecoration(
                      color: AppTheme.softGreen,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppTheme.emeraldGreen.withOpacity(0.3),
                        width: 2.0,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        user?.firstName?[0].toUpperCase() ?? "U",
                        style: const TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.emeraldGreen,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    '${user?.firstName ?? ''} ${user?.lastName ?? ''}',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.charcoalBlack,
                      letterSpacing: -0.3,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    user?.email ?? '',
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: AppTheme.secondaryText,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),

            // ── Menu List ──────────────────────────────────────────────────
            const Text(
              'Account Settings',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppTheme.emeraldGreen,
                letterSpacing: 0.5,
              ),
            ),
            const SizedBox(height: 16),

            _buildMenuItem(
              icon: Icons.history_outlined,
              title: 'Operations',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => HistoryScreen()),
                );
              },
            ),
            _buildMenuItem(
              icon: Icons.person_outline_rounded,
              title: 'Edit Profile',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => EditProfileScreen()),
                );
              },
            ),
            _buildMenuItem(
              icon: Icons.location_on_outlined,
              title: 'Manage Addresses',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => AddressesScreen()),
                );
              },
            ),

            Consumer<ThemeProvider>(
              builder: (context, themeProvider, _) {
                return Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: SwitchListTile(
                        secondary: Container(
                          width: 36,
                          height: 36,
                          decoration: const BoxDecoration(
                            color: AppTheme.fogWhite,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            themeProvider.isDarkMode
                                ? Icons.dark_mode_outlined
                                : Icons.light_mode_outlined,
                            color: AppTheme.secondaryText,
                            size: 18,
                          ),
                        ),
                        title: const Text(
                          'Dark Mode',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.charcoalBlack,
                          ),
                        ),
                        activeColor: AppTheme.emeraldGreen,
                        value: themeProvider.isDarkMode,
                        onChanged: (value) {
                          themeProvider.toggleTheme();
                        },
                      ),
                    ),
                    if (themeProvider.isDarkMode)
                      Container(
                        height: 72,
                        margin: const EdgeInsets.only(bottom: 12, left: 4, right: 4),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [Color(0xFF0F2621), Color(0xFF1B3D36)],
                          ),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: AppTheme.emeraldGreen.withOpacity(0.3),
                            width: 1.0,
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(
                              Icons.dark_mode,
                              color: Color(0xFF4FC99A),
                              size: 20,
                            ),
                            const SizedBox(width: 12),
                            Text(
                              'Premium dark theme active',
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.87),
                                fontSize: 12,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                  ],
                );
              },
            ),

            const SizedBox(height: 24),
            const Text(
              'Security & Legal',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppTheme.emeraldGreen,
                letterSpacing: 0.5,
              ),
            ),
            const SizedBox(height: 16),

            _buildMenuItem(
              icon: Icons.description_outlined,
              title: 'Terms of Use',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => PolicyScreen(
                      title: TermsOfUse.title,
                      content: TermsOfUse.content,
                    ),
                  ),
                );
              },
            ),
            _buildMenuItem(
              icon: Icons.policy_outlined,
              title: 'Refund Policy',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => PolicyScreen(
                      title: RefundPolicy.title,
                      content: RefundPolicy.content,
                    ),
                  ),
                );
              },
            ),
            _buildMenuItem(
              icon: Icons.privacy_tip_outlined,
              title: 'Privacy Policy',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => PolicyScreen(
                      title: PrivacyPolicy.title,
                      content: PrivacyPolicy.content,
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 12),
            _buildMenuItem(
              icon: Icons.logout_rounded,
              title: 'Log Out',
              titleColor: AppTheme.errorColor,
              onTap: () async {
                Navigator.of(context).popUntil((route) => route.isFirst);
                await Provider.of<AuthProvider>(context, listen: false).logout();
              },
            ),

            // ── App version in footer ──────────────────────────────────────
            Center(
              child: Text(
                'Version 1.0.4 (Build 42)',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: AppTheme.secondaryText.withOpacity(0.85),
                  letterSpacing: 0.2,
                ),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  // ── MenuItem Helper Widget ───────────────────────────────────────────────
  Widget _buildMenuItem({
    required IconData icon,
    required String title,
    Color? titleColor,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.015),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          onTap: onTap,
          splashColor: AppTheme.softGreen,
          highlightColor: AppTheme.softGreen.withOpacity(0.5),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Row(
              children: [
                Container(
                  width: 36,
                  height: 36,
                  decoration: const BoxDecoration(
                    color: AppTheme.fogWhite,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    icon,
                    color: titleColor ?? AppTheme.secondaryText,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    title,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: titleColor ?? AppTheme.charcoalBlack,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Icon(
                  Icons.arrow_forward_ios_rounded,
                  color: titleColor?.withOpacity(0.7) ?? AppTheme.secondaryText,
                  size: 14,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
