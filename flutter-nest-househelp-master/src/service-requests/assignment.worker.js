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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentWorker = void 0;
var common_1 = require("@nestjs/common");
var service_profile_entity_1 = require("../service-profiles/entities/service-profile.entity");
var geospatial_utils_1 = require("../common/geospatial.utils");
var AssignmentWorker = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AssignmentWorker = _classThis = /** @class */ (function () {
        function AssignmentWorker_1(slotsService, serviceRequestsRepository, workersRepository, servicesRepository, usersRepository, serviceProfilesService, notificationsService, configService) {
            this.slotsService = slotsService;
            this.serviceRequestsRepository = serviceRequestsRepository;
            this.workersRepository = workersRepository;
            this.servicesRepository = servicesRepository;
            this.usersRepository = usersRepository;
            this.serviceProfilesService = serviceProfilesService;
            this.notificationsService = notificationsService;
            this.configService = configService;
            this.logger = new common_1.Logger(AssignmentWorker.name);
        }
        AssignmentWorker_1.prototype.processAssignment = function (requestId) {
            return __awaiter(this, void 0, void 0, function () {
                var request, location_1, userLat, userLng, _a, startTime, endTime, serviceId, serviceProfile, categoryMap, category, services, isGranularSlot, bestWorker, error_1;
                var _b;
                var _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _f.trys.push([0, 11, , 13]);
                            return [4 /*yield*/, this.serviceRequestsRepository.findOne({
                                    where: { id: requestId },
                                })];
                        case 1:
                            request = _f.sent();
                            // CRITICAL: Ensure idempotent markAsFailed
                            if (!request || request.assignmentStatus !== 'REQUESTED') {
                                this.logger.log("Request ".concat(requestId, " already processed or not found, skipping"));
                                return [2 /*return*/]; // Already processed
                            }
                            this.logger.log("Processing assignment for request ".concat(requestId));
                            location_1 = (_c = request.metadata) === null || _c === void 0 ? void 0 : _c.location;
                            userLat = (_d = location_1 === null || location_1 === void 0 ? void 0 : location_1.lat) !== null && _d !== void 0 ? _d : this.configService.get('defaultLocation.lat', 28.5804579);
                            userLng = (_e = location_1 === null || location_1 === void 0 ? void 0 : location_1.lng) !== null && _e !== void 0 ? _e : this.configService.get('defaultLocation.lng', 77.4392951);
                            _a = this.parseTimeWindow(request.date, request.timeWindow), startTime = _a.startTime, endTime = _a.endTime;
                            serviceId = request.serviceId;
                            if (!(!serviceId && request.serviceProfileId)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.serviceProfilesService.getProfileById(request.serviceProfileId)];
                        case 2:
                            serviceProfile = _f.sent();
                            if (!serviceProfile) return [3 /*break*/, 4];
                            categoryMap = (_b = {},
                                _b[service_profile_entity_1.ServiceType.COOK] = 'Cooking',
                                _b[service_profile_entity_1.ServiceType.MAID] = 'Maid',
                                _b[service_profile_entity_1.ServiceType.CLEANING] = 'Cleaning',
                                _b);
                            category = categoryMap[serviceProfile.serviceType];
                            if (!category) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.servicesRepository.find({
                                    where: { category: category },
                                    take: 1,
                                })];
                        case 3:
                            services = _f.sent();
                            if (services.length > 0) {
                                serviceId = services[0].id;
                                this.logger.log("Mapped service profile ".concat(request.serviceProfileId, " (").concat(serviceProfile.serviceType, ") to service ").concat(serviceId));
                            }
                            _f.label = 4;
                        case 4:
                            if (!(!serviceId || serviceId === 0)) return [3 /*break*/, 6];
                            this.logger.error("No valid serviceId found for request ".concat(requestId, ". serviceId: ").concat(serviceId, ", serviceProfileId: ").concat(request.serviceProfileId));
                            return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                    assignmentStatus: 'FAILED_TO_ASSIGN',
                                    failureReason: 'No valid service specified for assignment',
                                    assignedWorkerId: null,
                                    assignedSlotId: null,
                                })];
                        case 5:
                            _f.sent();
                            return [2 /*return*/]; // Stop processing - don't default to Cleaning
                        case 6:
                            isGranularSlot = request.timeWindow.toLowerCase().includes('am') ||
                                request.timeWindow.toLowerCase().includes('pm');
                            return [4 /*yield*/, this.findBestWorker(serviceId, userLat, userLng, startTime, endTime, isGranularSlot)];
                        case 7:
                            bestWorker = _f.sent();
                            if (!!bestWorker) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                    assignmentStatus: 'FAILED_TO_ASSIGN',
                                    failureReason: 'No professional available',
                                    assignedWorkerId: null,
                                    assignedSlotId: null,
                                })];
                        case 8:
                            _f.sent();
                            this.logger.log("Failed to assign worker to request ".concat(requestId, ": No professional available"));
                            return [2 /*return*/];
                        case 9: 
                        // Mark as assigned
                        return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                assignmentStatus: 'ASSIGNED',
                                assignedWorkerId: bestWorker.worker.id,
                                assignedSlotId: bestWorker.slot.id,
                                failureReason: null,
                            })];
                        case 10:
                            // Mark as assigned
                            _f.sent();
                            this.logger.log("Successfully assigned worker ".concat(bestWorker.worker.id, " to request ").concat(requestId));
                            return [3 /*break*/, 13];
                        case 11:
                            error_1 = _f.sent();
                            this.logger.error("Error processing assignment for request ".concat(requestId, ": ").concat(error_1.message));
                            return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                    assignmentStatus: 'FAILED_TO_ASSIGN',
                                    failureReason: error_1.message,
                                    assignedWorkerId: null,
                                    assignedSlotId: null,
                                })];
                        case 12:
                            _f.sent();
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send push notification to worker about new booking assignment
         */
        AssignmentWorker_1.prototype._notifyWorkerOfAssignment = function (worker, request) {
            return __awaiter(this, void 0, void 0, function () {
                var service, serviceName, requestDate, title, body, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!worker.fcmToken) {
                                this.logger.warn("Worker ".concat(worker.id, " has no FCM token, skipping notification"));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: request.serviceId },
                                })];
                        case 1:
                            service = _a.sent();
                            serviceName = (service === null || service === void 0 ? void 0 : service.name) || 'Service';
                            requestDate = new Date(request.date).toLocaleDateString('en-IN');
                            title = 'नई बुकिंग मिली! 🎉';
                            body = "".concat(serviceName, " - ").concat(requestDate, " \u0915\u094B\u0964 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u092A\u0924\u093E \u0914\u0930 \u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0910\u092A \u0916\u094B\u0932\u0947\u0902\u0964");
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.notificationsService.sendPushNotification(worker.fcmToken, title, body)];
                        case 3:
                            _a.sent();
                            this.logger.log("Sent push notification to worker ".concat(worker.id, " for request ").concat(request.id));
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            this.logger.error("Failed to send push notification to worker ".concat(worker.id, ": ").concat(error_2.message));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AssignmentWorker_1.prototype.parseTimeWindow = function (date, timeWindow) {
            var startHour = 8;
            var startMinute = 0;
            var endHour = 12;
            var endMinute = 0;
            var timeWindowClean = timeWindow.trim().toLowerCase();
            if (timeWindowClean.includes('am') || timeWindowClean.includes('pm')) {
                var parts = timeWindowClean.split('-');
                var startStr = parts[0].trim();
                var endStr = parts[1] ? parts[1].trim() : null;
                var parseTimeStr = function (str) {
                    var isPM = str.includes('pm');
                    var cleanStr = str.replace('am', '').replace('pm', '').trim();
                    var timeParts = cleanStr.split(':');
                    var hours = parseInt(timeParts[0], 10);
                    var minutes = parseInt(timeParts[1] || '0', 10);
                    if (isPM && hours < 12)
                        hours += 12;
                    if (!isPM && hours === 12)
                        hours = 0;
                    return { hours: hours, minutes: minutes };
                };
                try {
                    var start = parseTimeStr(startStr);
                    startHour = start.hours;
                    startMinute = start.minutes;
                    if (endStr) {
                        var end = parseTimeStr(endStr);
                        endHour = end.hours;
                        endMinute = end.minutes;
                    }
                    else {
                        endHour = startHour + 1;
                        endMinute = startMinute;
                    }
                }
                catch (err) {
                    this.logger.warn("Failed to parse granular timeWindow: ".concat(timeWindow, ", defaulting."));
                }
            }
            else {
                switch (timeWindowClean) {
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
            }
            var startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute, 0, 0);
            var endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, endMinute, 0, 0);
            return { startTime: startTime, endTime: endTime };
        };
        // Enhanced worker matching logic adapted from AssignmentsService.findBestWorker()
        AssignmentWorker_1.prototype.findBestWorker = function (serviceId_1, userLat_1, userLng_1, startTime_1, endTime_1) {
            return __awaiter(this, arguments, void 0, function (serviceId, userLat, userLng, startTime, endTime, isGranularSlot) {
                var workers, scoredWorkers, availableWorkers;
                var _this = this;
                if (isGranularSlot === void 0) { isGranularSlot = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('🔍 Starting worker search for service:', serviceId);
                            this.logger.log('📍 User location:', { lat: userLat, lng: userLng });
                            this.logger.log('⏰ Requested time:', { start: startTime, end: endTime });
                            return [4 /*yield*/, this.workersRepository.find({
                                    where: {
                                        services: { id: serviceId },
                                        isActive: true,
                                        isAvailable: true,
                                    },
                                    relations: ['user', 'services'],
                                })];
                        case 1:
                            workers = _a.sent();
                            this.logger.log('👷 Found workers for service:', workers.length);
                            if (workers.length === 0) {
                                this.logger.log('❌ No workers found for service');
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, Promise.all(workers.map(function (worker) { return __awaiter(_this, void 0, void 0, function () {
                                    var user, workerLat, workerLng, distance, maxRadius, availableSlot, requestedDate, nextDay, sameDaySlots, requestedDate, nextDay, sameDaySlots, distanceScore, ratingScore, reviewScore, totalScore;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                user = worker.user;
                                                if (!user) {
                                                    this.logger.log("\u26A0\uFE0F Worker ".concat(worker.id, " has no associated user"));
                                                    return [2 /*return*/, null];
                                                }
                                                workerLat = worker.currentLat;
                                                workerLng = worker.currentLng;
                                                // Fallback 1: Use worker's primary location
                                                if (!workerLat || !workerLng) {
                                                    workerLat = worker.latitude;
                                                    workerLng = worker.longitude;
                                                    this.logger.log("\uD83D\uDCCD Using primary location for worker ".concat(worker.id));
                                                }
                                                // Fallback 2: Use user's location
                                                if (!workerLat || !workerLng) {
                                                    workerLat = user.latitude;
                                                    workerLng = user.longitude;
                                                    this.logger.log("\uD83D\uDCCD Using user location for worker ".concat(worker.id));
                                                }
                                                // Final fallback: Skip workers without any location data
                                                if (!workerLat || !workerLng) {
                                                    this.logger.log("\u274C Skipping worker ".concat(worker.id, " - no location data available"));
                                                    return [2 /*return*/, null];
                                                }
                                                distance = this.calculateDistance(userLat, userLng, workerLat, workerLng);
                                                this.logger.log("\uD83D\uDCCF Worker ".concat(worker.id, " distance: ").concat(distance.toFixed(2), "km"));
                                                maxRadius = this.configService.get('assignment.maxRadius', 15);
                                                if (distance > maxRadius) {
                                                    this.logger.log("\u274C Worker ".concat(worker.id, " too far (").concat(distance.toFixed(2), "km > ").concat(maxRadius, "km)"));
                                                    return [2 /*return*/, null];
                                                }
                                                // DEBUG: Log the time parameters being passed
                                                this.logger.log("\uD83D\uDD0D DEBUG: Calling findAvailableSlotFlexible for worker ".concat(worker.id, " with startTime=").concat(startTime.toISOString(), ", endTime=").concat(endTime.toISOString(), ", exactMatch=").concat(isGranularSlot));
                                                return [4 /*yield*/, this.slotsService.findAvailableSlotFlexible(worker.id, startTime, endTime, isGranularSlot)];
                                            case 1:
                                                availableSlot = _a.sent();
                                                if (!(!availableSlot && !isGranularSlot)) return [3 /*break*/, 3];
                                                this.logger.log("\u274C Worker ".concat(worker.id, " not available for requested time, trying alternative strategies..."));
                                                requestedDate = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
                                                nextDay = new Date(requestedDate);
                                                nextDay.setDate(requestedDate.getDate() + 1);
                                                return [4 /*yield*/, this.slotsService.getAvailableSlotsForWorker(worker.id, requestedDate, nextDay)];
                                            case 2:
                                                sameDaySlots = _a.sent();
                                                if (sameDaySlots.length > 0) {
                                                    this.logger.log("\u2705 Worker ".concat(worker.id, " found with same-day alternative slot"));
                                                    availableSlot = sameDaySlots[0]; // Use the earliest available slot
                                                }
                                                _a.label = 3;
                                            case 3:
                                                if (!(!availableSlot && !isGranularSlot)) return [3 /*break*/, 5];
                                                requestedDate = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
                                                nextDay = new Date(requestedDate);
                                                nextDay.setDate(requestedDate.getDate() + 1);
                                                return [4 /*yield*/, this.slotsService.getAvailableSlotsForWorker(worker.id, requestedDate, nextDay)];
                                            case 4:
                                                sameDaySlots = _a.sent();
                                                if (sameDaySlots.length > 0) {
                                                    this.logger.log("\u2705 Worker ".concat(worker.id, " found with same-day alternative slot"));
                                                    availableSlot = sameDaySlots[0]; // Use the earliest available slot
                                                }
                                                _a.label = 5;
                                            case 5:
                                                if (!availableSlot) {
                                                    this.logger.log("\u274C Worker ".concat(worker.id, " not available with any strategy"));
                                                    return [2 /*return*/, null];
                                                }
                                                distanceScore = distance * 0.3;
                                                ratingScore = (5 - worker.rating) * 8 * 0.4;
                                                reviewScore = (100 - Math.min(worker.reviewCount, 100)) * 0.3;
                                                totalScore = distanceScore + ratingScore + reviewScore;
                                                this.logger.log("\u2705 Worker ".concat(worker.id, " scored: ").concat(totalScore.toFixed(2), " (distance: ").concat(distance.toFixed(2), "km, rating: ").concat(worker.rating, ")"));
                                                return [2 /*return*/, {
                                                        worker: worker,
                                                        distance: distance,
                                                        score: totalScore,
                                                        slot: availableSlot,
                                                    }];
                                        }
                                    });
                                }); }))];
                        case 2:
                            scoredWorkers = _a.sent();
                            availableWorkers = scoredWorkers
                                .filter(function (w) { return w !== null; })
                                .sort(function (a, b) { return a.score - b.score; });
                            this.logger.log('🏆 Available workers after scoring:', availableWorkers.length);
                            if (availableWorkers.length === 0) {
                                this.logger.log('❌ No workers available after all filters');
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, availableWorkers[0]]; // Return best match
                    }
                });
            });
        };
        AssignmentWorker_1.prototype.calculateDistance = function (lat1, lon1, lat2, lon2) {
            return (0, geospatial_utils_1.calculateDistance)(lat1, lon1, lat2, lon2);
        };
        AssignmentWorker_1.prototype.deg2rad = function (deg) {
            return (0, geospatial_utils_1.toRadians)(deg);
        };
        return AssignmentWorker_1;
    }());
    __setFunctionName(_classThis, "AssignmentWorker");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AssignmentWorker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AssignmentWorker = _classThis;
}();
exports.AssignmentWorker = AssignmentWorker;
