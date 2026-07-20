"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.NotificationsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var NotificationsController = function () {
    var _classDecorators = [(0, common_1.Controller)('notifications')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getFirebaseStatus_decorators;
    var _sendPreServiceReminders_decorators;
    var _getUpcomingBookings_decorators;
    var _getAllBookings_decorators;
    var _testFcmNotification_decorators;
    var NotificationsController = _classThis = /** @class */ (function () {
        function NotificationsController_1(notificationsService) {
            this.notificationsService = (__runInitializers(this, _instanceExtraInitializers), notificationsService);
        }
        /**
         * GET /notifications/firebase-status
         * Returns Firebase initialization status for monitoring and diagnostics
         */
        NotificationsController_1.prototype.getFirebaseStatus = function () {
            var status = this.notificationsService.getFirebaseStatus();
            return {
                success: true,
                timestamp: new Date().toISOString(),
                firebase: status,
                summary: status.initialized
                    ? "Firebase is initialized (Project: ".concat(status.projectId, ", Type: ").concat(status.credentialType, ")")
                    : "Firebase is NOT initialized. Last error: ".concat(status.lastError),
            };
        };
        NotificationsController_1.prototype.sendPreServiceReminders = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationsService.checkAndSendReminders()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Pre-service reminders sent successfully' }];
                    }
                });
            });
        };
        NotificationsController_1.prototype.getUpcomingBookings = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationsService.findBookingsNeedingReminders(req.user.userId)];
                        case 1:
                            bookings = _a.sent();
                            return [2 /*return*/, {
                                    count: bookings.length,
                                    bookings: bookings.map(function (booking) {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                        return {
                                            id: booking.id,
                                            type: booking.type,
                                            startTime: booking.startTime,
                                            endTime: booking.endTime,
                                            status: booking.status,
                                            amount: booking.amount,
                                            otp: booking.otp,
                                            isOtpVerified: booking.isOtpVerified,
                                            user: {
                                                id: booking.user.id,
                                                publicId: booking.user.publicId,
                                                email: booking.user.email,
                                                firstName: booking.user.firstName,
                                                lastName: booking.user.lastName,
                                                role: booking.user.role,
                                            },
                                            worker: {
                                                id: (_a = booking.worker) === null || _a === void 0 ? void 0 : _a.id,
                                                publicId: (_b = booking.worker) === null || _b === void 0 ? void 0 : _b.publicId,
                                                user: ((_c = booking.worker) === null || _c === void 0 ? void 0 : _c.user)
                                                    ? {
                                                        id: booking.worker.user.id,
                                                        publicId: booking.worker.user.publicId,
                                                        email: booking.worker.user.email,
                                                        firstName: booking.worker.user.firstName,
                                                        lastName: booking.worker.user.lastName,
                                                        role: booking.worker.user.role,
                                                    }
                                                    : null,
                                                rating: (_d = booking.worker) === null || _d === void 0 ? void 0 : _d.rating,
                                                reviewCount: (_e = booking.worker) === null || _e === void 0 ? void 0 : _e.reviewCount,
                                                bio: (_f = booking.worker) === null || _f === void 0 ? void 0 : _f.bio,
                                            },
                                            service: {
                                                id: (_g = booking.service) === null || _g === void 0 ? void 0 : _g.id,
                                                publicId: (_h = booking.service) === null || _h === void 0 ? void 0 : _h.publicId,
                                                name: (_j = booking.service) === null || _j === void 0 ? void 0 : _j.name,
                                                description: (_k = booking.service) === null || _k === void 0 ? void 0 : _k.description,
                                                basePrice: (_l = booking.service) === null || _l === void 0 ? void 0 : _l.basePrice,
                                                category: (_m = booking.service) === null || _m === void 0 ? void 0 : _m.category,
                                            },
                                        };
                                    }),
                                }];
                    }
                });
            });
        };
        NotificationsController_1.prototype.getAllBookings = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationsService.findAllUserBookings(req.user.userId)];
                        case 1:
                            bookings = _a.sent();
                            return [2 /*return*/, {
                                    count: bookings.length,
                                    bookings: bookings.map(function (booking) {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                        return {
                                            id: booking.id,
                                            type: booking.type,
                                            date: booking.date, // Include the date field - CRITICAL for frontend
                                            startTime: booking.startTime,
                                            endTime: booking.endTime,
                                            status: booking.status,
                                            amount: booking.amount || booking.totalAmount,
                                            otp: booking.otp,
                                            isOtpVerified: booking.isOtpVerified,
                                            user: {
                                                id: booking.user.id,
                                                publicId: booking.user.publicId,
                                                email: booking.user.email,
                                                firstName: booking.user.firstName,
                                                lastName: booking.user.lastName,
                                                role: booking.user.role,
                                            },
                                            worker: {
                                                id: (_a = booking.worker) === null || _a === void 0 ? void 0 : _a.id,
                                                publicId: (_b = booking.worker) === null || _b === void 0 ? void 0 : _b.publicId,
                                                user: ((_c = booking.worker) === null || _c === void 0 ? void 0 : _c.user)
                                                    ? {
                                                        id: booking.worker.user.id,
                                                        publicId: booking.worker.user.publicId,
                                                        email: booking.worker.user.email,
                                                        firstName: booking.worker.user.firstName,
                                                        lastName: booking.worker.user.lastName,
                                                        role: booking.worker.user.role,
                                                    }
                                                    : null,
                                                rating: (_d = booking.worker) === null || _d === void 0 ? void 0 : _d.rating,
                                                reviewCount: (_e = booking.worker) === null || _e === void 0 ? void 0 : _e.reviewCount,
                                                bio: (_f = booking.worker) === null || _f === void 0 ? void 0 : _f.bio,
                                            },
                                            service: {
                                                id: (_g = booking.service) === null || _g === void 0 ? void 0 : _g.id,
                                                publicId: (_h = booking.service) === null || _h === void 0 ? void 0 : _h.publicId,
                                                name: (_j = booking.service) === null || _j === void 0 ? void 0 : _j.name,
                                                description: (_k = booking.service) === null || _k === void 0 ? void 0 : _k.description,
                                                basePrice: (_l = booking.service) === null || _l === void 0 ? void 0 : _l.basePrice,
                                                category: (_m = booking.service) === null || _m === void 0 ? void 0 : _m.category,
                                            },
                                        };
                                    }),
                                }];
                    }
                });
            });
        };
        /**
         * POST /notifications/test-fcm
         * Test FCM notification delivery (for diagnostics)
         * Temporarily allowing unauthenticated access for testing
         */
        NotificationsController_1.prototype.testFcmNotification = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var success, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.notificationsService.sendPushNotification(body.fcmToken, body.title, body.body, body.data)];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                return [2 /*return*/, {
                                        success: true,
                                        message: 'Test FCM notification sent successfully',
                                        timestamp: new Date().toISOString(),
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        success: false,
                                        message: 'Failed to send test FCM notification - check FCM credentials and token',
                                        timestamp: new Date().toISOString(),
                                    }];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Error sending test FCM notification: ".concat(error_1.message),
                                    timestamp: new Date().toISOString(),
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationsController_1;
    }());
    __setFunctionName(_classThis, "NotificationsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getFirebaseStatus_decorators = [(0, common_1.Get)('firebase-status')];
        _sendPreServiceReminders_decorators = [(0, common_1.Post)('send-pre-service-reminders')];
        _getUpcomingBookings_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Get)('upcoming-bookings')];
        _getAllBookings_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Get)('all-bookings')];
        _testFcmNotification_decorators = [(0, common_1.Post)('test-fcm')];
        __esDecorate(_classThis, null, _getFirebaseStatus_decorators, { kind: "method", name: "getFirebaseStatus", static: false, private: false, access: { has: function (obj) { return "getFirebaseStatus" in obj; }, get: function (obj) { return obj.getFirebaseStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendPreServiceReminders_decorators, { kind: "method", name: "sendPreServiceReminders", static: false, private: false, access: { has: function (obj) { return "sendPreServiceReminders" in obj; }, get: function (obj) { return obj.sendPreServiceReminders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUpcomingBookings_decorators, { kind: "method", name: "getUpcomingBookings", static: false, private: false, access: { has: function (obj) { return "getUpcomingBookings" in obj; }, get: function (obj) { return obj.getUpcomingBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllBookings_decorators, { kind: "method", name: "getAllBookings", static: false, private: false, access: { has: function (obj) { return "getAllBookings" in obj; }, get: function (obj) { return obj.getAllBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _testFcmNotification_decorators, { kind: "method", name: "testFcmNotification", static: false, private: false, access: { has: function (obj) { return "testFcmNotification" in obj; }, get: function (obj) { return obj.testFcmNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsController = _classThis;
}();
exports.NotificationsController = NotificationsController;
