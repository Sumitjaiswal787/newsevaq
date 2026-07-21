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

## 4. Time-Based Capacity Locking & Worker Scheduling Engine
- **Shift Definitions**:
  - Morning Shift: `05:00 AM - 12:00 PM`
  - Evening Shift: `04:00 PM - 09:00 PM`
- **Time-Based Capacity Locking (No Full-Shift Blocking)**:
  - Workers are reserved **ONLY** for: `serviceDuration + travelBuffer + cleaningBuffer`.
  - Immediately after `bookingStart + serviceDuration + travelBuffer + cleaningBuffer`, the worker becomes available again for remaining shift bookings.
- **Subscription Types & Worker Consistency**:
  - `Breakfast`: Window `05:00 AM - 10:00 AM`. Lock precise booking window + buffers.
  - `Lunch`: Window `10:00 AM - 12:00 PM`. Lock precise booking window + buffers.
  - `Breakfast + Lunch`: Creates 2 bookings (Morning window). **SAME worker MUST be assigned for both**. Worker remains available between bookings for nearby jobs.
  - `Dinner`: Window `04:00 PM - 09:00 PM`. Lock precise booking window + buffers.
  - `Lunch + Dinner`: Requires 1 Morning & 1 Evening booking. **SAME worker MUST be assigned for both**. If no single worker satisfies both, return "No Worker Available" (Never split).
- **Travel Feasibility & Overlap Rules**:
  - Canonical Overlap Formula: `existing.start < new.end AND existing.end > new.start`.
  - Travel Feasibility: Verify `previousBookingEnd + travelTime <= newBookingStart`.
- **8-Tier Worker Ranking Priority Order**:
  1. Available Worker (No leave, break, or schedule lock)
  2. No Time Overlap
  3. Travel Feasible
  4. Nearest Previous Booking Location (Haversine / Route distance)
  5. Shortest Travel Time
  6. Least Workload Today (Dynamic capacity balance)
  7. Highest Rating
  8. Longest Idle Time
- **Dynamic Slot Disabling & Pre-Confirmation Check**:
  - Calculate real-time candidate count per slot. Grey out and disable slots with 0 candidate workers.
  - Execute atomic pre-confirmation validation right before final checkout to prevent race conditions.


