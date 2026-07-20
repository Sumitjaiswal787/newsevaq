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
exports.OnDemandAssignmentScheduler = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var booking_entity_1 = require("../bookings/entities/booking.entity");
// IST timezone offset in milliseconds (UTC+5:30)
var IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
var OnDemandAssignmentScheduler = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OnDemandAssignmentScheduler = _classThis = /** @class */ (function () {
        function OnDemandAssignmentScheduler_1(bookingRepository, userRepository, serviceRepository, workerRepository, subscriptionRepository, serviceProfileRepository, workersService, notificationsService, subscriptionWorkerSyncService, slotsService) {
            this.bookingRepository = bookingRepository;
            this.userRepository = userRepository;
            this.serviceRepository = serviceRepository;
            this.workerRepository = workerRepository;
            this.subscriptionRepository = subscriptionRepository;
            this.serviceProfileRepository = serviceProfileRepository;
            this.workersService = workersService;
            this.notificationsService = notificationsService;
            this.subscriptionWorkerSyncService = subscriptionWorkerSyncService;
            this.slotsService = slotsService;
            this.logger = new common_1.Logger(OnDemandAssignmentScheduler.name);
            this.isRunning = false;
            this.idleCounter = 0;
            this.currentIntervalMs = 60 * 1000; // Start with 1 minute
            this.BACKOFF_LEVELS = [
                60 * 1000, // 1 minute
                2 * 60 * 1000, // 2 minutes
                5 * 60 * 1000, // 5 minutes
                15 * 60 * 1000, // 15 minutes
                30 * 60 * 1000, // 30 minutes (max)
            ];
            this.timeoutRef = null;
            this.MAX_EXECUTION_TIME_MS = 45 * 1000; // 45 seconds hard limit
        }
        /**
         * Get the current time in IST timezone
         */
        OnDemandAssignmentScheduler_1.prototype.getNowInIST = function () {
            var now = new Date();
            var istTime = new Date(now.getTime() + IST_OFFSET_MS);
            return istTime;
        };
        /**
         * Calculate distance between two coordinates using Haversine formula
         */
        OnDemandAssignmentScheduler_1.prototype.calculateDistance = function (lat1, lon1, lat2, lon2) {
            var R = 6371; // Earth's radius in km
            var dLat = this.toRad(lat2 - lat1);
            var dLon = this.toRad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.toRad(lat1)) *
                    Math.cos(this.toRad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };
        OnDemandAssignmentScheduler_1.prototype.toRad = function (deg) {
            return deg * (Math.PI / 180);
        };
        OnDemandAssignmentScheduler_1.prototype.onModuleInit = function () {
            this.scheduleNextRun();
        };
        OnDemandAssignmentScheduler_1.prototype.onModuleDestroy = function () {
            if (this.timeoutRef) {
                clearTimeout(this.timeoutRef);
            }
        };
        OnDemandAssignmentScheduler_1.prototype.scheduleNextRun = function () {
            var _this = this;
            if (this.timeoutRef) {
                clearTimeout(this.timeoutRef);
            }
            this.logger.log("Next on-demand assignment check scheduled in ".concat(Math.round(this.currentIntervalMs / 60000), " minutes"));
            this.timeoutRef = setTimeout(function () { return _this.handleOnDemandAssignments(); }, this.currentIntervalMs);
        };
        /**
         * Main scheduler method with proper timeout safety
         * Assigns workers to on-demand bookings that don't have workers
         */
        OnDemandAssignmentScheduler_1.prototype.handleOnDemandAssignments = function () {
            return __awaiter(this, void 0, void 0, function () {
                var hardResetTimeout, cookingService, newService, e_1, cookingService_1, workers, updatedCount, _i, workers_1, worker, services, hasCookingService, e_2, bookingsToAssign, successfulAssignments, failedAssignments, _a, bookingsToAssign_1, booking, result, error_1, errorMessage, error_2, errorMessage;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.isRunning) {
                                this.logger.warn('Previous on-demand assignment run still in progress, skipping...');
                                this.scheduleNextRun();
                                return [2 /*return*/];
                            }
                            this.isRunning = true;
                            this.logger.log('Running on-demand assignment scheduler...');
                            hardResetTimeout = setTimeout(function () {
                                _this.logger.error('⚠️ ON-DEMAND SCHEDULER HARD TIMEOUT TRIGGERED - FORCING RESET');
                                _this.isRunning = false;
                                _this.idleCounter = Math.min(_this.idleCounter + 1, _this.BACKOFF_LEVELS.length - 1);
                                _this.currentIntervalMs = _this.BACKOFF_LEVELS[_this.idleCounter];
                                _this.scheduleNextRun();
                            }, this.MAX_EXECUTION_TIME_MS);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 26, 27, 28]);
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 8, , 9]);
                            return [4 /*yield*/, this.serviceRepository.findOne({
                                    where: [
                                        { publicId: '7f8e4b5c-a883-4c6c-b348-f966508fd49d' },
                                        { name: 'Cooking Service' }
                                    ]
                                })];
                        case 3:
                            cookingService = _b.sent();
                            if (!cookingService) return [3 /*break*/, 5];
                            // Update existing service with correct values
                            this.logger.log('Cooking Service exists, updating if needed...');
                            cookingService.basePrice = 149;
                            cookingService.category = 'Cooking';
                            cookingService.description = 'Home cooking service';
                            cookingService.reassuranceText = 'Professional home cooked meals';
                            cookingService.whatWillHappen = [
                                'Cook will arrive with required ingredients',
                                'Prepare fresh healthy meals',
                                'Clean up kitchen after cooking',
                            ];
                            cookingService.whatWillNotHappen = [
                                'No extra items without approval',
                                'No unhygienic food preparation',
                            ];
                            cookingService.ifSomethingGoesWrong = 'Sevaq will replace cook or refund immediately';
                            cookingService.isAvailable = true;
                            cookingService.isFastBooking = false;
                            cookingService.estimatedWaitTime = 120;
                            cookingService.workerCount = 6;
                            return [4 /*yield*/, this.serviceRepository.save(cookingService)];
                        case 4:
                            _b.sent();
                            this.logger.log('Cooking service updated successfully');
                            return [3 /*break*/, 7];
                        case 5:
                            // Create new service
                            this.logger.log('Cooking Service missing, adding it...');
                            newService = this.serviceRepository.create({
                                publicId: '7f8e4b5c-a883-4c6c-b348-f966508fd49d',
                                name: 'Cooking Service',
                                description: 'Home cooking service',
                                basePrice: 149,
                                reassuranceText: 'Professional home cooked meals',
                                whatWillHappen: [
                                    'Cook will arrive with required ingredients',
                                    'Prepare fresh healthy meals',
                                    'Clean up kitchen after cooking',
                                ],
                                whatWillNotHappen: [
                                    'No extra items without approval',
                                    'No unhygienic food preparation',
                                ],
                                ifSomethingGoesWrong: 'Sevaq will replace cook or refund immediately',
                                category: 'Cooking',
                                isAvailable: true,
                                isFastBooking: false,
                                estimatedWaitTime: 120,
                                workerCount: 6,
                            });
                            return [4 /*yield*/, this.serviceRepository.save(newService)];
                        case 6:
                            _b.sent();
                            this.logger.log('Cooking service added successfully');
                            _b.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            e_1 = _b.sent();
                            this.logger.warn("Cooking service check/creation: ".concat(e_1.message));
                            return [3 /*break*/, 9];
                        case 9:
                            _b.trys.push([9, 17, , 18]);
                            return [4 /*yield*/, this.serviceRepository.findOne({
                                    where: { category: 'Cooking' }
                                })];
                        case 10:
                            cookingService_1 = _b.sent();
                            if (!cookingService_1) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.workerRepository.find({
                                    relations: ['services']
                                })];
                        case 11:
                            workers = _b.sent();
                            updatedCount = 0;
                            _i = 0, workers_1 = workers;
                            _b.label = 12;
                        case 12:
                            if (!(_i < workers_1.length)) return [3 /*break*/, 15];
                            worker = workers_1[_i];
                            services = worker.services || [];
                            hasCookingService = services.some(function (s) { return s.id === cookingService_1.id; });
                            if (!!hasCookingService) return [3 /*break*/, 14];
                            worker.services = __spreadArray(__spreadArray([], services, true), [cookingService_1], false);
                            return [4 /*yield*/, this.workerRepository.save(worker)];
                        case 13:
                            _b.sent();
                            updatedCount++;
                            this.logger.log("Added Cooking service to worker ".concat(worker.id));
                            _b.label = 14;
                        case 14:
                            _i++;
                            return [3 /*break*/, 12];
                        case 15:
                            if (updatedCount > 0) {
                                this.logger.log("Added Cooking service to ".concat(updatedCount, " workers"));
                            }
                            _b.label = 16;
                        case 16: return [3 /*break*/, 18];
                        case 17:
                            e_2 = _b.sent();
                            this.logger.warn("Worker service update: ".concat(e_2.message));
                            return [3 /*break*/, 18];
                        case 18: return [4 /*yield*/, this.bookingRepository.find({
                                where: {
                                    type: (0, typeorm_1.In)([booking_entity_1.BookingType.ON_DEMAND, booking_entity_1.BookingType.SUBSCRIPTION]),
                                    status: (0, typeorm_1.In)([booking_entity_1.BookingStatus.REQUESTED, booking_entity_1.BookingStatus.CONFIRMED]),
                                    workerId: (0, typeorm_1.IsNull)(),
                                },
                                relations: ['service', 'user'],
                                take: 25, // Process max 25 at a time to avoid overwhelming the connection pool
                            })];
                        case 19:
                            bookingsToAssign = _b.sent();
                            this.logger.log("Found ".concat(bookingsToAssign.length, " on-demand bookings needing worker assignment"));
                            successfulAssignments = 0;
                            failedAssignments = 0;
                            // Intelligent backoff logic
                            if (bookingsToAssign.length === 0) {
                                this.idleCounter = Math.min(this.idleCounter + 1, this.BACKOFF_LEVELS.length - 1);
                                this.currentIntervalMs = this.BACKOFF_LEVELS[this.idleCounter];
                                this.logger.log("No bookings found, increasing interval to ".concat(this.currentIntervalMs / 60000, " minutes"));
                            }
                            else {
                                this.idleCounter = 0;
                                this.currentIntervalMs = this.BACKOFF_LEVELS[0];
                                this.logger.log("Found bookings, resetting interval to 1 minute");
                            }
                            _a = 0, bookingsToAssign_1 = bookingsToAssign;
                            _b.label = 20;
                        case 20:
                            if (!(_a < bookingsToAssign_1.length)) return [3 /*break*/, 25];
                            booking = bookingsToAssign_1[_a];
                            _b.label = 21;
                        case 21:
                            _b.trys.push([21, 23, , 24]);
                            return [4 /*yield*/, this.assignWorkerForBooking(booking)];
                        case 22:
                            result = _b.sent();
                            if (result.success) {
                                successfulAssignments++;
                            }
                            else {
                                failedAssignments++;
                            }
                            return [3 /*break*/, 24];
                        case 23:
                            error_1 = _b.sent();
                            failedAssignments++;
                            errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                            this.logger.error("Error assigning worker for on-demand booking ".concat(booking.id, ": ").concat(errorMessage));
                            return [3 /*break*/, 24];
                        case 24:
                            _a++;
                            return [3 /*break*/, 20];
                        case 25:
                            this.logger.log("On-demand assignment scheduler completed: ".concat(successfulAssignments, " assigned, ").concat(failedAssignments, " failed out of ").concat(bookingsToAssign.length, " bookings"));
                            return [3 /*break*/, 28];
                        case 26:
                            error_2 = _b.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                            this.logger.error("Error in on-demand assignment scheduler: ".concat(errorMessage));
                            // On error backoff more aggressively
                            this.idleCounter = Math.min(this.idleCounter + 2, this.BACKOFF_LEVELS.length - 1);
                            this.currentIntervalMs = this.BACKOFF_LEVELS[this.idleCounter];
                            return [3 /*break*/, 28];
                        case 27:
                            // Always clear the hard timeout and reset running flag
                            clearTimeout(hardResetTimeout);
                            this.isRunning = false;
                            return [7 /*endfinally*/];
                        case 28:
                            // Schedule next run only after completion
                            this.scheduleNextRun();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Derive serviceId from subscription if missing
         */
        OnDemandAssignmentScheduler_1.prototype.deriveServiceIdFromBooking = function (booking) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, serviceType, profile, rawCustomPlanData, customPlanData, errorMessage, normalizedType, category, service, allServices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!booking.subscriptionId)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.subscriptionRepository.findOne({
                                    where: { id: booking.subscriptionId },
                                })];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription)
                                return [2 /*return*/, null];
                            serviceType = null;
                            if (!subscription.serviceProfileId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.serviceProfileRepository.findOne({
                                    where: { id: subscription.serviceProfileId },
                                })];
                        case 2:
                            profile = _a.sent();
                            if (profile) {
                                serviceType = profile.serviceType;
                                this.logger.log("Derived serviceType \"".concat(serviceType, "\" from serviceProfileId ").concat(subscription.serviceProfileId));
                            }
                            _a.label = 3;
                        case 3:
                            // Fallback to customPlanData
                            if (!serviceType && subscription.customPlanData) {
                                try {
                                    rawCustomPlanData = subscription.customPlanData;
                                    this.logger.log("customPlanData raw type: ".concat(typeof rawCustomPlanData, ", value: ").concat(JSON.stringify(rawCustomPlanData).substring(0, 100), "..."));
                                    customPlanData = typeof rawCustomPlanData === 'string'
                                        ? JSON.parse(rawCustomPlanData)
                                        : rawCustomPlanData;
                                    this.logger.log("Parsed customPlanData: serviceType=".concat(customPlanData.serviceType, ", category=").concat(customPlanData.category, ", bhk=").concat(customPlanData.bhk));
                                    if (customPlanData.serviceType) {
                                        serviceType = customPlanData.serviceType;
                                        this.logger.log("Derived serviceType \"".concat(serviceType, "\" from customPlanData.serviceType"));
                                    }
                                    else if (customPlanData.category) {
                                        serviceType = customPlanData.category;
                                        this.logger.log("Derived serviceType \"".concat(serviceType, "\" from customPlanData.category"));
                                    }
                                }
                                catch (e) {
                                    errorMessage = e instanceof Error ? e.message : String(e);
                                    this.logger.warn("Error parsing customPlanData for subscription ".concat(subscription.id, ": ").concat(errorMessage));
                                }
                            }
                            if (!serviceType)
                                return [2 /*return*/, null];
                            normalizedType = String(serviceType).toUpperCase();
                            category = null;
                            if (normalizedType === 'COOK' || normalizedType === 'COOKING' || normalizedType.includes('COOK')) {
                                category = 'Cooking';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Cooking\""));
                            }
                            else if (normalizedType === 'MAID' || normalizedType.includes('MAID')) {
                                category = 'Maid';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Maid\""));
                            }
                            else if (normalizedType === 'CLEANING' || normalizedType.includes('CLEAN')) {
                                category = 'Cleaning';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Cleaning\""));
                            }
                            else {
                                this.logger.warn("Unknown serviceType \"".concat(serviceType, "\" (normalized: \"").concat(normalizedType, "\"), cannot map to category"));
                            }
                            if (!category) {
                                this.logger.error("No category mapped for serviceType \"".concat(serviceType, "\""));
                                return [2 /*return*/, null];
                            }
                            this.logger.log("Looking for service with category \"".concat(category, "\"..."));
                            return [4 /*yield*/, this.serviceRepository.findOne({
                                    where: { category: category },
                                })];
                        case 4:
                            service = _a.sent();
                            if (!!service) return [3 /*break*/, 6];
                            this.logger.error("No service found with category \"".concat(category, "\". Checking all services..."));
                            return [4 /*yield*/, this.serviceRepository.find()];
                        case 5:
                            allServices = _a.sent();
                            this.logger.error("Available services: ".concat(JSON.stringify(allServices.map(function (s) { return ({ id: s.id, category: s.category, name: s.name }); }))));
                            return [2 /*return*/, null];
                        case 6:
                            this.logger.log("Found service ID ".concat(service.id, " for category \"").concat(category, "\""));
                            return [2 /*return*/, service.id];
                    }
                });
            });
        };
        /**
         * Assign a worker to an on-demand booking
         */
        OnDemandAssignmentScheduler_1.prototype.assignWorkerForBooking = function (booking) {
            return __awaiter(this, void 0, void 0, function () {
                var derivedServiceId, user, isUUID, numericId, userLat, userLng, workers, startTimeDate, endTimeDate, dateObj, parseTimeStr, startParsed, endParsed, availableWorkersWithDistance, _i, workers_2, worker, matchedSlot, _a, _b, _c, worker, distance, nearestWorker, error_3, errorMessage;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 21, , 22]);
                            // Validate booking has required data
                            if (!booking.userId) {
                                this.logger.error("Booking ".concat(booking.id, " has no userId"));
                                return [2 /*return*/, { success: false, reason: 'Booking has no userId' }];
                            }
                            if (!!booking.serviceId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.deriveServiceIdFromBooking(booking)];
                        case 1:
                            derivedServiceId = _d.sent();
                            if (!derivedServiceId) return [3 /*break*/, 3];
                            booking.serviceId = derivedServiceId;
                            // Update the booking in DB so other processes see it
                            return [4 /*yield*/, this.bookingRepository.update(booking.id, { serviceId: derivedServiceId })];
                        case 2:
                            // Update the booking in DB so other processes see it
                            _d.sent();
                            this.logger.log("Derived and set serviceId ".concat(derivedServiceId, " for booking ").concat(booking.id));
                            return [3 /*break*/, 4];
                        case 3:
                            this.logger.error("Booking ".concat(booking.id, " has no serviceId and could not derive one"));
                            return [2 /*return*/, { success: false, reason: 'Booking has no serviceId' }];
                        case 4:
                            user = booking.user;
                            if (!!user) return [3 /*break*/, 8];
                            this.logger.log("User relation not loaded for booking ".concat(booking.id, ", querying by numeric id..."));
                            isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(booking.userId);
                            if (!isUUID) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { publicId: booking.userId },
                                })];
                        case 5:
                            user = _d.sent();
                            return [3 /*break*/, 8];
                        case 6:
                            numericId = parseInt(booking.userId, 10);
                            if (!!isNaN(numericId)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: numericId },
                                })];
                        case 7:
                            user = _d.sent();
                            _d.label = 8;
                        case 8:
                            if (!user) {
                                this.logger.error("User ".concat(booking.userId, " not found for booking ").concat(booking.id));
                                return [2 /*return*/, { success: false, reason: 'User not found' }];
                            }
                            userLat = void 0;
                            userLng = void 0;
                            if (user.preferredLat && user.preferredLng) {
                                userLat = parseFloat(user.preferredLat);
                                userLng = parseFloat(user.preferredLng);
                            }
                            else if (user.latitude && user.longitude) {
                                userLat = parseFloat(user.latitude);
                                userLng = parseFloat(user.longitude);
                            }
                            else {
                                this.logger.warn("No location found for user ".concat(booking.userId, " - cannot assign worker"));
                                return [2 /*return*/, { success: false, reason: 'No user location available' }];
                            }
                            this.logger.log("Assigning worker for on-demand booking ".concat(booking.id, " at location: lat=").concat(userLat, ", lng=").concat(userLng));
                            return [4 /*yield*/, this.workerRepository
                                    .createQueryBuilder('worker')
                                    .leftJoinAndSelect('worker.services', 'service')
                                    .where('service.id = :serviceId', { serviceId: booking.serviceId })
                                    .andWhere('worker.isAvailable = :isAvailable', { isAvailable: true })
                                    .getMany()];
                        case 9:
                            workers = _d.sent();
                            if (workers.length === 0) {
                                this.logger.warn("No workers available for service ".concat(booking.serviceId));
                                return [2 /*return*/, { success: false, reason: 'No workers available for this service' }];
                            }
                            this.logger.log("Found ".concat(workers.length, " workers for service ").concat(booking.serviceId));
                            startTimeDate = null;
                            endTimeDate = null;
                            if (booking.date && booking.startTime && booking.endTime) {
                                try {
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
                                }
                                catch (err) {
                                    this.logger.error("Error parsing booking times for slot lookup: ".concat(err.message));
                                }
                            }
                            availableWorkersWithDistance = [];
                            _i = 0, workers_2 = workers;
                            _d.label = 10;
                        case 10:
                            if (!(_i < workers_2.length)) return [3 /*break*/, 14];
                            worker = workers_2[_i];
                            matchedSlot = null;
                            if (!(startTimeDate && endTimeDate)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.slotsService.findAvailableSlotFlexible(worker.id, startTimeDate, endTimeDate, true // exact/flexible matching only (disable same-day fallback)
                                )];
                        case 11:
                            matchedSlot = _d.sent();
                            _d.label = 12;
                        case 12:
                            if (matchedSlot || !startTimeDate) {
                                availableWorkersWithDistance.push({
                                    worker: worker,
                                    distance: this.calculateDistance(userLat, userLng, worker.latitude || 0, worker.longitude || 0),
                                    slot: matchedSlot
                                });
                            }
                            _d.label = 13;
                        case 13:
                            _i++;
                            return [3 /*break*/, 10];
                        case 14:
                            if (availableWorkersWithDistance.length === 0) {
                                this.logger.warn("No workers with available slots for service ".concat(booking.serviceId, " on ").concat(booking.date, " at ").concat(booking.startTime));
                                return [2 /*return*/, { success: false, reason: 'No workers with available slots at this time' }];
                            }
                            // Sort by distance (nearest first)
                            availableWorkersWithDistance.sort(function (a, b) { return a.distance - b.distance; });
                            // Log distances
                            for (_a = 0, _b = availableWorkersWithDistance.slice(0, 5); _a < _b.length; _a++) {
                                _c = _b[_a], worker = _c.worker, distance = _c.distance;
                                this.logger.log("Available worker ".concat(worker.id, " distance: ").concat(distance.toFixed(2), "km"));
                            }
                            nearestWorker = availableWorkersWithDistance[0];
                            // Update the booking with the worker
                            booking.workerId = nearestWorker.worker.id;
                            booking.assignmentState = booking_entity_1.AssignmentState.ASSIGNED;
                            if (!nearestWorker.slot) return [3 /*break*/, 16];
                            booking.slotId = nearestWorker.slot.id;
                            booking.slot = nearestWorker.slot;
                            return [4 /*yield*/, this.slotsService.bookSlotAtomic(nearestWorker.slot.id)];
                        case 15:
                            _d.sent();
                            this.logger.log("Locked slot ".concat(nearestWorker.slot.id, " for booking ").concat(booking.id, " under worker ").concat(nearestWorker.worker.id));
                            _d.label = 16;
                        case 16:
                            // If status was requested, update to confirmed
                            if (booking.status === booking_entity_1.BookingStatus.REQUESTED) {
                                booking.status = booking_entity_1.BookingStatus.CONFIRMED;
                            }
                            return [4 /*yield*/, this.bookingRepository.save(booking)];
                        case 17:
                            _d.sent();
                            if (!booking.subscriptionId) return [3 /*break*/, 19];
                            return [4 /*yield*/, this.subscriptionWorkerSyncService.syncWorkerToSubscription(booking.subscriptionId, nearestWorker.worker.id)];
                        case 18:
                            _d.sent();
                            _d.label = 19;
                        case 19: 
                        // Send push notification to worker
                        return [4 /*yield*/, this._notifyWorkerOfAssignment(nearestWorker.worker, booking)];
                        case 20:
                            // Send push notification to worker
                            _d.sent();
                            this.logger.log("Directly assigned worker ".concat(nearestWorker.worker.id, " to on-demand booking ").concat(booking.id, " (distance: ").concat(nearestWorker.distance.toFixed(2), "km)"));
                            return [2 /*return*/, { success: true, worker: nearestWorker.worker }];
                        case 21:
                            error_3 = _d.sent();
                            errorMessage = error_3 instanceof Error ? error_3.message : String(error_3);
                            this.logger.error("Error in assignWorkerForBooking for booking ".concat(booking.id, ": ").concat(errorMessage));
                            return [2 /*return*/, { success: false, reason: errorMessage }];
                        case 22: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send push notification to worker about new booking assignment
         * Only sends notification if payment is complete (isPaid = true)
         */
        OnDemandAssignmentScheduler_1.prototype._notifyWorkerOfAssignment = function (worker, booking) {
            return __awaiter(this, void 0, void 0, function () {
                var service, serviceName, bookingDate, title, body, customerName, customerPhone, customerAddress, price;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            // Check if notification has already been sent to prevent duplicate notifications
                            if (booking.notificationSent) {
                                this.logger.log("Skipping notification for on-demand booking ".concat(booking.id, " - notification already sent"));
                                return [2 /*return*/];
                            }
                            // Check if payment is complete before notifying worker
                            if (!booking.isPaid) {
                                this.logger.log("Skipping notification for on-demand booking ".concat(booking.id, " - payment not complete (isPaid: ").concat(booking.isPaid, ")"));
                                return [2 /*return*/];
                            }
                            if (!worker.fcmToken) {
                                this.logger.warn("Worker ".concat(worker.id, " has no FCM token, skipping notification"));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.serviceRepository.findOne({ where: { id: booking.serviceId } })];
                        case 1:
                            service = _o.sent();
                            serviceName = (service === null || service === void 0 ? void 0 : service.name) || 'Service';
                            bookingDate = new Date(booking.date).toLocaleDateString('en-IN');
                            title = 'नई बुकिंग मिली! 🎉';
                            body = "".concat(serviceName, " - ").concat(bookingDate, " \u0915\u094B\u0964 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u092A\u0924\u093E \u0914\u0930 \u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0910\u092A \u0916\u094B\u0932\u0947\u0902\u0964");
                            customerName = (_b = (_a = booking.user) === null || _a === void 0 ? void 0 : _a.firstName) !== null && _b !== void 0 ? _b : 'Customer';
                            customerPhone = (_d = (_c = booking.user) === null || _c === void 0 ? void 0 : _c.phone) !== null && _d !== void 0 ? _d : '';
                            customerAddress = (_f = (_e = booking.user) === null || _e === void 0 ? void 0 : _e.address) !== null && _f !== void 0 ? _f : '';
                            price = (_k = (_h = (_g = booking.amount) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : (_j = booking.totalAmount) === null || _j === void 0 ? void 0 : _j.toString()) !== null && _k !== void 0 ? _k : '0';
                            // Use push notification with both android.notification (for sound in background/terminated)
                            // and data payload (for Flutter to show in-app dialog in foreground)
                            // The notificationSent flag prevents duplicate notifications
                            return [4 /*yield*/, this.notificationsService.sendPushNotification(worker.fcmToken, title, body, {
                                    type: 'new_booking',
                                    bookingId: booking.id.toString(),
                                    serviceName: serviceName,
                                    serviceDate: bookingDate,
                                    startTime: (_l = booking.startTime) !== null && _l !== void 0 ? _l : '',
                                    endTime: (_m = booking.endTime) !== null && _m !== void 0 ? _m : '',
                                    customerName: customerName,
                                    customerPhone: customerPhone,
                                    customerAddress: customerAddress,
                                    price: price,
                                    assignmentType: 'on_demand',
                                    timestamp: new Date().toISOString(),
                                })];
                        case 2:
                            // Use push notification with both android.notification (for sound in background/terminated)
                            // and data payload (for Flutter to show in-app dialog in foreground)
                            // The notificationSent flag prevents duplicate notifications
                            _o.sent();
                            // Mark notification as sent to prevent duplicates
                            booking.notificationSent = true;
                            return [4 /*yield*/, this.bookingRepository.save(booking)];
                        case 3:
                            _o.sent();
                            this.logger.log("Sent data-only notification to worker ".concat(worker.id, " for booking ").concat(booking.id));
                            return [2 /*return*/];
                    }
                });
            });
        };
        return OnDemandAssignmentScheduler_1;
    }());
    __setFunctionName(_classThis, "OnDemandAssignmentScheduler");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OnDemandAssignmentScheduler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OnDemandAssignmentScheduler = _classThis;
}();
exports.OnDemandAssignmentScheduler = OnDemandAssignmentScheduler;
