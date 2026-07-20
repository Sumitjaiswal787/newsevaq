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
exports.LocationService = void 0;
var common_1 = require("@nestjs/common");
var LocationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LocationService = _classThis = /** @class */ (function () {
        function LocationService_1(microZoneRepository, serviceAreaRepository, waitlistRepository, workerRepository, userRepository) {
            this.microZoneRepository = microZoneRepository;
            this.serviceAreaRepository = serviceAreaRepository;
            this.waitlistRepository = waitlistRepository;
            this.workerRepository = workerRepository;
            this.userRepository = userRepository;
            this.logger = new common_1.Logger(LocationService.name);
            this.EARTH_RADIUS_KM = 6371;
            this.DEFAULT_RADIUS_KM = 5;
        }
        // Calculate distance between two coordinates using Haversine formula
        LocationService_1.prototype.calculateDistance = function (lat1, lng1, lat2, lng2) {
            var dLat = this.deg2rad(lat2 - lat1);
            var dLng = this.deg2rad(lng2 - lng1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) *
                    Math.cos(this.deg2rad(lat2)) *
                    Math.sin(dLng / 2) *
                    Math.sin(dLng / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return this.EARTH_RADIUS_KM * c;
        };
        LocationService_1.prototype.deg2rad = function (deg) {
            return deg * (Math.PI / 180);
        };
        // Find nearby micro-zones
        LocationService_1.prototype.findNearbyZones = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, maxRadiusKm) {
                var zones, nearbyZones, error_1;
                var _this = this;
                if (maxRadiusKm === void 0) { maxRadiusKm = 2; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Finding nearby zones for coordinates: lat=".concat(lat, ", lng=").concat(lng, ", maxRadius=").concat(maxRadiusKm, "km"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.microZoneRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            zones = _a.sent();
                            this.logger.debug("Found ".concat(zones.length, " total active zones"));
                            nearbyZones = zones.filter(function (zone) {
                                var distance = _this.calculateDistance(lat, lng, zone.centerLat, zone.centerLng);
                                var isNearby = distance <= zone.radiusKm + maxRadiusKm;
                                _this.logger.debug("Zone ".concat(zone.name, ": distance=").concat(distance.toFixed(2), "km, isNearby=").concat(isNearby));
                                return isNearby;
                            });
                            this.logger.log("Returning ".concat(nearbyZones.length, " nearby zones for lat=").concat(lat, ", lng=").concat(lng));
                            return [2 /*return*/, nearbyZones];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Error finding nearby zones: ".concat(error_1.message), error_1.stack);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Check service availability in area
        LocationService_1.prototype.checkServiceAvailability = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, radiusKm) {
                var nearbyWorkers, nearbyZones, workerCount, highDemand, estimatedWaitTime, result, error_2;
                if (radiusKm === void 0) { radiusKm = 5; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Checking service availability for lat=".concat(lat, ", lng=").concat(lng, ", radius=").concat(radiusKm, "km"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.findAvailableWorkers(lat, lng, radiusKm)];
                        case 2:
                            nearbyWorkers = _a.sent();
                            return [4 /*yield*/, this.findNearbyZones(lat, lng)];
                        case 3:
                            nearbyZones = _a.sent();
                            this.logger.debug("Found ".concat(nearbyWorkers.length, " workers and ").concat(nearbyZones.length, " zones"));
                            workerCount = nearbyWorkers.length;
                            highDemand = workerCount === 0;
                            estimatedWaitTime = 0;
                            if (workerCount > 0) {
                                estimatedWaitTime = Math.max(15, Math.floor(60 / workerCount)); // 15-60 minutes
                            }
                            else {
                                estimatedWaitTime = 120; // 2 hours waitlist
                            }
                            result = {
                                isAvailable: workerCount > 0,
                                workerCount: workerCount,
                                estimatedWaitTime: estimatedWaitTime,
                                nearbyZones: nearbyZones,
                                highDemand: highDemand,
                            };
                            this.logger.log("Service availability result: isAvailable=".concat(result.isAvailable, ", workerCount=").concat(workerCount, ", estimatedWaitTime=").concat(estimatedWaitTime, "min"));
                            return [2 /*return*/, result];
                        case 4:
                            error_2 = _a.sent();
                            this.logger.error("Error checking service availability: ".concat(error_2.message), error_2.stack);
                            throw error_2;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Find available workers in radius
        LocationService_1.prototype.findAvailableWorkers = function (lat, lng, radiusKm) {
            return __awaiter(this, void 0, void 0, function () {
                var workers, availableWorkers, error_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Finding available workers for lat=".concat(lat, ", lng=").concat(lng, ", radius=").concat(radiusKm, "km"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.workerRepository.find({
                                    where: { isActive: true },
                                    relations: ['user', 'services'],
                                })];
                        case 2:
                            workers = _a.sent();
                            this.logger.debug("Found ".concat(workers.length, " total active workers"));
                            availableWorkers = workers.filter(function (worker) {
                                // Fallback to user location if worker current location is not set
                                var workerLat = worker.currentLat || worker.latitude;
                                var workerLng = worker.currentLng || worker.longitude;
                                if (!workerLat || !workerLng) {
                                    _this.logger.debug("Worker ".concat(worker.id, ": no location data available (neither current nor base location)"));
                                    return false;
                                }
                                var distance = _this.calculateDistance(lat, lng, workerLat, workerLng);
                                var effectiveRadius = Math.min(radiusKm, worker.serviceRadiusKm || 10); // Default 10km if not set
                                var isAvailable = distance <= effectiveRadius;
                                _this.logger.debug("Worker ".concat(worker.id, ": distance=").concat(distance.toFixed(2), "km, effectiveRadius=").concat(effectiveRadius, "km, available=").concat(isAvailable));
                                return isAvailable;
                            });
                            this.logger.log("Returning ".concat(availableWorkers.length, " available workers"));
                            return [2 /*return*/, availableWorkers];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error("Error finding available workers: ".concat(error_3.message), error_3.stack);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Get available services in location
        LocationService_1.prototype.getAvailableServices = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, radiusKm) {
                var workers, services_1, result, error_4;
                var _this = this;
                if (radiusKm === void 0) { radiusKm = 5; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Getting available services for lat=".concat(lat, ", lng=").concat(lng, ", radius=").concat(radiusKm, "km"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.findAvailableWorkers(lat, lng, radiusKm)];
                        case 2:
                            workers = _a.sent();
                            this.logger.debug("Found ".concat(workers.length, " workers in area"));
                            services_1 = new Map();
                            workers.forEach(function (worker) {
                                var _a;
                                (_a = worker.services) === null || _a === void 0 ? void 0 : _a.forEach(function (service) {
                                    if (!services_1.has(service.id) &&
                                        (service.category === 'Cleaning' || service.category === 'Cooking')) {
                                        services_1.set(service.id, service);
                                        _this.logger.debug("Found service: ".concat(service.id, " - ").concat(service.name));
                                    }
                                });
                            });
                            result = Array.from(services_1.values());
                            this.logger.log("Returning ".concat(result.length, " unique services"));
                            return [2 /*return*/, result];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.error("Error getting available services: ".concat(error_4.message), error_4.stack);
                            throw error_4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Add user to waitlist
        LocationService_1.prototype.addToWaitlist = function (userId, serviceId, lat, lng, estimatedWaitTime) {
            return __awaiter(this, void 0, void 0, function () {
                var waitlistEntry, saved, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Adding user ".concat(userId, " to waitlist for service ").concat(serviceId, " at lat=").concat(lat, ", lng=").concat(lng));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            waitlistEntry = this.waitlistRepository.create({
                                userId: userId,
                                serviceId: serviceId,
                                latitude: lat,
                                longitude: lng,
                                requestedAt: new Date(),
                                status: 'pending',
                                estimatedWaitTime: estimatedWaitTime,
                            });
                            return [4 /*yield*/, this.waitlistRepository.save(waitlistEntry)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("Successfully added to waitlist with ID: ".concat(saved.id));
                            return [2 /*return*/, saved];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error("Error adding to waitlist: ".concat(error_5.message), error_5.stack);
                            throw error_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Get waitlist status for user
        LocationService_1.prototype.getWaitlistStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var entries, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Getting waitlist status for user: ".concat(userId));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.waitlistRepository.find({
                                    where: { userId: userId, status: 'pending' },
                                    order: { requestedAt: 'DESC' },
                                })];
                        case 2:
                            entries = _a.sent();
                            this.logger.debug("Found ".concat(entries.length, " pending waitlist entries for user ").concat(userId));
                            return [2 /*return*/, entries];
                        case 3:
                            error_6 = _a.sent();
                            this.logger.error("Error getting waitlist status: ".concat(error_6.message), error_6.stack);
                            throw error_6;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Cancel waitlist entry
        LocationService_1.prototype.cancelWaitlist = function (waitlistId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Cancelling waitlist entry: ".concat(waitlistId));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.waitlistRepository.update(waitlistId, { status: 'cancelled' })];
                        case 2:
                            _a.sent();
                            this.logger.log("Successfully cancelled waitlist entry: ".concat(waitlistId));
                            return [3 /*break*/, 4];
                        case 3:
                            error_7 = _a.sent();
                            this.logger.error("Error cancelling waitlist entry: ".concat(error_7.message), error_7.stack);
                            throw error_7;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Remove user from waitlist
        LocationService_1.prototype.removeFromWaitlist = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Removing user ".concat(userId, " from waitlist"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.waitlistRepository.update({ userId: userId, status: 'pending' }, { status: 'cancelled' })];
                        case 2:
                            result = _a.sent();
                            this.logger.log("Removed ".concat(result.affected || 0, " waitlist entries for user ").concat(userId));
                            return [3 /*break*/, 4];
                        case 3:
                            error_8 = _a.sent();
                            this.logger.error("Error removing from waitlist: ".concat(error_8.message), error_8.stack);
                            throw error_8;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Update user's preferred location
        LocationService_1.prototype.updatePreferredLocation = function (userId, lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var user, locationHistory, saved, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Updating preferred location for user ".concat(userId, ": lat=").concat(lat, ", lng=").concat(lng));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.userRepository.findOne({ where: { publicId: userId } })];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                this.logger.warn("User not found: ".concat(userId));
                                throw new common_1.NotFoundException("User with ID ".concat(userId, " not found"));
                            }
                            locationHistory = user.locationHistory || [];
                            locationHistory.push({
                                lat: lat,
                                lng: lng,
                                timestamp: new Date(),
                                accuracy: 10, // Default accuracy
                            });
                            // Keep only last 10 location entries
                            if (locationHistory.length > 10) {
                                locationHistory.splice(0, locationHistory.length - 10);
                            }
                            user.preferredLat = lat;
                            user.preferredLng = lng;
                            user.hasCompletedLocationSetup = true;
                            user.locationHistory = locationHistory;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 3:
                            saved = _a.sent();
                            this.logger.log("Successfully updated preferred location for user ".concat(userId));
                            return [2 /*return*/, saved];
                        case 4:
                            error_9 = _a.sent();
                            if (error_9 instanceof common_1.NotFoundException)
                                throw error_9;
                            this.logger.error("Error updating preferred location: ".concat(error_9.message), error_9.stack);
                            throw error_9;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Update worker's current location
        LocationService_1.prototype.updateWorkerLocation = function (workerId, lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, saved, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Updating current location for worker ".concat(workerId, ": lat=").concat(lat, ", lng=").concat(lng));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.workerRepository.findOne({
                                    where: { id: workerId },
                                })];
                        case 2:
                            worker = _a.sent();
                            if (!worker) {
                                this.logger.warn("Worker not found: ".concat(workerId));
                                throw new common_1.NotFoundException("Worker with ID ".concat(workerId, " not found"));
                            }
                            // Validate coordinates
                            if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                                this.logger.warn("Invalid coordinates received: lat=".concat(lat, ", lng=").concat(lng));
                                throw new common_1.BadRequestException('Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180');
                            }
                            worker.currentLat = lat;
                            worker.currentLng = lng;
                            worker.lastLocationUpdate = new Date();
                            return [4 /*yield*/, this.workerRepository.save(worker)];
                        case 3:
                            saved = _a.sent();
                            this.logger.log("Successfully updated current location for worker ".concat(workerId));
                            return [2 /*return*/, saved];
                        case 4:
                            error_10 = _a.sent();
                            if (error_10 instanceof common_1.NotFoundException ||
                                error_10 instanceof common_1.BadRequestException)
                                throw error_10;
                            this.logger.error("Error updating worker location: ".concat(error_10.message), error_10.stack);
                            throw error_10;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Get service areas covering a location
        LocationService_1.prototype.getServiceAreasForLocation = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var areas, coveringAreas, nearestAreas, error_11;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Getting service areas for location: lat=".concat(lat, ", lng=").concat(lng));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.serviceAreaRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            areas = _a.sent();
                            coveringAreas = areas.filter(function (area) {
                                var covers = lat >= area.minLat &&
                                    lat <= area.maxLat &&
                                    lng >= area.minLng &&
                                    lng <= area.maxLng;
                                _this.logger.debug("Area ".concat(area.name, ": minLat=").concat(area.minLat, ", maxLat=").concat(area.maxLat, ", minLng=").concat(area.minLng, ", maxLng=").concat(area.maxLng, ", covers=").concat(covers));
                                return covers;
                            });
                            // If no exact coverage, find nearest areas as fallback
                            if (coveringAreas.length === 0) {
                                this.logger.warn("No exact service area coverage found for lat=".concat(lat, ", lng=").concat(lng, ". Finding nearest areas..."));
                                nearestAreas = areas
                                    .map(function (area) {
                                    var centerLat = (area.minLat + area.maxLat) / 2;
                                    var centerLng = (area.minLng + area.maxLng) / 2;
                                    var distance = _this.calculateDistance(lat, lng, centerLat, centerLng);
                                    return { area: area, distance: distance };
                                })
                                    .sort(function (a, b) { return a.distance - b.distance; })
                                    .slice(0, 3);
                                this.logger.log("Found ".concat(nearestAreas.length, " nearest service areas as fallback"));
                                return [2 /*return*/, nearestAreas.map(function (item) { return item.area; })];
                            }
                            this.logger.log("Found ".concat(coveringAreas.length, " service areas covering lat=").concat(lat, ", lng=").concat(lng));
                            return [2 /*return*/, coveringAreas];
                        case 3:
                            error_11 = _a.sent();
                            this.logger.error("Error getting service areas: ".concat(error_11.message), error_11.stack);
                            throw error_11;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Create a micro-zone
        LocationService_1.prototype.createMicroZone = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var zone, saved, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Creating micro-zone: ".concat(data.name));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Validate zone data
                            if (data.centerLat < -90 || data.centerLat > 90) {
                                throw new common_1.BadRequestException('Invalid center latitude');
                            }
                            if (data.centerLng < -180 || data.centerLng > 180) {
                                throw new common_1.BadRequestException('Invalid center longitude');
                            }
                            if (data.radiusKm <= 0 || data.radiusKm > 100) {
                                throw new common_1.BadRequestException('Invalid radius: must be between 0 and 100 km');
                            }
                            zone = this.microZoneRepository.create(data);
                            return [4 /*yield*/, this.microZoneRepository.save(zone)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("Successfully created micro-zone: ".concat(saved.id, " - ").concat(data.name));
                            return [2 /*return*/, saved];
                        case 3:
                            error_12 = _a.sent();
                            if (error_12 instanceof common_1.BadRequestException)
                                throw error_12;
                            this.logger.error("Error creating micro-zone: ".concat(error_12.message), error_12.stack);
                            throw error_12;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Create a service area
        LocationService_1.prototype.createServiceArea = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var area, saved, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Creating service area: ".concat(data.name));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Validate area bounds
                            if (data.minLat > data.maxLat || data.minLng > data.maxLng) {
                                throw new common_1.BadRequestException('Invalid bounds: min values must be less than max values');
                            }
                            area = this.serviceAreaRepository.create(data);
                            return [4 /*yield*/, this.serviceAreaRepository.save(area)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("Successfully created service area: ".concat(saved.id, " - ").concat(data.name));
                            return [2 /*return*/, saved];
                        case 3:
                            error_13 = _a.sent();
                            if (error_13 instanceof common_1.BadRequestException)
                                throw error_13;
                            this.logger.error("Error creating service area: ".concat(error_13.message), error_13.stack);
                            throw error_13;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Set default location for all workers (useful for seeding/testing)
        // Only updates workers WITHOUT existing locations
        LocationService_1.prototype.updateAllWorkersToLocation = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var updated, errors, workers, _i, workers_1, worker, error_14, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Setting default location (lat=".concat(lat, ", lng=").concat(lng, ") for all workers without location"));
                            updated = 0;
                            errors = 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 9, , 10]);
                            return [4 /*yield*/, this.workerRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            workers = _a.sent();
                            this.logger.debug("Found ".concat(workers.length, " active workers to check"));
                            _i = 0, workers_1 = workers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < workers_1.length)) return [3 /*break*/, 8];
                            worker = workers_1[_i];
                            if (!(!worker.currentLat || !worker.currentLng)) return [3 /*break*/, 7];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            worker.currentLat = lat;
                            worker.currentLng = lng;
                            worker.lastLocationUpdate = new Date();
                            return [4 /*yield*/, this.workerRepository.save(worker)];
                        case 5:
                            _a.sent();
                            updated++;
                            this.logger.debug("Updated worker ".concat(worker.id, " to default location"));
                            return [3 /*break*/, 7];
                        case 6:
                            error_14 = _a.sent();
                            errors++;
                            this.logger.error("Failed to update worker ".concat(worker.id, ": ").concat(error_14.message));
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 3];
                        case 8:
                            this.logger.log("Worker location update complete: ".concat(updated, " updated, ").concat(errors, " errors"));
                            return [2 /*return*/, { updated: updated, errors: errors }];
                        case 9:
                            error_15 = _a.sent();
                            this.logger.error("Error updating all workers: ".concat(error_15.message), error_15.stack);
                            throw error_15;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        // Force update ALL workers to a specific location (ignores existing locations)
        LocationService_1.prototype.forceUpdateAllWorkersToLocation = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var updated, errors, workers, _i, workers_2, worker, oldLat, oldLng, error_16, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.warn("FORCE updating ALL workers to location (lat=".concat(lat, ", lng=").concat(lng, ") - existing locations will be overwritten!"));
                            updated = 0;
                            errors = 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 9, , 10]);
                            return [4 /*yield*/, this.workerRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            workers = _a.sent();
                            this.logger.debug("Found ".concat(workers.length, " active workers to forcefully update"));
                            _i = 0, workers_2 = workers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < workers_2.length)) return [3 /*break*/, 8];
                            worker = workers_2[_i];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            oldLat = worker.currentLat;
                            oldLng = worker.currentLng;
                            worker.currentLat = lat;
                            worker.currentLng = lng;
                            worker.lastLocationUpdate = new Date();
                            return [4 /*yield*/, this.workerRepository.save(worker)];
                        case 5:
                            _a.sent();
                            updated++;
                            this.logger.log("Force updated worker ".concat(worker.id, ": (").concat(oldLat, ", ").concat(oldLng, ") -> (").concat(lat, ", ").concat(lng, ")"));
                            return [3 /*break*/, 7];
                        case 6:
                            error_16 = _a.sent();
                            errors++;
                            this.logger.error("Failed to force update worker ".concat(worker.id, ": ").concat(error_16.message));
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 3];
                        case 8:
                            this.logger.log("FORCE worker location update complete: ".concat(updated, " updated, ").concat(errors, " errors"));
                            return [2 /*return*/, { updated: updated, errors: errors }];
                        case 9:
                            error_17 = _a.sent();
                            this.logger.error("Error force updating all workers: ".concat(error_17.message), error_17.stack);
                            throw error_17;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        // Update service area bounds
        LocationService_1.prototype.updateServiceAreaBounds = function (areaId, minLat, maxLat, minLng, maxLng) {
            return __awaiter(this, void 0, void 0, function () {
                var area, saved, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Updating service area ".concat(areaId, " bounds: minLat=").concat(minLat, ", maxLat=").concat(maxLat, ", minLng=").concat(minLng, ", maxLng=").concat(maxLng));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.serviceAreaRepository.findOne({
                                    where: { id: areaId },
                                })];
                        case 2:
                            area = _a.sent();
                            if (!area) {
                                this.logger.warn("Service area not found: ".concat(areaId));
                                throw new common_1.NotFoundException("Service area with ID ".concat(areaId, " not found"));
                            }
                            // Validate area bounds
                            if (minLat > maxLat || minLng > maxLng) {
                                throw new common_1.BadRequestException('Invalid bounds: min values must be less than max values');
                            }
                            area.minLat = minLat;
                            area.maxLat = maxLat;
                            area.minLng = minLng;
                            area.maxLng = maxLng;
                            return [4 /*yield*/, this.serviceAreaRepository.save(area)];
                        case 3:
                            saved = _a.sent();
                            this.logger.log("Successfully updated service area ".concat(areaId, " bounds"));
                            return [2 /*return*/, saved];
                        case 4:
                            error_18 = _a.sent();
                            if (error_18 instanceof common_1.NotFoundException ||
                                error_18 instanceof common_1.BadRequestException)
                                throw error_18;
                            this.logger.error("Error updating service area bounds: ".concat(error_18.message), error_18.stack);
                            throw error_18;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Expand service area to cover a specific location
        LocationService_1.prototype.expandServiceAreaToCoverLocation = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, paddingKm) {
                var area, latPadding, lngPadding, newMinLat, newMaxLat, newMinLng, newMaxLng, saved, error_19;
                if (paddingKm === void 0) { paddingKm = 5; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Expanding service area to cover location (".concat(lat, ", ").concat(lng, ") with ").concat(paddingKm, "km padding"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, this.serviceAreaRepository.findOne({
                                    where: { isActive: true },
                                })];
                        case 2:
                            area = _a.sent();
                            if (!!area) return [3 /*break*/, 4];
                            this.logger.log('No active service area found, creating one');
                            return [4 /*yield*/, this.createServiceArea({
                                    name: 'Auto-expanded Area',
                                    minLat: lat - 0.1,
                                    maxLat: lat + 0.1,
                                    minLng: lng - 0.1,
                                    maxLng: lng + 0.1,
                                })];
                        case 3:
                            area = _a.sent();
                            this.logger.log("Created new service area: ".concat(area.id));
                            return [2 /*return*/, area];
                        case 4:
                            latPadding = paddingKm / 111;
                            lngPadding = paddingKm / (111 * Math.cos(this.deg2rad(lat)));
                            newMinLat = Math.min(area.minLat, lat - latPadding);
                            newMaxLat = Math.max(area.maxLat, lat + latPadding);
                            newMinLng = Math.min(area.minLng, lng - lngPadding);
                            newMaxLng = Math.max(area.maxLng, lng + lngPadding);
                            area.minLat = newMinLat;
                            area.maxLat = newMaxLat;
                            area.minLng = newMinLng;
                            area.maxLng = newMaxLng;
                            return [4 /*yield*/, this.serviceAreaRepository.save(area)];
                        case 5:
                            saved = _a.sent();
                            this.logger.log("Expanded service area ".concat(area.id, " to cover (").concat(lat, ", ").concat(lng, "). New bounds: minLat=").concat(newMinLat, ", maxLat=").concat(newMaxLat, ", minLng=").concat(newMinLng, ", maxLng=").concat(newMaxLng));
                            return [2 /*return*/, saved];
                        case 6:
                            error_19 = _a.sent();
                            this.logger.error("Error expanding service area: ".concat(error_19.message), error_19.stack);
                            throw error_19;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return LocationService_1;
    }());
    __setFunctionName(_classThis, "LocationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationService = _classThis;
}();
exports.LocationService = LocationService;
