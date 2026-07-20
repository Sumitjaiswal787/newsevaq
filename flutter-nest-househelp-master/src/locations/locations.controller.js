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
exports.LocationsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var admin_guard_1 = require("../auth/admin.guard");
var class_validator_1 = require("class-validator");
var WaitlistDto = function () {
    var _a;
    var _serviceId_decorators;
    var _serviceId_initializers = [];
    var _serviceId_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _requestedAt_decorators;
    var _requestedAt_initializers = [];
    var _requestedAt_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _estimatedWaitTime_decorators;
    var _estimatedWaitTime_initializers = [];
    var _estimatedWaitTime_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WaitlistDto() {
                this.serviceId = __runInitializers(this, _serviceId_initializers, void 0);
                this.latitude = (__runInitializers(this, _serviceId_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.userId = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
                this.requestedAt = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _requestedAt_initializers, void 0));
                this.status = (__runInitializers(this, _requestedAt_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.estimatedWaitTime = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _estimatedWaitTime_initializers, void 0));
                __runInitializers(this, _estimatedWaitTime_extraInitializers);
            }
            return WaitlistDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _serviceId_decorators = [(0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _latitude_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)()];
            _longitude_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)()];
            _userId_decorators = [(0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _requestedAt_decorators = [(0, class_validator_1.IsOptional)()];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _estimatedWaitTime_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _serviceId_decorators, { kind: "field", name: "serviceId", static: false, private: false, access: { has: function (obj) { return "serviceId" in obj; }, get: function (obj) { return obj.serviceId; }, set: function (obj, value) { obj.serviceId = value; } }, metadata: _metadata }, _serviceId_initializers, _serviceId_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _requestedAt_decorators, { kind: "field", name: "requestedAt", static: false, private: false, access: { has: function (obj) { return "requestedAt" in obj; }, get: function (obj) { return obj.requestedAt; }, set: function (obj, value) { obj.requestedAt = value; } }, metadata: _metadata }, _requestedAt_initializers, _requestedAt_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _estimatedWaitTime_decorators, { kind: "field", name: "estimatedWaitTime", static: false, private: false, access: { has: function (obj) { return "estimatedWaitTime" in obj; }, get: function (obj) { return obj.estimatedWaitTime; }, set: function (obj, value) { obj.estimatedWaitTime = value; } }, metadata: _metadata }, _estimatedWaitTime_initializers, _estimatedWaitTime_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var LocationsController = function () {
    var _classDecorators = [(0, common_1.Controller)('locations'), (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true }))];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _checkAvailability_decorators;
    var _getAvailableServices_decorators;
    var _getNearbyZones_decorators;
    var _getServiceAreas_decorators;
    var _addToWaitlist_decorators;
    var _removeFromWaitlist_decorators;
    var _getWaitlistStatus_decorators;
    var _updatePreferredLocation_decorators;
    var _updateWorkerLocation_decorators;
    var _updateAllWorkerLocations_decorators;
    var _forceUpdateAllWorkerLocations_decorators;
    var _debugLocationInfo_decorators;
    var _expandServiceArea_decorators;
    var LocationsController = _classThis = /** @class */ (function () {
        function LocationsController_1(locationService) {
            this.locationService = (__runInitializers(this, _instanceExtraInitializers), locationService);
            this.logger = new common_1.Logger(LocationsController.name);
        }
        LocationsController_1.prototype.checkAvailability = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, radius) {
                if (radius === void 0) { radius = 5.0; }
                return __generator(this, function (_a) {
                    this.logger.log("Checking availability at lat=".concat(lat, ", lng=").concat(lng, ", radius=").concat(radius, "km"));
                    // Validate coordinates
                    this.validateCoordinates(lat, lng);
                    if (radius <= 0 || radius > 100) {
                        throw new common_1.BadRequestException('Radius must be between 0 and 100 km');
                    }
                    return [2 /*return*/, this.locationService.checkServiceAvailability(lat, lng, radius)];
                });
            });
        };
        LocationsController_1.prototype.getAvailableServices = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, radius) {
                if (radius === void 0) { radius = 5.0; }
                return __generator(this, function (_a) {
                    this.logger.log("Getting available services at lat=".concat(lat, ", lng=").concat(lng, ", radius=").concat(radius, "km"));
                    // Validate coordinates
                    this.validateCoordinates(lat, lng);
                    if (radius <= 0 || radius > 100) {
                        throw new common_1.BadRequestException('Radius must be between 0 and 100 km');
                    }
                    return [2 /*return*/, this.locationService.getAvailableServices(lat, lng, radius)];
                });
            });
        };
        LocationsController_1.prototype.getNearbyZones = function (lat_1, lng_1) {
            return __awaiter(this, arguments, void 0, function (lat, lng, maxRadius) {
                if (maxRadius === void 0) { maxRadius = 2.0; }
                return __generator(this, function (_a) {
                    this.logger.debug("Getting nearby zones for lat=".concat(lat, ", lng=").concat(lng, ", maxRadius=").concat(maxRadius, "km"));
                    // Validate coordinates
                    this.validateCoordinates(lat, lng);
                    if (maxRadius <= 0 || maxRadius > 50) {
                        throw new common_1.BadRequestException('Max radius must be between 0 and 50 km');
                    }
                    return [2 /*return*/, this.locationService.findNearbyZones(lat, lng, maxRadius)];
                });
            });
        };
        LocationsController_1.prototype.getServiceAreas = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.debug("Getting service areas for lat=".concat(lat, ", lng=").concat(lng));
                    // Validate coordinates
                    this.validateCoordinates(lat, lng);
                    return [2 /*return*/, this.locationService.getServiceAreasForLocation(lat, lng)];
                });
            });
        };
        LocationsController_1.prototype.addToWaitlist = function (req, waitlistDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    this.logger.log("Adding user to waitlist: userId=".concat(waitlistDto.userId, ", serviceId=").concat(waitlistDto.serviceId));
                    // Validate coordinates
                    this.validateCoordinates(waitlistDto.latitude, waitlistDto.longitude);
                    if (!waitlistDto.serviceId) {
                        throw new common_1.BadRequestException('Service ID is required');
                    }
                    userId = req.user.userId;
                    return [2 /*return*/, this.locationService.addToWaitlist(userId, waitlistDto.serviceId, waitlistDto.latitude, waitlistDto.longitude, (_a = waitlistDto.estimatedWaitTime) !== null && _a !== void 0 ? _a : 0)];
                });
            });
        };
        LocationsController_1.prototype.removeFromWaitlist = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = req.user.userId;
                            this.logger.log("Removing user ".concat(userId, " from waitlist"));
                            return [4 /*yield*/, this.locationService.removeFromWaitlist(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Successfully removed from waitlist' }];
                    }
                });
            });
        };
        LocationsController_1.prototype.getWaitlistStatus = function (req, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.debug("Getting waitlist status for user: ".concat(userId));
                    // Allow users to only check their own waitlist status
                    if (req.user.userId !== userId) {
                        this.logger.warn("Access denied: user ".concat(req.user.userId, " tried to access waitlist for user ").concat(userId));
                        return [2 /*return*/, { message: 'Access denied' }];
                    }
                    return [2 /*return*/, this.locationService.getWaitlistStatus(userId)];
                });
            });
        };
        LocationsController_1.prototype.updatePreferredLocation = function (req, userId, locationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("Updating preferred location for user ".concat(userId, ": lat=").concat(locationDto.lat, ", lng=").concat(locationDto.lng));
                    // Validate coordinates
                    this.validateCoordinates(locationDto.lat, locationDto.lng);
                    // Allow users to only update their own location
                    if (req.user.userId !== userId) {
                        this.logger.warn("Access denied: user ".concat(req.user.userId, " tried to update location for user ").concat(userId));
                        return [2 /*return*/, { message: 'Access denied' }];
                    }
                    return [2 /*return*/, this.locationService.updatePreferredLocation(userId, locationDto.lat, locationDto.lng)];
                });
            });
        };
        LocationsController_1.prototype.updateWorkerLocation = function (req, workerId, locationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("Updating location for worker ".concat(workerId, ": lat=").concat(locationDto.lat, ", lng=").concat(locationDto.lng));
                    // Validate coordinates
                    this.validateCoordinates(locationDto.lat, locationDto.lng);
                    // Allow workers to only update their own location
                    if (req.user.workerId !== workerId) {
                        this.logger.warn("Access denied: worker ".concat(req.user.workerId, " tried to update location for worker ").concat(workerId));
                        return [2 /*return*/, { message: 'Access denied' }];
                    }
                    return [2 /*return*/, this.locationService.updateWorkerLocation(workerId, locationDto.lat, locationDto.lng)];
                });
            });
        };
        LocationsController_1.prototype.validateCoordinates = function (lat, lng) {
            if (lat === undefined ||
                lat === null ||
                lng === undefined ||
                lng === null) {
                throw new common_1.BadRequestException('Latitude and longitude are required');
            }
            // Convert to numbers if they're strings
            var latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
            var lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;
            if (isNaN(latNum) || isNaN(lngNum)) {
                throw new common_1.BadRequestException('Latitude and longitude must be valid numbers');
            }
            if (latNum < -90 || latNum > 90) {
                throw new common_1.BadRequestException('Latitude must be between -90 and 90');
            }
            if (lngNum < -180 || lngNum > 180) {
                throw new common_1.BadRequestException('Longitude must be between -180 and 180');
            }
        };
        // Admin endpoint to update all workers to a specific location (only workers without locations)
        LocationsController_1.prototype.updateAllWorkerLocations = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("Admin: Updating all worker locations to lat=".concat(body.lat, ", lng=").concat(body.lng, " (only workers without existing locations)"));
                    return [2 /*return*/, this.locationService.updateAllWorkersToLocation(body.lat, body.lng)];
                });
            });
        };
        // Admin endpoint to FORCE update ALL workers to a specific location (overwrites existing locations)
        LocationsController_1.prototype.forceUpdateAllWorkerLocations = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.warn("Admin: FORCE updating ALL worker locations to lat=".concat(body.lat, ", lng=").concat(body.lng, " (WARNING: will overwrite existing locations!)"));
                    return [2 /*return*/, this.locationService.forceUpdateAllWorkersToLocation(body.lat, body.lng)];
                });
            });
        };
        // Debug endpoint to log device location
        LocationsController_1.prototype.debugLocationInfo = function (lat, lng) {
            return __awaiter(this, void 0, void 0, function () {
                var nearbyZones, serviceAreas, availableWorkers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("[DEBUG] Device location received: lat=".concat(lat, ", lng=").concat(lng));
                            // Validate coordinates
                            this.validateCoordinates(lat, lng);
                            return [4 /*yield*/, this.locationService.findNearbyZones(lat, lng, 5)];
                        case 1:
                            nearbyZones = _a.sent();
                            return [4 /*yield*/, this.locationService.getServiceAreasForLocation(lat, lng)];
                        case 2:
                            serviceAreas = _a.sent();
                            return [4 /*yield*/, this.locationService.findAvailableWorkers(lat, lng, 5)];
                        case 3:
                            availableWorkers = _a.sent();
                            return [2 /*return*/, {
                                    deviceLocation: { lat: lat, lng: lng },
                                    nearbyZones: nearbyZones.map(function (z) { return ({
                                        id: z.id,
                                        name: z.name,
                                        centerLat: z.centerLat,
                                        centerLng: z.centerLng,
                                    }); }),
                                    serviceAreas: serviceAreas.map(function (a) { return ({
                                        id: a.id,
                                        name: a.name,
                                        minLat: a.minLat,
                                        maxLat: a.maxLat,
                                        minLng: a.minLng,
                                        maxLng: a.maxLng,
                                    }); }),
                                    availableWorkersCount: availableWorkers.length,
                                    isInServiceArea: serviceAreas.length > 0,
                                    message: serviceAreas.length > 0
                                        ? 'Your location is within a service area'
                                        : 'Your location is OUTSIDE all service areas - no workers available',
                                }];
                    }
                });
            });
        };
        // Admin endpoint to expand service area to cover a location
        LocationsController_1.prototype.expandServiceArea = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("Admin: Expanding service area to cover lat=".concat(body.lat, ", lng=").concat(body.lng, " with ").concat(body.paddingKm || 5, "km padding"));
                    return [2 /*return*/, this.locationService.expandServiceAreaToCoverLocation(body.lat, body.lng, body.paddingKm || 5)];
                });
            });
        };
        return LocationsController_1;
    }());
    __setFunctionName(_classThis, "LocationsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _checkAvailability_decorators = [(0, common_1.Get)('availability')];
        _getAvailableServices_decorators = [(0, common_1.Get)('services')];
        _getNearbyZones_decorators = [(0, common_1.Get)('zones/nearby')];
        _getServiceAreas_decorators = [(0, common_1.Get)('areas')];
        _addToWaitlist_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)('waitlist')];
        _removeFromWaitlist_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Delete)('waitlist/current')];
        _getWaitlistStatus_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Get)('waitlist/status/:userId')];
        _updatePreferredLocation_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)('user/:userId/location')];
        _updateWorkerLocation_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)('worker/:workerId/location')];
        _updateAllWorkerLocations_decorators = [(0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, common_1.Post)('admin/update-worker-locations')];
        _forceUpdateAllWorkerLocations_decorators = [(0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, common_1.Post)('admin/force-update-worker-locations')];
        _debugLocationInfo_decorators = [(0, common_1.Get)('debug/location-info')];
        _expandServiceArea_decorators = [(0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, common_1.Post)('admin/expand-service-area')];
        __esDecorate(_classThis, null, _checkAvailability_decorators, { kind: "method", name: "checkAvailability", static: false, private: false, access: { has: function (obj) { return "checkAvailability" in obj; }, get: function (obj) { return obj.checkAvailability; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAvailableServices_decorators, { kind: "method", name: "getAvailableServices", static: false, private: false, access: { has: function (obj) { return "getAvailableServices" in obj; }, get: function (obj) { return obj.getAvailableServices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNearbyZones_decorators, { kind: "method", name: "getNearbyZones", static: false, private: false, access: { has: function (obj) { return "getNearbyZones" in obj; }, get: function (obj) { return obj.getNearbyZones; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getServiceAreas_decorators, { kind: "method", name: "getServiceAreas", static: false, private: false, access: { has: function (obj) { return "getServiceAreas" in obj; }, get: function (obj) { return obj.getServiceAreas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addToWaitlist_decorators, { kind: "method", name: "addToWaitlist", static: false, private: false, access: { has: function (obj) { return "addToWaitlist" in obj; }, get: function (obj) { return obj.addToWaitlist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFromWaitlist_decorators, { kind: "method", name: "removeFromWaitlist", static: false, private: false, access: { has: function (obj) { return "removeFromWaitlist" in obj; }, get: function (obj) { return obj.removeFromWaitlist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWaitlistStatus_decorators, { kind: "method", name: "getWaitlistStatus", static: false, private: false, access: { has: function (obj) { return "getWaitlistStatus" in obj; }, get: function (obj) { return obj.getWaitlistStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePreferredLocation_decorators, { kind: "method", name: "updatePreferredLocation", static: false, private: false, access: { has: function (obj) { return "updatePreferredLocation" in obj; }, get: function (obj) { return obj.updatePreferredLocation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateWorkerLocation_decorators, { kind: "method", name: "updateWorkerLocation", static: false, private: false, access: { has: function (obj) { return "updateWorkerLocation" in obj; }, get: function (obj) { return obj.updateWorkerLocation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateAllWorkerLocations_decorators, { kind: "method", name: "updateAllWorkerLocations", static: false, private: false, access: { has: function (obj) { return "updateAllWorkerLocations" in obj; }, get: function (obj) { return obj.updateAllWorkerLocations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forceUpdateAllWorkerLocations_decorators, { kind: "method", name: "forceUpdateAllWorkerLocations", static: false, private: false, access: { has: function (obj) { return "forceUpdateAllWorkerLocations" in obj; }, get: function (obj) { return obj.forceUpdateAllWorkerLocations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _debugLocationInfo_decorators, { kind: "method", name: "debugLocationInfo", static: false, private: false, access: { has: function (obj) { return "debugLocationInfo" in obj; }, get: function (obj) { return obj.debugLocationInfo; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _expandServiceArea_decorators, { kind: "method", name: "expandServiceArea", static: false, private: false, access: { has: function (obj) { return "expandServiceArea" in obj; }, get: function (obj) { return obj.expandServiceArea; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationsController = _classThis;
}();
exports.LocationsController = LocationsController;
