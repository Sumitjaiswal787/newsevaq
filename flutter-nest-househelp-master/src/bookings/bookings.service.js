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
exports.BookingsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var booking_entity_1 = require("./entities/booking.entity");
var worker_entity_1 = require("../workers/entities/worker.entity");
var booking_entity_2 = require("./entities/booking.entity");
var subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
var BookingsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookingsService = _classThis = /** @class */ (function () {
        function BookingsService_1(bookingsRepository, workersRepository, servicesRepository, usersRepository, serviceRequestsRepository, slotsService, notificationsService, dataSource, subscriptionWorkerSyncService, dailySlotGenerationScheduler) {
            this.bookingsRepository = bookingsRepository;
            this.workersRepository = workersRepository;
            this.servicesRepository = servicesRepository;
            this.usersRepository = usersRepository;
            this.serviceRequestsRepository = serviceRequestsRepository;
            this.slotsService = slotsService;
            this.notificationsService = notificationsService;
            this.dataSource = dataSource;
            this.subscriptionWorkerSyncService = subscriptionWorkerSyncService;
            this.dailySlotGenerationScheduler = dailySlotGenerationScheduler;
            this.logger = new common_1.Logger(BookingsService.name);
        }
        BookingsService_1.prototype.onApplicationBootstrap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_1, todayStr, subscriptions, _i, subscriptions_1, sub, workerId, subBookings, worker, _a, subBookings_1, booking, dateObj, parseTimeStr, startParsed, endParsed, startTimeDate, endTimeDate, slot, slotErr_1, bookings, lockedCount, _b, bookings_1, booking, dateObj, parseTimeStr, startParsed, endParsed, startTimeDate, endTimeDate, slot, err_2, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.logger.log('Running bootstrap slot generation first...');
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.dailySlotGenerationScheduler.handleHourlySlotGeneration()];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _c.sent();
                            this.logger.error("Bootstrap slot generation failed: ".concat(err_1.message));
                            return [3 /*break*/, 4];
                        case 4:
                            this.logger.log('Running bootstrap check for assigned bookings with missing locked slots...');
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 32, , 33]);
                            todayStr = new Date().toISOString().split('T')[0];
                            return [4 /*yield*/, this.dataSource.getRepository(subscription_entity_1.Subscription).find({
                                    where: {
                                        assignedWorkerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                                    },
                                })];
                        case 6:
                            subscriptions = _c.sent();
                            this.logger.log("Bootstrap: Found ".concat(subscriptions.length, " subscriptions with assigned workers. Syncing worker assignments to all future bookings..."));
                            _i = 0, subscriptions_1 = subscriptions;
                            _c.label = 7;
                        case 7:
                            if (!(_i < subscriptions_1.length)) return [3 /*break*/, 21];
                            sub = subscriptions_1[_i];
                            if (!sub.assignedWorkerId)
                                return [3 /*break*/, 20];
                            workerId = sub.assignedWorkerId;
                            return [4 /*yield*/, this.bookingsRepository.find({
                                    where: {
                                        subscriptionId: sub.id,
                                        status: (0, typeorm_1.In)([booking_entity_2.BookingStatus.REQUESTED, booking_entity_2.BookingStatus.CONFIRMED]),
                                        date: (0, typeorm_1.MoreThanOrEqual)(todayStr),
                                    },
                                })];
                        case 8:
                            subBookings = _c.sent();
                            return [4 /*yield*/, this.dataSource.getRepository(worker_entity_1.Worker).findOne({
                                    where: { id: workerId },
                                    relations: ['user'],
                                })];
                        case 9:
                            worker = _c.sent();
                            if (!worker)
                                return [3 /*break*/, 20];
                            _a = 0, subBookings_1 = subBookings;
                            _c.label = 10;
                        case 10:
                            if (!(_a < subBookings_1.length)) return [3 /*break*/, 20];
                            booking = subBookings_1[_a];
                            if (!(!booking.workerId || !booking.slotId)) return [3 /*break*/, 19];
                            booking.worker = worker;
                            booking.assignedWorkerId = workerId;
                            booking.assignmentState = booking_entity_2.AssignmentState.ASSIGNED;
                            _c.label = 11;
                        case 11:
                            _c.trys.push([11, 16, , 17]);
                            if (!(booking.date && booking.startTime && booking.endTime)) return [3 /*break*/, 15];
                            dateObj = new Date(booking.date);
                            parseTimeStr = function (timeStr) {
                                var parts = timeStr.split(':');
                                return {
                                    hours: parseInt(parts[0], 10),
                                    minutes: parseInt(parts[1] || '0', 10),
                                };
                            };
                            startParsed = parseTimeStr(String(booking.startTime));
                            endParsed = parseTimeStr(String(booking.endTime));
                            startTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startParsed.hours, startParsed.minutes, 0, 0);
                            endTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endParsed.hours, endParsed.minutes, 0, 0);
                            return [4 /*yield*/, this.slotsService.findAvailableSlotFlexible(workerId, startTimeDate, endTimeDate, true)];
                        case 12:
                            slot = _c.sent();
                            if (!slot) return [3 /*break*/, 14];
                            booking.slotId = slot.id;
                            booking.slot = slot;
                            return [4 /*yield*/, this.slotsService.bookSlotAtomic(slot.id)];
                        case 13:
                            _c.sent();
                            this.logger.log("Bootstrap: Locked slot ".concat(slot.id, " for subscription booking ").concat(booking.id, " under worker ").concat(workerId));
                            return [3 /*break*/, 15];
                        case 14:
                            this.logger.warn("Bootstrap: Could not find matching slot for worker ".concat(workerId, " on ").concat(booking.date, " at ").concat(booking.startTime));
                            _c.label = 15;
                        case 15: return [3 /*break*/, 17];
                        case 16:
                            slotErr_1 = _c.sent();
                            this.logger.error("Bootstrap: Error locking slot: ".concat(slotErr_1.message));
                            return [3 /*break*/, 17];
                        case 17: return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 18:
                            _c.sent();
                            _c.label = 19;
                        case 19:
                            _a++;
                            return [3 /*break*/, 10];
                        case 20:
                            _i++;
                            return [3 /*break*/, 7];
                        case 21: return [4 /*yield*/, this.bookingsRepository.find({
                                where: {
                                    workerId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                                    slotId: (0, typeorm_1.IsNull)(),
                                    status: (0, typeorm_1.In)([booking_entity_2.BookingStatus.REQUESTED, booking_entity_2.BookingStatus.CONFIRMED]),
                                    date: (0, typeorm_1.MoreThanOrEqual)(todayStr),
                                },
                            })];
                        case 22:
                            bookings = _c.sent();
                            this.logger.log("Found ".concat(bookings.length, " remaining future bookings with assigned workers but missing slotIds."));
                            lockedCount = 0;
                            _b = 0, bookings_1 = bookings;
                            _c.label = 23;
                        case 23:
                            if (!(_b < bookings_1.length)) return [3 /*break*/, 31];
                            booking = bookings_1[_b];
                            if (!(booking.date && booking.startTime && booking.endTime && booking.workerId)) return [3 /*break*/, 30];
                            _c.label = 24;
                        case 24:
                            _c.trys.push([24, 29, , 30]);
                            dateObj = new Date(booking.date);
                            parseTimeStr = function (timeStr) {
                                var parts = timeStr.split(':');
                                return {
                                    hours: parseInt(parts[0], 10),
                                    minutes: parseInt(parts[1] || '0', 10),
                                };
                            };
                            startParsed = parseTimeStr(String(booking.startTime));
                            endParsed = parseTimeStr(String(booking.endTime));
                            startTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startParsed.hours, startParsed.minutes, 0, 0);
                            endTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endParsed.hours, endParsed.minutes, 0, 0);
                            return [4 /*yield*/, this.slotsService.findAvailableSlotFlexible(booking.workerId, startTimeDate, endTimeDate, true)];
                        case 25:
                            slot = _c.sent();
                            if (!slot) return [3 /*break*/, 28];
                            return [4 /*yield*/, this.bookingsRepository.update(booking.id, {
                                    slotId: slot.id,
                                })];
                        case 26:
                            _c.sent();
                            return [4 /*yield*/, this.slotsService.bookSlotAtomic(slot.id)];
                        case 27:
                            _c.sent();
                            lockedCount++;
                            this.logger.log("Bootstrap: Locked slot ".concat(slot.id, " for booking ").concat(booking.id, " under worker ").concat(booking.workerId));
                            _c.label = 28;
                        case 28: return [3 /*break*/, 30];
                        case 29:
                            err_2 = _c.sent();
                            this.logger.error("Bootstrap: Error processing booking ".concat(booking.id, ": ").concat(err_2.message));
                            return [3 /*break*/, 30];
                        case 30:
                            _b++;
                            return [3 /*break*/, 23];
                        case 31:
                            this.logger.log("Bootstrap check complete: ".concat(lockedCount, " slots locked."));
                            return [3 /*break*/, 33];
                        case 32:
                            error_1 = _c.sent();
                            this.logger.error("Bootstrap check failed: ".concat(error_1.message));
                            return [3 /*break*/, 33];
                        case 33: return [2 /*return*/];
                    }
                });
            });
        };
        BookingsService_1.prototype.findBestWorker = function (serviceId, userLat, userLng, startTime, endTime) {
            return __awaiter(this, void 0, void 0, function () {
                var workers, workerIds, availableSlots, slotMap, scoredWorkers, availableWorkers;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository
                                .createQueryBuilder('worker')
                                .leftJoinAndSelect('worker.user', 'user')
                                .leftJoinAndSelect('worker.services', 'services')
                                .where('services.id = :serviceId', { serviceId: serviceId })
                                .andWhere('user.latitude IS NOT NULL')
                                .andWhere('user.longitude IS NOT NULL')
                                .getMany()];
                        case 1:
                            workers = _a.sent();
                            if (workers.length === 0) {
                                throw new common_1.BadRequestException('No workers available for this service');
                            }
                            workerIds = workers.map(function (w) { return w.id; });
                            return [4 /*yield*/, this.slotsService.findAvailableSlotsForWorkers(workerIds, startTime, endTime)];
                        case 2:
                            availableSlots = _a.sent();
                            slotMap = new Map(availableSlots.map(function (s) { return [s.workerId, s]; }));
                            scoredWorkers = workers.map(function (worker) {
                                var user = worker.user;
                                if (!user.latitude || !user.longitude)
                                    return null;
                                // Check availability from pre-fetched slots
                                var availableSlot = slotMap.get(worker.id);
                                if (!availableSlot)
                                    return null;
                                // Calculate distance (Haversine formula)
                                var distance = _this.calculateDistance(userLat, userLng, user.latitude, user.longitude);
                                // Calculate score (lower is better)
                                var distanceScore = distance * 0.4; // 40% weight
                                var ratingScore = (5 - worker.rating) * 10 * 0.3; // 30% weight (invert rating)
                                var reviewScore = (100 - Math.min(worker.reviewCount, 100)) * 0.3; // 30% weight
                                var totalScore = distanceScore + ratingScore + reviewScore;
                                return {
                                    worker: worker,
                                    distance: distance,
                                    score: totalScore,
                                    slot: availableSlot,
                                };
                            });
                            availableWorkers = scoredWorkers
                                .filter(function (w) { return w !== null; })
                                .sort(function (a, b) { return a.score - b.score; });
                            if (availableWorkers.length === 0) {
                                throw new common_1.BadRequestException('No workers available at the requested time');
                            }
                            return [2 /*return*/, availableWorkers[0]]; // Return best match
                    }
                });
            });
        };
        BookingsService_1.prototype.calculateDistance = function (lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the Earth in km
            var dLat = this.deg2rad(lat2 - lat1);
            var dLon = this.deg2rad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) *
                    Math.cos(this.deg2rad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };
        BookingsService_1.prototype.deg2rad = function (deg) {
            return deg * (Math.PI / 180);
        };
        BookingsService_1.prototype.create = function (createBookingDto) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, serviceRequest, serviceUser, serviceReqDate, startHour, endHour, date, user, service, parseTimeToCompare, now, workerToAssign, amount, service, basePrice, parseTimeToHours, startHours, endHours, durationHours, parseTimeForStorage, generatedOtp, bookingType, bookingData, _a, booking, savedBooking, bookingToReturn, userIdValue, user, savedBookingWithService, notifyError_1, errorMessage, workerWithUser, savedBookingWithService, workerNotifyError_1, errorMessage, fullBooking, error_2;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 44, , 45]);
                            worker = null;
                            if (!createBookingDto.serviceRequestId) return [3 /*break*/, 6];
                            serviceRequest = void 0;
                            if (!(createBookingDto.serviceRequestId.length === 36 &&
                                createBookingDto.serviceRequestId.includes('-'))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.serviceRequestsRepository.findOne({
                                    where: { publicId: createBookingDto.serviceRequestId },
                                    relations: ['user', 'service'],
                                })];
                        case 1:
                            // It's a UUID (publicId)
                            serviceRequest = _c.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.serviceRequestsRepository.findOne({
                                where: { id: createBookingDto.serviceRequestId },
                                relations: ['user', 'service'],
                            })];
                        case 3:
                            // It's a string id (UUID)
                            serviceRequest = _c.sent();
                            _c.label = 4;
                        case 4:
                            if (!serviceRequest) {
                                throw new common_1.BadRequestException('Service request not found');
                            }
                            // Validate service request is not in FAILED_TO_ASSIGN state before creating booking
                            if (serviceRequest.assignmentStatus === 'FAILED_TO_ASSIGN') {
                                throw new common_1.BadRequestException('Service request failed to assign a worker. Please try again.');
                            }
                            // Populate booking with service request details
                            createBookingDto.serviceRequestId = serviceRequest.id; // Use UUID
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: serviceRequest.userId }
                                })];
                        case 5:
                            serviceUser = _c.sent();
                            if (!serviceUser) {
                                throw new common_1.BadRequestException('User associated with service request not found');
                            }
                            createBookingDto.userId = serviceUser.publicId; // Now using proper UUID publicId
                            createBookingDto.serviceId = serviceRequest.serviceId;
                            createBookingDto.workerId = serviceRequest.assignedWorkerId;
                            createBookingDto.slotId = serviceRequest.assignedSlotId;
                            // Use priceSnapshot from service request for booking amount
                            createBookingDto.amount = serviceRequest.priceSnapshot || createBookingDto.amount;
                            // Extract just the date portion (YYYY-MM-DD) from the service request date
                            if (serviceRequest.date) {
                                serviceReqDate = new Date(serviceRequest.date);
                                // Keep as Date object for DTO validation
                                createBookingDto.date = new Date(serviceReqDate.toISOString().split('T')[0] + 'T00:00:00.000Z');
                            }
                            else {
                                createBookingDto.date = serviceRequest.date;
                            }
                            startHour = void 0;
                            endHour = void 0;
                            switch (serviceRequest.timeWindow.toLowerCase()) {
                                case 'morning':
                                    startHour = 8;
                                    endHour = 12;
                                    break;
                                case 'afternoon':
                                    startHour = 12;
                                    endHour = 17;
                                    break;
                                case 'evening':
                                    startHour = 17;
                                    endHour = 21;
                                    break;
                                case 'early-morning':
                                    startHour = 2;
                                    endHour = 11;
                                    break;
                                default:
                                    startHour = 8;
                                    endHour = 12;
                            }
                            date = new Date(serviceRequest.date);
                            createBookingDto.startTime = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), startHour, 0, 0, 0));
                            createBookingDto.endTime = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), endHour, 0, 0, 0));
                            return [3 /*break*/, 11];
                        case 6: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { publicId: createBookingDto.userId },
                            })];
                        case 7:
                            user = _c.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('User not found');
                            }
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: createBookingDto.serviceId },
                                })];
                        case 8:
                            service = _c.sent();
                            if (!service) {
                                throw new common_1.BadRequestException('Service not found');
                            }
                            if (!createBookingDto.workerId) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: createBookingDto.workerId },
                                    relations: ['user', 'services'],
                                })];
                        case 9:
                            worker = _c.sent();
                            if (!worker) {
                                throw new common_1.BadRequestException('Worker not found');
                            }
                            _c.label = 10;
                        case 10:
                            parseTimeToCompare = function (time) {
                                if (typeof time === 'string') {
                                    if (time.includes('T')) {
                                        // ISO datetime string
                                        return new Date(time).getTime();
                                    }
                                    // Time string HH:mm:ss - compare as hours only
                                    var parts = time.split(':');
                                    var hours = parseInt(parts[0], 10);
                                    var minutes = parseInt(parts[1] || '0', 10);
                                    return hours * 60 + minutes;
                                }
                                return time.getTime();
                            };
                            if (parseTimeToCompare(createBookingDto.startTime) >=
                                parseTimeToCompare(createBookingDto.endTime)) {
                                throw new common_1.BadRequestException('Start time must be before end time');
                            }
                            now = new Date();
                            if (typeof createBookingDto.startTime === 'string' &&
                                createBookingDto.startTime.includes('T') &&
                                new Date(createBookingDto.startTime) <= now) {
                                throw new common_1.BadRequestException('Start time must be in the future');
                            }
                            _c.label = 11;
                        case 11:
                            workerToAssign = null;
                            if (!createBookingDto.workerId) return [3 /*break*/, 14];
                            if (!worker) return [3 /*break*/, 12];
                            // Reuse the worker object fetched during validation
                            workerToAssign = worker;
                            return [3 /*break*/, 14];
                        case 12: return [4 /*yield*/, this.workersRepository.findOne({
                                where: { id: createBookingDto.workerId },
                                relations: ['user', 'services'],
                            })];
                        case 13:
                            // If worker wasn't fetched during validation (e.g., serviceRequestId was provided), fetch it now
                            workerToAssign = _c.sent();
                            _c.label = 14;
                        case 14:
                            amount = createBookingDto.amount;
                            this.logger.debug("create: Initial amount from DTO = ".concat(amount));
                            if (!!amount) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: createBookingDto.serviceId },
                                })];
                        case 15:
                            service = _c.sent();
                            this.logger.debug("create: Service found = ".concat(service ? service.id : 'null'));
                            this.logger.debug("create: Service basePrice = ".concat(service === null || service === void 0 ? void 0 : service.basePrice));
                            if (service) {
                                basePrice = parseFloat(service.basePrice.toString());
                                parseTimeToHours = function (timeStr) {
                                    if (typeof timeStr === 'string') {
                                        if (timeStr.includes('T')) {
                                            // ISO datetime string
                                            var date = new Date(timeStr);
                                            return date.getHours() + date.getMinutes() / 60;
                                        }
                                        // Time format is HH:mm:ss or HH:mm
                                        var parts = timeStr.split(':');
                                        var hours = parseInt(parts[0], 10);
                                        var minutes = parseInt(parts[1] || '0', 10);
                                        return hours + minutes / 60;
                                    }
                                    return timeStr.getHours() + timeStr.getMinutes() / 60;
                                };
                                startHours = parseTimeToHours(createBookingDto.startTime);
                                endHours = parseTimeToHours(createBookingDto.endTime);
                                durationHours = Math.max(0, endHours - startHours);
                                // Flat rate pricing for one-time bookings
                                // Time slot is for worker availability, not billing duration
                                amount = basePrice;
                            }
                            else {
                                amount = 0;
                            }
                            _c.label = 16;
                        case 16:
                            parseTimeForStorage = function (time) {
                                if (typeof time === 'string') {
                                    if (time.includes('T')) {
                                        // ISO datetime string - extract time portion
                                        return new Date(time).toTimeString().split(' ')[0];
                                    }
                                    // Already a time string (HH:mm:ss)
                                    return time;
                                }
                                return time.toTimeString().split(' ')[0];
                            };
                            generatedOtp = null;
                            bookingType = createBookingDto.type || booking_entity_2.BookingType.ON_DEMAND;
                            if (bookingType === booking_entity_2.BookingType.ON_DEMAND) {
                                generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
                            }
                            _a = [__assign({}, createBookingDto)];
                            _b = { status: booking_entity_2.BookingStatus.REQUESTED, worker: workerToAssign, assignedWorkerId: createBookingDto.workerId, type: bookingType, amount: amount, totalAmount: amount, otp: generatedOtp, isOtpVerified: false, assignmentState: createBookingDto.serviceRequestId || createBookingDto.workerId
                                    ? booking_entity_2.AssignmentState.ASSIGNED
                                    : booking_entity_2.AssignmentState.PENDING, 
                                // Parse to time string for PostgreSQL time type
                                startTime: parseTimeForStorage(createBookingDto.startTime), endTime: parseTimeForStorage(createBookingDto.endTime), 
                                // FIX: Date handling - require date from service request or explicit date
                                // Don't default to today's date silently
                                date: (function () {
                                    // Priority 1: Use explicit date if provided
                                    if (createBookingDto.date) {
                                        var dateStr = typeof createBookingDto.date === 'string'
                                            ? createBookingDto.date
                                            : new Date(createBookingDto.date).toISOString().split('T')[0];
                                        return dateStr;
                                    }
                                    // Priority 2: Extract date from startTime if it's an ISO datetime string
                                    if (typeof createBookingDto.startTime === 'string' &&
                                        createBookingDto.startTime.includes('T')) {
                                        var dateStr = new Date(createBookingDto.startTime).toISOString().split('T')[0];
                                        return dateStr;
                                    }
                                    // Priority 3: Look up date from service request if serviceRequestId is provided
                                    if (createBookingDto.serviceRequestId) {
                                        // The date should have been set from service request earlier in this function (lines 192-199)
                                        // If we reach here, the service request might not have a valid date
                                    }
                                    // FIX: Throw error instead of defaulting to today's date
                                    // This ensures the bug is caught rather than silently showing wrong date
                                    var errorMsg = 'Date is required but could not be determined. Please provide a date or use a valid service request.';
                                    console.error('🔍 ERROR: Date handling -', errorMsg, 'createBookingDto:', JSON.stringify({
                                        date: createBookingDto.date,
                                        startTime: createBookingDto.startTime,
                                        serviceRequestId: createBookingDto.serviceRequestId
                                    }));
                                    throw new common_1.BadRequestException(errorMsg);
                                })() };
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: createBookingDto.serviceId },
                                })];
                        case 17:
                            // Ensure we have service relation
                            _b.service = _c.sent();
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: createBookingDto.userId },
                                })];
                        case 18:
                            bookingData = __assign.apply(void 0, _a.concat([(
                                // Ensure we have user relation (look up by publicId since userId is UUID)
                                _b.user = _c.sent(), 
                                // Save guest FCM token if provided in the request
                                _b.guestFcmToken = createBookingDto.guestFcmToken || createBookingDto.guest_fcm_token || null, _b)]));
                            booking = this.bookingsRepository.create(bookingData);
                            return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 19:
                            savedBooking = _c.sent();
                            bookingToReturn = Array.isArray(savedBooking)
                                ? savedBooking[0]
                                : savedBooking;
                            _c.label = 20;
                        case 20:
                            _c.trys.push([20, 31, , 32]);
                            userIdValue = createBookingDto.userId;
                            user = null;
                            if (!(typeof userIdValue === 'number' || !isNaN(Number(userIdValue)))) return [3 /*break*/, 22];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: Number(userIdValue) },
                                })];
                        case 21:
                            // It's a numeric ID
                            user = _c.sent();
                            return [3 /*break*/, 24];
                        case 22: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { publicId: userIdValue },
                            })];
                        case 23:
                            // It's a UUID publicId
                            user = _c.sent();
                            _c.label = 24;
                        case 24:
                            if (!user) return [3 /*break*/, 29];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: bookingToReturn.id },
                                    relations: ['service'],
                                })];
                        case 25:
                            savedBookingWithService = _c.sent();
                            if (!savedBookingWithService) return [3 /*break*/, 27];
                            return [4 /*yield*/, this.notificationsService.notifyUserBookingConfirmation(user, savedBookingWithService)];
                        case 26:
                            _c.sent();
                            this.logger.debug("Customer notification sent successfully for booking ".concat(bookingToReturn.id, " to user ").concat(user.id));
                            return [3 /*break*/, 28];
                        case 27:
                            this.logger.warn("Could not load booking with service for customer notification ".concat(bookingToReturn.id));
                            _c.label = 28;
                        case 28: return [3 /*break*/, 30];
                        case 29:
                            this.logger.warn("Could not find user for customer notification, userId: ".concat(userIdValue));
                            _c.label = 30;
                        case 30: return [3 /*break*/, 32];
                        case 31:
                            notifyError_1 = _c.sent();
                            errorMessage = notifyError_1 instanceof Error ? notifyError_1.message : 'Unknown error';
                            this.logger.error("Failed to send customer notification: ".concat(errorMessage));
                            return [3 /*break*/, 32];
                        case 32:
                            if (!workerToAssign) return [3 /*break*/, 40];
                            _c.label = 33;
                        case 33:
                            _c.trys.push([33, 39, , 40]);
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: workerToAssign.id },
                                    relations: ['user']
                                })];
                        case 34:
                            workerWithUser = _c.sent();
                            if (!(workerWithUser === null || workerWithUser === void 0 ? void 0 : workerWithUser.user)) return [3 /*break*/, 38];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: bookingToReturn.id },
                                    relations: ['service'],
                                })];
                        case 35:
                            savedBookingWithService = _c.sent();
                            if (!savedBookingWithService) return [3 /*break*/, 38];
                            return [4 /*yield*/, this.notificationsService.notifyWorkerNewBooking(workerWithUser, savedBookingWithService)];
                        case 36:
                            _c.sent();
                            // Mark notification as sent in database
                            return [4 /*yield*/, this.bookingsRepository.update(bookingToReturn.id, {
                                    notificationSent: true
                                })];
                        case 37:
                            // Mark notification as sent in database
                            _c.sent();
                            this.logger.debug("Worker notification sent successfully for booking ".concat(bookingToReturn.id));
                            _c.label = 38;
                        case 38: return [3 /*break*/, 40];
                        case 39:
                            workerNotifyError_1 = _c.sent();
                            errorMessage = workerNotifyError_1 instanceof Error ? workerNotifyError_1.message : 'Unknown error';
                            this.logger.error("Failed to send worker notification: ".concat(errorMessage));
                            return [3 /*break*/, 40];
                        case 40:
                            if (!(bookingToReturn.workerId && bookingToReturn.assignmentState !== booking_entity_2.AssignmentState.ASSIGNED)) return [3 /*break*/, 42];
                            this.logger.debug("Updating assignmentState from ".concat(bookingToReturn.assignmentState, " to ASSIGNED"));
                            return [4 /*yield*/, this.bookingsRepository.update(bookingToReturn.id, {
                                    assignmentState: booking_entity_2.AssignmentState.ASSIGNED,
                                    status: booking_entity_2.BookingStatus.CONFIRMED,
                                })];
                        case 41:
                            _c.sent();
                            bookingToReturn.assignmentState = booking_entity_2.AssignmentState.ASSIGNED;
                            bookingToReturn.status = booking_entity_2.BookingStatus.CONFIRMED;
                            _c.label = 42;
                        case 42: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingToReturn.id },
                                relations: [
                                    'user',
                                    'worker',
                                    'service',
                                    'worker.user',
                                    'worker.services',
                                ],
                            })];
                        case 43:
                            fullBooking = _c.sent();
                            return [2 /*return*/, fullBooking || bookingToReturn];
                        case 44:
                            error_2 = _c.sent();
                            // Log the error for debugging
                            if (error_2 instanceof Error) {
                                console.error('Booking creation error:', error_2.message, {
                                    userId: createBookingDto.userId,
                                    serviceId: createBookingDto.serviceId,
                                    startTime: createBookingDto.startTime,
                                    endTime: createBookingDto.endTime,
                                });
                            }
                            // Re-throw the error with context
                            throw error_2;
                        case 45: return [2 /*return*/];
                    }
                });
            });
        };
        BookingsService_1.prototype.attemptAssignment = function (bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, user, fullUser, userData, userLat, userLng, bookingWithServiceRequest, serviceRequest, srLocation;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: bookingId },
                                relations: ['user', 'service'],
                            })];
                        case 1:
                            booking = _b.sent();
                            if (!booking) {
                                throw new common_1.BadRequestException('Booking not found');
                            }
                            if (booking.status !== booking_entity_2.BookingStatus.REQUESTED) {
                                throw new common_1.BadRequestException('Assignment can only be attempted on REQUESTED bookings');
                            }
                            user = booking.user;
                            console.log('🔍 User data:', {
                                id: user === null || user === void 0 ? void 0 : user.id,
                                latitude: user === null || user === void 0 ? void 0 : user.latitude,
                                longitude: user === null || user === void 0 ? void 0 : user.longitude,
                                hasUser: !!user,
                            });
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: booking.userId },
                                })];
                        case 2:
                            fullUser = _b.sent();
                            this.logger.debug('🔍 Full user data:', {
                                id: fullUser === null || fullUser === void 0 ? void 0 : fullUser.id,
                                latitude: fullUser === null || fullUser === void 0 ? void 0 : fullUser.latitude,
                                longitude: fullUser === null || fullUser === void 0 ? void 0 : fullUser.longitude,
                                hasUser: !!fullUser,
                            });
                            userData = fullUser || user;
                            userLat = userData === null || userData === void 0 ? void 0 : userData.latitude;
                            userLng = userData === null || userData === void 0 ? void 0 : userData.longitude;
                            this.logger.debug('🔍 Initial user location:', { userLat: userLat, userLng: userLng });
                            if (!(!userLat || !userLng)) return [3 /*break*/, 4];
                            if (!booking.serviceRequestId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: bookingId },
                                    relations: ['serviceRequest'],
                                })];
                        case 3:
                            bookingWithServiceRequest = _b.sent();
                            serviceRequest = bookingWithServiceRequest === null || bookingWithServiceRequest === void 0 ? void 0 : bookingWithServiceRequest.serviceRequest;
                            if ((_a = serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.metadata) === null || _a === void 0 ? void 0 : _a.location) {
                                srLocation = serviceRequest.metadata.location;
                                userLat = srLocation.lat;
                                userLng = srLocation.lng;
                                this.logger.debug('🔍 Using service request location:', { userLat: userLat, userLng: userLng });
                            }
                            _b.label = 4;
                        case 4:
                            // Fallback to booking location if still null
                            if ((!userLat || !userLng) && booking.location) {
                                userLat = booking.location.latitude;
                                userLng = booking.location.longitude;
                                this.logger.debug('🔍 Using booking location:', { userLat: userLat, userLng: userLng });
                            }
                            if (!userLat || !userLng) {
                                throw new common_1.BadRequestException('User location not available for matching');
                            }
                            return [4 /*yield*/, this.attemptAssignmentWithUser(booking, userData)];
                        case 5: 
                        // Return with user data that has location
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        BookingsService_1.prototype.attemptAssignmentWithUser = function (booking, user) {
            return __awaiter(this, void 0, void 0, function () {
                var parseTimeToDate, startTimeDate, endTimeDate, bestMatch_1, savedBooking, error_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            parseTimeToDate = function (time, bookingDate) {
                                if (typeof time === 'string' && !time.includes('T')) {
                                    // Time string HH:mm:ss - combine with booking date
                                    var parts = time.split(':');
                                    var hours = parseInt(parts[0], 10);
                                    var minutes = parseInt(parts[1] || '0', 10);
                                    var date = new Date(bookingDate);
                                    date.setHours(hours, minutes, 0, 0);
                                    return date;
                                }
                                return time instanceof Date ? time : new Date(time);
                            };
                            startTimeDate = parseTimeToDate(booking.startTime, booking.date ? new Date(booking.date) : new Date());
                            endTimeDate = parseTimeToDate(booking.endTime, booking.date ? new Date(booking.date) : new Date());
                            return [4 /*yield*/, this.findBestWorker(booking.service.id.toString(), user.latitude, user.longitude, startTimeDate, endTimeDate)];
                        case 1:
                            bestMatch_1 = _a.sent();
                            return [4 /*yield*/, this.dataSource.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                    var slotBooked, bookingSaveError_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.slotsService.markAsBooked(bestMatch_1.slot.id)];
                                            case 1:
                                                slotBooked = _a.sent();
                                                if (!slotBooked) {
                                                    // Slot was already booked by another concurrent request
                                                    this.logger.warn("Slot ".concat(bestMatch_1.slot.id, " was already booked (race condition). Booking remains in REQUESTED state."));
                                                    return [2 /*return*/, booking];
                                                }
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 6]);
                                                // Update booking with assigned worker
                                                booking.worker = bestMatch_1.worker;
                                                booking.status = booking_entity_2.BookingStatus.PENDING; // Ready for confirmation
                                                booking.assignmentState = booking_entity_2.AssignmentState.ASSIGNED;
                                                booking.assignedWorkerId = bestMatch_1.worker.id;
                                                booking.assignmentTimestamp = new Date();
                                                booking.assignmentReason = 'Best match found';
                                                return [4 /*yield*/, transactionalEntityManager.save(booking)];
                                            case 3: return [2 /*return*/, _a.sent()];
                                            case 4:
                                                bookingSaveError_1 = _a.sent();
                                                // ✅ Rollback slot booking if booking save fails
                                                this.logger.error("Failed to save booking after slot was booked, releasing slot", bookingSaveError_1);
                                                return [4 /*yield*/, this.slotsService.markAsAvailable(bestMatch_1.slot.id)];
                                            case 5:
                                                _a.sent();
                                                throw bookingSaveError_1;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            savedBooking = _a.sent();
                            if (!savedBooking.subscriptionId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.subscriptionWorkerSyncService.syncWorkerToSubscription(savedBooking.subscriptionId, bestMatch_1.worker.id)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: 
                        // NOTE: Worker notification is intentionally NOT sent here.
                        // The notification will be sent after payment is confirmed in payments.service.ts
                        // This ensures workers only get notified about paid bookings.
                        return [2 /*return*/, savedBooking];
                        case 5:
                            error_3 = _a.sent();
                            // Assignment failed - booking remains in REQUESTED state
                            // This is not an error, just no workers available
                            return [2 /*return*/, booking];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        BookingsService_1.prototype.createWithAssignment = function (createBookingDto) {
            return __awaiter(this, void 0, void 0, function () {
                var savedBooking, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // DEBUG: Log incoming amount
                            this.logger.debug("createWithAssignment: createBookingDto.amount = ".concat(createBookingDto.amount));
                            return [4 /*yield*/, this.create(createBookingDto)];
                        case 1:
                            savedBooking = _a.sent();
                            // DEBUG: Log the created booking's amount
                            this.logger.debug("createWithAssignment: savedBooking.amount = ".concat(savedBooking.amount));
                            this.logger.debug("createWithAssignment: savedBooking.totalAmount = ".concat(savedBooking.totalAmount));
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.attemptAssignment(savedBooking.id)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_4 = _a.sent();
                            // Assignment failed, but booking was created successfully
                            if (error_4 instanceof Error) {
                                this.logger.warn("[Booking ".concat(savedBooking.id, "] Assignment attempt failed (booking still created): ").concat(error_4.message));
                            }
                            else {
                                this.logger.debug("[Booking ".concat(savedBooking.id, "] Assignment attempt failed with unknown error type (booking still created)"));
                            }
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, savedBooking];
                    }
                });
            });
        };
        BookingsService_1.prototype.findAll = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvedUserId, resolved, query, bookings;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.resolveUserId(userId)];
                        case 1:
                            resolved = _a.sent();
                            if (!resolved) {
                                return [2 /*return*/, []];
                            }
                            resolvedUserId = resolved;
                            _a.label = 2;
                        case 2:
                            query = this.bookingsRepository
                                .createQueryBuilder('booking')
                                .leftJoinAndSelect('booking.user', 'user')
                                .leftJoinAndSelect('booking.worker', 'worker')
                                .leftJoinAndSelect('booking.service', 'service')
                                .leftJoinAndSelect('worker.user', 'workerUser')
                                .orderBy('booking.createdAt', 'DESC');
                            if (resolvedUserId) {
                                query.where('booking.userId = :userId', { userId: resolvedUserId });
                            }
                            return [4 /*yield*/, query.getMany()];
                        case 3:
                            bookings = _a.sent();
                            // Serialize bookings to ensure amount field is properly returned
                            return [2 /*return*/, bookings.map(function (booking) { return _this.serializeBooking(booking); })];
                    }
                });
            });
        };
        BookingsService_1.prototype.serializeBooking = function (booking) {
            if (!booking)
                return null;
            this.logger.debug('🔍 DEBUG serializeBooking: booking.totalAmount =', booking.totalAmount);
            this.logger.debug('🔍 DEBUG serializeBooking: booking.amount =', booking.amount);
            // FIX: Don't divide by 100 - frontend sends amount in rupees, not paise
            // Previously we were dividing by 100 which caused 1200 → 12 rupees
            return {
                id: booking.id,
                publicId: booking.publicId,
                userId: booking.userId,
                workerId: booking.workerId,
                serviceId: booking.serviceId,
                serviceRequestId: booking.serviceRequestId,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                totalAmount: booking.amount || booking.totalAmount || 0,
                amount: booking.amount || booking.totalAmount || 0,
                status: booking.status,
                isPaid: booking.isPaid,
                type: booking.type,
                notes: booking.notes,
                location: booking.location,
                createdAt: booking.createdAt,
                otp: booking.otp,
                isOtpVerified: booking.isOtpVerified,
                worker: booking.worker ? {
                    id: booking.worker.id,
                    publicId: booking.worker.publicId,
                    rating: booking.worker.rating,
                    reviewCount: booking.worker.reviewCount,
                    bio: booking.worker.bio,
                    user: booking.worker.user ? {
                        id: booking.worker.user.id,
                        publicId: booking.worker.user.publicId,
                        firstName: booking.worker.user.firstName,
                        lastName: booking.worker.user.lastName,
                        email: booking.worker.user.email,
                    } : null,
                } : null,
                service: booking.service ? {
                    id: booking.service.id,
                    publicId: booking.service.publicId,
                    name: booking.service.name,
                    description: booking.service.description,
                    basePrice: booking.service.basePrice,
                    category: booking.service.category,
                } : null,
                user: booking.user ? {
                    id: booking.user.id,
                    publicId: booking.user.publicId,
                    firstName: booking.user.firstName,
                    lastName: booking.user.lastName,
                    email: booking.user.email,
                    phone: booking.user.phone,
                    address: booking.user.address,
                    addresses: booking.user.addresses ? booking.user.addresses.map(function (addr) { return ({
                        id: addr.id,
                        societyName: addr.societyName,
                        towerNumber: addr.towerNumber,
                        flatNumber: addr.flatNumber,
                        landmark: addr.landmark,
                        area: addr.area,
                        city: addr.city,
                        state: addr.state,
                        pincode: addr.pincode,
                        latitude: addr.latitude,
                        longitude: addr.longitude,
                        isDefault: addr.isDefault,
                        label: addr.label,
                    }); }) : [],
                } : null,
            };
        };
        BookingsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: id },
                                select: ['id', 'publicId', 'userId', 'workerId', 'serviceId', 'serviceRequestId', 'date', 'startTime', 'endTime', 'totalAmount', 'amount', 'status', 'isPaid', 'type', 'notes', 'location', 'guestFcmToken', 'assignedWorkerId', 'createdAt', 'updatedAt', 'otp', 'isOtpVerified'],
                                relations: [
                                    'user',
                                    'user.addresses',
                                    'worker',
                                    'service',
                                    'worker.user',
                                    'worker.services',
                                ],
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.BadRequestException("Booking with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, booking];
                    }
                });
            });
        };
        BookingsService_1.prototype.update = function (id, updateBookingDto) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, worker, service;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            booking = _a.sent();
                            if (!updateBookingDto.workerId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: updateBookingDto.workerId },
                                })];
                        case 2:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.BadRequestException('Worker not found');
                            }
                            _a.label = 3;
                        case 3:
                            if (!updateBookingDto.serviceId) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: updateBookingDto.serviceId },
                                })];
                        case 4:
                            service = _a.sent();
                            if (!service) {
                                throw new common_1.BadRequestException('Service not found');
                            }
                            _a.label = 5;
                        case 5:
                            // Update the booking
                            Object.assign(booking, updateBookingDto);
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        BookingsService_1.prototype.cancel = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, slotError_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            booking = _a.sent();
                            // Only allow cancellation of REQUESTED or PENDING bookings
                            if (booking.status !== booking_entity_2.BookingStatus.REQUESTED &&
                                booking.status !== booking_entity_2.BookingStatus.PENDING) {
                                throw new common_1.BadRequestException('Only REQUESTED or PENDING bookings can be cancelled');
                            }
                            if (!booking.slotId) return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.slotsService.markAsAvailable(booking.slotId)];
                        case 3:
                            _a.sent();
                            this.logger.log("Released slot ".concat(booking.slotId, " for cancelled booking ").concat(id));
                            return [3 /*break*/, 5];
                        case 4:
                            slotError_1 = _a.sent();
                            this.logger.warn("Failed to release slot ".concat(booking.slotId, " for cancelled booking ").concat(id), slotError_1);
                            return [3 /*break*/, 5];
                        case 5:
                            booking.status = booking_entity_2.BookingStatus.CANCELLED;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        BookingsService_1.prototype.reschedule = function (id, newStartTime, newEndTime) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            booking = _a.sent();
                            // Only allow rescheduling of REQUESTED or PENDING bookings
                            if (booking.status !== booking_entity_2.BookingStatus.REQUESTED &&
                                booking.status !== booking_entity_2.BookingStatus.PENDING) {
                                throw new common_1.BadRequestException('Only REQUESTED or PENDING bookings can be rescheduled');
                            }
                            booking.startTime = newStartTime;
                            booking.endTime = newEndTime;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        BookingsService_1.prototype.updateStatus = function (id, status) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            booking = _a.sent();
                            booking.status = status;
                            return [2 /*return*/, this.bookingsRepository.save(booking)];
                    }
                });
            });
        };
        BookingsService_1.prototype.assignWorker = function (id, workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dataSource.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                var booking, worker, dateObj, parseTimeStr, startParsed, endParsed, startTimeDate, endTimeDate, slot, slotErr_2, savedBooking;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionalEntityManager.findOne(booking_entity_1.Booking, {
                                                where: { id: id },
                                                lock: { mode: 'pessimistic_write' }
                                            })];
                                        case 1:
                                            booking = _a.sent();
                                            if (!booking) {
                                                throw new common_1.NotFoundException('Booking not found');
                                            }
                                            // Validate booking is still unassigned
                                            if (booking.assignedWorkerId) {
                                                throw new common_1.BadRequestException('Booking has already been assigned to another worker');
                                            }
                                            return [4 /*yield*/, transactionalEntityManager.findOne(worker_entity_1.Worker, {
                                                    where: { id: workerId },
                                                    relations: ['user'],
                                                })];
                                        case 2:
                                            worker = _a.sent();
                                            if (!worker) {
                                                throw new common_1.BadRequestException('Worker not found');
                                            }
                                            // Log the worker's fcmToken for debugging
                                            this.logger.log("Worker ".concat(worker.id, " FCM token: ").concat(worker.fcmToken ? worker.fcmToken.substring(0, 30) + '...' : 'NULL'));
                                            booking.worker = worker;
                                            booking.assignedWorkerId = workerId;
                                            booking.assignmentState = booking_entity_2.AssignmentState.ASSIGNED;
                                            booking.assignmentTimestamp = new Date();
                                            booking.assignmentReason = 'Manual assignment by admin';
                                            _a.label = 3;
                                        case 3:
                                            _a.trys.push([3, 8, , 9]);
                                            if (!(booking.date && booking.startTime && booking.endTime)) return [3 /*break*/, 7];
                                            dateObj = new Date(booking.date);
                                            parseTimeStr = function (timeStr) {
                                                var parts = timeStr.split(':');
                                                return {
                                                    hours: parseInt(parts[0], 10),
                                                    minutes: parseInt(parts[1] || '0', 10),
                                                };
                                            };
                                            startParsed = parseTimeStr(String(booking.startTime));
                                            endParsed = parseTimeStr(String(booking.endTime));
                                            startTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startParsed.hours, startParsed.minutes, 0, 0);
                                            endTimeDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endParsed.hours, endParsed.minutes, 0, 0);
                                            return [4 /*yield*/, this.slotsService.findAvailableSlotFlexible(workerId, startTimeDate, endTimeDate, true // Exact/flexible slot match only (skips same-day fallback)
                                                )];
                                        case 4:
                                            slot = _a.sent();
                                            if (!slot) return [3 /*break*/, 6];
                                            booking.slotId = slot.id;
                                            booking.slot = slot;
                                            return [4 /*yield*/, this.slotsService.bookSlotAtomic(slot.id)];
                                        case 5:
                                            _a.sent();
                                            this.logger.log("Locked slot ".concat(slot.id, " for booking ").concat(booking.id, " under worker ").concat(workerId));
                                            return [3 /*break*/, 7];
                                        case 6:
                                            this.logger.warn("Could not find matching slot for worker ".concat(workerId, " on ").concat(booking.date, " at ").concat(booking.startTime));
                                            _a.label = 7;
                                        case 7: return [3 /*break*/, 9];
                                        case 8:
                                            slotErr_2 = _a.sent();
                                            this.logger.error("Error locking slot during worker assignment: ".concat(slotErr_2.message));
                                            return [3 /*break*/, 9];
                                        case 9: return [4 /*yield*/, transactionalEntityManager.save(booking)];
                                        case 10:
                                            savedBooking = _a.sent();
                                            // NOTE: Worker notification is intentionally NOT sent here.
                                            // The notification will be sent after payment is confirmed in payments.service.ts
                                            // This ensures workers only get notified about paid bookings.
                                            return [2 /*return*/, savedBooking];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // Missing methods for controller compatibility
        BookingsService_1.prototype.findAllPaginated = function (userId, workerId, skip, limit, sortBy, sortOrder) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvedUserId, resolved, query, _a, bookings, total, serializedBookings;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.resolveUserId(userId)];
                        case 1:
                            resolved = _b.sent();
                            if (!resolved) {
                                // Return empty results if user not found
                                return [2 /*return*/, [[], 0]];
                            }
                            resolvedUserId = resolved;
                            _b.label = 2;
                        case 2:
                            query = this.bookingsRepository
                                .createQueryBuilder('booking')
                                .leftJoinAndSelect('booking.user', 'user')
                                .leftJoinAndSelect('user.addresses', 'userAddresses')
                                .leftJoinAndSelect('booking.worker', 'worker')
                                .leftJoinAndSelect('booking.service', 'service');
                            if (resolvedUserId) {
                                query.andWhere('booking.userId = :userId', { userId: resolvedUserId });
                            }
                            if (workerId) {
                                query.andWhere('booking.assignedWorkerId = :workerId', { workerId: workerId });
                            }
                            if (skip) {
                                query.skip(skip);
                            }
                            if (limit) {
                                query.take(limit);
                            }
                            if (sortBy) {
                                query.orderBy("booking.".concat(sortBy), sortOrder || 'DESC');
                            }
                            else {
                                query.orderBy('booking.createdAt', 'DESC');
                            }
                            return [4 /*yield*/, query.getManyAndCount()];
                        case 3:
                            _a = _b.sent(), bookings = _a[0], total = _a[1];
                            serializedBookings = bookings.map(function (booking) { return _this.serializeBooking(booking); });
                            return [2 /*return*/, [serializedBookings, total]];
                    }
                });
            });
        };
        BookingsService_1.prototype.assignBooking = function (assignBookingDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.assignWorker(assignBookingDto.bookingId, parseInt(assignBookingDto.workerId, 10))];
                });
            });
        };
        BookingsService_1.prototype.getBookingsByWorker = function (workerId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsRepository.find({
                            where: { assignedWorkerId: workerId },
                            relations: ['user', 'user.addresses', 'service'],
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        BookingsService_1.prototype.getPastBookings = function (userPublicId) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvedUserId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.resolveUserId(userPublicId)];
                        case 1:
                            resolvedUserId = _a.sent();
                            if (!resolvedUserId) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .leftJoinAndSelect('booking.service', 'service')
                                    .leftJoinAndSelect('booking.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .where('booking.userId = :userId', { userId: resolvedUserId })
                                    .andWhere('booking.status IN (:...statuses)', {
                                    statuses: [
                                        booking_entity_2.BookingStatus.COMPLETED,
                                        booking_entity_2.BookingStatus.CANCELLED,
                                        booking_entity_2.BookingStatus.NO_SHOW,
                                    ],
                                })
                                    .orderBy('booking.startTime', 'DESC')
                                    .getMany()];
                    }
                });
            });
        };
        /**
         * Resolve user ID from various formats (publicId/UUID or numeric id)
         * @param userId - Could be publicId (UUID) or numeric id
         * @returns Numeric user id for database queries
         */
        BookingsService_1.prototype.resolveUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var numericId, user, error_5;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            numericId = parseInt(userId, 10);
                            if (!isNaN(numericId)) {
                                return [2 /*return*/, numericId];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.usersRepository.findOneBy({ publicId: userId })];
                        case 2:
                            user = _b.sent();
                            return [2 /*return*/, (_a = user === null || user === void 0 ? void 0 : user.id) !== null && _a !== void 0 ? _a : null];
                        case 3:
                            error_5 = _b.sent();
                            if (error_5 instanceof Error) {
                                this.logger.error("Error resolving userId: ".concat(error_5.message));
                            }
                            else {
                                this.logger.error("Error resolving userId with unknown error type");
                            }
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return BookingsService_1;
    }());
    __setFunctionName(_classThis, "BookingsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingsService = _classThis;
}();
exports.BookingsService = BookingsService;
