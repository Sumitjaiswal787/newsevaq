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
exports.User = exports.UserRole = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var service_request_entity_1 = require("../../service-requests/entities/service-request.entity");
var address_entity_1 = require("../../addresses/entities/address.entity");
var refresh_token_entity_1 = require("../../auth/entities/refresh-token.entity");
var crypto_1 = require("crypto");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["WORKER"] = "worker";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
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
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _preferredLat_decorators;
    var _preferredLat_initializers = [];
    var _preferredLat_extraInitializers = [];
    var _preferredLng_decorators;
    var _preferredLng_initializers = [];
    var _preferredLng_extraInitializers = [];
    var _preferredZoneId_decorators;
    var _preferredZoneId_initializers = [];
    var _preferredZoneId_extraInitializers = [];
    var _hasCompletedLocationSetup_decorators;
    var _hasCompletedLocationSetup_initializers = [];
    var _hasCompletedLocationSetup_extraInitializers = [];
    var _fcmToken_decorators;
    var _fcmToken_initializers = [];
    var _fcmToken_extraInitializers = [];
    var _locationHistory_decorators;
    var _locationHistory_initializers = [];
    var _locationHistory_extraInitializers = [];
    var _serviceRequests_decorators;
    var _serviceRequests_initializers = [];
    var _serviceRequests_extraInitializers = [];
    var _addresses_decorators;
    var _addresses_initializers = [];
    var _addresses_extraInitializers = [];
    var _refreshTokens_decorators;
    var _refreshTokens_initializers = [];
    var _refreshTokens_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0)); // Auto-increment numeric ID
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public-facing UUID identifier
            this.email = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.firstName = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
            this.role = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.address = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.phone = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.latitude = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.preferredLat = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _preferredLat_initializers, void 0));
            this.preferredLng = (__runInitializers(this, _preferredLat_extraInitializers), __runInitializers(this, _preferredLng_initializers, void 0));
            this.preferredZoneId = (__runInitializers(this, _preferredLng_extraInitializers), __runInitializers(this, _preferredZoneId_initializers, void 0));
            this.hasCompletedLocationSetup = (__runInitializers(this, _preferredZoneId_extraInitializers), __runInitializers(this, _hasCompletedLocationSetup_initializers, void 0));
            this.fcmToken = (__runInitializers(this, _hasCompletedLocationSetup_extraInitializers), __runInitializers(this, _fcmToken_initializers, void 0));
            this.locationHistory = (__runInitializers(this, _fcmToken_extraInitializers), __runInitializers(this, _locationHistory_initializers, void 0));
            this.serviceRequests = (__runInitializers(this, _locationHistory_extraInitializers), __runInitializers(this, _serviceRequests_initializers, void 0));
            this.addresses = (__runInitializers(this, _serviceRequests_extraInitializers), __runInitializers(this, _addresses_initializers, void 0));
            this.refreshTokens = (__runInitializers(this, _addresses_extraInitializers), __runInitializers(this, _refreshTokens_initializers, void 0));
            this.createdAt = (__runInitializers(this, _refreshTokens_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        User_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, crypto_1.randomUUID)();
            }
        };
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _email_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _password_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _firstName_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, class_transformer_1.Expose)()];
        _lastName_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, class_transformer_1.Expose)()];
        _role_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                default: 'user',
            })];
        _address_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _phone_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 20 }), (0, typeorm_1.Index)()];
        _latitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _longitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _preferredLat_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _preferredLng_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _preferredZoneId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _hasCompletedLocationSetup_decorators = [(0, typeorm_1.Column)({ default: false })];
        _fcmToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _locationHistory_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _serviceRequests_decorators = [(0, typeorm_1.OneToMany)(function () { return service_request_entity_1.ServiceRequest; }, function (serviceRequest) { return serviceRequest.user; })];
        _addresses_decorators = [(0, typeorm_1.OneToMany)(function () { return address_entity_1.Address; }, function (address) { return address.user; })];
        _refreshTokens_decorators = [(0, typeorm_1.OneToMany)(function () { return refresh_token_entity_1.RefreshToken; }, function (refreshToken) { return refreshToken.user; }, {
                cascade: true,
            })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _preferredLat_decorators, { kind: "field", name: "preferredLat", static: false, private: false, access: { has: function (obj) { return "preferredLat" in obj; }, get: function (obj) { return obj.preferredLat; }, set: function (obj, value) { obj.preferredLat = value; } }, metadata: _metadata }, _preferredLat_initializers, _preferredLat_extraInitializers);
        __esDecorate(null, null, _preferredLng_decorators, { kind: "field", name: "preferredLng", static: false, private: false, access: { has: function (obj) { return "preferredLng" in obj; }, get: function (obj) { return obj.preferredLng; }, set: function (obj, value) { obj.preferredLng = value; } }, metadata: _metadata }, _preferredLng_initializers, _preferredLng_extraInitializers);
        __esDecorate(null, null, _preferredZoneId_decorators, { kind: "field", name: "preferredZoneId", static: false, private: false, access: { has: function (obj) { return "preferredZoneId" in obj; }, get: function (obj) { return obj.preferredZoneId; }, set: function (obj, value) { obj.preferredZoneId = value; } }, metadata: _metadata }, _preferredZoneId_initializers, _preferredZoneId_extraInitializers);
        __esDecorate(null, null, _hasCompletedLocationSetup_decorators, { kind: "field", name: "hasCompletedLocationSetup", static: false, private: false, access: { has: function (obj) { return "hasCompletedLocationSetup" in obj; }, get: function (obj) { return obj.hasCompletedLocationSetup; }, set: function (obj, value) { obj.hasCompletedLocationSetup = value; } }, metadata: _metadata }, _hasCompletedLocationSetup_initializers, _hasCompletedLocationSetup_extraInitializers);
        __esDecorate(null, null, _fcmToken_decorators, { kind: "field", name: "fcmToken", static: false, private: false, access: { has: function (obj) { return "fcmToken" in obj; }, get: function (obj) { return obj.fcmToken; }, set: function (obj, value) { obj.fcmToken = value; } }, metadata: _metadata }, _fcmToken_initializers, _fcmToken_extraInitializers);
        __esDecorate(null, null, _locationHistory_decorators, { kind: "field", name: "locationHistory", static: false, private: false, access: { has: function (obj) { return "locationHistory" in obj; }, get: function (obj) { return obj.locationHistory; }, set: function (obj, value) { obj.locationHistory = value; } }, metadata: _metadata }, _locationHistory_initializers, _locationHistory_extraInitializers);
        __esDecorate(null, null, _serviceRequests_decorators, { kind: "field", name: "serviceRequests", static: false, private: false, access: { has: function (obj) { return "serviceRequests" in obj; }, get: function (obj) { return obj.serviceRequests; }, set: function (obj, value) { obj.serviceRequests = value; } }, metadata: _metadata }, _serviceRequests_initializers, _serviceRequests_extraInitializers);
        __esDecorate(null, null, _addresses_decorators, { kind: "field", name: "addresses", static: false, private: false, access: { has: function (obj) { return "addresses" in obj; }, get: function (obj) { return obj.addresses; }, set: function (obj, value) { obj.addresses = value; } }, metadata: _metadata }, _addresses_initializers, _addresses_extraInitializers);
        __esDecorate(null, null, _refreshTokens_decorators, { kind: "field", name: "refreshTokens", static: false, private: false, access: { has: function (obj) { return "refreshTokens" in obj; }, get: function (obj) { return obj.refreshTokens; }, set: function (obj, value) { obj.refreshTokens = value; } }, metadata: _metadata }, _refreshTokens_initializers, _refreshTokens_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
