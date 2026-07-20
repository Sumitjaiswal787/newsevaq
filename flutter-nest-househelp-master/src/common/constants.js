"use strict";
/**
 * Centralized application constants
 * All magic numbers and shared values should be defined here
 * Following DRY principle and single source of truth architecture
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERFORMANCE_CRITICAL_THRESHOLD_MS = exports.PERFORMANCE_WARNING_THRESHOLD_MS = exports.DEFAULT_LOCATION_LNG = exports.DEFAULT_LOCATION_LAT = exports.MAX_ASSIGNMENT_RADIUS_KM = exports.DB_CONNECTION_TIMEOUT_MS = exports.DB_MAX_RETRY_DELAY_MS = exports.DB_INITIAL_RETRY_DELAY_MS = exports.DB_MAX_RETRIES = exports.NOTIFICATION_COOLDOWN_MS = exports.SCHEDULER_MAX_EXECUTION_TIME_MS = exports.SCHEDULER_DEFAULT_INTERVAL_MS = exports.SCHEDULER_MAX_INTERVAL_MS = exports.SCHEDULER_MIN_INTERVAL_MS = exports.IST_OFFSET_MS = exports.EARTH_RADIUS_KM = void 0;
// Geospatial constants
exports.EARTH_RADIUS_KM = 6371;
// Timezone configuration
exports.IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // UTC+5:30
// Scheduler intervals and timing
exports.SCHEDULER_MIN_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
exports.SCHEDULER_MAX_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
exports.SCHEDULER_DEFAULT_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
exports.SCHEDULER_MAX_EXECUTION_TIME_MS = 90 * 1000; // 90 seconds
exports.NOTIFICATION_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
// Database connection configuration
exports.DB_MAX_RETRIES = 5;
exports.DB_INITIAL_RETRY_DELAY_MS = 1000;
exports.DB_MAX_RETRY_DELAY_MS = 30000;
exports.DB_CONNECTION_TIMEOUT_MS = 10000;
// Assignment system configuration
exports.MAX_ASSIGNMENT_RADIUS_KM = 15;
exports.DEFAULT_LOCATION_LAT = 28.5804579;
exports.DEFAULT_LOCATION_LNG = 77.4392951;
// Performance thresholds
exports.PERFORMANCE_WARNING_THRESHOLD_MS = 1000;
exports.PERFORMANCE_CRITICAL_THRESHOLD_MS = 5000;
