# Sevaq Workspace Rules & Guidelines

## 1. Documentation Integrity
- **Changelog Maintenance**: Any edits, redesigns, feature additions, or bug fixes made to the codebase (frontend or backend) MUST be documented in the [CHANGELOG.md](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/CHANGELOG.md) in the workspace root. Keep listings categorized under standard headers (Added, Changed, Fixed, Removed).
- Preserve all existing code comments, developer notes, and docstrings unless explicitly instructed otherwise by the user.

## 2. Design System Alignment
- Avoid using hardcoded raw colors (such as `#2A655A` or generic purple values). Always import and use standard tokens from `AppTheme` (`theme.dart`):
  - Primary / Dark accents: `AppTheme.charcoalBlack`, `AppTheme.emeraldGreen`
  - Container fills / selections: `AppTheme.softGreen`, `AppTheme.primaryContainer`, `AppTheme.fogWhite`
  - Borders: `AppTheme.stoneGray`
- Align all layouts, paddings, and margins to the **8px grid system** (e.g. 8px, 16px, 24px, 32px, 48px).
- Icon usage: Always prefer Material outline icons (`Icons.*_outlined` or `Icons.*_rounded`) instead of emoji characters (`☀️`, `🌤`, `🌙`, etc.) for UI components like weather and greetings.
- Card widgets: Use consistent corner rounding of **16px** or **20px** with thin borders (`width: 1.0`) and subtle shadows (`blurRadius: 8`).
- Buttons: High-contrast call-to-action buttons should be **52px** tall with **16px** rounded corners.

## 3. API & Backend Communication
- When calling payment verification or confirmation endpoints for custom subscriptions (where `serviceProfileId` is `null` or `0`), ensure `customPrice` is included in the request body to prevent database schema validation failures.
- Always use `adb reverse tcp:3000 tcp:3000` to forward port 3000 when running/testing on physical Android devices over USB debugging.
