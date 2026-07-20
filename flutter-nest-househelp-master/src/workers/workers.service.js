"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkersService = void 0;
var common_1 = require("@nestjs/common");
var worker_entity_1 = require("./entities/worker.entity");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var service_entity_1 = require("../services/entities/service.entity");
var WorkersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WorkersService = _classThis = /** @class */ (function () {
        function WorkersService_1(workersRepository, bookingsRepository, usersRepository, servicesRepository) {
            this.workersRepository = workersRepository;
            this.bookingsRepository = bookingsRepository;
            this.usersRepository = usersRepository;
            this.servicesRepository = servicesRepository;
            this.logger = new common_1.Logger(WorkersService.name);
            // DISABLED: Link workers to CLEANING service on startup
            // This was causing issues by adding Cleaning service to workers who didn't register for it
            // this.linkWorkersToCleaningService().catch(e =>
            //   this.logger.error('Failed to link workers to CLEANING service:', e)
            // );
        }
        WorkersService_1.prototype.linkWorkersToCleaningService = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cleaningService, workerIds, _i, workerIds_1, workerId, worker, existingLink, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { category: 'Cleaning' },
                                })];
                        case 1:
                            cleaningService = _a.sent();
                            if (!cleaningService) {
                                this.logger.warn('CLEANING service not found, skipping worker linking');
                                return [2 /*return*/];
                            }
                            workerIds = [1, 3, 4, 5, 15];
                            _i = 0, workerIds_1 = workerIds;
                            _a.label = 2;
                        case 2:
                            if (!(_i < workerIds_1.length)) return [3 /*break*/, 7];
                            workerId = workerIds_1[_i];
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: workerId },
                                })];
                        case 3:
                            worker = _a.sent();
                            if (!worker)
                                return [3 /*break*/, 6];
                            return [4 /*yield*/, this.workersRepository
                                    .createQueryBuilder('worker')
                                    .innerJoin('worker.services', 'service')
                                    .where('worker.id = :workerId', { workerId: workerId })
                                    .andWhere('service.id = :serviceId', { serviceId: cleaningService.id })
                                    .getOne()];
                        case 4:
                            existingLink = _a.sent();
                            if (!!existingLink) return [3 /*break*/, 6];
                            worker.services = __spreadArray(__spreadArray([], (worker.services || []), true), [cleaningService], false);
                            return [4 /*yield*/, this.workersRepository.save(worker)];
                        case 5:
                            _a.sent();
                            this.logger.log("Linked worker ".concat(workerId, " to CLEANING service"));
                            _a.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            e_1 = _a.sent();
                            this.logger.error('Error linking workers to CLEANING service:', e_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        WorkersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.workersRepository.find({ relations: ['user', 'services'] })];
                });
            });
        };
        WorkersService_1.prototype.create = function (userId, bio, serviceIds, latitude, longitude) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    worker = this.workersRepository.create({
                        userId: userId,
                        bio: bio,
                        services: serviceIds.map(function (id) { return ({ id: id }); }),
                        latitude: latitude,
                        longitude: longitude,
                        currentLat: latitude,
                        currentLng: longitude,
                        isAvailable: true,
                        availabilitySchedule: [],
                    });
                    return [2 /*return*/, this.workersRepository.save(worker)];
                });
            });
        };
        WorkersService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.workersRepository.findOne({
                            where: { id: id },
                            relations: ['user', 'services'],
                        })];
                });
            });
        };
        WorkersService_1.prototype.search = function (lat, long, radius) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.workersRepository
                            .createQueryBuilder('worker')
                            .leftJoinAndSelect('worker.user', 'user')
                            .leftJoinAndSelect('worker.services', 'services')
                            .where("(\n                6371 * acos(\n                    cos(radians(:lat)) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians(:long)) +\n                    sin(radians(:lat)) * sin(radians(user.latitude))\n                )\n            ) <= :radius", { lat: lat, long: long, radius: radius })
                            .getMany()];
                });
            });
        };
        WorkersService_1.prototype.updateRating = function (id, rating, reviewCount) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.update(id, { rating: rating, reviewCount: reviewCount })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WorkersService_1.prototype.findByService = function (serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceIdMap, actualServiceId;
                return __generator(this, function (_a) {
                    serviceIdMap = {
                        maid: '7ff3de68-1068-4cbf-8f9f-9d283bca1f5b', // Home Cleaning
                        cleaning: '7ff3de68-1068-4cbf-8f9f-9d283bca1f5b', // Home Cleaning
                        cooking: '7f8e4b5c-a883-4c6c-b348-f966508fd49d', // Cooking
                    };
                    actualServiceId = serviceIdMap[serviceId] || serviceId;
                    return [2 /*return*/, this.workersRepository
                            .createQueryBuilder('worker')
                            .leftJoinAndSelect('worker.user', 'user')
                            .leftJoinAndSelect('worker.services', 'services')
                            .where('services.publicId = :serviceId', { serviceId: actualServiceId })
                            .getMany()];
                });
            });
        };
        WorkersService_1.prototype.updateExistingWorkersWithDefaultLocation = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Set default location for existing workers without location data
                        return [4 /*yield*/, this.workersRepository
                                .createQueryBuilder()
                                .update(worker_entity_1.Worker)
                                .set({
                                latitude: 28.5804579,
                                longitude: 77.4392951,
                                currentLat: 28.5804579,
                                currentLng: 77.4392951,
                            })
                                .where('latitude IS NULL OR longitude IS NULL')
                                .execute()];
                        case 1:
                            // Set default location for existing workers without location data
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WorkersService_1.prototype.updateWorkerAvailability = function (id, isAvailable) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({ where: { id: id } })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker not found');
                            }
                            // Validate location data before allowing worker to be marked as available
                            if (isAvailable && (!worker.latitude || !worker.longitude)) {
                                throw new common_1.BadRequestException('Cannot mark worker as available without location data');
                            }
                            return [4 /*yield*/, this.workersRepository.update(id, { isAvailable: isAvailable })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.workersRepository.findOne({ where: { id: id } })];
                    }
                });
            });
        };
        // ============================================
        // NEW: Worker-specific endpoints for Worker App
        // ============================================
        /**
         * Get worker profile by user ID (from JWT token)
         */
        WorkersService_1.prototype.findByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var isUUID, user, worker, userIdNum, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            this.logger.debug("findByUserId called with userId: ".concat(userId, ", type: ").concat(typeof userId));
                            // DEFENSIVE: Handle null/undefined/empty userId to prevent NaN errors
                            if (!userId || typeof userId !== 'string' || userId === 'null' || userId === 'undefined') {
                                this.logger.warn("findByUserId called with invalid userId: ".concat(userId));
                                return [2 /*return*/, null];
                            }
                            isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
                            this.logger.debug("Is UUID? ".concat(isUUID));
                            if (!isUUID) return [3 /*break*/, 4];
                            // First find the user by their publicId, then find the worker
                            this.logger.debug("Looking up user by publicId: ".concat(userId));
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: userId },
                                })];
                        case 1:
                            user = _a.sent();
                            this.logger.debug("User found: ".concat(user ? "id=".concat(user.id) : 'null'));
                            if (!user) return [3 /*break*/, 3];
                            this.logger.debug("Looking up worker by userId: ".concat(user.id));
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { userId: user.id },
                                    relations: ['user', 'services'],
                                })];
                        case 2:
                            worker = _a.sent();
                            this.logger.debug("Worker found: ".concat(worker ? "id=".concat(worker.id) : 'null'));
                            if (worker)
                                return [2 /*return*/, worker];
                            _a.label = 3;
                        case 3:
                            // Also try finding worker directly by publicId (for backward compatibility)
                            this.logger.debug("Trying to find worker directly by publicId: ".concat(userId));
                            return [2 /*return*/, this.workersRepository.findOne({
                                    where: { publicId: userId },
                                    relations: ['user', 'services'],
                                })];
                        case 4:
                            // Fall back to finding by user.id (numeric)
                            this.logger.debug("Trying numeric userId: ".concat(userId));
                            userIdNum = parseInt(userId, 10);
                            this.logger.debug("Parsed numeric: ".concat(userIdNum, ", isNaN: ").concat(isNaN(userIdNum)));
                            if (!isNaN(userIdNum)) {
                                return [2 /*return*/, this.workersRepository.findOne({
                                        where: { userId: userIdNum },
                                        relations: ['user', 'services'],
                                    })];
                            }
                            this.logger.debug('No valid userId format, returning null');
                            return [2 /*return*/, null];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error("Error in findByUserId: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            return [2 /*return*/, null];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get bookings assigned to this worker
         * Uses QueryBuilder to properly handle integer ID comparison
         * Checks both assignedWorkerId (integer) and workerId (UUID for legacy/one-time bookings)
         */
        WorkersService_1.prototype.getWorkerBookings = function (workerId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder;
                return __generator(this, function (_a) {
                    queryBuilder = this.bookingsRepository
                        .createQueryBuilder('booking')
                        .leftJoinAndSelect('booking.user', 'user')
                        .leftJoinAndSelect('booking.service', 'service')
                        .leftJoinAndSelect('booking.slot', 'slot')
                        .leftJoinAndSelect('booking.subscription', 'subscription')
                        .addSelect('booking.location')
                        .where('(booking.assignedWorkerId = :workerId OR booking.workerId = :workerId)', { workerId: workerId });
                    // Add status filter if provided
                    if (status) {
                        queryBuilder.andWhere('booking.status = :status', { status: status });
                    }
                    queryBuilder.orderBy('booking.createdAt', 'DESC');
                    queryBuilder.limit(500); // Limit to prevent overwhelming the app
                    return [2 /*return*/, queryBuilder.getMany()];
                });
            });
        };
        /**
         * Get ONLY ACCEPTED / CONFIRMED bookings for this worker
         * Returns only bookings that have been explicitly accepted by the worker
         * Includes both subscription bookings AND one-time bookings
         * This is a dedicated endpoint for the "Ongoing Accepted Bookings" dashboard section
         */
        WorkersService_1.prototype.getAcceptedWorkerBookings = function (workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var acceptedStatuses, queryBuilder;
                return __generator(this, function (_a) {
                    acceptedStatuses = [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.IN_PROGRESS];
                    queryBuilder = this.bookingsRepository
                        .createQueryBuilder('booking')
                        .leftJoinAndSelect('booking.user', 'user')
                        .leftJoinAndSelect('booking.service', 'service')
                        .leftJoinAndSelect('booking.slot', 'slot')
                        .leftJoinAndSelect('booking.subscription', 'subscription')
                        .addSelect('booking.location')
                        .where('(booking.assignedWorkerId = :workerId OR booking.workerId = :workerId)', { workerId: workerId })
                        // Include both CONFIRMED and IN_PROGRESS statuses for accepted ongoing bookings
                        .andWhere('booking.status IN (:...statuses)', { statuses: acceptedStatuses });
                    queryBuilder.orderBy('booking.date', 'ASC'); // Sort by date, nearest first
                    queryBuilder.addOrderBy('booking.startTime', 'ASC');
                    queryBuilder.limit(100);
                    return [2 /*return*/, queryBuilder.getMany()];
                });
            });
        };
        /**
         * Get earnings summary for a worker
         */
        WorkersService_1.prototype.getWorkerEarnings = function (workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var now, firstDayOfMonth, firstDayOfLastMonth, lastDayOfLastMonth, totalResult, completedCount, pendingResult, thisMonthResult, lastMonthResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
                            firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
                            lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.workerId = :workerId', { workerId: workerId })
                                    .andWhere('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .getRawOne()];
                        case 1:
                            totalResult = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository.count({
                                    where: { workerId: workerId, status: booking_entity_1.BookingStatus.COMPLETED },
                                })];
                        case 2:
                            completedCount = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.workerId = :workerId', { workerId: workerId })
                                    .andWhere('booking.status IN (:...statuses)', { statuses: [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.IN_PROGRESS] })
                                    .getRawOne()];
                        case 3:
                            pendingResult = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.workerId = :workerId', { workerId: workerId })
                                    .andWhere('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.date >= :date', { date: firstDayOfMonth })
                                    .getRawOne()];
                        case 4:
                            thisMonthResult = _a.sent();
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('SUM(booking.amount)', 'total')
                                    .where('booking.workerId = :workerId', { workerId: workerId })
                                    .andWhere('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.date >= :startDate', { startDate: firstDayOfLastMonth })
                                    .andWhere('booking.date <= :endDate', { endDate: lastDayOfLastMonth })
                                    .getRawOne()];
                        case 5:
                            lastMonthResult = _a.sent();
                            return [2 /*return*/, {
                                    totalEarnings: parseFloat((totalResult === null || totalResult === void 0 ? void 0 : totalResult.total) || '0'),
                                    completedJobs: completedCount,
                                    pendingPayments: parseFloat((pendingResult === null || pendingResult === void 0 ? void 0 : pendingResult.total) || '0'),
                                    thisMonth: parseFloat((thisMonthResult === null || thisMonthResult === void 0 ? void 0 : thisMonthResult.total) || '0'),
                                    lastMonth: parseFloat((lastMonthResult === null || lastMonthResult === void 0 ? void 0 : lastMonthResult.total) || '0'),
                                }];
                    }
                });
            });
        };
        WorkersService_1.prototype.validateStateTransition = function (currentStatus, targetStatus) {
            var _a;
            // All valid booking status transitions defined in single source of truth
            var validTransitions = (_a = {},
                _a[booking_entity_1.BookingStatus.PENDING] = [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CANCELLED],
                _a[booking_entity_1.BookingStatus.REQUESTED] = [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CANCELLED],
                _a[booking_entity_1.BookingStatus.CONFIRMED] = [booking_entity_1.BookingStatus.IN_PROGRESS, booking_entity_1.BookingStatus.CANCELLED],
                _a[booking_entity_1.BookingStatus.IN_PROGRESS] = [booking_entity_1.BookingStatus.COMPLETED, booking_entity_1.BookingStatus.CANCELLED],
                _a[booking_entity_1.BookingStatus.COMPLETED] = [],
                _a[booking_entity_1.BookingStatus.CANCELLED] = [],
                _a);
            var allowedTransitions = validTransitions[currentStatus] || [];
            if (!allowedTransitions.includes(targetStatus)) {
                throw new common_1.BadRequestException("Invalid state transition: Cannot change booking status from ".concat(currentStatus, " to ").concat(targetStatus));
            }
        };
        /**
         * Accept a booking assignment
         */
        WorkersService_1.prototype.acceptBooking = function (bookingId, workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, isAssignedToWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                select: ['id', 'workerId', 'assignedWorkerId', 'status', 'location', 'userId', 'serviceId', 'date', 'startTime', 'endTime', 'amount', 'createdAt', 'updatedAt']
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException('Booking not found');
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 2:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker not found');
                            }
                            isAssignedToWorker = booking.workerId === workerId || booking.assignedWorkerId === workerId;
                            if (!isAssignedToWorker) {
                                throw new common_1.BadRequestException('Booking is not assigned to this worker');
                            }
                            this.validateStateTransition(booking.status, booking_entity_1.BookingStatus.CONFIRMED);
                            booking.status = booking_entity_1.BookingStatus.CONFIRMED;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        /**
         * Reject a booking assignment
         */
        WorkersService_1.prototype.rejectBooking = function (bookingId, workerId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, isAssignedToWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                select: ['id', 'workerId', 'assignedWorkerId', 'status', 'location', 'userId', 'serviceId', 'date', 'startTime', 'endTime', 'amount', 'createdAt', 'updatedAt']
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException('Booking not found');
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 2:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker not found');
                            }
                            isAssignedToWorker = booking.workerId === workerId || booking.assignedWorkerId === workerId;
                            if (!isAssignedToWorker) {
                                throw new common_1.BadRequestException('Booking is not assigned to this worker');
                            }
                            if (booking.status !== booking_entity_1.BookingStatus.PENDING && booking.status !== booking_entity_1.BookingStatus.REQUESTED) {
                                throw new common_1.BadRequestException('Booking cannot be rejected in current status');
                            }
                            // For reject, just mark as cancelled but keep the workerId
                            // The system will handle reassignment separately
                            booking.status = booking_entity_1.BookingStatus.CANCELLED;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        /**
         * Start a job (mark as in progress)
         */
        WorkersService_1.prototype.startBooking = function (bookingId, workerId, otp) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, isAssignedToWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                select: ['id', 'workerId', 'assignedWorkerId', 'status', 'location', 'userId', 'serviceId', 'date', 'startTime', 'endTime', 'amount', 'createdAt', 'updatedAt', 'otp', 'isOtpVerified']
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException('Booking not found');
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 2:
                            worker = _a.sent();
                            isAssignedToWorker = booking.workerId === workerId || booking.assignedWorkerId === workerId;
                            if (!isAssignedToWorker) {
                                throw new common_1.BadRequestException('Booking is not assigned to this worker');
                            }
                            // Allow starting from CONFIRMED or REQUESTED status (on-demand bookings may be REQUESTED)
                            if (booking.status !== booking_entity_1.BookingStatus.CONFIRMED && booking.status !== booking_entity_1.BookingStatus.REQUESTED) {
                                throw new common_1.BadRequestException('Booking must be confirmed before starting');
                            }
                            // OTP Validation
                            if (booking.otp && !booking.isOtpVerified) {
                                if (!otp) {
                                    throw new common_1.BadRequestException('An OTP is required to start this job.');
                                }
                                if (booking.otp !== otp) {
                                    throw new common_1.BadRequestException('Invalid OTP provided.');
                                }
                                booking.isOtpVerified = true;
                            }
                            booking.status = booking_entity_1.BookingStatus.IN_PROGRESS;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        /**
         * Complete a job
         */
        WorkersService_1.prototype.completeBooking = function (bookingId, workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, isAssignedToWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                select: ['id', 'workerId', 'assignedWorkerId', 'status', 'location', 'userId', 'serviceId', 'date', 'startTime', 'endTime', 'amount', 'createdAt', 'updatedAt']
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException('Booking not found');
                            }
                            return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 2:
                            worker = _a.sent();
                            isAssignedToWorker = booking.workerId === workerId || booking.assignedWorkerId === workerId;
                            if (!isAssignedToWorker) {
                                throw new common_1.BadRequestException('Booking is not assigned to this worker');
                            }
                            if (booking.status !== booking_entity_1.BookingStatus.IN_PROGRESS) {
                                throw new common_1.BadRequestException('Booking must be in progress to complete');
                            }
                            booking.status = booking_entity_1.BookingStatus.COMPLETED;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        /**
         * Update worker profile details
         */
        WorkersService_1.prototype.updateWorkerProfile = function (workerId, updateData) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new Error('Worker not found');
                            }
                            if (updateData.bio !== undefined) {
                                worker.bio = updateData.bio;
                            }
                            if (updateData.yearsOfExperience !== undefined) {
                                worker.yearsOfExperience = updateData.yearsOfExperience;
                            }
                            return [2 /*return*/, this.workersRepository.save(worker)];
                    }
                });
            });
        };
        /**
         * Update worker's service categories
         */
        WorkersService_1.prototype.updateWorkerServices = function (workerId, serviceCategories) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, servicesRepo, services, _i, serviceCategories_1, category, categoryMap, dbCategory, service;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({
                                where: { id: workerId },
                                relations: ['services'],
                            })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new Error('Worker not found');
                            }
                            servicesRepo = this.bookingsRepository.manager.getRepository(service_entity_1.Service);
                            services = [];
                            _i = 0, serviceCategories_1 = serviceCategories;
                            _a.label = 2;
                        case 2:
                            if (!(_i < serviceCategories_1.length)) return [3 /*break*/, 5];
                            category = serviceCategories_1[_i];
                            categoryMap = {
                                'CLEANING': 'Cleaning',
                                'COOKING': 'Cooking',
                                'MAID': 'Cleaning',
                                'HOME_CLEANING': 'Cleaning',
                                'COOK': 'Cooking',
                            };
                            dbCategory = categoryMap[category.toUpperCase()] || category;
                            return [4 /*yield*/, servicesRepo.findOne({
                                    where: { category: dbCategory }
                                })];
                        case 3:
                            service = _a.sent();
                            if (service) {
                                services.push(service);
                            }
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            worker.services = services;
                            return [2 /*return*/, this.workersRepository.save(worker)];
                    }
                });
            });
        };
        /**
         * Update worker's service area
         */
        WorkersService_1.prototype.updateWorkerServiceArea = function (workerId, serviceArea) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new Error('Worker not found');
                            }
                            worker.serviceAreaId = '67856b26-d323-4ead-95f2-1be8fa361704'; // Greater Noida - Greater Noida West
                            worker.latitude = serviceArea.latitude;
                            worker.longitude = serviceArea.longitude;
                            worker.currentLat = serviceArea.latitude;
                            worker.currentLng = serviceArea.longitude;
                            worker.currentLocationData = JSON.stringify({ address: serviceArea.address });
                            if (serviceArea.radiusKm) {
                                worker.serviceRadiusKm = serviceArea.radiusKm;
                            }
                            // Default to 25km if not specified
                            if (!serviceArea.radiusKm) {
                                worker.serviceRadiusKm = 25;
                            }
                            return [2 /*return*/, this.workersRepository.save(worker)];
                    }
                });
            });
        };
        /**
         * Get count of workers near a location
         * Used by home screen for "X verified professionals nearby" display
         */
        WorkersService_1.prototype.getNearbyWorkersCount = function (lat_1, long_1) {
            return __awaiter(this, arguments, void 0, function (lat, long, radius) {
                var count;
                if (radius === void 0) { radius = 5; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository
                                .createQueryBuilder('worker')
                                .leftJoin('worker.user', 'user')
                                .where("(\n          6371 * acos(\n            cos(radians(:lat)) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians(:long)) +\n            sin(radians(:lat)) * sin(radians(user.latitude))\n          )\n        ) <= :radius", { lat: lat, long: long, radius: radius })
                                .andWhere('worker.isAvailable = :isAvailable', { isAvailable: true })
                                .getCount()];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, count];
                    }
                });
            });
        };
        /**
         * Get worker statistics (average response time, etc.)
         * Used by home screen for "X min average arrival" display
         */
        WorkersService_1.prototype.getWorkerStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalWorkers, availableWorkers, avgResponseTimeResult, avgSeconds, avgResponseTime, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.count()];
                        case 1:
                            totalWorkers = _a.sent();
                            return [4 /*yield*/, this.workersRepository.count({
                                    where: { isAvailable: true },
                                })];
                        case 2:
                            availableWorkers = _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .select('AVG(EXTRACT(EPOCH FROM (booking.updatedAt - booking.createdAt)))', 'avgSeconds')
                                    .where('booking.status = :status', { status: booking_entity_1.BookingStatus.COMPLETED })
                                    .andWhere('booking.updatedAt IS NOT NULL')
                                    .getRawOne()];
                        case 4:
                            avgResponseTimeResult = _a.sent();
                            avgSeconds = parseFloat((avgResponseTimeResult === null || avgResponseTimeResult === void 0 ? void 0 : avgResponseTimeResult.avgSeconds) || '0');
                            avgResponseTime = Math.round(avgSeconds / 60) || 14;
                            return [2 /*return*/, {
                                    avgResponseTime: avgResponseTime,
                                    totalWorkers: totalWorkers,
                                    availableWorkers: availableWorkers,
                                }];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error("Error calculating worker stats: ".concat(error_2.message));
                            // Return defaults so the home screen doesn't break
                            return [2 /*return*/, {
                                    avgResponseTime: 14,
                                    totalWorkers: totalWorkers,
                                    availableWorkers: availableWorkers,
                                }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update worker's FCM token for push notifications
         */
        WorkersService_1.prototype.updateFcmToken = function (workerId, fcmToken) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, saved;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("updateFcmToken called for workerId: ".concat(workerId, ", token: ").concat(fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.substring(0, 20), "..."));
                            return [4 /*yield*/, this.workersRepository.findOne({ where: { id: workerId } })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                this.logger.error("Worker not found: ".concat(workerId));
                                throw new common_1.NotFoundException('Worker not found');
                            }
                            worker.fcmToken = fcmToken;
                            return [4 /*yield*/, this.workersRepository.save(worker)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("FCM token saved for worker: ".concat(workerId));
                            return [2 /*return*/, saved];
                    }
                });
            });
        };
        /**
         * Create a worker profile for a logged-in user
         * This is used when an existing user wants to become a worker
         *
         * @param userPublicId - The user's publicId (UUID) from JWT token
         * @param bio - Worker bio/description
         * @param serviceIds - Array of service IDs (UUIDs)
         * @param latitude - Worker's location latitude
         * @param longitude - Worker's location longitude
         */
        WorkersService_1.prototype.createWorkerProfile = function (userPublicId, bio, serviceIds, latitude, longitude) {
            return __awaiter(this, void 0, void 0, function () {
                var user, userIdToUse, numericId, allUsers, services, _i, serviceIds_1, serviceId, service, defaultSchedule, worker, savedWorker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Creating worker profile for user: ".concat(userPublicId));
                            // ============================================
                            // Priority 2: Validate required fields
                            // ============================================
                            // Validate bio (min 10 characters)
                            if (!bio || bio.length < 10) {
                                throw new Error('Bio is required and must be at least 10 characters');
                            }
                            // Validate location (latitude and longitude required)
                            if (latitude === undefined || longitude === undefined || latitude === null || longitude === null) {
                                throw new Error('Location is required (latitude and longitude)');
                            }
                            // Allow empty serviceIds for testing - use default service "Home Cleaning" UUID
                            if (!serviceIds || serviceIds.length === 0) {
                                this.logger.log('No services selected, using default service: Home Cleaning');
                                serviceIds = ['6138cfa5-4ffd-47cf-b55f-55d4c30a6c51'];
                            }
                            user = null;
                            userIdToUse = null;
                            if (!(userPublicId && userPublicId.includes('-'))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: userPublicId },
                                })];
                        case 1:
                            user = _a.sent();
                            if (user) {
                                this.logger.log("Found user by publicId: ".concat(user.id, " (").concat(user.email, ")"));
                                userIdToUse = user.id;
                            }
                            _a.label = 2;
                        case 2:
                            if (!(!user && userPublicId && !userPublicId.includes('-'))) return [3 /*break*/, 4];
                            numericId = parseInt(userPublicId, 10);
                            if (!!isNaN(numericId)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: numericId },
                                })];
                        case 3:
                            user = _a.sent();
                            if (user) {
                                this.logger.log("Found user by numeric id: ".concat(user.id, " (").concat(user.email, ")"));
                                userIdToUse = user.id;
                            }
                            _a.label = 4;
                        case 4:
                            if (!(!user && userPublicId && userPublicId.includes('@'))) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { email: userPublicId },
                                })];
                        case 5:
                            user = _a.sent();
                            if (user) {
                                this.logger.log("Found user by email: ".concat(user.id, " (").concat(user.email, ")"));
                                userIdToUse = user.id;
                            }
                            _a.label = 6;
                        case 6:
                            if (!!user) return [3 /*break*/, 8];
                            this.logger.error("User not found with any identifier: ".concat(userPublicId));
                            return [4 /*yield*/, this.usersRepository.find({ take: 5 })];
                        case 7:
                            allUsers = _a.sent();
                            this.logger.debug("Debug - Sample users in DB: ".concat(JSON.stringify(allUsers.map(function (u) { return ({ id: u.id, publicId: u.publicId, email: u.email }); }))));
                            throw new Error('User not found');
                        case 8:
                            this.logger.log("Found user: ".concat(user.id, " (").concat(user.email, ")"));
                            services = [];
                            if (!(serviceIds && serviceIds.length > 0)) return [3 /*break*/, 13];
                            _i = 0, serviceIds_1 = serviceIds;
                            _a.label = 9;
                        case 9:
                            if (!(_i < serviceIds_1.length)) return [3 /*break*/, 12];
                            serviceId = serviceIds_1[_i];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { publicId: serviceId }
                                })];
                        case 10:
                            service = _a.sent();
                            if (service) {
                                services.push(service);
                            }
                            _a.label = 11;
                        case 11:
                            _i++;
                            return [3 /*break*/, 9];
                        case 12:
                            this.logger.log("Loaded ".concat(services.length, " services for worker"));
                            _a.label = 13;
                        case 13:
                            defaultSchedule = [
                                { day: 1, startTime: '08:00', endTime: '20:00' }, // Monday
                                { day: 2, startTime: '08:00', endTime: '20:00' }, // Tuesday
                                { day: 3, startTime: '08:00', endTime: '20:00' }, // Wednesday
                                { day: 4, startTime: '08:00', endTime: '20:00' }, // Thursday
                                { day: 5, startTime: '08:00', endTime: '20:00' }, // Friday
                            ];
                            worker = this.workersRepository.create({
                                user: { id: user.id },
                                bio: bio,
                                services: services,
                                latitude: latitude,
                                longitude: longitude,
                                currentLat: latitude,
                                currentLng: longitude,
                                // Default 25km radius (like established workers)
                                serviceRadiusKm: 25,
                                // Default availability schedule
                                availabilitySchedule: defaultSchedule,
                                isAvailable: true,
                            });
                            return [4 /*yield*/, this.workersRepository.save(worker)];
                        case 14:
                            savedWorker = _a.sent();
                            this.logger.log("Worker profile created with ID: ".concat(savedWorker.id, " with 25km radius and default schedule"));
                            // Reload with relations
                            return [2 /*return*/, this.workersRepository.findOne({
                                    where: { id: savedWorker.id },
                                    relations: ['user', 'services'],
                                })];
                    }
                });
            });
        };
        return WorkersService_1;
    }());
    __setFunctionName(_classThis, "WorkersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WorkersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WorkersService = _classThis;
}();
exports.WorkersService = WorkersService;
