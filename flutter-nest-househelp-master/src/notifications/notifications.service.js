"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
var admin = __importStar(require("firebase-admin"));
var NotificationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationsService = _classThis = /** @class */ (function () {
        function NotificationsService_1(configService, fcmHttpService, bookingsRepository, subscriptionsRepository, usersRepository, workersRepository) {
            this.configService = configService;
            this.fcmHttpService = fcmHttpService;
            this.bookingsRepository = bookingsRepository;
            this.subscriptionsRepository = subscriptionsRepository;
            this.usersRepository = usersRepository;
            this.workersRepository = workersRepository;
            this.firebaseInitialized = false;
            this.firebaseStatus = {
                initialized: false,
                projectId: null,
                credentialType: 'none',
                lastError: null,
                lastAttemptAt: null,
                credentialValidation: {
                    hasServiceAccountJson: false,
                    hasProjectId: false,
                    hasClientEmail: false,
                    hasPrivateKey: false,
                    serviceAccountValid: false,
                    privateKeyFormatValid: false,
                },
            };
            this.logger = new common_1.Logger(NotificationsService.name);
            // Configure Firebase Admin SDK (optional - only if credentials are provided)
            this.initializeFirebase();
        }
        /**
         * Validate Firebase credentials before attempting initialization
         * Returns validation result and detailed status
         */
        NotificationsService_1.prototype.validateFirebaseCredentials = function () {
            var serviceAccountJson = this.configService.get('FIREBASE_SERVICE_ACCOUNT');
            var projectId = this.configService.get('FIREBASE_PROJECT_ID');
            var clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
            var privateKey = this.configService.get('FIREBASE_PRIVATE_KEY');
            var validation = {
                hasServiceAccountJson: !!serviceAccountJson,
                hasProjectId: !!projectId,
                hasClientEmail: !!clientEmail,
                hasPrivateKey: !!privateKey,
                serviceAccountValid: false,
                privateKeyFormatValid: false,
            };
            var errors = [];
            // Validate service account JSON if present
            if (serviceAccountJson) {
                if (serviceAccountJson.includes('service_account')) {
                    try {
                        var parsed = JSON.parse(serviceAccountJson);
                        if (parsed.project_id && parsed.client_email && parsed.private_key) {
                            validation.serviceAccountValid = true;
                            this.logger.debug('Service account JSON is valid');
                        }
                        else {
                            errors.push('Service account JSON missing required fields (project_id, client_email, private_key)');
                        }
                    }
                    catch (e) {
                        var msg = e instanceof Error ? e.message : String(e);
                        errors.push("Service account JSON is invalid: ".concat(msg));
                    }
                }
                else {
                    errors.push('Service account JSON does not contain "service_account" identifier');
                }
            }
            // Validate private key format if present
            if (privateKey) {
                var normalizedKey = privateKey.replace(/\\n/g, '\n');
                if (normalizedKey.includes('-----BEGIN RSA PRIVATE KEY-----') ||
                    normalizedKey.includes('-----BEGIN PRIVATE KEY-----')) {
                    validation.privateKeyFormatValid = true;
                    this.logger.debug('Private key format is valid');
                }
                else {
                    errors.push('Private key does not appear to be in PEM format (missing BEGIN PRIVATE KEY header)');
                }
            }
            // Check if we have at least one valid credential set
            var hasValidServiceAccount = validation.serviceAccountValid;
            var hasValidIndividualCredentials = validation.hasProjectId &&
                validation.hasClientEmail &&
                validation.privateKeyFormatValid &&
                projectId !== 'your-firebase-project-id';
            var valid = hasValidServiceAccount || hasValidIndividualCredentials;
            if (!valid && !errors.length) {
                errors.push('No valid Firebase credentials configured');
            }
            return { valid: valid, errors: errors, validation: validation };
        };
        /**
         * Initialize Firebase Admin SDK with detailed logging and diagnostics
         */
        NotificationsService_1.prototype.initializeFirebase = function () {
            var _this = this;
            this.logger.log('='.repeat(60));
            this.logger.log('[Firebase Init] Starting Firebase Admin SDK initialization...');
            this.logger.log('='.repeat(60));
            // Record attempt timestamp
            this.firebaseStatus.lastAttemptAt = new Date().toISOString();
            // Step 1: Validate credentials
            this.logger.log('[Firebase Init] Step 1: Validating credentials...');
            var validationResult = this.validateFirebaseCredentials();
            this.firebaseStatus.credentialValidation = validationResult.validation;
            this.logger.log('[Firebase Init] Credential validation results:');
            this.logger.log("  - Has Service Account JSON: ".concat(validationResult.validation.hasServiceAccountJson));
            this.logger.log("  - Service Account Valid: ".concat(validationResult.validation.serviceAccountValid));
            this.logger.log("  - Has Project ID: ".concat(validationResult.validation.hasProjectId));
            this.logger.log("  - Has Client Email: ".concat(validationResult.validation.hasClientEmail));
            this.logger.log("  - Has Private Key: ".concat(validationResult.validation.hasPrivateKey));
            this.logger.log("  - Private Key Format Valid: ".concat(validationResult.validation.privateKeyFormatValid));
            if (validationResult.errors.length > 0) {
                this.logger.warn('[Firebase Init] Validation warnings:');
                validationResult.errors.forEach(function (err) { return _this.logger.warn("  - ".concat(err)); });
            }
            // Step 2: Try service account JSON initialization
            var serviceAccountJson = this.configService.get('FIREBASE_SERVICE_ACCOUNT');
            if (validationResult.validation.serviceAccountValid) {
                this.logger.log('[Firebase Init] Step 2: Attempting initialization with service account JSON...');
                try {
                    var serviceAccount = JSON.parse(serviceAccountJson);
                    this.logger.log("[Firebase Init] Service account details:");
                    this.logger.log("  - Project ID: ".concat(serviceAccount.project_id));
                    this.logger.log("  - Client Email: ".concat(serviceAccount.client_email));
                    this.logger.log("  - Token URI: ".concat(serviceAccount.token_uri));
                    // Proper private key sanitization for DER parsing
                    if (serviceAccount.private_key) {
                        serviceAccount.private_key = serviceAccount.private_key
                            .replace(/\\\\n/g, '\n')
                            .replace(/\\n/g, '\n')
                            .replace(/\r\n/g, '\n')
                            .replace(/\r/g, '\n')
                            .trim();
                        // ✅ FIX: Add missing final newline character BEFORE the footer
                        // This is the actual fix for "Unparsed DER bytes remain after ASN.1 parsing"
                        var pemFooter = '-----END PRIVATE KEY-----';
                        if (serviceAccount.private_key.includes(pemFooter)) {
                            serviceAccount.private_key = serviceAccount.private_key.replace(pemFooter, '\n' + pemFooter + '\n');
                        }
                        // Ensure proper final newline after PEM footer
                        if (!serviceAccount.private_key.endsWith('\n')) {
                            serviceAccount.private_key += '\n';
                        }
                    }
                    // Check if app already exists before initializing
                    if (admin.apps.length === 0) {
                        admin.initializeApp({
                            credential: admin.credential.cert(serviceAccount),
                        });
                    }
                    this.firebaseInitialized = true;
                    this.firebaseStatus.initialized = true;
                    this.firebaseStatus.projectId = serviceAccount.project_id;
                    this.firebaseStatus.credentialType = 'service_account';
                    this.firebaseStatus.lastError = null;
                    console.log('[Firebase Init] ✅ Firebase Admin SDK initialized successfully from service account');
                    console.log("[Firebase Init] Project: ".concat(serviceAccount.project_id));
                    console.log('='.repeat(60));
                    return;
                }
                catch (error) {
                    var errorMsg = error instanceof Error ? error.message : String(error);
                    this.firebaseStatus.lastError = "Service account init failed: ".concat(errorMsg);
                    console.warn("[Firebase Init] \u274C Service account initialization failed: ".concat(errorMsg));
                }
            }
            // Step 3: Fall back to individual credentials
            var projectId = this.configService.get('FIREBASE_PROJECT_ID');
            var clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
            var privateKey = this.configService.get('FIREBASE_PRIVATE_KEY');
            if (projectId &&
                clientEmail &&
                privateKey &&
                projectId !== 'your-firebase-project-id') {
                console.log('[Firebase Init] Step 3: Attempting initialization with individual credentials...');
                try {
                    // Proper private key sanitization for DER parsing
                    var normalizedPrivateKey = privateKey
                        .replace(/\\\\n/g, '\n')
                        .replace(/\\n/g, '\n')
                        .replace(/\r\n/g, '\n')
                        .replace(/\r/g, '\n')
                        .trim();
                    // ✅ FIX: Add missing final newline character BEFORE the footer
                    // This is the actual fix for "Unparsed DER bytes remain after ASN.1 parsing"
                    var pemFooter = '-----END PRIVATE KEY-----';
                    if (normalizedPrivateKey.includes(pemFooter)) {
                        normalizedPrivateKey = normalizedPrivateKey.replace(pemFooter, '\n' + pemFooter + '\n');
                    }
                    // Ensure proper final newline after PEM footer
                    var finalPrivateKey = normalizedPrivateKey.endsWith('\n')
                        ? normalizedPrivateKey
                        : normalizedPrivateKey + '\n';
                    console.log("[Firebase Init] Using individual credentials for project: ".concat(projectId));
                    // Singleton guard: Only initialize if not already running
                    if (admin.apps.length === 0) {
                        admin.initializeApp({
                            credential: admin.credential.cert({
                                projectId: projectId,
                                clientEmail: clientEmail,
                                privateKey: finalPrivateKey,
                            }),
                        });
                    }
                    this.firebaseInitialized = true;
                    this.firebaseStatus.initialized = true;
                    this.firebaseStatus.projectId = projectId;
                    this.firebaseStatus.credentialType = 'individual';
                    this.firebaseStatus.lastError = null;
                    console.log('[Firebase Init] ✅ Firebase Admin SDK initialized successfully');
                    console.log("[Firebase Init] Project: ".concat(projectId));
                    console.log('='.repeat(60));
                    return;
                }
                catch (error) {
                    var errorMsg = error instanceof Error ? error.message : String(error);
                    this.firebaseStatus.lastError = "Individual credentials init failed: ".concat(errorMsg);
                    console.warn("[Firebase Init] \u274C Individual credentials initialization failed: ".concat(errorMsg));
                }
            }
            // Step 4: Initialization failed
            this.firebaseInitialized = false;
            this.firebaseStatus.initialized = false;
            this.firebaseStatus.credentialType = 'none';
            if (!this.firebaseStatus.lastError) {
                this.firebaseStatus.lastError = 'No valid credentials provided';
            }
            console.warn('[Firebase Init] ❌ Firebase Admin SDK initialization failed');
            console.warn("[Firebase Init] Error: ".concat(this.firebaseStatus.lastError));
            console.warn('[Firebase Init] Push notifications will be skipped');
            console.log('='.repeat(60));
        };
        /**
         * Get detailed Firebase initialization status for diagnostics
         */
        NotificationsService_1.prototype.getFirebaseStatus = function () {
            return __assign({}, this.firebaseStatus);
        };
        NotificationsService_1.prototype.sendPushNotification = function (fcmToken, title, body, dataPayload) {
            return __awaiter(this, void 0, void 0, function () {
                var success, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Check if FCM token is provided
                            if (!fcmToken) {
                                console.error('[NOTIFICATION FAILURE] No FCM token provided, cannot send push notification');
                                return [2 /*return*/, false];
                            }
                            else {
                                console.log("[NOTIFICATION] FCM token present (".concat(fcmToken.substring(0, 20), "...), ready to send via direct HTTP API"));
                            }
                            return [4 /*yield*/, this.fcmHttpService.sendNotification(fcmToken, title, body, __assign(__assign({}, dataPayload), { notification_title: title, notification_body: body, click_action: 'FLUTTER_NOTIFICATION_CLICK', id: '1', status: 'done' }))];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                console.log("\u2705 Successfully sent push notification via direct FCM HTTP API");
                                return [2 /*return*/, true];
                            }
                            else {
                                console.error('❌ Failed to send push notification via direct FCM HTTP API');
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error sending push notification:', error_1);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send a full-screen push notification for critical alerts (worker booking notifications).
         * This sends BOTH data and android.notification blocks so that:
         * - android.notification: Shows system tray notification with full-screen intent (background/terminated)
         * - data: Flutter processes to show in-app dialog (foreground)
         * - Uses full_screen_booking_channel for full-screen alarm behavior
         */
        NotificationsService_1.prototype.sendFullScreenPushNotification = function (fcmToken, title, body, dataPayload) {
            return __awaiter(this, void 0, void 0, function () {
                var success, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Check if FCM token is provided
                            if (!fcmToken) {
                                console.error('[NOTIFICATION FAILURE] No FCM token provided');
                                return [2 /*return*/];
                            }
                            else {
                                console.log("[NOTIFICATION] FCM token present (".concat(fcmToken.substring(0, 20), "...), ready to send full screen via direct HTTP API"));
                            }
                            return [4 /*yield*/, this.fcmHttpService.sendNotification(fcmToken, title, body, __assign(__assign({}, dataPayload), { notification_title: title, notification_body: body, click_action: 'FLUTTER_NOTIFICATION_CLICK', id: '1', status: 'done', fullScreen: 'true' }))];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                console.log("\u2705 Successfully sent full screen push notification via direct FCM HTTP API");
                            }
                            else {
                                console.error('❌ Failed to send full screen push notification via direct FCM HTTP API');
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error('Error sending full screen push notification:', error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send a data-only FCM notification that will be processed by the background handler
         * even when the app is in the background or terminated.
         * The notification title and body are included in the data payload.
         */
        NotificationsService_1.prototype.sendDataOnlyNotification = function (fcmToken, title, body, dataPayload) {
            return __awaiter(this, void 0, void 0, function () {
                var message, response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            if (!this.firebaseInitialized) {
                                console.error('[NOTIFICATION FAILURE] Firebase Admin SDK NOT initialized - push notifications will NOT work!');
                                return [2 /*return*/];
                            }
                            if (!fcmToken) {
                                console.error('[NOTIFICATION FAILURE] No FCM token provided');
                                return [2 /*return*/];
                            }
                            message = {
                                token: fcmToken,
                                data: __assign(__assign({}, dataPayload), { 
                                    // Include title and body in data payload for local notification display
                                    notification_title: title, notification_body: body }),
                                android: {
                                    priority: 'high',
                                },
                            };
                            return [4 /*yield*/, admin.messaging().send(message)];
                        case 1:
                            response = _a.sent();
                            console.log("Successfully sent data-only push notification: ".concat(response));
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            console.error('Error sending data-only push notification:', error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.notifyWorkerNewBooking = function (worker, booking) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceName, notificationTitle, notificationBody;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                return __generator(this, function (_m) {
                    switch (_m.label) {
                        case 0:
                            console.log("[notifyWorkerNewBooking] Starting for worker ".concat(worker.id, ", booking ").concat(booking.id));
                            // Check if notification has already been sent to prevent duplicate notifications
                            if (booking.notificationSent) {
                                console.log("[notifyWorkerNewBooking] Skipping notification for booking ".concat(booking.id, " - notification already sent"));
                                return [2 /*return*/];
                            }
                            if (!worker.fcmToken) {
                                console.error("[NOTIFICATION FAILURE] No FCM token for worker ".concat(worker.id, " - worker needs to register their FCM token first!"));
                                return [2 /*return*/];
                            }
                            console.log("[notifyWorkerNewBooking] Worker has FCM token: ".concat(worker.fcmToken.substring(0, 20), "..."));
                            serviceName = ((_a = booking.service) === null || _a === void 0 ? void 0 : _a.name) || 'Service';
                            notificationTitle = 'नया काम मिला!';
                            notificationBody = "\u0928\u092F\u093E \u092C\u0941\u0915\u093F\u0902\u0917 \u092E\u093F\u0932\u0940 \u0939\u0948 - ".concat(serviceName);
                            console.log("[notifyWorkerNewBooking] Sending full-screen push notification: title=\"".concat(notificationTitle, "\", body=\"").concat(notificationBody, "\""));
                            // Send full-screen push notification with both notification and data blocks
                            // This ensures the notification appears even when app is terminated
                            // Uses full_screen_booking_channel which has fullScreenIntent enabled
                            return [4 /*yield*/, this.sendFullScreenPushNotification(worker.fcmToken, notificationTitle, notificationBody, {
                                    type: 'new_booking',
                                    bookingId: booking.id.toString(),
                                    serviceName: (_c = (_b = booking.service) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Service',
                                    serviceDate: (_d = booking.date) !== null && _d !== void 0 ? _d : new Date().toISOString().split('T')[0],
                                    startTime: (_e = booking.startTime) !== null && _e !== void 0 ? _e : '',
                                    customerName: (_g = (_f = booking.user) === null || _f === void 0 ? void 0 : _f.firstName) !== null && _g !== void 0 ? _g : 'Customer',
                                    customerAddress: (_j = (_h = booking.location) === null || _h === void 0 ? void 0 : _h.address) !== null && _j !== void 0 ? _j : '',
                                    price: (_l = (_k = booking.amount) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : '0',
                                    assignmentType: 'on_demand',
                                    fullScreen: 'true', // Trigger full-screen notification
                                    timestamp: new Date().toISOString(),
                                })];
                        case 1:
                            // Send full-screen push notification with both notification and data blocks
                            // This ensures the notification appears even when app is terminated
                            // Uses full_screen_booking_channel which has fullScreenIntent enabled
                            _m.sent();
                            // Mark notification as sent to prevent duplicates
                            booking.notificationSent = true;
                            return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 2:
                            _m.sent();
                            console.log("[notifyWorkerNewBooking] Completed for worker ".concat(worker.id, " for booking ").concat(booking.id));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ============================================
        // NEW: Notify user (customer) about booking confirmation
        // ============================================
        NotificationsService_1.prototype.notifyUserBookingConfirmation = function (user, booking) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceName, notificationTitle, notificationBody;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("[notifyUserBookingConfirmation] Starting for user ".concat(user.id, ", booking ").concat(booking.id));
                            // Check if user has FCM token
                            // Note: User's fcmToken is stored in the user record
                            if (!user.fcmToken) {
                                console.log("[notifyUserBookingConfirmation] No FCM token for user ".concat(user.id, " - user needs to register their FCM token first!"));
                                return [2 /*return*/];
                            }
                            console.log("[notifyUserBookingConfirmation] User has FCM token: ".concat(user.fcmToken.substring(0, 20), "..."));
                            serviceName = ((_a = booking.service) === null || _a === void 0 ? void 0 : _a.name) || 'Service';
                            notificationTitle = 'Booking Confirmed!';
                            notificationBody = "Your ".concat(serviceName, " booking has been confirmed successfully!");
                            console.log("[notifyUserBookingConfirmation] Sending push notification: title=\"".concat(notificationTitle, "\", body=\"").concat(notificationBody, "\""));
                            return [4 /*yield*/, this.sendPushNotification(user.fcmToken, notificationTitle, notificationBody, {
                                    type: 'booking_confirmation',
                                    bookingId: booking.id.toString(),
                                })];
                        case 1:
                            _b.sent();
                            console.log("[notifyUserBookingConfirmation] Completed for user ".concat(user.id, " for booking ").concat(booking.id));
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.notifyAdmins = function (subject, message) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Email/SMS notifications have been completely removed from the system
                    console.log("[NOTIFICATION SYSTEM DISABLED] Admin notification skipped: ".concat(subject, " - ").concat(message));
                    return [2 /*return*/];
                });
            });
        };
        NotificationsService_1.prototype.sendPreServiceReminder = function (booking, reminderType) {
            return __awaiter(this, void 0, void 0, function () {
                var uuidRegex, isValidUserId, user, timeString, pushTitle, pushBody, pushTitle, pushBody;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                            isValidUserId = booking.userId && (typeof booking.userId === 'number' ||
                                (typeof booking.userId === 'string' && uuidRegex.test(booking.userId)));
                            if (!isValidUserId) {
                                console.warn("Skipping booking ".concat(booking.id, " - invalid userId: ").concat(booking.userId));
                                return [2 /*return*/];
                            }
                            if (!(typeof booking.userId === 'number')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: booking.userId }
                                })];
                        case 1:
                            // Legacy integer user id - query by primary key id column
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { publicId: booking.userId }
                            })];
                        case 3:
                            // Modern UUID publicId - query by publicId column
                            user = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!user) {
                                console.error("User not found for booking ".concat(booking.id, ", userId: ").concat(booking.userId));
                                return [2 /*return*/];
                            }
                            timeString = this.formatTime(booking.startTime);
                            if (!(reminderType === '24h')) return [3 /*break*/, 8];
                            pushTitle = 'Service scheduled for tomorrow';
                            pushBody = "Your SEVAQ service is scheduled for tomorrow at ".concat(timeString, ". We'll take care of everything.");
                            if (!user.fcmToken) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.sendPushNotification(user.fcmToken, pushTitle, pushBody)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            console.warn("No FCM token for user ".concat(user.id, ", skipping push notification"));
                            _a.label = 7;
                        case 7:
                            // Email/SMS notifications have been completely removed from the system
                            console.log("[NOTIFICATION SYSTEM DISABLED] ".concat(reminderType, " reminder skipped for user ").concat(user.id, " - only push notifications are active"));
                            return [3 /*break*/, 12];
                        case 8:
                            pushTitle = 'Your service is coming up';
                            pushBody = "Your SEVAQ service starts at ".concat(timeString, ". Everything is on track.");
                            if (!user.fcmToken) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.sendPushNotification(user.fcmToken, pushTitle, pushBody)];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            console.warn("No FCM token for user ".concat(user.id, ", skipping push notification"));
                            _a.label = 11;
                        case 11:
                            // Email/SMS notifications have been completely removed from the system
                            console.log("[NOTIFICATION SYSTEM DISABLED] ".concat(reminderType, " reminder skipped for user ").concat(user.id, " - only push notifications are active"));
                            _a.label = 12;
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.checkAndSendReminders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var stats, bookings, _i, bookings_1, booking, reminderType, bookingError_1, globalError_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stats = { processed: 0, sent: 0, errors: 0 };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 12, , 13]);
                            return [4 /*yield*/, this.findBookingsNeedingReminders()];
                        case 2:
                            bookings = _a.sent();
                            stats.processed = bookings.length;
                            _i = 0, bookings_1 = bookings;
                            _a.label = 3;
                        case 3:
                            if (!(_i < bookings_1.length)) return [3 /*break*/, 11];
                            booking = bookings_1[_i];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 9, , 10]);
                            return [4 /*yield*/, this.determineReminderType(booking)];
                        case 5:
                            reminderType = _a.sent();
                            if (!reminderType) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.sendPreServiceReminder(booking, reminderType)];
                        case 6:
                            _a.sent();
                            // MARK REMINDER AS SENT - PERMANENT FIX FOR DUPLICATE NOTIFICATIONS
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder()
                                    .update(booking_entity_1.Booking)
                                    .set({ preServiceReminderSent: true })
                                    .where('id = :id', { id: booking.id })
                                    .execute()];
                        case 7:
                            // MARK REMINDER AS SENT - PERMANENT FIX FOR DUPLICATE NOTIFICATIONS
                            _a.sent();
                            stats.sent++;
                            _a.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            bookingError_1 = _a.sent();
                            stats.errors++;
                            this.logger.error("Failed processing booking ".concat(booking.id, " for reminder"), bookingError_1);
                            return [3 /*break*/, 10];
                        case 10:
                            _i++;
                            return [3 /*break*/, 3];
                        case 11: return [2 /*return*/, __assign({ success: stats.errors === 0 }, stats)];
                        case 12:
                            globalError_1 = _a.sent();
                            this.logger.error('Fatal failure in pre-service reminder check', globalError_1);
                            throw globalError_1; // Re-throw so scheduler knows about complete failure
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.determineReminderType = function (booking) {
            return __awaiter(this, void 0, void 0, function () {
                var now, parseTimeToDate, bookingDateTime, hoursDifference;
                return __generator(this, function (_a) {
                    now = new Date();
                    parseTimeToDate = function (timeStr) {
                        if (typeof timeStr === 'string' && timeStr.includes(':')) {
                            // Time string HH:mm:ss - combine with today's date
                            var parts = timeStr.split(':');
                            var hours = parseInt(parts[0], 10);
                            var minutes = parseInt(parts[1] || '0', 10);
                            var date = new Date();
                            date.setHours(hours, minutes, 0, 0);
                            return date;
                        }
                        // Fallback
                        return new Date();
                    };
                    bookingDateTime = parseTimeToDate(booking.startTime);
                    hoursDifference = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
                    if (hoursDifference <= 2 && hoursDifference > 0) {
                        return [2 /*return*/, '2h'];
                    }
                    else if (hoursDifference > 2 && hoursDifference <= 26) {
                        return [2 /*return*/, '24h'];
                    }
                    return [2 /*return*/, null]; // Not within reminder window
                });
            });
        };
        NotificationsService_1.prototype.formatTime = function (time) {
            // Handle both string and Date inputs
            var dateTime;
            if (time instanceof Date) {
                dateTime = time;
            }
            else {
                // Parse time string (format: HH:mm or HH:mm:ss)
                var parts = time.split(':');
                dateTime = new Date();
                dateTime.setHours(parseInt(parts[0], 10));
                dateTime.setMinutes(parseInt(parts[1], 10));
                dateTime.setSeconds(parts[2] ? parseInt(parts[2], 10) : 0);
            }
            var hours = dateTime.getHours();
            var minutes = dateTime.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            var formattedHours = hours % 12 || 12;
            var formattedMinutes = minutes.toString().padStart(2, '0');
            return "".concat(formattedHours, ":").concat(formattedMinutes, " ").concat(ampm);
        };
        NotificationsService_1.prototype.findUpcomingBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                var now, tomorrow;
                return __generator(this, function (_a) {
                    now = new Date();
                    tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    return [2 /*return*/, this.bookingsRepository
                            .createQueryBuilder('booking')
                            .leftJoinAndSelect('booking.user', 'user')
                            .leftJoinAndSelect('booking.worker', 'worker')
                            .leftJoinAndSelect('worker.user', 'workerUser')
                            .leftJoinAndSelect('booking.service', 'service')
                            .where('booking.status = :status', { status: 'confirmed' })
                            .andWhere('booking.date >= :today', {
                            today: now.toISOString().split('T')[0],
                        })
                            .andWhere('booking.date <= :tomorrow', {
                            tomorrow: tomorrow.toISOString().split('T')[0],
                        })
                            .orderBy('booking.date', 'ASC')
                            .addOrderBy('booking.startTime', 'ASC')
                            .getMany()];
                });
            });
        };
        NotificationsService_1.prototype.findBookingsNeedingReminders = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var now, tomorrow, twoHoursFromNow, twentySixHoursFromNow, allBookings, bookings, activeSubscription, subscriptionId_1, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                            twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
                            twentySixHoursFromNow = new Date(now.getTime() + 26 * 60 * 60 * 1000);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoinAndSelect('booking.user', 'user')
                                    .leftJoinAndSelect('booking.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .leftJoinAndSelect('booking.service', 'service')
                                    .where('booking.status = :status', { status: 'confirmed' })
                                    .andWhere('booking.date >= :today', {
                                    today: now.toISOString().split('T')[0],
                                })
                                    .andWhere('booking.date <= :tomorrow', {
                                    tomorrow: tomorrow.toISOString().split('T')[0],
                                })
                                    .getMany()];
                        case 2:
                            allBookings = _a.sent();
                            bookings = allBookings;
                            if (!userId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.subscriptionsRepository.findOne({
                                    where: {
                                        userId: userId,
                                        status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                                    },
                                })];
                        case 3:
                            activeSubscription = _a.sent();
                            subscriptionId_1 = activeSubscription === null || activeSubscription === void 0 ? void 0 : activeSubscription.id;
                            bookings = allBookings.filter(function (booking) {
                                return booking.userId === userId ||
                                    (subscriptionId_1 && booking.subscriptionId === subscriptionId_1);
                            });
                            _a.label = 4;
                        case 4: 
                        // Filter to only include bookings within the 2h-26h window AND NO REMINDER SENT YET
                        return [2 /*return*/, bookings.filter(function (booking) {
                                if (!booking.startTime)
                                    return false;
                                // Skip if reminder was already sent
                                if (booking.preServiceReminderSent === true)
                                    return false;
                                var timeParts = booking.startTime.split(':');
                                var hours = parseInt(timeParts[0], 10);
                                var minutes = parseInt(timeParts[1] || '0', 10);
                                var bookingDateTime = new Date();
                                bookingDateTime.setHours(hours, minutes, 0, 0);
                                bookingDateTime.setSeconds(0);
                                bookingDateTime.setMilliseconds(0);
                                var hoursDifference = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
                                return hoursDifference > 2 && hoursDifference <= 26;
                            })];
                        case 5:
                            error_4 = _a.sent();
                            console.error('Error finding bookings needing reminders:', error_4);
                            return [2 /*return*/, []];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.findAllUserBookings = function (userPublicId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, activeSubscriptions, subscriptionIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { publicId: userPublicId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.subscriptionsRepository.find({
                                    where: {
                                        userId: userPublicId,
                                        status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                                    },
                                })];
                        case 2:
                            activeSubscriptions = _a.sent();
                            subscriptionIds = activeSubscriptions.map(function (sub) { return sub.id; }).filter(function (id) { return id !== undefined; });
                            return [2 /*return*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoinAndSelect('booking.user', 'user')
                                    .leftJoinAndSelect('booking.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .leftJoinAndSelect('booking.service', 'service')
                                    .leftJoinAndSelect('booking.subscription', 'subscription')
                                    .where(new typeorm_1.Brackets(function (qb) {
                                    qb.where('booking.userId = :userId', { userId: userPublicId });
                                    if (subscriptionIds.length > 0) {
                                        qb.orWhere('booking.subscriptionId IN (:...subscriptionIds)', {
                                            subscriptionIds: subscriptionIds,
                                        });
                                    }
                                }))
                                    .orderBy('booking.date', 'ASC')
                                    .addOrderBy('booking.startTime', 'ASC')
                                    .getMany()
                                    .then(function (bookings) {
                                    console.log('🔍 findAllUserBookings: Loaded', bookings.length, 'bookings');
                                    bookings.forEach(function (b) {
                                        console.log("  - Booking ".concat(b.publicId, ": subscriptionId=").concat(b.subscriptionId, ", subscription=").concat(b.subscription ? b.subscription.publicId : null));
                                    });
                                    return bookings;
                                })];
                    }
                });
            });
        };
        NotificationsService_1.prototype.findAllBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsRepository
                            .createQueryBuilder('booking')
                            .leftJoinAndSelect('booking.user', 'user')
                            .leftJoinAndSelect('booking.worker', 'worker')
                            .leftJoinAndSelect('worker.user', 'workerUser')
                            .leftJoinAndSelect('booking.service', 'service')
                            .orderBy('booking.date', 'ASC')
                            .addOrderBy('booking.startTime', 'ASC')
                            .getMany()];
                });
            });
        };
        return NotificationsService_1;
    }());
    __setFunctionName(_classThis, "NotificationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsService = _classThis;
}();
exports.NotificationsService = NotificationsService;
