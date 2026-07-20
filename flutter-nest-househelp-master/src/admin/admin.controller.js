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
exports.AdminController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var admin_guard_1 = require("../auth/admin.guard");
var AdminController = function () {
    var _classDecorators = [(0, common_1.Controller)('admin'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getDashboardStats_decorators;
    var _getAllWorkers_decorators;
    var _getWorkerById_decorators;
    var _updateWorker_decorators;
    var _toggleWorkerAvailability_decorators;
    var _getAllBookings_decorators;
    var _getUnassignedBookings_decorators;
    var _getBookingById_decorators;
    var _updateBookingStatus_decorators;
    var _cancelBooking_decorators;
    var _assignBooking_decorators;
    var _getRevenueAnalytics_decorators;
    var _getBookingAnalytics_decorators;
    var _getAllUsers_decorators;
    var _getUserById_decorators;
    var _createWorkerProfileByEmail_decorators;
    var _getRevenueTrend_decorators;
    var _getBookingTrend_decorators;
    var _getServicePopularity_decorators;
    var _getWorkerPerformance_decorators;
    var _getCustomerRetention_decorators;
    var _getWorkerLocations_decorators;
    var _getActiveBookings_decorators;
    var _getAssignmentMetrics_decorators;
    var AdminController = _classThis = /** @class */ (function () {
        function AdminController_1(adminService) {
            this.adminService = (__runInitializers(this, _instanceExtraInitializers), adminService);
        }
        // ============================================
        // Dashboard Statistics
        // ============================================
        /**
         * Get comprehensive dashboard statistics
         * GET /admin/dashboard
         */
        AdminController_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getDashboardStats()];
                });
            });
        };
        // ============================================
        // Worker Management
        // ============================================
        /**
         * Get all workers with optional filters
         * GET /admin/workers
         */
        AdminController_1.prototype.getAllWorkers = function (isAvailable, minRating, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getAllWorkers({
                            isAvailable: isAvailable ? isAvailable === 'true' : undefined,
                            minRating: minRating ? parseFloat(minRating) : undefined,
                            serviceId: serviceId,
                        })];
                });
            });
        };
        /**
         * Get worker by ID
         * GET /admin/workers/:id
         */
        AdminController_1.prototype.getWorkerById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getWorkerById(parseInt(id, 10))];
                });
            });
        };
        /**
         * Update worker details
         * PUT /admin/workers/:id
         */
        AdminController_1.prototype.updateWorker = function (id, updates) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.updateWorker(parseInt(id, 10), updates)];
                });
            });
        };
        /**
         * Toggle worker availability
         * PATCH /admin/workers/:id/availability
         */
        AdminController_1.prototype.toggleWorkerAvailability = function (id, isAvailable) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.toggleWorkerAvailability(parseInt(id, 10), isAvailable)];
                });
            });
        };
        // ============================================
        // Booking Management
        // ============================================
        /**
         * Get all bookings with optional filters
         * GET /admin/bookings
         */
        AdminController_1.prototype.getAllBookings = function (status, startDate, endDate, workerId, userId, page, limit) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getAllBookings({
                            status: status,
                            startDate: startDate,
                            endDate: endDate,
                            workerId: workerId ? parseInt(workerId, 10) : undefined,
                            userId: userId,
                            page: page ? parseInt(page, 10) : undefined,
                            limit: limit ? parseInt(limit, 10) : undefined,
                        })];
                });
            });
        };
        /**
         * Get all unassigned bookings (workerId IS NULL)
         * GET /admin/bookings/unassigned
         * NOTE: This must come BEFORE bookings/:id to avoid route conflict
         */
        AdminController_1.prototype.getUnassignedBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getUnassignedBookings()];
                });
            });
        };
        /**
         * Get booking by ID
         * GET /admin/bookings/:id
         */
        AdminController_1.prototype.getBookingById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getBookingById(id)];
                });
            });
        };
        /**
         * Update booking status
         * PATCH /admin/bookings/:id/status
         */
        AdminController_1.prototype.updateBookingStatus = function (id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.updateBookingStatus(id, status)];
                });
            });
        };
        /**
         * Cancel a booking
         * POST /admin/bookings/:id/cancel
         */
        AdminController_1.prototype.cancelBooking = function (id, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.cancelBooking(id, reason)];
                });
            });
        };
        /**
         * Manually assign a worker to a booking
         * POST /admin/bookings/:id/assign
         */
        AdminController_1.prototype.assignBooking = function (id, body, req) {
            return __awaiter(this, void 0, void 0, function () {
                var adminId;
                var _a;
                return __generator(this, function (_b) {
                    if (!body.workerId) {
                        throw new common_1.BadRequestException('workerId is required');
                    }
                    adminId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'admin';
                    return [2 /*return*/, this.adminService.manualAssignBooking(id, body.workerId, adminId, body.notes)];
                });
            });
        };
        // ============================================
        // Analytics
        // ============================================
        /**
         * Get revenue analytics
         * GET /admin/analytics/revenue
         */
        AdminController_1.prototype.getRevenueAnalytics = function (period) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getRevenueAnalytics(period)];
                });
            });
        };
        /**
         * Get booking analytics
         * GET /admin/analytics/bookings
         */
        AdminController_1.prototype.getBookingAnalytics = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getBookingAnalytics()];
                });
            });
        };
        // ============================================
        // User Management
        // ============================================
        /**
         * Get all users
         * GET /admin/users
         */
        AdminController_1.prototype.getAllUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getAllUsers()];
                });
            });
        };
        /**
         * Get user by ID
         * GET /admin/users/:id
         */
        AdminController_1.prototype.getUserById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getUserById(id)];
                });
            });
        };
        // ============================================
        // Worker Profile Management
        // ============================================
        /**
         * Create worker profile for existing user
         * POST /admin/workers/by-email
         */
        AdminController_1.prototype.createWorkerProfileByEmail = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.createWorkerProfileForUser(body.email, body.bio || '', body.serviceIds || [], body.latitude || 28.5804579, body.longitude || 77.4392951)];
                });
            });
        };
        // ============================================
        // Analytics - Implemented Features
        // ============================================
        /**
         * Get revenue trend
         * GET /admin/analytics/revenue-trend
         */
        AdminController_1.prototype.getRevenueTrend = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var daysNum;
                return __generator(this, function (_a) {
                    daysNum = days ? parseInt(days, 10) : 30;
                    return [2 /*return*/, this.adminService.getRevenueTrend(daysNum)];
                });
            });
        };
        /**
         * Get booking trend
         * GET /admin/analytics/booking-trend
         */
        AdminController_1.prototype.getBookingTrend = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var daysNum;
                return __generator(this, function (_a) {
                    daysNum = days ? parseInt(days, 10) : 30;
                    return [2 /*return*/, this.adminService.getBookingTrend(daysNum)];
                });
            });
        };
        /**
         * Get service popularity
         * GET /admin/analytics/service-popularity
         */
        AdminController_1.prototype.getServicePopularity = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getServicePopularity()];
                });
            });
        };
        /**
         * Get worker performance
         * GET /admin/analytics/worker-performance
         */
        AdminController_1.prototype.getWorkerPerformance = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getWorkerPerformance()];
                });
            });
        };
        /**
         * Get customer retention
         * GET /admin/analytics/customer-retention
         */
        AdminController_1.prototype.getCustomerRetention = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getCustomerRetention()];
                });
            });
        };
        // ============================================
        // Monitoring - Implemented Features
        // ============================================
        /**
         * Get worker locations for real-time monitoring
         * GET /admin/monitoring/workers/locations
         */
        AdminController_1.prototype.getWorkerLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getWorkerLocations()];
                });
            });
        };
        /**
         * Get active bookings for real-time monitoring
         * GET /admin/monitoring/bookings/active
         */
        AdminController_1.prototype.getActiveBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getActiveBookings()];
                });
            });
        };
        // ============================================
        // Assignment Metrics
        // ============================================
        /**
         * Get assignment metrics
         * GET /admin/metrics/assignments
         */
        AdminController_1.prototype.getAssignmentMetrics = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getAssignmentMetrics()];
                });
            });
        };
        return AdminController_1;
    }());
    __setFunctionName(_classThis, "AdminController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getDashboardStats_decorators = [(0, common_1.Get)('dashboard')];
        _getAllWorkers_decorators = [(0, common_1.Get)('workers')];
        _getWorkerById_decorators = [(0, common_1.Get)('workers/:id')];
        _updateWorker_decorators = [(0, common_1.Put)('workers/:id')];
        _toggleWorkerAvailability_decorators = [(0, common_1.Patch)('workers/:id/availability')];
        _getAllBookings_decorators = [(0, common_1.Get)('bookings')];
        _getUnassignedBookings_decorators = [(0, common_1.Get)('bookings/unassigned')];
        _getBookingById_decorators = [(0, common_1.Get)('bookings/:id')];
        _updateBookingStatus_decorators = [(0, common_1.Patch)('bookings/:id/status')];
        _cancelBooking_decorators = [(0, common_1.Post)('bookings/:id/cancel')];
        _assignBooking_decorators = [(0, common_1.Post)('bookings/:id/assign')];
        _getRevenueAnalytics_decorators = [(0, common_1.Get)('analytics/revenue')];
        _getBookingAnalytics_decorators = [(0, common_1.Get)('analytics/bookings')];
        _getAllUsers_decorators = [(0, common_1.Get)('users')];
        _getUserById_decorators = [(0, common_1.Get)('users/:id')];
        _createWorkerProfileByEmail_decorators = [(0, common_1.Post)('workers/by-email')];
        _getRevenueTrend_decorators = [(0, common_1.Get)('analytics/revenue-trend')];
        _getBookingTrend_decorators = [(0, common_1.Get)('analytics/booking-trend')];
        _getServicePopularity_decorators = [(0, common_1.Get)('analytics/service-popularity')];
        _getWorkerPerformance_decorators = [(0, common_1.Get)('analytics/worker-performance')];
        _getCustomerRetention_decorators = [(0, common_1.Get)('analytics/customer-retention')];
        _getWorkerLocations_decorators = [(0, common_1.Get)('monitoring/workers/locations')];
        _getActiveBookings_decorators = [(0, common_1.Get)('monitoring/bookings/active')];
        _getAssignmentMetrics_decorators = [(0, common_1.Get)('metrics/assignments')];
        __esDecorate(_classThis, null, _getDashboardStats_decorators, { kind: "method", name: "getDashboardStats", static: false, private: false, access: { has: function (obj) { return "getDashboardStats" in obj; }, get: function (obj) { return obj.getDashboardStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllWorkers_decorators, { kind: "method", name: "getAllWorkers", static: false, private: false, access: { has: function (obj) { return "getAllWorkers" in obj; }, get: function (obj) { return obj.getAllWorkers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWorkerById_decorators, { kind: "method", name: "getWorkerById", static: false, private: false, access: { has: function (obj) { return "getWorkerById" in obj; }, get: function (obj) { return obj.getWorkerById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateWorker_decorators, { kind: "method", name: "updateWorker", static: false, private: false, access: { has: function (obj) { return "updateWorker" in obj; }, get: function (obj) { return obj.updateWorker; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleWorkerAvailability_decorators, { kind: "method", name: "toggleWorkerAvailability", static: false, private: false, access: { has: function (obj) { return "toggleWorkerAvailability" in obj; }, get: function (obj) { return obj.toggleWorkerAvailability; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllBookings_decorators, { kind: "method", name: "getAllBookings", static: false, private: false, access: { has: function (obj) { return "getAllBookings" in obj; }, get: function (obj) { return obj.getAllBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnassignedBookings_decorators, { kind: "method", name: "getUnassignedBookings", static: false, private: false, access: { has: function (obj) { return "getUnassignedBookings" in obj; }, get: function (obj) { return obj.getUnassignedBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBookingById_decorators, { kind: "method", name: "getBookingById", static: false, private: false, access: { has: function (obj) { return "getBookingById" in obj; }, get: function (obj) { return obj.getBookingById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateBookingStatus_decorators, { kind: "method", name: "updateBookingStatus", static: false, private: false, access: { has: function (obj) { return "updateBookingStatus" in obj; }, get: function (obj) { return obj.updateBookingStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelBooking_decorators, { kind: "method", name: "cancelBooking", static: false, private: false, access: { has: function (obj) { return "cancelBooking" in obj; }, get: function (obj) { return obj.cancelBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignBooking_decorators, { kind: "method", name: "assignBooking", static: false, private: false, access: { has: function (obj) { return "assignBooking" in obj; }, get: function (obj) { return obj.assignBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRevenueAnalytics_decorators, { kind: "method", name: "getRevenueAnalytics", static: false, private: false, access: { has: function (obj) { return "getRevenueAnalytics" in obj; }, get: function (obj) { return obj.getRevenueAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBookingAnalytics_decorators, { kind: "method", name: "getBookingAnalytics", static: false, private: false, access: { has: function (obj) { return "getBookingAnalytics" in obj; }, get: function (obj) { return obj.getBookingAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllUsers_decorators, { kind: "method", name: "getAllUsers", static: false, private: false, access: { has: function (obj) { return "getAllUsers" in obj; }, get: function (obj) { return obj.getAllUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserById_decorators, { kind: "method", name: "getUserById", static: false, private: false, access: { has: function (obj) { return "getUserById" in obj; }, get: function (obj) { return obj.getUserById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createWorkerProfileByEmail_decorators, { kind: "method", name: "createWorkerProfileByEmail", static: false, private: false, access: { has: function (obj) { return "createWorkerProfileByEmail" in obj; }, get: function (obj) { return obj.createWorkerProfileByEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRevenueTrend_decorators, { kind: "method", name: "getRevenueTrend", static: false, private: false, access: { has: function (obj) { return "getRevenueTrend" in obj; }, get: function (obj) { return obj.getRevenueTrend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBookingTrend_decorators, { kind: "method", name: "getBookingTrend", static: false, private: false, access: { has: function (obj) { return "getBookingTrend" in obj; }, get: function (obj) { return obj.getBookingTrend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getServicePopularity_decorators, { kind: "method", name: "getServicePopularity", static: false, private: false, access: { has: function (obj) { return "getServicePopularity" in obj; }, get: function (obj) { return obj.getServicePopularity; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWorkerPerformance_decorators, { kind: "method", name: "getWorkerPerformance", static: false, private: false, access: { has: function (obj) { return "getWorkerPerformance" in obj; }, get: function (obj) { return obj.getWorkerPerformance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCustomerRetention_decorators, { kind: "method", name: "getCustomerRetention", static: false, private: false, access: { has: function (obj) { return "getCustomerRetention" in obj; }, get: function (obj) { return obj.getCustomerRetention; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWorkerLocations_decorators, { kind: "method", name: "getWorkerLocations", static: false, private: false, access: { has: function (obj) { return "getWorkerLocations" in obj; }, get: function (obj) { return obj.getWorkerLocations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActiveBookings_decorators, { kind: "method", name: "getActiveBookings", static: false, private: false, access: { has: function (obj) { return "getActiveBookings" in obj; }, get: function (obj) { return obj.getActiveBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAssignmentMetrics_decorators, { kind: "method", name: "getAssignmentMetrics", static: false, private: false, access: { has: function (obj) { return "getAssignmentMetrics" in obj; }, get: function (obj) { return obj.getAssignmentMetrics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminController = _classThis;
}();
exports.AdminController = AdminController;
