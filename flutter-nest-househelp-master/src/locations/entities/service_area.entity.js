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
exports.ServiceArea = void 0;
var typeorm_1 = require("typeorm");
var ServiceArea = function () {
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
    var _pincode_decorators;
    var _pincode_initializers = [];
    var _pincode_extraInitializers = [];
    var _minLat_decorators;
    var _minLat_initializers = [];
    var _minLat_extraInitializers = [];
    var _maxLat_decorators;
    var _maxLat_initializers = [];
    var _maxLat_extraInitializers = [];
    var _minLng_decorators;
    var _minLng_initializers = [];
    var _minLng_extraInitializers = [];
    var _maxLng_decorators;
    var _maxLng_initializers = [];
    var _maxLng_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _coverageMap_decorators;
    var _coverageMap_initializers = [];
    var _coverageMap_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var ServiceArea = _classThis = /** @class */ (function () {
        function ServiceArea_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.pincode = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _pincode_initializers, void 0));
            this.minLat = (__runInitializers(this, _pincode_extraInitializers), __runInitializers(this, _minLat_initializers, void 0));
            this.maxLat = (__runInitializers(this, _minLat_extraInitializers), __runInitializers(this, _maxLat_initializers, void 0));
            this.minLng = (__runInitializers(this, _maxLat_extraInitializers), __runInitializers(this, _minLng_initializers, void 0));
            this.maxLng = (__runInitializers(this, _minLng_extraInitializers), __runInitializers(this, _maxLng_initializers, void 0));
            this.isActive = (__runInitializers(this, _maxLng_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.coverageMap = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _coverageMap_initializers, void 0));
            this.createdAt = (__runInitializers(this, _coverageMap_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return ServiceArea_1;
    }());
    __setFunctionName(_classThis, "ServiceArea");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)()];
        _pincode_decorators = [(0, typeorm_1.Column)()];
        _minLat_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _maxLat_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _minLng_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _maxLng_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _coverageMap_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _pincode_decorators, { kind: "field", name: "pincode", static: false, private: false, access: { has: function (obj) { return "pincode" in obj; }, get: function (obj) { return obj.pincode; }, set: function (obj, value) { obj.pincode = value; } }, metadata: _metadata }, _pincode_initializers, _pincode_extraInitializers);
        __esDecorate(null, null, _minLat_decorators, { kind: "field", name: "minLat", static: false, private: false, access: { has: function (obj) { return "minLat" in obj; }, get: function (obj) { return obj.minLat; }, set: function (obj, value) { obj.minLat = value; } }, metadata: _metadata }, _minLat_initializers, _minLat_extraInitializers);
        __esDecorate(null, null, _maxLat_decorators, { kind: "field", name: "maxLat", static: false, private: false, access: { has: function (obj) { return "maxLat" in obj; }, get: function (obj) { return obj.maxLat; }, set: function (obj, value) { obj.maxLat = value; } }, metadata: _metadata }, _maxLat_initializers, _maxLat_extraInitializers);
        __esDecorate(null, null, _minLng_decorators, { kind: "field", name: "minLng", static: false, private: false, access: { has: function (obj) { return "minLng" in obj; }, get: function (obj) { return obj.minLng; }, set: function (obj, value) { obj.minLng = value; } }, metadata: _metadata }, _minLng_initializers, _minLng_extraInitializers);
        __esDecorate(null, null, _maxLng_decorators, { kind: "field", name: "maxLng", static: false, private: false, access: { has: function (obj) { return "maxLng" in obj; }, get: function (obj) { return obj.maxLng; }, set: function (obj, value) { obj.maxLng = value; } }, metadata: _metadata }, _maxLng_initializers, _maxLng_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _coverageMap_decorators, { kind: "field", name: "coverageMap", static: false, private: false, access: { has: function (obj) { return "coverageMap" in obj; }, get: function (obj) { return obj.coverageMap; }, set: function (obj, value) { obj.coverageMap = value; } }, metadata: _metadata }, _coverageMap_initializers, _coverageMap_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceArea = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceArea = _classThis;
}();
exports.ServiceArea = ServiceArea;
