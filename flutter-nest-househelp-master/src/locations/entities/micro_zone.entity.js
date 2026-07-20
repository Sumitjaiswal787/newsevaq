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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroZone = void 0;
var typeorm_1 = require("typeorm");
var service_area_entity_1 = require("./service_area.entity");
var MicroZone = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _serviceAreaId_decorators;
    var _serviceAreaId_initializers = [];
    var _serviceAreaId_extraInitializers = [];
    var _serviceArea_decorators;
    var _serviceArea_initializers = [];
    var _serviceArea_extraInitializers = [];
    var _centerLat_decorators;
    var _centerLat_initializers = [];
    var _centerLat_extraInitializers = [];
    var _centerLng_decorators;
    var _centerLng_initializers = [];
    var _centerLng_extraInitializers = [];
    var _radiusKm_decorators;
    var _radiusKm_initializers = [];
    var _radiusKm_extraInitializers = [];
    var _zoneType_decorators;
    var _zoneType_initializers = [];
    var _zoneType_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _boundaries_decorators;
    var _boundaries_initializers = [];
    var _boundaries_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var MicroZone = _classThis = /** @class */ (function () {
        function MicroZone_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.serviceAreaId = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _serviceAreaId_initializers, void 0));
            this.serviceArea = (__runInitializers(this, _serviceAreaId_extraInitializers), __runInitializers(this, _serviceArea_initializers, void 0));
            this.centerLat = (__runInitializers(this, _serviceArea_extraInitializers), __runInitializers(this, _centerLat_initializers, void 0));
            this.centerLng = (__runInitializers(this, _centerLat_extraInitializers), __runInitializers(this, _centerLng_initializers, void 0));
            this.radiusKm = (__runInitializers(this, _centerLng_extraInitializers), __runInitializers(this, _radiusKm_initializers, void 0)); // 0.5 to 2km
            this.zoneType = (__runInitializers(this, _radiusKm_extraInitializers), __runInitializers(this, _zoneType_initializers, void 0)); // 'static', 'dynamic', or 'hybrid'
            this.isActive = (__runInitializers(this, _zoneType_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.boundaries = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _boundaries_initializers, void 0)); // For complex zone shapes
            this.createdAt = (__runInitializers(this, _boundaries_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return MicroZone_1;
    }());
    __setFunctionName(_classThis, "MicroZone");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)()];
        _serviceAreaId_decorators = [(0, typeorm_1.Column)()];
        _serviceArea_decorators = [(0, typeorm_1.ManyToOne)(function () { return service_area_entity_1.ServiceArea; }), (0, typeorm_1.JoinColumn)({ name: 'serviceAreaId' })];
        _centerLat_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _centerLng_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _radiusKm_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true })];
        _zoneType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _boundaries_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _serviceAreaId_decorators, { kind: "field", name: "serviceAreaId", static: false, private: false, access: { has: function (obj) { return "serviceAreaId" in obj; }, get: function (obj) { return obj.serviceAreaId; }, set: function (obj, value) { obj.serviceAreaId = value; } }, metadata: _metadata }, _serviceAreaId_initializers, _serviceAreaId_extraInitializers);
        __esDecorate(null, null, _serviceArea_decorators, { kind: "field", name: "serviceArea", static: false, private: false, access: { has: function (obj) { return "serviceArea" in obj; }, get: function (obj) { return obj.serviceArea; }, set: function (obj, value) { obj.serviceArea = value; } }, metadata: _metadata }, _serviceArea_initializers, _serviceArea_extraInitializers);
        __esDecorate(null, null, _centerLat_decorators, { kind: "field", name: "centerLat", static: false, private: false, access: { has: function (obj) { return "centerLat" in obj; }, get: function (obj) { return obj.centerLat; }, set: function (obj, value) { obj.centerLat = value; } }, metadata: _metadata }, _centerLat_initializers, _centerLat_extraInitializers);
        __esDecorate(null, null, _centerLng_decorators, { kind: "field", name: "centerLng", static: false, private: false, access: { has: function (obj) { return "centerLng" in obj; }, get: function (obj) { return obj.centerLng; }, set: function (obj, value) { obj.centerLng = value; } }, metadata: _metadata }, _centerLng_initializers, _centerLng_extraInitializers);
        __esDecorate(null, null, _radiusKm_decorators, { kind: "field", name: "radiusKm", static: false, private: false, access: { has: function (obj) { return "radiusKm" in obj; }, get: function (obj) { return obj.radiusKm; }, set: function (obj, value) { obj.radiusKm = value; } }, metadata: _metadata }, _radiusKm_initializers, _radiusKm_extraInitializers);
        __esDecorate(null, null, _zoneType_decorators, { kind: "field", name: "zoneType", static: false, private: false, access: { has: function (obj) { return "zoneType" in obj; }, get: function (obj) { return obj.zoneType; }, set: function (obj, value) { obj.zoneType = value; } }, metadata: _metadata }, _zoneType_initializers, _zoneType_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _boundaries_decorators, { kind: "field", name: "boundaries", static: false, private: false, access: { has: function (obj) { return "boundaries" in obj; }, get: function (obj) { return obj.boundaries; }, set: function (obj, value) { obj.boundaries = value; } }, metadata: _metadata }, _boundaries_initializers, _boundaries_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MicroZone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MicroZone = _classThis;
}();
exports.MicroZone = MicroZone;
