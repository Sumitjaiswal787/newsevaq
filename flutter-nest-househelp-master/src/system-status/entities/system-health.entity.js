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
exports.SystemHealth = void 0;
var typeorm_1 = require("typeorm");
var SystemHealth = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('system_health')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _serviceAvailability_decorators;
    var _serviceAvailability_initializers = [];
    var _serviceAvailability_extraInitializers = [];
    var _workerAvailability_decorators;
    var _workerAvailability_initializers = [];
    var _workerAvailability_extraInitializers = [];
    var _averageResponseTime_decorators;
    var _averageResponseTime_initializers = [];
    var _averageResponseTime_extraInitializers = [];
    var _isHealthy_decorators;
    var _isHealthy_initializers = [];
    var _isHealthy_extraInitializers = [];
    var _lastUpdated_decorators;
    var _lastUpdated_initializers = [];
    var _lastUpdated_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var SystemHealth = _classThis = /** @class */ (function () {
        function SystemHealth_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.serviceAvailability = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _serviceAvailability_initializers, void 0)); // 0-100%
            this.workerAvailability = (__runInitializers(this, _serviceAvailability_extraInitializers), __runInitializers(this, _workerAvailability_initializers, void 0)); // 0-100%
            this.averageResponseTime = (__runInitializers(this, _workerAvailability_extraInitializers), __runInitializers(this, _averageResponseTime_initializers, void 0)); // minutes
            this.isHealthy = (__runInitializers(this, _averageResponseTime_extraInitializers), __runInitializers(this, _isHealthy_initializers, void 0));
            this.lastUpdated = (__runInitializers(this, _isHealthy_extraInitializers), __runInitializers(this, _lastUpdated_initializers, void 0)); // ISO string
            this.createdAt = (__runInitializers(this, _lastUpdated_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return SystemHealth_1;
    }());
    __setFunctionName(_classThis, "SystemHealth");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _serviceAvailability_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 100 })];
        _workerAvailability_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 100 })];
        _averageResponseTime_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _isHealthy_decorators = [(0, typeorm_1.Column)({ default: true })];
        _lastUpdated_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _serviceAvailability_decorators, { kind: "field", name: "serviceAvailability", static: false, private: false, access: { has: function (obj) { return "serviceAvailability" in obj; }, get: function (obj) { return obj.serviceAvailability; }, set: function (obj, value) { obj.serviceAvailability = value; } }, metadata: _metadata }, _serviceAvailability_initializers, _serviceAvailability_extraInitializers);
        __esDecorate(null, null, _workerAvailability_decorators, { kind: "field", name: "workerAvailability", static: false, private: false, access: { has: function (obj) { return "workerAvailability" in obj; }, get: function (obj) { return obj.workerAvailability; }, set: function (obj, value) { obj.workerAvailability = value; } }, metadata: _metadata }, _workerAvailability_initializers, _workerAvailability_extraInitializers);
        __esDecorate(null, null, _averageResponseTime_decorators, { kind: "field", name: "averageResponseTime", static: false, private: false, access: { has: function (obj) { return "averageResponseTime" in obj; }, get: function (obj) { return obj.averageResponseTime; }, set: function (obj, value) { obj.averageResponseTime = value; } }, metadata: _metadata }, _averageResponseTime_initializers, _averageResponseTime_extraInitializers);
        __esDecorate(null, null, _isHealthy_decorators, { kind: "field", name: "isHealthy", static: false, private: false, access: { has: function (obj) { return "isHealthy" in obj; }, get: function (obj) { return obj.isHealthy; }, set: function (obj, value) { obj.isHealthy = value; } }, metadata: _metadata }, _isHealthy_initializers, _isHealthy_extraInitializers);
        __esDecorate(null, null, _lastUpdated_decorators, { kind: "field", name: "lastUpdated", static: false, private: false, access: { has: function (obj) { return "lastUpdated" in obj; }, get: function (obj) { return obj.lastUpdated; }, set: function (obj, value) { obj.lastUpdated = value; } }, metadata: _metadata }, _lastUpdated_initializers, _lastUpdated_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SystemHealth = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SystemHealth = _classThis;
}();
exports.SystemHealth = SystemHealth;
