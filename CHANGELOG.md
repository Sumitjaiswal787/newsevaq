# Changelog - Sevaq Customer App & Backend Refactoring

This file documents all design system alignments, UI restyling, API integrations, and system fixes implemented.

---

## [1.0.22] - 2026-07-23

### Changed
- **Database Restoration**: Temporarily exposed `seed-public` and `reset-workers-now` to restore production database, and subsequently reverted both endpoints to secure the environment.
- **Timezone-Aware Slots Query**: Adjusted date boundaries by subtracting 330 minutes (5.5 hours) in `SlotsService.findAvailableByDate` so that slot queries perfectly align with Asia/Kolkata (IST) calendar days instead of getting shifted on UTC production servers.
- **IST-Aligned Slot Generation**: Modified `createStandardTimeSlots` in `daily-slot-generation.scheduler.ts` to calculate base dates and slot cycles using Asia/Kolkata (IST) timezone offsets, ensuring slots between 05:00 AM and 10:00 AM IST are generated correctly even when the server runs on a UTC timezone.

## [1.0.21] - 2026-07-22

### Added
- **InvalidBookingDurationException**: Created custom exception to reject any booking with an invalid duration.
- **Architectural Validation Layer**: Enforced strict validation before saving bookings `bookingEnd = bookingStart + serviceDuration`.

### Fixed
- **Service Request Conversion Time Window Bug**: Fixed timeWindow parser in `BookingsService` so that exact AM/PM range windows (e.g. `05:30 AM - 06:30 AM`) are parsed correctly instead of falling through to a default 4-hour legacy morning slot.
- **Duration Validation Guard**: Integrated `BookingValidator.validateDuration` in `bookings.service.ts` and `subscriptions.service.ts` to block any invalid duration from ever hitting the database.

## [1.0.20] - 2026-07-22

### Fixed
- **ROOT CAUSE: 6-Hour Subscription Booking Duration Bug — Definitive Fix**
  - **Root Cause**: Flutter sends `customPlanData.serviceType = 'COOK'` (the `ServiceType` enum value from the backend). The backend `getMealPlanTimeWindows()` method in `SubscriptionsService` was checking `serviceType.toLowerCase() === 'cooking'` — which fails because `'COOK'.toLowerCase()` → `'cook'` ≠ `'cooking'`. Since `isCooking = false`, the meal plan slot detection was completely skipped and it fell through to the legacy duration fallback.
  - **Fix 1** (`subscriptions.service.ts` Line 770): Expanded `isCooking` check to match both `'cook'` and `'cooking'` (and their category equivalents). Added comprehensive logging to trace `serviceType`, `category`, `mealPlan`, and `isCooking` on every call.
  - **Fix 2** (`subscriptions.service.ts` Line 807): Added safety clamp in the legacy fallback: `durationHours` is now capped at `max 2` to prevent stale DB seed data (`service.duration` stored in minutes instead of hours) from producing 6-hour booking windows. Duration values > 12 are interpreted as minutes and converted.
  - **Fix 3**: Added fallback for unknown `mealPlan` values for cooking service — defaults to `05:30-06:30` Breakfast slot instead of falling through to the legacy path.

## [1.0.19] - 2026-07-22

### Fixed
- **Fix SQL Query Failure in `getUserActiveBooking`**: Replaced invalid column reference `request.startTime` in `ServiceRequestsService.getUserActiveBooking` QueryBuilder with valid `request.timeWindow` column, resolving PostgreSQL exception `column request.starttime does not exist`.

## [1.0.18] - 2026-07-22

### Fixed
- **Production Build Deployment**: Deployed updated NestJS backend container (v1.0.13) to Railway production environment containing subscription duration root cause fix, pre-save duration assertion guard, and foreign key purge ordering.

## [1.0.17] - 2026-07-22

### Fixed
- **Root Cause Resolution for 6-Hour Subscription Booking Bug**: Replaced hardcoded shift window strings (`06:00 AM - 12:00 PM` & `04:00 PM - 09:00 PM`) in `SubscriptionSchedulerService.createServiceRequest` with exact 60-minute service windows (`05:30 AM - 06:30 AM`, `11:00 AM - 12:00 PM`, `05:00 PM - 06:00 PM`). Added `BookingValidator.validateDuration` pre-save assertion guard to block shift window durations > 120 minutes from being saved into `booking.endTime`.

## [1.0.16] - 2026-07-22

### Fixed
- **Comprehensive Production Purge Update**: Added `subscriptions` and `worker_temporary_locks` table deletion to `/api/purge-all-bookings-now` endpoint to clear active subscription cards and prevent automated background re-generation of daily bookings.

## [1.0.15] - 2026-07-21

### Changed
- **Meal Plan Booking Generation Refactoring**: Updated `SubscriptionsService.getMealPlanTimeWindows` according to specific meal plan rules:
  - `BF` / `BF_LUNCH`: Generates 1 morning 60-minute booking (`05:30:00 - 06:30:00`).
  - `LUNCH`: Generates 1 afternoon 60-minute booking (`11:00:00 - 12:00:00`).
  - `DINNER`: Generates 1 evening 60-minute booking (`17:00:00 - 18:00:00`).
  - `LUNCH_DINNER`: Generates 2 60-minute bookings (`11:00 - 12:00` & `17:00 - 18:00`).
  - `FULL_DAY`: Generates 2 60-minute bookings (`05:30 - 06:30` Morning & `17:00 - 18:00` Evening).

## [1.0.14] - 2026-07-21

### Fixed
- **Subscription Booking Duration Calculation**: Refactored `SubscriptionsService.getMealPlanTimeWindows` to return actual service durations (Breakfast = 60 Min, Lunch = 60 Min, Dinner = 90 Min) instead of hardcoded 5-6 hour shift intervals. Non-cooking fallback durations are dynamically queried from the mapped `Service` entity database metadata.

## [1.0.13] - 2026-07-21

### Fixed
- **PostgreSQL Pessimistic Lock Outer Join Fix (PG Code 0A000)**: Decoupled relation loading from `pessimistic_write` lock queries in `SlotsService.bookSlotAtomic` and `BookingsService.assignWorker`. Resolved PostgreSQL outer join lock error by locking primary target entities (`Worker`, `Slot`) without relations and attaching relation instances post-lock.

## [1.0.12] - 2026-07-21

### Fixed
- **Customer Location Validation & Infinite Retry Prevention**: Fixed missing location bug in `OnDemandAssignmentScheduler`. Added `BookingValidator` class to validate location/coordinates before worker evaluation, added `WAITING_FOR_LOCATION` state to `BookingStatus` and `AssignmentState` to halt infinite 1-minute retry loops for incomplete customer profiles, and added automatic re-activation when customer updates profile address.

## [1.0.11] - 2026-07-21

### Added
- **Temporary Worker Soft-Locking System (Race Condition Protection)**: Implemented 90-second soft-reservation engine before payment to prevent double bookings. Locked workers are instantly excluded from availability calculations across active clients. Documented in [AGENTS.md](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/.agents/AGENTS.md).

## [1.0.10] - 2026-07-21

### Changed
- **Time-Based Capacity Locking Refactoring**: Replaced full-shift locking with granular time-based capacity locking (`serviceDuration + travelBuffer + cleaningBuffer`). Workers remain available for remaining shift slots. Updated 8-tier ranking engine with Travel Feasibility checks.

## [1.0.9] - 2026-07-21

### Added
- **Subscription Slot Locking & Worker Scheduling Engine Rule**: Documented immutable architectural workspace rules in [AGENTS.md](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/.agents/AGENTS.md) for Urban Company-grade shift reservations (Morning/Evening), 7-tier worker ranking, route distance optimization, and race condition protection.

## [1.0.8] - 2026-07-21

### Added
- **Railway Production Deployment**: Configured and deployed backend service to Railway (`https://newsevaq-production.up.railway.app/api`).
- **Pre-Bootstrap Database Schema Synchronization**: Added automatic pre-bootstrap schema synchronization on startup when `FORCE_SYNCHRONIZE=true` to automatically create all base PostgreSQL tables on empty production databases.

### Fixed
- **TypeScript Incremental Build Cache Bug**: Cleaned up pre-existing compilation outputs and added `rm -f *.tsbuildinfo` to root build scripts to prevent skipped compilation on Railway.
- **TypeORM Migrations startup crash**: Configured `migrationsRun: true` in `AppModule` with Node `path` module resolution.

## [1.0.7] - 2026-07-20

### Changed
- **Home Screen UI**: Hid the 'See operations' text button in the Active Operations section as requested.
- **Navigation**: Removed the bottom navigation bar (`FloatingNavigation` and standard `NavigationBar`) completely from `MainScreen`.
- **Professional Assigned Screen UI**: Removed the `BookingStatusTimeline` (booking status timeline) widget from `ProfessionalAssignedScreen`.
- **Booking Confirmation Screen UI**: Restored the name of the assigned professional, hid the price row under Service Details, and removed the `BookingStatusTimeline` (booking status timeline).

## [1.0.6] - 2026-07-17

### Fixed
- **CRITICAL: Worker Double-Booking Bug (Root Cause Fix)** — The actual assignment path is `assignment.worker.ts` → `findBestWorker()`, which had **zero booking overlap checks**. It only verified `slot.isBooked = false` via `findAvailableSlotFlexible`, allowing the same worker to be assigned to overlapping bookings. Fixed by:
  1. **`assignment.worker.ts → findBestWorker()`**: Added a batch query to load all active bookings for all candidate workers on the target date. Applied canonical interval overlap formula (`existStart < reqEnd && existEnd > reqStart`) **before** any slot check. Overlapping workers are now immediately rejected and the next best worker is selected.
  2. **`bookings.service.ts → findBestWorker()`**: Same fix applied to the secondary assignment path.
  3. **`bookings.service.ts → create()`**: Fixed overlap condition edge-cases in the final double-booking guard.
  4. **`slots.service.ts → findAvailableSlotsForWorkers()`**: Fixed missing `{ endTime }` parameter binding that caused the filter to silently fail.

### Added
- **High-Performance Scheduling Engine Redesign**:
  - Implemented dynamic collision detection logic using linear boundary inequality checks in `SchedulingEngine`.
  - Added spatial coordinate caching module in `TravelService` with support for OpenRouteService routing and fallbacks.
  - Implemented database schema DDL design for resource utilization, including structured tables for `workers`, `worker_shifts`, `bookings`, and spatial indexing setup.
  - Added dynamic time slot generation APIs and a Bootstrap 5 AJAX client interface.
  - Documented ranking metrics, travel buffers, and database indexing for high concurrency.
- **Meal-Plan Specific Subscription Slots**: Configured [SubscriptionSchedulerService](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/subscriptions/subscription-scheduler.service.ts) to allocate specific slots for cooking subscriptions based on custom meal plans:
  - Breakfast/Lunch/Breakfast+Lunch: Books a single slot between **6:00 AM and 12:00 PM**.
  - Dinner: Books a single slot after **4:00 PM** (4:00 PM - 9:00 PM).
  - Lunch+Dinner / All Meals (Full Day): Books **two separate slots** (one morning slot 6 AM - 12 PM, and one evening slot 4 PM - 9 PM) on the same worker.
- **26 Daily Working Days Subscriptions**: Configured subscription booking generator loops inside [subscriptions.service.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/subscriptions/subscriptions.service.ts) (both upfront bookings creation and renewal paths) to generate exactly **26 daily working days** of slots and automatically **skip all Sundays** (since Sunday is a subscription holiday).
- **Bootstrap Slot Generation**: Configured `DailySlotGenerationScheduler` to run slot generation on application bootstrap so that slots are immediately available on server startup.
- **One-Time Booking Dynamic Slots Filtering**: Configured customer app's [SchedulePricingScreen](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/frontend-flutter-house-help-master/lib/screens/schedule_pricing_screen.dart) to dynamically fetch active worker slot availabilities on date change, and cross-reference them to disable/grey out slots where no active workers are available for the selected service.
- **Past Time Slots Restriction**: Implemented a check inside the Customer App's [SchedulePricingScreen](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/frontend-flutter-house-help-master/lib/screens/schedule_pricing_screen.dart) to dynamically disable slot times that have already passed relative to the current local time when booking for the current day.
- **Service-Filtered Available Slots Endpoint**: Updated backend [findAvailableByDate](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/slots/slots.service.ts) query to filter available slots by `serviceId` dynamically, returning slots only for workers offering the requested service portfolio.
- **Admin Time Slots Dropdown Selection**: Replaced the free-form text input for slot times inside the Service modal in [ServicesPage.tsx](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/admin-web/src/pages/ServicesPage.tsx) with a structured `<select>` dropdown containing standard hourly/half-hourly time slots (e.g. `08:00 AM`, `09:30 AM`). This prevents manual typos (such as `8.00 AI` or missing colon/leading zeros) and ensures 100% accurate slot matching with the worker slots in the database.
- **Admin Bookings List Time Slot Column**: Added a dedicated "Time" column to the bookings data table in [BookingsPage.tsx](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/admin-web/src/pages/BookingsPage.tsx) to display the booked slot times directly in the bookings management list (e.g. `08:00 AM - 09:00 AM`), making it easy for the administrator to review scheduled slot windows without opening the details modal.
- **Service Slots Standardization**: Synchronized and updated the configured `slots` array in the database for all 9 services to match the exact 17 standard hourly time slots (`05:00 AM` to `09:00 PM`) generated for workers.
- **Assignment Screen Design System Alignment**: Fully redesigned the "Assigning a Professional" screen ([assignment_in_progress_screen.dart](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/frontend-flutter-house-help-master/lib/screens/assignment_in_progress_screen.dart)) to use `AppTheme` design tokens throughout — replacing all raw `Color()` hex values with `AppTheme.emeraldGreen`, `AppTheme.charcoalBlack`, `AppTheme.fogWhite`, `AppTheme.softGreen`, `AppTheme.stoneGray`, `AppTheme.secondaryText`, `AppTheme.warningColor`, and `AppTheme.cardShadow`. Applied 8px grid spacing, 16px card corner rounding, 52px tall CTA buttons, Material outline icons (`Icons.*_outlined`, `Icons.*_rounded`), and `Inter` typography.

### Fixed
- **Booking Display Time Formatting**: Fixed a bug on the assignment/service in-progress, completed, and adjustment screens where booking slots defaulted to generic hardcoded time windows (e.g. `Afternoon (12:00–17:00)`) instead of displaying the actual selected granular slot hours. Standardized time window text formatting to render exact booked start/end times (e.g. `05:00 PM–06:00 PM`).
- **Slot Time String Split Bug**: Fixed a bug where time slots with colons (such as `05:00 AM:0:true`) failed to parse in both the Customer App ([service.dart](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/frontend-flutter-house-help-master/lib/models/service.dart)) and the Admin Web Dashboard ([ServicesPage.tsx](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/admin-web/src/pages/ServicesPage.tsx)) because splitting on `:` produced 4 parts instead of 3. Standardized split logic to slice/join the time string dynamically, resolving rendering and slot availability lookup mismatches.
- **Purged Database Bookings**: Purged all entries from `booking`, `subscriptions`, `service_requests`, `payment`, and `review` tables and reset all slot statuses to free/available.
- **Slot Generation Window Limit**: Increased the slot generation window inside [daily-slot-generation.scheduler.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/slots/daily-slot-generation.scheduler.ts) from 7 days to **45 days** (in both daily and hourly generation loops) to fully cover the timeline of 26 daily working days subscriptions (which span up to 30 calendar days due to Sunday exclusions).
- **Bootstrap Order Dependency**: Injected `DailySlotGenerationScheduler` inside `BookingsService.onApplicationBootstrap` to execute slot generation *before* checking and locking slots for subscription bookings.

### Fixed
- **Granular Slot Matching & Parsing**: Fixed a bug where granular slot selections (like `08:00 AM`) defaulted to the legacy morning window, causing same-day fallbacks that silently booked alternative slots on the worker. Upgraded time window parsing inside [assignment.worker.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/service-requests/assignment.worker.ts) and [slots.service.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/slots/slots.service.ts) to parse exact slot hours/minutes and bypass alternative same-day fallbacks when granular times are chosen.
- **Slot IDs persistence**: Corrected backend confirm/checkout paths in [payments.service.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/payments/payments.service.ts) and [bookings.service.ts](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/bookings/bookings.service.ts) to select and copy `assignedSlotId` and `assignedWorkerId` to final booking tables upon payment.
- **Slot Locking on Assignment**: Integrated slot lookup and locking logic inside both [BookingsService.assignWorker](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/bookings/bookings.service.ts#L988-L1060) (for manual admin panel assignments) and [OnDemandAssignmentScheduler.assignWorkerForBooking](file:///c:/Users/sumitjaiswal/Desktop/sevaq_new/SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0/flutter-nest-househelp-master/src/subscriptions/on-demand-assignment.scheduler.ts#L394-L536) (for automated schedulers). The system now dynamically finds the exact matching free slot for the assigned worker and locks it to prevent any overlapping bookings.

## [1.0.5] - 2026-07-17

### Added
- **Worker Slots Dashboard**: Added a **View Slots** action button to the workers table in `WorkersPage.tsx`. It retrieves all generated slots and lists them grouped by date. Free slots display as **🟢 Free** (green) and booked slots display as **🔴 Booked** (red) with their corresponding time intervals.
- **Worker Details & History Panel**: Integrated a **View Details** action button to open a profile dialog in `WorkersPage.tsx`. It displays names, phone, email, registration date, rating/review statistics, geographic coordinates, service radius, and bio.
- **Active Booking History Log**: Renders a scrollable table at the bottom of the Worker Details modal. It maps active customer names, telephone numbers, service names, payment amounts, and order statuses dynamically from `/admin/bookings`.
- **Eager-Loaded Worker Services Column**: Added `Services` table column in the main workers list dashboard page. Modified `getAllWorkers` in `admin.service.ts` to leftJoin and select `worker.services` so that worker-offered service portfolios are fully populated and visible as distinct labels inside the admin page.
- **Professional Details Editor Modal**: Added an **Edit** button next to each worker in `WorkersPage.tsx` that pops open a configuration modal. Enables the administrator to update worker description bios, manual rating overrides, service coverage radiuses, active account statuses, and check or uncheck available services portfolios dynamically. Added support in backend `admin.service.ts` to save many-to-many services updates.

### Fixed
- **Slot Duplication Prevention**: Resolved an issue where running slot generation multiple times for a worker on the same date created duplicate time slots for identical hours. Modified `createSlotsForWorker` in `slots.service.ts` to check if a slot with the exact same startTime already exists for that worker and date before saving new rows.
- **Database Cleansing**: Run database deduplication query that successfully detected and removed **2,533 duplicate slot rows** from the active PostgreSQL database.

## [1.0.4] - 2026-07-16

### Added
- **Dynamic Weather Indicator**: Integrated a live weather pill (temperature + matching weather outline icon) in the upper-left corner of the header (`lib/widgets/sevaq_header.dart`). The weather status changes dynamically based on the current local system hour (Morning twilight, Clear midday, Cloudy afternoon, Night, etc.).
- **App Version Footer**: Added `Version 1.0.4 (Build 42)` centered at the bottom of the Profile page (`lib/screens/profile_screen.dart`).
- **Floating Video Ad Card**: Added a vertical floating video ad card inside `lib/widgets/floating_video_ad_card.dart` and `lib/screens/trust_first_home_screen.dart`. Re-styled to a size of **121x165** (increased by 10% from 110x150) positioned on the **left side** of the Home screen overlay, with a **10 seconds delay** timer and single-use **ScrollListener** trigger. Integrated a **Draggable Gesture System** using `onPanUpdate` to make the floating card completely movable anywhere on the screen by dragging. Configured with a dynamic **Localhost URL Resolver** that replaces `localhost` or relative paths in video URLs with the active scheme, host, and port of the target backend API (`ApiConfig.baseUrl`) so uploaded videos play correctly on physical devices. Added `android:usesCleartextTraffic="true"` to `AndroidManifest.xml` to allow native video player packages to load clean HTTP streams from local servers. Returns `SizedBox.shrink()` when ads are globally turned off.
- **Advertisements Backend Module** (`src/advertisements/`): Added a complete advertisements module to the NestJS backend including an `Advertisement` entity, service, controller with active ad selection (`GET /api/advertisements/active`), and admin CRUD endpoints to let administrators easily manage ads. Implemented local static folder serving (`/uploads`), video file upload router (`POST /api/advertisements/upload`), and global configuration toggle saving (`GET/POST /api/advertisements/settings`).
- **Ads Manager Admin Interface** (`admin-web/src/pages/AdvertisementsPage.tsx`): Developed a comprehensive administrative interface panel in the admin web app. Includes full list of advertisements, quick state toggling (activate/deactivate), direct creation and update forms (Title, Video URL, Redirect URL), deletion options, and inline video previews. Added a **Video File Uploader** button to upload local video files directly, and a premium **Master ON/OFF Toggle Switch** at the top of the panel to turn the floating ad card on/off globally. Added route entry in `App.tsx` and sidebar link inside `Sidebar.tsx`.
- **Booking History Renamed**: Renamed the 'Booking History' / 'Your services' page title and profile menu option to **'Operations'** across `profile_screen.dart` and `history_screen.dart` to align with the backend naming conventions.

### Changed
- **Visual Calmness in Hero Section** (`lib/widgets/operational_hero.dart`):
  - Slowed down carousel auto-advance rotation to **10 seconds** (from 3 seconds) for a peaceful pacing.
  - Made the background gradient animation static to ensure visual stability.
  - Slowed down the ambient background orbs' breathing cycle to **30 seconds** (virtually static).
  - Reduced the shimmer CTA button sweep to a subtle loop running once every **15 seconds**.
- **Themed Location Picker Dialog** (`lib/widgets/location_picker_dialog.dart`):
  - Replaced raw styles with design system tokens: `AppTheme.fogWhite` background, `AppTheme.charcoalBlack` typography, and `AppTheme.emeraldGreen`/`AppTheme.softGreen` selection badge indicators.
  - Organized list item cards with **16px** corners, thin borders, and subtle shadow profiles.
  - Cleaned up repetitive address lines (e.g. city/state duplications) inside location list tiles.
- **Redesigned Service Engagement Screen** (`lib/screens/service_engagement_type_screen.dart`):
  - Replaced hardcoded raw green colors with standard design system tokens: `AppTheme.emeraldGreen`, `AppTheme.fogWhite`, `AppTheme.charcoalBlack`, and `AppTheme.softGreen`.
  - Refactored the *SevaQ Recommendation* indicator into a proper radio-dot style (outer ring + filled inner dot).
  - Cleaned up the checkpoints inside the "Why households choose managed support" container.
- **Redesigned Subscription Pricing/Configurator Screen** (`lib/screens/subscription_pricing_screen.dart`):
  - Created a 2x2 grid for **Cleaning Coverage** cards (Daily, Alternate, Weekly, Deep) and a 3-column card grid for **Apartment Size** selection (1 BHK, 2 BHK, 3+ BHK).
  - Organized selection cards with a clean checkmark badge in the top-right corner.
  - Implemented a dynamic sticky bottom CTA button that shows selection details: `Review Plan • 3+ BHK • Daily Cleaning`.
  - Matched the plan summary card to display calculated price estimations (e.g. ₹3,999/month for 3+ BHK Daily Cleaning) in design system colors.
- **Icon Matching in Header & Hero**:
  - Swapped weather emojis next to the temperature text with clean outline Material Icons (`Icons.wb_sunny_outlined`, `Icons.cloud_queue_outlined`, `Icons.nights_stay_outlined`, etc.).
  - Replaced greeting emojis (`☀️`, `🌤`, `🌙`) in the operational hero greeting pill with outline Material Icons.
  - Swapped out the solid green WhatsApp square box on the hero CTA for a clean, semi-transparent circle containing `Icons.chat_bubble_outline_rounded`.
- **Redesigned Profile Screen** (`lib/screens/profile_screen.dart`):
  - Swapped out all generic, blocky ListTiles for custom rounded item cards (`_buildMenuItem`) with **16px** rounded corners, circular leading icon badges, and thin chevrons.
  - Aligned all spacing, paddings, and margins to the 8px grid system (multiples of 8px).
- **Redesigned Booking History Screen** (`lib/screens/history_screen.dart`):
  - Eliminated all raw purple styling. Replaced all background, icon, card, and indicator colors with `AppTheme.emeraldGreen`, `AppTheme.softGreen`, `AppTheme.charcoalBlack`, and `AppTheme.stoneGray`.
  - Styled list item cards with **20px** corners, thin borders, and subtle shadow profiles.

### Fixed
- **Custom Plan Payment Verification Crash**: Fixed the `Service profile not found` (400) exception triggered during custom plan checkouts. The frontend API service (`createSubscriptionAfterPayment` in `lib/services/api_service.dart`) was updated to automatically attach the `customPrice` parameter to the payload when `serviceProfileId` is `null` (which custom plans are), preventing backend validation errors and transaction rollbacks.
- **Admin Panel Services Management Validation Errors**: Resolved the `400 Bad Request Exception` when creating or updating services. Whitelisted the new fields (`duration`, `slots`, `isAvailable`, `isFastBooking`) in the `AdminCreateServiceDto` and `AdminUpdateServiceDto` controller validation files, and relaxed constraints on `name` (removed matches regex), `description` (optional), and `imageUrl` (removed url check).
- **Vite Frontend TypeScript Compilation Error**: Fixed a TypeScript compilation block in `useBookingNotifications.ts` by replacing the `NodeJS.Timeout` namespace type with `any` for the web environment, enabling clean frontend builds.
- **One-Time Services Dynamic Settings Mapping**: Updated the customer mobile application's booking flow (`service_engagement_type_screen.dart` and `trust_first_home_screen.dart`) to pass and map the live, admin-configured `Service` object properties (such as custom `duration` and custom time `slots`) from the API instead of falling back to hardcoded static frontend configurations.
- **Service Slots Propagation Through Clarification Flow**: Fixed a bug where time slots edited in the admin panel did not reflect in the customer app's scheduling page when navigating through the clarification wizard. Added `backendService` property to `ServiceClarificationScreen`, and updated all navigation services and callers (`assignment_in_progress_screen.dart`, `availability_adjustment_screen.dart`, `navigation_service.dart`, `enhanced_navigation_service.dart`) to propagate the dynamic backend `Service` object all the way to `SchedulePricingScreen`.

