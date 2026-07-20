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
exports.AdminService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var user_entity_1 = require("../users/entities/user.entity");
var subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
var AdminService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminService = _classThis = /** @class */ (function () {
        function AdminService_1(workersRepository, bookingsRepository, usersRepository, subscriptionsRepository, servicesRepository) {
            this.workersRepository = workersRepository;
            this.bookingsRepository = bookingsRepository;
            this.usersRepository = usersRepository;
            this.subscriptionsRepository = subscriptionsRepository;
            this.servicesRepository = servicesRepository;
        }
        // ============================================
        // Dashboard Statistics
        // ============================================
        /**
         * Get comprehensive dashboard statistics
         */
        AdminService_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalUsers, totalWorkers, totalBookings, revenueResult, totalRevenue, activeSubscriptions, pendingAssignments, now, todayLocal, startOfToday, endOfToday, completedJobsToday, todayStart, todayEnd, todayBookings, ratingResult, averageRating, bookingsByStatus, statusMap, _i, bookingsByStatus_1, row, sixMonthsAgo, revenueByMonth, topWorkers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.count({
                                where: { role: user_entity_1.UserRole.USER },
                            })];
                        case 1:
                            totalUsers = _a.sent();
                            return [4 /*yield*/, this.workersRepository.count()];
                        case 2:
                            totalWorkers = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count()];
                        case 3:
                            totalBookings = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .getRawOne()];
                        case 4:
                            revenueResult = _a.sent();
                            totalRevenue = parseFloat((revenueResult === null || revenueResult === void 0 ? void 0 : revenueResult.total) || '0');
                            return [4 /*yield*/, this.subscriptionsRepository.count({
                                    where: { status: subscription_entity_1.SubscriptionStatus.ACTIVE },
                                })];
                        case 5:
                            activeSubscriptions = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { status: booking_entity_1.BookingStatus.PENDING },
                                })];
                        case 6:
                            pendingAssignments = _a.sent();
                            now = new Date();
                            todayLocal = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
                            todayLocal.setUTCHours(0, 0, 0, 0);
                            startOfToday = new Date(todayLocal.getTime() - (5.5 * 60 * 60 * 1000));
                            endOfToday = new Date(startOfToday.getTime() + (24 * 60 * 60 * 1000) - 1);
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: {
                                        status: booking_entity_1.BookingStatus.COMPLETED,
                                        updatedAt: (0, typeorm_1.Between)(startOfToday, endOfToday),
                                    },
                                })];
                        case 7:
                            completedJobsToday = _a.sent();
                            todayStart = new Date(now);
                            todayStart.setUTCHours(0, 0, 0, 0);
                            todayStart.setTime(todayStart.getTime() - (5.5 * 60 * 60 * 1000));
                            todayEnd = new Date(todayStart);
                            todayEnd.setTime(todayEnd.getTime() + (24 * 60 * 60 * 1000) - 1);
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: {
                                        createdAt: (0, typeorm_1.Between)(todayStart, todayEnd),
                                    },
                                })];
                        case 8:
                            todayBookings = _a.sent();
                            return [4 /*yield*/, this.workersRepository
                                    .createQueryBuilder('worker')
                                    .select('AVG(worker.rating)', 'avg')
                                    .where('worker.rating IS NOT NULL')
                                    .getRawOne()];
                        case 9:
                            ratingResult = _a.sent();
                            averageRating = parseFloat((ratingResult === null || ratingResult === void 0 ? void 0 : ratingResult.avg) || '0');
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('booking.status', 'status')
                                    .addSelect('COUNT(*)', 'count')
                                    .groupBy('booking.status')
                                    .getRawMany()];
                        case 10:
                            bookingsByStatus = _a.sent();
                            statusMap = {};
                            for (_i = 0, bookingsByStatus_1 = bookingsByStatus; _i < bookingsByStatus_1.length; _i++) {
                                row = bookingsByStatus_1[_i];
                                statusMap[row.status] = parseInt(row.count, 10);
                            }
                            sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select("TO_CHAR(booking.date, 'YYYY-MM')", 'month')
                                    .addSelect('SUM(booking.amount)', 'revenue')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.date >= :date', { date: sixMonthsAgo.toISOString().split('T')[0] })
                                    .groupBy("TO_CHAR(booking.date, 'YYYY-MM')")
                                    .orderBy('month', 'ASC')
                                    .getRawMany()];
                        case 11:
                            revenueByMonth = _a.sent();
                            return [4 /*yield*/, this.workersRepository
                                    .createQueryBuilder('worker')
                                    .leftJoin('worker.user', 'user')
                                    .select('worker.id', 'id')
                                    .addSelect('CONCAT(user.firstName, \' \', user.lastName)', 'name')
                                    .addSelect(function (qb) {
                                    return qb
                                        .from(booking_entity_1.Booking, 'b')
                                        .select('COUNT(*)')
                                        .where('b.workerId = worker.id')
                                        .andWhere('b.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED });
                                }, 'completedJobs')
                                    .addSelect('worker.rating', 'rating')
                                    .orderBy('rating', 'DESC')
                                    .limit(10)
                                    .getRawMany()];
                        case 12:
                            topWorkers = _a.sent();
                            return [2 /*return*/, {
                                    totalUsers: totalUsers,
                                    totalWorkers: totalWorkers,
                                    totalBookings: totalBookings,
                                    totalRevenue: totalRevenue,
                                    activeSubscriptions: activeSubscriptions,
                                    pendingAssignments: pendingAssignments,
                                    completedJobsToday: completedJobsToday,
                                    todayBookings: todayBookings,
                                    averageRating: Math.round(averageRating * 10) / 10,
                                    bookingsByStatus: statusMap,
                                    revenueByMonth: revenueByMonth,
                                    topWorkers: topWorkers,
                                }];
                    }
                });
            });
        };
        // ============================================
        // Worker Management
        // ============================================
        /**
         * Get all workers with filters
         */
        AdminService_1.prototype.getAllWorkers = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    query = this.workersRepository
                        .createQueryBuilder('worker')
                        .leftJoinAndSelect('worker.user', 'user')
                        .leftJoinAndSelect('worker.services', 'services');
                    if ((filters === null || filters === void 0 ? void 0 : filters.isAvailable) !== undefined) {
                        query.andWhere('worker.isAvailable = :isAvailable', {
                            isAvailable: filters.isAvailable,
                        });
                    }
                    if ((filters === null || filters === void 0 ? void 0 : filters.minRating) !== undefined) {
                        query.andWhere('worker.rating >= :minRating', {
                            minRating: filters.minRating,
                        });
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.serviceId) {
                        query.innerJoin('worker.services', 'services')
                            .andWhere('services.publicId = :serviceId', {
                            serviceId: filters.serviceId,
                        });
                    }
                    return [2 /*return*/, query.getMany()];
                });
            });
        };
        /**
         * Get worker by ID
         */
        AdminService_1.prototype.getWorkerById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.workersRepository.findOne({
                            where: { id: id },
                            relations: ['user', 'services'],
                        })];
                });
            });
        };
        /**
         * Update worker details
         */
        AdminService_1.prototype.updateWorker = function (id, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, services, _i, _a, serviceId, service;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({
                                where: { id: id },
                                relations: ['services'],
                            })];
                        case 1:
                            worker = _b.sent();
                            if (!worker)
                                return [2 /*return*/, null];
                            if (!updates.serviceIds) return [3 /*break*/, 6];
                            services = [];
                            _i = 0, _a = updates.serviceIds;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            serviceId = _a[_i];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: parseInt(serviceId.toString(), 10) },
                                })];
                        case 3:
                            service = _b.sent();
                            if (service)
                                services.push(service);
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            worker.services = services;
                            _b.label = 6;
                        case 6:
                            if (updates.bio !== undefined)
                                worker.bio = updates.bio;
                            if (updates.rating !== undefined)
                                worker.rating = updates.rating;
                            if (updates.reviewCount !== undefined)
                                worker.reviewCount = parseInt(updates.reviewCount.toString(), 10);
                            if (updates.yearsOfExperience !== undefined)
                                worker.yearsOfExperience = parseInt(updates.yearsOfExperience.toString(), 10);
                            if (updates.homesServedInArea !== undefined)
                                worker.homesServedInArea = parseInt(updates.homesServedInArea.toString(), 10);
                            if (updates.reliabilityStreak !== undefined)
                                worker.reliabilityStreak = parseInt(updates.reliabilityStreak.toString(), 10);
                            if (updates.isVerified !== undefined)
                                worker.isVerified = updates.isVerified;
                            if (updates.isTrained !== undefined)
                                worker.isTrained = updates.isTrained;
                            if (updates.isMonitored !== undefined)
                                worker.isMonitored = updates.isMonitored;
                            if (updates.isAvailable !== undefined)
                                worker.isAvailable = updates.isAvailable;
                            if (updates.serviceRadiusKm !== undefined)
                                worker.serviceRadiusKm = parseFloat(updates.serviceRadiusKm.toString());
                            if (updates.isActive !== undefined)
                                worker.isActive = updates.isActive;
                            return [4 /*yield*/, this.workersRepository.save(worker)];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, this.workersRepository.findOne({
                                    where: { id: id },
                                    relations: ['user', 'services'],
                                })];
                    }
                });
            });
        };
        /**
         * Toggle worker availability
         */
        AdminService_1.prototype.toggleWorkerAvailability = function (id, isAvailable) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.update(id, { isAvailable: isAvailable })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.workersRepository.findOne({
                                    where: { id: id },
                                    relations: ['user', 'services'],
                                })];
                    }
                });
            });
        };
        // ============================================
        // Booking Management
        // ============================================
        /**
         * Get all bookings with filters
         */
        AdminService_1.prototype.getAllBookings = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var query, page, limit, _a, bookings, total, mappedBookings;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            query = this.bookingsRepository
                                .createQueryBuilder('booking')
                                .leftJoinAndSelect('booking.user', 'user')
                                .leftJoinAndSelect('user.addresses', 'userAddresses')
                                .leftJoinAndSelect('booking.worker', 'worker')
                                .leftJoinAndSelect('booking.assignedWorker', 'assignedWorker')
                                .leftJoinAndSelect('worker.user', 'workerUser')
                                .leftJoinAndSelect('assignedWorker.user', 'assignedWorkerUser')
                                .leftJoinAndSelect('booking.service', 'service')
                                .leftJoinAndSelect('booking.slot', 'slot');
                            if (filters === null || filters === void 0 ? void 0 : filters.status) {
                                query.andWhere('booking.status = :status', { status: filters.status });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.startDate) {
                                query.andWhere('booking.date >= :startDate', { startDate: filters.startDate });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.endDate) {
                                query.andWhere('booking.date <= :endDate', { endDate: filters.endDate });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.workerId) {
                                query.andWhere('booking.workerId = :workerId', { workerId: filters.workerId });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.userId) {
                                query.andWhere('booking.userId = :userId', { userId: filters.userId });
                            }
                            query.orderBy('booking.date', 'DESC').addOrderBy('booking.startTime', 'DESC');
                            page = (filters === null || filters === void 0 ? void 0 : filters.page) || 1;
                            limit = (filters === null || filters === void 0 ? void 0 : filters.limit) || 20;
                            if (page && limit) {
                                query.skip((page - 1) * limit).take(limit);
                            }
                            return [4 /*yield*/, query.getManyAndCount()];
                        case 1:
                            _a = _b.sent(), bookings = _a[0], total = _a[1];
                            mappedBookings = bookings.map(function (booking) {
                                var mapped = __assign({}, booking);
                                // Use new worker relation first, fallback to legacy assignedWorker for backwards compatibility
                                var activeWorker = booking.worker || booking.assignedWorker;
                                if (activeWorker) {
                                    mapped.workerId = activeWorker.id;
                                    mapped.worker = activeWorker;
                                    mapped.assignedWorker = activeWorker;
                                    // Check both possible user relation aliases (workerUser for new, assignedWorkerUser for legacy)
                                    var workerUserData = activeWorker.workerUser || activeWorker.assignedWorkerUser;
                                    // Add safe null check for worker user relation
                                    if (workerUserData) {
                                        var firstName = workerUserData.firstName || '';
                                        var lastName = workerUserData.lastName || '';
                                        mapped.workerName = "".concat(firstName, " ").concat(lastName).trim();
                                    }
                                    else {
                                        mapped.workerName = 'Unassigned';
                                    }
                                }
                                else {
                                    mapped.workerName = 'Unassigned';
                                }
                                return mapped;
                            });
                            // Return array directly for backwards compatibility with frontend
                            return [2 /*return*/, mappedBookings];
                    }
                });
            });
        };
        /**
         * Get booking by ID
         */
        AdminService_1.prototype.getBookingById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsRepository.findOne({
                            where: { id: id },
                            relations: ['user', 'worker', 'service', 'slot', 'payment'],
                        })];
                });
            });
        };
        /**
         * Update booking status
         */
        AdminService_1.prototype.updateBookingStatus = function (id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.update(id, { status: status })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.bookingsRepository.findOne({
                                    where: { id: id },
                                    relations: ['user', 'worker', 'service', 'slot'],
                                })];
                    }
                });
            });
        };
        /**
         * Cancel a booking
         */
        AdminService_1.prototype.cancelBooking = function (id, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.update(id, {
                                status: booking_entity_1.BookingStatus.CANCELLED,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.bookingsRepository.findOne({
                                    where: { id: id },
                                    relations: ['user', 'worker', 'service', 'slot'],
                                })];
                    }
                });
            });
        };
        /**
         * Get all unassigned bookings (workerId IS NULL)
         * Returns flattened data with customerName, serviceName, etc.
         */
        AdminService_1.prototype.getUnassignedBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository
                                .createQueryBuilder('booking')
                                .leftJoinAndSelect('booking.user', 'user')
                                .leftJoinAndSelect('booking.service', 'service')
                                .leftJoinAndSelect('booking.slot', 'slot')
                                .where('booking.workerId IS NULL')
                                .orWhere('booking.assignmentState = :state', { state: booking_entity_1.AssignmentState.PENDING })
                                .orderBy('booking.createdAt', 'DESC')
                                .getMany()];
                        case 1:
                            bookings = _a.sent();
                            // Flatten the data for frontend consumption
                            return [2 /*return*/, bookings.map(function (booking) {
                                    var _a, _b, _c, _d, _e;
                                    return (__assign(__assign({}, booking), { customerName: booking.user ? "".concat(booking.user.firstName || '', " ").concat(booking.user.lastName || '').trim() : 'Unknown Customer', customerPhone: ((_a = booking.user) === null || _a === void 0 ? void 0 : _a.phone) || '', customerAddress: ((_b = booking.location) === null || _b === void 0 ? void 0 : _b.address) || ((_c = booking.user) === null || _c === void 0 ? void 0 : _c.address) || '', serviceName: ((_d = booking.service) === null || _d === void 0 ? void 0 : _d.name) || 'N/A', serviceId: ((_e = booking.service) === null || _e === void 0 ? void 0 : _e.id) || booking.serviceId, 
                                        // Ensure startTime and endTime are properly formatted
                                        startTime: booking.startTime || '', endTime: booking.endTime || '', date: booking.date || '' }));
                                })];
                    }
                });
            });
        };
        /**
         * Manually assign a worker to a booking
         */
        AdminService_1.prototype.manualAssignBooking = function (bookingId, workerId, adminId, notes) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, hasService, updatedBooking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                relations: ['user', 'service'],
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException("Booking with ID ".concat(bookingId, " not found"));
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: workerId },
                                    relations: ['user', 'services'],
                                })];
                        case 2:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException("Worker with ID ".concat(workerId, " not found"));
                            }
                            // Check if worker provides the required service
                            if (booking.service && worker.services) {
                                hasService = worker.services.some(function (s) { return s.id === booking.service.id; });
                                if (!hasService) {
                                    throw new common_1.BadRequestException("Worker does not provide the required service: ".concat(booking.service.name));
                                }
                            }
                            // Update the booking
                            return [4 /*yield*/, this.bookingsRepository.update(bookingId, {
                                    workerId: workerId,
                                    assignedWorkerId: workerId,
                                    assignmentState: booking_entity_1.AssignmentState.ASSIGNED,
                                    status: booking_entity_1.BookingStatus.CONFIRMED,
                                })];
                        case 3:
                            // Update the booking
                            _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: bookingId },
                                    relations: ['user', 'worker', 'service', 'slot'],
                                })];
                        case 4:
                            updatedBooking = _a.sent();
                            return [2 /*return*/, updatedBooking];
                    }
                });
            });
        };
        // ============================================
        // Analytics
        // ============================================
        /**
         * Get revenue analytics
         */
        AdminService_1.prototype.getRevenueAnalytics = function () {
            return __awaiter(this, arguments, void 0, function (period) {
                var dateFormat, startDate, totalResult, totalRevenue, countResult, averagePerBooking, revenueByService, revenueByDate;
                if (period === void 0) { period = 'month'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            switch (period) {
                                case 'day':
                                    dateFormat = 'YYYY-MM-DD';
                                    startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
                                    break;
                                case 'week':
                                    dateFormat = 'YYYY-IW';
                                    startDate = new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000); // 12 weeks
                                    break;
                                case 'month':
                                    dateFormat = 'YYYY-MM';
                                    startDate = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000); // 12 months
                                    break;
                                case 'year':
                                    dateFormat = 'YYYY';
                                    startDate = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000); // 5 years
                                    break;
                            }
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .getRawOne()];
                        case 1:
                            totalResult = _a.sent();
                            totalRevenue = parseFloat((totalResult === null || totalResult === void 0 ? void 0 : totalResult.total) || '0');
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('COUNT(*)', 'count')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .getRawOne()];
                        case 2:
                            countResult = _a.sent();
                            averagePerBooking = totalRevenue / (parseInt((countResult === null || countResult === void 0 ? void 0 : countResult.count) || '1', 10) || 1);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoin('booking.service', 'service')
                                    .select('service.name', 'service')
                                    .addSelect('SUM(booking.amount)', 'revenue')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .groupBy('service.name')
                                    .orderBy('revenue', 'DESC')
                                    .getRawMany()];
                        case 3:
                            revenueByService = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select("TO_CHAR(booking.date, '".concat(dateFormat, "')"), 'date')
                                    .addSelect('SUM(booking.amount)', 'revenue')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.date >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
                                    .groupBy("TO_CHAR(booking.date, '".concat(dateFormat, "')"))
                                    .orderBy('date', 'ASC')
                                    .getRawMany()];
                        case 4:
                            revenueByDate = _a.sent();
                            return [2 /*return*/, {
                                    totalRevenue: Math.round(totalRevenue * 100) / 100,
                                    averagePerBooking: Math.round(averagePerBooking * 100) / 100,
                                    revenueByService: revenueByService,
                                    revenueByDate: revenueByDate,
                                }];
                    }
                });
            });
        };
        /**
         * Get revenue trend over specified number of days
         */
        AdminService_1.prototype.getRevenueTrend = function () {
            return __awaiter(this, arguments, void 0, function (days) {
                var startDate, revenueByDate, labels, data;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select("TO_CHAR(booking.date, 'YYYY-MM-DD')", 'date')
                                    .addSelect('SUM(booking.amount)', 'revenue')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.date >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
                                    .groupBy("TO_CHAR(booking.date, 'YYYY-MM-DD')")
                                    .orderBy('date', 'ASC')
                                    .getRawMany()];
                        case 1:
                            revenueByDate = _a.sent();
                            labels = revenueByDate.map(function (row) { return row.date; });
                            data = revenueByDate.map(function (row) { return parseFloat(row.revenue) || 0; });
                            return [2 /*return*/, {
                                    labels: labels,
                                    data: data,
                                    label: 'Revenue',
                                }];
                    }
                });
            });
        };
        /**
         * Get booking analytics
         */
        AdminService_1.prototype.getBookingAnalytics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalBookings, bookingsByStatus, bookingsByService, thirtyDaysAgo, bookingsByDate, completedCount, cancelledCount, completionRate, cancellationRate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.count()];
                        case 1:
                            totalBookings = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('booking.status', 'status')
                                    .addSelect('COUNT(*)', 'count')
                                    .groupBy('booking.status')
                                    .getRawMany()];
                        case 2:
                            bookingsByStatus = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoin('booking.service', 'service')
                                    .select('service.name', 'service')
                                    .addSelect('COUNT(*)', 'count')
                                    .groupBy('service.name')
                                    .orderBy('count', 'DESC')
                                    .getRawMany()];
                        case 3:
                            bookingsByService = _a.sent();
                            thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('TO_CHAR(booking.date, \'YYYY-MM-DD\')', 'date')
                                    .addSelect('COUNT(*)', 'count')
                                    .where('booking.date >= :date', { date: thirtyDaysAgo.toISOString().split('T')[0] })
                                    .groupBy('TO_CHAR(booking.date, \'YYYY-MM-DD\')')
                                    .orderBy('date', 'ASC')
                                    .getRawMany()];
                        case 4:
                            bookingsByDate = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { status: booking_entity_1.BookingStatus.COMPLETED },
                                })];
                        case 5:
                            completedCount = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { status: booking_entity_1.BookingStatus.CANCELLED },
                                })];
                        case 6:
                            cancelledCount = _a.sent();
                            completionRate = totalBookings > 0 ? (completedCount / totalBookings) * 100 : 0;
                            cancellationRate = totalBookings > 0 ? (cancelledCount / totalBookings) * 100 : 0;
                            return [2 /*return*/, {
                                    totalBookings: totalBookings,
                                    bookingsByStatus: bookingsByStatus,
                                    bookingsByService: bookingsByService,
                                    bookingsByDate: bookingsByDate,
                                    completionRate: Math.round(completionRate * 10) / 10,
                                    cancellationRate: Math.round(cancellationRate * 10) / 10,
                                }];
                    }
                });
            });
        };
        // ============================================
        // User Management
        // ============================================
        /**
         * Get all users
         */
        AdminService_1.prototype.getAllUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersRepository.find({
                            where: { role: user_entity_1.UserRole.USER },
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        /**
         * Get user by ID
         */
        AdminService_1.prototype.getUserById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersRepository.findOne({
                            where: { publicId: id },
                        })];
                });
            });
        };
        /**
         * Create worker profile for a user by email
         */
        AdminService_1.prototype.createWorkerProfileForUser = function (email, bio, serviceIds, latitude, longitude) {
            return __awaiter(this, void 0, void 0, function () {
                var user, existingWorker, services, _i, serviceIds_1, serviceId, service, worker, savedWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { email: email },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new Error("User not found with email: ".concat(email));
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { user: { id: user.id } },
                                })];
                        case 2:
                            existingWorker = _a.sent();
                            if (existingWorker) {
                                return [2 /*return*/, existingWorker];
                            }
                            services = [];
                            if (!(serviceIds && serviceIds.length > 0)) return [3 /*break*/, 6];
                            _i = 0, serviceIds_1 = serviceIds;
                            _a.label = 3;
                        case 3:
                            if (!(_i < serviceIds_1.length)) return [3 /*break*/, 6];
                            serviceId = serviceIds_1[_i];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: parseInt(serviceId, 10) },
                                })];
                        case 4:
                            service = _a.sent();
                            if (service) {
                                services.push(service);
                            }
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            worker = this.workersRepository.create({
                                user: { id: user.id },
                                bio: bio || '',
                                services: services,
                                latitude: latitude || 28.5804579,
                                longitude: longitude || 77.4392951,
                                currentLat: latitude || 28.5804579,
                                currentLng: longitude || 77.4392951,
                                isAvailable: true,
                            });
                            return [4 /*yield*/, this.workersRepository.save(worker)];
                        case 7:
                            savedWorker = _a.sent();
                            return [2 /*return*/, this.workersRepository.findOne({
                                    where: { id: savedWorker.id },
                                    relations: ['user', 'services'],
                                })];
                    }
                });
            });
        };
        // ===========================================
        // Assignment Metrics
        // ===========================================
        /**
         * Get assignment metrics
         */
        AdminService_1.prototype.getAssignmentMetrics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalAssignments, subscriptionAssignments, onDemandAssignments, scheduledAssignments, pendingAssignments, subscriptionPending, onDemandPending, failedAssignments, completedAssignments, successRate, avgAssignmentTime;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.count({
                                where: { workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                            })];
                        case 1:
                            totalAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()), type: booking_entity_1.BookingType.SUBSCRIPTION },
                                })];
                        case 2:
                            subscriptionAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()), type: booking_entity_1.BookingType.ON_DEMAND },
                                })];
                        case 3:
                            onDemandAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()), type: booking_entity_1.BookingType.SCHEDULED },
                                })];
                        case 4:
                            scheduledAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: [
                                        { workerId: (0, typeorm_1.IsNull)(), assignmentState: booking_entity_1.AssignmentState.PENDING },
                                        { workerId: (0, typeorm_1.IsNull)(), status: booking_entity_1.BookingStatus.PENDING },
                                    ],
                                })];
                        case 5:
                            pendingAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: [
                                        { workerId: (0, typeorm_1.IsNull)(), type: booking_entity_1.BookingType.SUBSCRIPTION, assignmentState: booking_entity_1.AssignmentState.PENDING },
                                        { workerId: (0, typeorm_1.IsNull)(), type: booking_entity_1.BookingType.SUBSCRIPTION, status: booking_entity_1.BookingStatus.PENDING },
                                    ],
                                })];
                        case 6:
                            subscriptionPending = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: [
                                        { workerId: (0, typeorm_1.IsNull)(), type: booking_entity_1.BookingType.ON_DEMAND, assignmentState: booking_entity_1.AssignmentState.PENDING },
                                        { workerId: (0, typeorm_1.IsNull)(), type: booking_entity_1.BookingType.ON_DEMAND, status: booking_entity_1.BookingStatus.PENDING },
                                    ],
                                })];
                        case 7:
                            onDemandPending = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { status: booking_entity_1.BookingStatus.CANCELLED, workerId: (0, typeorm_1.IsNull)() },
                                })];
                        case 8:
                            failedAssignments = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { status: booking_entity_1.BookingStatus.COMPLETED, workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                                })];
                        case 9:
                            completedAssignments = _a.sent();
                            successRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;
                            avgAssignmentTime = 15;
                            return [2 /*return*/, {
                                    totalAssignments: totalAssignments,
                                    avgAssignmentTime: avgAssignmentTime,
                                    successRate: Math.round(successRate * 10) / 10,
                                    pendingAssignments: pendingAssignments,
                                    failedAssignments: failedAssignments,
                                    subscriptionAssignments: subscriptionAssignments,
                                    onDemandAssignments: onDemandAssignments,
                                    scheduledAssignments: scheduledAssignments,
                                    subscriptionPending: subscriptionPending,
                                    onDemandPending: onDemandPending,
                                }];
                    }
                });
            });
        };
        // ===========================================
        // Live Monitoring Implementation
        // ===========================================
        /**
         * Get worker locations for real-time monitoring
         * Returns workers with their current location data
         */
        AdminService_1.prototype.getWorkerLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workers, workersWithLocations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository
                                .createQueryBuilder('worker')
                                .leftJoinAndSelect('worker.user', 'user')
                                .leftJoinAndSelect('worker.services', 'service')
                                .where('worker.isActive = :isActive', { isActive: true })
                                .getMany()];
                        case 1:
                            workers = _a.sent();
                            return [4 /*yield*/, Promise.all(workers.map(function (worker) { return __awaiter(_this, void 0, void 0, function () {
                                    var latitude, longitude, address;
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                latitude = worker.latitude;
                                                longitude = worker.longitude;
                                                if (!(!latitude || !longitude)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.usersRepository.manager
                                                        .createQueryBuilder()
                                                        .select('*')
                                                        .from('address', 'addr')
                                                        .where('addr.userId = :userId AND addr.isDefault = true', { userId: worker.userId })
                                                        .getOne()];
                                            case 1:
                                                address = _d.sent();
                                                if (address) {
                                                    latitude = address.latitude;
                                                    longitude = address.longitude;
                                                }
                                                _d.label = 2;
                                            case 2: return [2 /*return*/, {
                                                    workerId: worker.id,
                                                    workerName: worker.user ? "".concat(worker.user.firstName || '', " ").concat(worker.user.lastName || '').trim() : 'Unknown',
                                                    email: ((_a = worker.user) === null || _a === void 0 ? void 0 : _a.email) || '',
                                                    phone: ((_b = worker.user) === null || _b === void 0 ? void 0 : _b.phone) || '',
                                                    latitude: latitude ? Number(latitude) : null,
                                                    longitude: longitude ? Number(longitude) : null,
                                                    isAvailable: worker.isAvailable,
                                                    isActive: worker.isActive,
                                                    rating: worker.rating ? Number(worker.rating) : 0,
                                                    services: ((_c = worker.services) === null || _c === void 0 ? void 0 : _c.map(function (s) { return ({ id: s.id, name: s.name }); })) || [],
                                                }];
                                        }
                                    });
                                }); }))];
                        case 2:
                            workersWithLocations = _a.sent();
                            return [2 /*return*/, workersWithLocations];
                    }
                });
            });
        };
        /**
         * Get active bookings for real-time monitoring
         * Returns bookings that are pending, confirmed, or in_progress
         */
        AdminService_1.prototype.getActiveBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository
                                .createQueryBuilder('booking')
                                .leftJoinAndSelect('booking.user', 'user')
                                .leftJoinAndSelect('booking.worker', 'worker')
                                .leftJoinAndSelect('worker.user', 'workerUser')
                                .leftJoinAndSelect('booking.service', 'service')
                                .where('booking.status IN (:...statuses)', {
                                statuses: [booking_entity_1.BookingStatus.PENDING, booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.IN_PROGRESS],
                            })
                                .orWhere('booking.assignmentState = :state', { state: booking_entity_1.AssignmentState.PENDING })
                                .orderBy('booking.createdAt', 'DESC')
                                .getMany()];
                        case 1:
                            bookings = _a.sent();
                            return [2 /*return*/, bookings.map(function (booking) {
                                    var _a, _b, _c, _d;
                                    return ({
                                        id: booking.id,
                                        publicId: booking.publicId,
                                        customerName: booking.user ? "".concat(booking.user.firstName || '', " ").concat(booking.user.lastName || '').trim() : 'Unknown',
                                        customerPhone: ((_a = booking.user) === null || _a === void 0 ? void 0 : _a.phone) || '',
                                        workerName: booking.worker ? "".concat(((_b = booking.worker.user) === null || _b === void 0 ? void 0 : _b.firstName) || '', " ").concat(((_c = booking.worker.user) === null || _c === void 0 ? void 0 : _c.lastName) || '').trim() : 'Unassigned',
                                        serviceName: ((_d = booking.service) === null || _d === void 0 ? void 0 : _d.name) || 'N/A',
                                        date: booking.date,
                                        startTime: booking.startTime,
                                        endTime: booking.endTime,
                                        status: booking.status,
                                        assignmentState: booking.assignmentState,
                                        amount: booking.amount,
                                        location: booking.location,
                                        createdAt: booking.createdAt,
                                    });
                                })];
                    }
                });
            });
        };
        /**
         * Get booking trend over specified number of days
         */
        AdminService_1.prototype.getBookingTrend = function () {
            return __awaiter(this, arguments, void 0, function (days) {
                var startDate, bookingsByDate, labels, data;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select("TO_CHAR(booking.date, 'YYYY-MM-DD')", 'date')
                                    .addSelect('COUNT(*)', 'count')
                                    .where('booking.date >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
                                    .groupBy("TO_CHAR(booking.date, 'YYYY-MM-DD')")
                                    .orderBy('date', 'ASC')
                                    .getRawMany()];
                        case 1:
                            bookingsByDate = _a.sent();
                            labels = bookingsByDate.map(function (row) { return row.date; });
                            data = bookingsByDate.map(function (row) { return parseInt(row.count) || 0; });
                            return [2 /*return*/, {
                                    labels: labels,
                                    data: data,
                                    label: 'Bookings',
                                }];
                    }
                });
            });
        };
        /**
         * Get service popularity analytics
         */
        AdminService_1.prototype.getServicePopularity = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalBookings, servicePopularity, services;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.count()];
                        case 1:
                            totalBookings = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoin('booking.service', 'service')
                                    .select('service.name', 'name')
                                    .addSelect('COUNT(*)', 'count')
                                    .groupBy('service.name')
                                    .orderBy('count', 'DESC')
                                    .getRawMany()];
                        case 2:
                            servicePopularity = _a.sent();
                            services = servicePopularity.map(function (row) { return ({
                                name: row.name || 'Unknown',
                                bookingCount: parseInt(row.count) || 0,
                                percentage: totalBookings > 0 ? Math.round((parseInt(row.count) / totalBookings) * 1000) / 10 : 0,
                            }); });
                            return [2 /*return*/, { services: services }];
                    }
                });
            });
        };
        /**
         * Get worker performance analytics
         */
        AdminService_1.prototype.getWorkerPerformance = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository
                                .createQueryBuilder('worker')
                                .leftJoinAndSelect('worker.user', 'user')
                                .leftJoin('worker.bookings', 'booking')
                                .leftJoin('booking.service', 'service')
                                .select('worker.id', 'id')
                                .addSelect('CONCAT(user.firstName, \' \', user.lastName)', 'name')
                                .addSelect('worker.rating', 'rating')
                                .addSelect(function (qb) {
                                return qb
                                    .from(booking_entity_1.Booking, 'b')
                                    .select('COUNT(*)')
                                    .where('b.workerId = worker.id')
                                    .andWhere('b.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED });
                            }, 'completedJobs')
                                .addSelect(function (qb) {
                                return qb
                                    .from(booking_entity_1.Booking, 'b')
                                    .select('SUM(b.amount)')
                                    .where('b.workerId = worker.id')
                                    .andWhere('b.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED });
                            }, 'revenue')
                                .orderBy('"completedJobs"', 'DESC') // Quote alias to match case-sensitive SQL identifier
                                .limit(10)
                                .getRawMany()];
                        case 1:
                            workers = _a.sent();
                            return [2 /*return*/, {
                                    workers: workers.map(function (w) { return ({
                                        id: w.id,
                                        name: w.name || 'Unknown',
                                        completedJobs: parseInt(w.completedJobs) || 0,
                                        rating: parseFloat(w.rating) || 0,
                                        revenue: parseFloat(w.revenue) || 0,
                                    }); }),
                                }];
                    }
                });
            });
        };
        /**
         * Get customer retention analytics
         */
        AdminService_1.prototype.getCustomerRetention = function () {
            return __awaiter(this, void 0, void 0, function () {
                var customerBookings, totalCustomers, repeatCustomers, newCustomers, retentionRate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository
                                .createQueryBuilder('booking')
                                .select('booking.userId', 'userId')
                                .addSelect('COUNT(*)', 'bookingCount')
                                .groupBy('booking.userId')
                                .getRawMany()];
                        case 1:
                            customerBookings = _a.sent();
                            totalCustomers = customerBookings.length;
                            repeatCustomers = customerBookings.filter(function (c) { return parseInt(c.bookingCount) > 1; }).length;
                            newCustomers = totalCustomers - repeatCustomers;
                            retentionRate = totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 1000) / 10 : 0;
                            return [2 /*return*/, {
                                    retentionRate: retentionRate,
                                    repeatCustomers: repeatCustomers,
                                    newCustomers: newCustomers,
                                }];
                    }
                });
            });
        };
        return AdminService_1;
    }());
    __setFunctionName(_classThis, "AdminService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
}();
exports.AdminService = AdminService;
