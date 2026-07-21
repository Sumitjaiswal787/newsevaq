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

## 4. Subscription Slot Locking & Worker Scheduling Engine
- **Shift Definitions**:
  - Morning Shift: `05:00 AM - 12:00 PM`
  - Evening Shift: `04:00 PM - 09:00 PM`
- **Subscription Types & Worker Consistency**:
  - `Breakfast`: Booking window `05:00 AM - 10:00 AM`. Reserve one worker for Morning shift.
  - `Lunch`: Booking window `10:00 AM - 12:00 PM`. Reserve one worker for Morning shift.
  - `Breakfast + Lunch`: Allowed window `05:00 AM - 12:00 PM`. Reserve entire Morning commitment. Same worker MUST complete both services.
  - `Dinner`: Booking window `04:00 PM - 09:00 PM`. Reserve one worker for Evening shift.
  - `Lunch + Dinner`: Requires 1 Morning booking AND 1 Evening booking. The SAME worker MUST be assigned for both. Do NOT split bookings; if no single worker can perform both, return "No Worker Available".
- **Slot Locking & Overlap Validation**:
  - Shift locking occurs immediately upon subscription confirmation.
  - Overlap formula: `existing.start < new.end AND existing.end > new.start`.
- **7-Tier Worker Ranking Priority Order**:
  1. Available (No leave, break, or schedule lock)
  2. No time overlap
  3. No subscription shift conflict
  4. Nearest location (measured from previous booking end location to current customer location via Haversine / Maps)
  5. Lowest travel time
  6. Least bookings today (workload balancing)
  7. Highest rating / longest idle time
- **Slot Disabling & Double-Check**:
  - Dynamically count available candidate workers per UI slot. Disable and grey out UI slots with 0 candidate workers.
  - Perform double-check before final confirmation to prevent race conditions.

