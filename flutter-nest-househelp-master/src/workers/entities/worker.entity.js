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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var user_entity_1 = require("../../users/entities/user.entity");
var slot_entity_1 = require("../../slots/entities/slot.entity");
var booking_entity_1 = require("../../bookings/entities/booking.entity");
var service_entity_1 = require("../../services/entities/service.entity");
var service_request_entity_1 = require("../../service-requests/entities/service-request.entity");
var crypto_1 = require("crypto");
var Worker = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('worker')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _publicId_decorators;
    var _publicId_initializers = [];
    var _publicId_extraInitializers = [];
    var _generatePublicId_decorators;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _reviewCount_decorators;
    var _reviewCount_initializers = [];
    var _reviewCount_extraInitializers = [];
    var _yearsOfExperience_decorators;
    var _yearsOfExperience_initializers = [];
    var _yearsOfExperience_extraInitializers = [];
    var _homesServedInArea_decorators;
    var _homesServedInArea_initializers = [];
    var _homesServedInArea_extraInitializers = [];
    var _reliabilityStreak_decorators;
    var _reliabilityStreak_initializers = [];
    var _reliabilityStreak_extraInitializers = [];
    var _isVerified_decorators;
    var _isVerified_initializers = [];
    var _isVerified_extraInitializers = [];
    var _isTrained_decorators;
    var _isTrained_initializers = [];
    var _isTrained_extraInitializers = [];
    var _isMonitored_decorators;
    var _isMonitored_initializers = [];
    var _isMonitored_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _serviceAreaId_decorators;
    var _serviceAreaId_initializers = [];
    var _serviceAreaId_extraInitializers = [];
    var _isAvailable_decorators;
    var _isAvailable_initializers = [];
    var _isAvailable_extraInitializers = [];
    var _currentLocationData_decorators;
    var _currentLocationData_initializers = [];
    var _currentLocationData_extraInitializers = [];
    var _currentLat_decorators;
    var _currentLat_initializers = [];
    var _currentLat_extraInitializers = [];
    var _currentLng_decorators;
    var _currentLng_initializers = [];
    var _currentLng_extraInitializers = [];
    var _lastLocationUpdate_decorators;
    var _lastLocationUpdate_initializers = [];
    var _lastLocationUpdate_extraInitializers = [];
    var _serviceRadiusKm_decorators;
    var _serviceRadiusKm_initializers = [];
    var _serviceRadiusKm_extraInitializers = [];
    var _availabilitySchedule_decorators;
    var _availabilitySchedule_initializers = [];
    var _availabilitySchedule_extraInitializers = [];
    var _fcmToken_decorators;
    var _fcmToken_initializers = [];
    var _fcmToken_extraInitializers = [];
    var _slots_decorators;
    var _slots_initializers = [];
    var _slots_extraInitializers = [];
    var _services_decorators;
    var _services_initializers = [];
    var _services_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var _serviceRequests_decorators;
    var _serviceRequests_initializers = [];
    var _serviceRequests_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _version_decorators;
    var _version_initializers = [];
    var _version_extraInitializers = [];
    var Worker = _classThis = /** @class */ (function () {
        function Worker_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0)); // Internal ID
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public API ID
            this.userId = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.bio = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
            this.rating = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            this.reviewCount = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _reviewCount_initializers, void 0));
            // NEW: Professional identity fields
            this.yearsOfExperience = (__runInitializers(this, _reviewCount_extraInitializers), __runInitializers(this, _yearsOfExperience_initializers, void 0));
            this.homesServedInArea = (__runInitializers(this, _yearsOfExperience_extraInitializers), __runInitializers(this, _homesServedInArea_initializers, void 0));
            this.reliabilityStreak = (__runInitializers(this, _homesServedInArea_extraInitializers), __runInitializers(this, _reliabilityStreak_initializers, void 0)); // Consecutive on-time jobs
            // NEW: System backing
            this.isVerified = (__runInitializers(this, _reliabilityStreak_extraInitializers), __runInitializers(this, _isVerified_initializers, void 0));
            this.isTrained = (__runInitializers(this, _isVerified_extraInitializers), __runInitializers(this, _isTrained_initializers, void 0));
            this.isMonitored = (__runInitializers(this, _isTrained_extraInitializers), __runInitializers(this, _isMonitored_initializers, void 0));
            // NEW: Worker status
            this.isActive = (__runInitializers(this, _isMonitored_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            // Location data
            this.latitude = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.serviceAreaId = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _serviceAreaId_initializers, void 0));
            this.isAvailable = (__runInitializers(this, _serviceAreaId_extraInitializers), __runInitializers(this, _isAvailable_initializers, void 0));
            this.currentLocationData = (__runInitializers(this, _isAvailable_extraInitializers), __runInitializers(this, _currentLocationData_initializers, void 0)); // JSON string for location data
            // NEW: Current location tracking for real-time updates
            this.currentLat = (__runInitializers(this, _currentLocationData_extraInitializers), __runInitializers(this, _currentLat_initializers, void 0));
            this.currentLng = (__runInitializers(this, _currentLat_extraInitializers), __runInitializers(this, _currentLng_initializers, void 0));
            this.lastLocationUpdate = (__runInitializers(this, _currentLng_extraInitializers), __runInitializers(this, _lastLocationUpdate_initializers, void 0));
            // NEW: Service radius for worker availability
            this.serviceRadiusKm = (__runInitializers(this, _lastLocationUpdate_extraInitializers), __runInitializers(this, _serviceRadiusKm_initializers, void 0));
            // NEW: Availability schedule
            this.availabilitySchedule = (__runInitializers(this, _serviceRadiusKm_extraInitializers), __runInitializers(this, _availabilitySchedule_initializers, void 0));
            // FCM token for push notifications to worker
            this.fcmToken = (__runInitializers(this, _availabilitySchedule_extraInitializers), __runInitializers(this, _fcmToken_initializers, void 0));
            this.slots = (__runInitializers(this, _fcmToken_extraInitializers), __runInitializers(this, _slots_initializers, void 0));
            this.services = (__runInitializers(this, _slots_extraInitializers), __runInitializers(this, _services_initializers, void 0));
            this.bookings = (__runInitializers(this, _services_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            this.serviceRequests = (__runInitializers(this, _bookings_extraInitializers), __runInitializers(this, _serviceRequests_initializers, void 0));
            this.createdAt = (__runInitializers(this, _serviceRequests_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.version = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _version_initializers, void 0));
            __runInitializers(this, _version_extraInitializers);
        }
        Worker_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, crypto_1.randomUUID)();
            }
        };
        return Worker_1;
    }());
    __setFunctionName(_classThis, "Worker");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _userId_decorators = [(0, typeorm_1.Column)({ type: 'int', name: 'user_id' })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'user_id' }), (0, class_transformer_1.Expose)()];
        _bio_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 1, default: 0 })];
        _reviewCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _yearsOfExperience_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _homesServedInArea_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _reliabilityStreak_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _isVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isTrained_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isMonitored_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _latitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true })];
        _longitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true })];
        _serviceAreaId_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _isAvailable_decorators = [(0, typeorm_1.Column)({ default: true })];
        _currentLocationData_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _currentLat_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true })];
        _currentLng_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true })];
        _lastLocationUpdate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _serviceRadiusKm_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 2, default: 5.0 })];
        _availabilitySchedule_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _fcmToken_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _slots_decorators = [(0, typeorm_1.OneToMany)(function () { return slot_entity_1.Slot; }, function (slot) { return slot.worker; })];
        _services_decorators = [(0, typeorm_1.ManyToMany)(function () { return service_entity_1.Service; }, function (service) { return service.workers; }), (0, typeorm_1.JoinTable)({
                name: 'service_worker',
                joinColumn: { name: 'worker_id', referencedColumnName: 'id' },
                inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
            })];
        _bookings_decorators = [(0, typeorm_1.OneToMany)(function () { return booking_entity_1.Booking; }, function (booking) { return booking.worker; })];
        _serviceRequests_decorators = [(0, typeorm_1.OneToMany)(function () { return service_request_entity_1.ServiceRequest; }, function (serviceRequest) { return serviceRequest.worker; })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _version_decorators = [(0, typeorm_1.VersionColumn)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _reviewCount_decorators, { kind: "field", name: "reviewCount", static: false, private: false, access: { has: function (obj) { return "reviewCount" in obj; }, get: function (obj) { return obj.reviewCount; }, set: function (obj, value) { obj.reviewCount = value; } }, metadata: _metadata }, _reviewCount_initializers, _reviewCount_extraInitializers);
        __esDecorate(null, null, _yearsOfExperience_decorators, { kind: "field", name: "yearsOfExperience", static: false, private: false, access: { has: function (obj) { return "yearsOfExperience" in obj; }, get: function (obj) { return obj.yearsOfExperience; }, set: function (obj, value) { obj.yearsOfExperience = value; } }, metadata: _metadata }, _yearsOfExperience_initializers, _yearsOfExperience_extraInitializers);
        __esDecorate(null, null, _homesServedInArea_decorators, { kind: "field", name: "homesServedInArea", static: false, private: false, access: { has: function (obj) { return "homesServedInArea" in obj; }, get: function (obj) { return obj.homesServedInArea; }, set: function (obj, value) { obj.homesServedInArea = value; } }, metadata: _metadata }, _homesServedInArea_initializers, _homesServedInArea_extraInitializers);
        __esDecorate(null, null, _reliabilityStreak_decorators, { kind: "field", name: "reliabilityStreak", static: false, private: false, access: { has: function (obj) { return "reliabilityStreak" in obj; }, get: function (obj) { return obj.reliabilityStreak; }, set: function (obj, value) { obj.reliabilityStreak = value; } }, metadata: _metadata }, _reliabilityStreak_initializers, _reliabilityStreak_extraInitializers);
        __esDecorate(null, null, _isVerified_decorators, { kind: "field", name: "isVerified", static: false, private: false, access: { has: function (obj) { return "isVerified" in obj; }, get: function (obj) { return obj.isVerified; }, set: function (obj, value) { obj.isVerified = value; } }, metadata: _metadata }, _isVerified_initializers, _isVerified_extraInitializers);
        __esDecorate(null, null, _isTrained_decorators, { kind: "field", name: "isTrained", static: false, private: false, access: { has: function (obj) { return "isTrained" in obj; }, get: function (obj) { return obj.isTrained; }, set: function (obj, value) { obj.isTrained = value; } }, metadata: _metadata }, _isTrained_initializers, _isTrained_extraInitializers);
        __esDecorate(null, null, _isMonitored_decorators, { kind: "field", name: "isMonitored", static: false, private: false, access: { has: function (obj) { return "isMonitored" in obj; }, get: function (obj) { return obj.isMonitored; }, set: function (obj, value) { obj.isMonitored = value; } }, metadata: _metadata }, _isMonitored_initializers, _isMonitored_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _serviceAreaId_decorators, { kind: "field", name: "serviceAreaId", static: false, private: false, access: { has: function (obj) { return "serviceAreaId" in obj; }, get: function (obj) { return obj.serviceAreaId; }, set: function (obj, value) { obj.serviceAreaId = value; } }, metadata: _metadata }, _serviceAreaId_initializers, _serviceAreaId_extraInitializers);
        __esDecorate(null, null, _isAvailable_decorators, { kind: "field", name: "isAvailable", static: false, private: false, access: { has: function (obj) { return "isAvailable" in obj; }, get: function (obj) { return obj.isAvailable; }, set: function (obj, value) { obj.isAvailable = value; } }, metadata: _metadata }, _isAvailable_initializers, _isAvailable_extraInitializers);
        __esDecorate(null, null, _currentLocationData_decorators, { kind: "field", name: "currentLocationData", static: false, private: false, access: { has: function (obj) { return "currentLocationData" in obj; }, get: function (obj) { return obj.currentLocationData; }, set: function (obj, value) { obj.currentLocationData = value; } }, metadata: _metadata }, _currentLocationData_initializers, _currentLocationData_extraInitializers);
        __esDecorate(null, null, _currentLat_decorators, { kind: "field", name: "currentLat", static: false, private: false, access: { has: function (obj) { return "currentLat" in obj; }, get: function (obj) { return obj.currentLat; }, set: function (obj, value) { obj.currentLat = value; } }, metadata: _metadata }, _currentLat_initializers, _currentLat_extraInitializers);
        __esDecorate(null, null, _currentLng_decorators, { kind: "field", name: "currentLng", static: false, private: false, access: { has: function (obj) { return "currentLng" in obj; }, get: function (obj) { return obj.currentLng; }, set: function (obj, value) { obj.currentLng = value; } }, metadata: _metadata }, _currentLng_initializers, _currentLng_extraInitializers);
        __esDecorate(null, null, _lastLocationUpdate_decorators, { kind: "field", name: "lastLocationUpdate", static: false, private: false, access: { has: function (obj) { return "lastLocationUpdate" in obj; }, get: function (obj) { return obj.lastLocationUpdate; }, set: function (obj, value) { obj.lastLocationUpdate = value; } }, metadata: _metadata }, _lastLocationUpdate_initializers, _lastLocationUpdate_extraInitializers);
        __esDecorate(null, null, _serviceRadiusKm_decorators, { kind: "field", name: "serviceRadiusKm", static: false, private: false, access: { has: function (obj) { return "serviceRadiusKm" in obj; }, get: function (obj) { return obj.serviceRadiusKm; }, set: function (obj, value) { obj.serviceRadiusKm = value; } }, metadata: _metadata }, _serviceRadiusKm_initializers, _serviceRadiusKm_extraInitializers);
        __esDecorate(null, null, _availabilitySchedule_decorators, { kind: "field", name: "availabilitySchedule", static: false, private: false, access: { has: function (obj) { return "availabilitySchedule" in obj; }, get: function (obj) { return obj.availabilitySchedule; }, set: function (obj, value) { obj.availabilitySchedule = value; } }, metadata: _metadata }, _availabilitySchedule_initializers, _availabilitySchedule_extraInitializers);
        __esDecorate(null, null, _fcmToken_decorators, { kind: "field", name: "fcmToken", static: false, private: false, access: { has: function (obj) { return "fcmToken" in obj; }, get: function (obj) { return obj.fcmToken; }, set: function (obj, value) { obj.fcmToken = value; } }, metadata: _metadata }, _fcmToken_initializers, _fcmToken_extraInitializers);
        __esDecorate(null, null, _slots_decorators, { kind: "field", name: "slots", static: false, private: false, access: { has: function (obj) { return "slots" in obj; }, get: function (obj) { return obj.slots; }, set: function (obj, value) { obj.slots = value; } }, metadata: _metadata }, _slots_initializers, _slots_extraInitializers);
        __esDecorate(null, null, _services_decorators, { kind: "field", name: "services", static: false, private: false, access: { has: function (obj) { return "services" in obj; }, get: function (obj) { return obj.services; }, set: function (obj, value) { obj.services = value; } }, metadata: _metadata }, _services_initializers, _services_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, null, _serviceRequests_decorators, { kind: "field", name: "serviceRequests", static: false, private: false, access: { has: function (obj) { return "serviceRequests" in obj; }, get: function (obj) { return obj.serviceRequests; }, set: function (obj, value) { obj.serviceRequests = value; } }, metadata: _metadata }, _serviceRequests_initializers, _serviceRequests_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: function (obj) { return "version" in obj; }, get: function (obj) { return obj.version; }, set: function (obj, value) { obj.version = value; } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Worker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Worker = _classThis;
}();
exports.Worker = Worker;
