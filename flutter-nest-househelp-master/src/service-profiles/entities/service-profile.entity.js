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
exports.ServiceProfile = exports.MaxVisitsPerDay = exports.VisitPattern = exports.ServiceType = void 0;
var typeorm_1 = require("typeorm");
var crypto_1 = require("crypto");
var ServiceType;
(function (ServiceType) {
    ServiceType["COOK"] = "COOK";
    ServiceType["MAID"] = "MAID";
    ServiceType["CLEANING"] = "CLEANING";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
var VisitPattern;
(function (VisitPattern) {
    VisitPattern["DAILY"] = "DAILY";
})(VisitPattern || (exports.VisitPattern = VisitPattern = {}));
var MaxVisitsPerDay;
(function (MaxVisitsPerDay) {
    MaxVisitsPerDay[MaxVisitsPerDay["ONE"] = 1] = "ONE";
})(MaxVisitsPerDay || (exports.MaxVisitsPerDay = MaxVisitsPerDay = {}));
var ServiceProfile = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('service_profiles')];
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
    var _serviceType_decorators;
    var _serviceType_initializers = [];
    var _serviceType_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _scopeDefinition_decorators;
    var _scopeDefinition_initializers = [];
    var _scopeDefinition_extraInitializers = [];
    var _maxCapacityHint_decorators;
    var _maxCapacityHint_initializers = [];
    var _maxCapacityHint_extraInitializers = [];
    var _internalRules_decorators;
    var _internalRules_initializers = [];
    var _internalRules_extraInitializers = [];
    var _monthlyPrice_decorators;
    var _monthlyPrice_initializers = [];
    var _monthlyPrice_extraInitializers = [];
    var _visitPattern_decorators;
    var _visitPattern_initializers = [];
    var _visitPattern_extraInitializers = [];
    var _maxVisitsPerDay_decorators;
    var _maxVisitsPerDay_initializers = [];
    var _maxVisitsPerDay_extraInitializers = [];
    var _defaultTimeWindows_decorators;
    var _defaultTimeWindows_initializers = [];
    var _defaultTimeWindows_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var ServiceProfile = _classThis = /** @class */ (function () {
        function ServiceProfile_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0));
            this.serviceType = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _serviceType_initializers, void 0));
            this.description = (__runInitializers(this, _serviceType_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.scopeDefinition = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _scopeDefinition_initializers, void 0));
            this.maxCapacityHint = (__runInitializers(this, _scopeDefinition_extraInitializers), __runInitializers(this, _maxCapacityHint_initializers, void 0));
            this.internalRules = (__runInitializers(this, _maxCapacityHint_extraInitializers), __runInitializers(this, _internalRules_initializers, void 0));
            this.monthlyPrice = (__runInitializers(this, _internalRules_extraInitializers), __runInitializers(this, _monthlyPrice_initializers, void 0));
            this.visitPattern = (__runInitializers(this, _monthlyPrice_extraInitializers), __runInitializers(this, _visitPattern_initializers, void 0));
            this.maxVisitsPerDay = (__runInitializers(this, _visitPattern_extraInitializers), __runInitializers(this, _maxVisitsPerDay_initializers, void 0));
            this.defaultTimeWindows = (__runInitializers(this, _maxVisitsPerDay_extraInitializers), __runInitializers(this, _defaultTimeWindows_initializers, void 0));
            this.isActive = (__runInitializers(this, _defaultTimeWindows_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        ServiceProfile_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, crypto_1.randomUUID)();
            }
        };
        return ServiceProfile_1;
    }());
    __setFunctionName(_classThis, "ServiceProfile");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _serviceType_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: ServiceType,
            })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _scopeDefinition_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _maxCapacityHint_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _internalRules_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _monthlyPrice_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _visitPattern_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: VisitPattern,
                default: VisitPattern.DAILY,
                name: 'visitpattern',
            })];
        _maxVisitsPerDay_decorators = [(0, typeorm_1.Column)({
                type: 'int',
                default: MaxVisitsPerDay.ONE,
                name: 'maxvisitsperday',
            })];
        _defaultTimeWindows_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true, name: 'defaulttimewindows' })];
        _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _serviceType_decorators, { kind: "field", name: "serviceType", static: false, private: false, access: { has: function (obj) { return "serviceType" in obj; }, get: function (obj) { return obj.serviceType; }, set: function (obj, value) { obj.serviceType = value; } }, metadata: _metadata }, _serviceType_initializers, _serviceType_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _scopeDefinition_decorators, { kind: "field", name: "scopeDefinition", static: false, private: false, access: { has: function (obj) { return "scopeDefinition" in obj; }, get: function (obj) { return obj.scopeDefinition; }, set: function (obj, value) { obj.scopeDefinition = value; } }, metadata: _metadata }, _scopeDefinition_initializers, _scopeDefinition_extraInitializers);
        __esDecorate(null, null, _maxCapacityHint_decorators, { kind: "field", name: "maxCapacityHint", static: false, private: false, access: { has: function (obj) { return "maxCapacityHint" in obj; }, get: function (obj) { return obj.maxCapacityHint; }, set: function (obj, value) { obj.maxCapacityHint = value; } }, metadata: _metadata }, _maxCapacityHint_initializers, _maxCapacityHint_extraInitializers);
        __esDecorate(null, null, _internalRules_decorators, { kind: "field", name: "internalRules", static: false, private: false, access: { has: function (obj) { return "internalRules" in obj; }, get: function (obj) { return obj.internalRules; }, set: function (obj, value) { obj.internalRules = value; } }, metadata: _metadata }, _internalRules_initializers, _internalRules_extraInitializers);
        __esDecorate(null, null, _monthlyPrice_decorators, { kind: "field", name: "monthlyPrice", static: false, private: false, access: { has: function (obj) { return "monthlyPrice" in obj; }, get: function (obj) { return obj.monthlyPrice; }, set: function (obj, value) { obj.monthlyPrice = value; } }, metadata: _metadata }, _monthlyPrice_initializers, _monthlyPrice_extraInitializers);
        __esDecorate(null, null, _visitPattern_decorators, { kind: "field", name: "visitPattern", static: false, private: false, access: { has: function (obj) { return "visitPattern" in obj; }, get: function (obj) { return obj.visitPattern; }, set: function (obj, value) { obj.visitPattern = value; } }, metadata: _metadata }, _visitPattern_initializers, _visitPattern_extraInitializers);
        __esDecorate(null, null, _maxVisitsPerDay_decorators, { kind: "field", name: "maxVisitsPerDay", static: false, private: false, access: { has: function (obj) { return "maxVisitsPerDay" in obj; }, get: function (obj) { return obj.maxVisitsPerDay; }, set: function (obj, value) { obj.maxVisitsPerDay = value; } }, metadata: _metadata }, _maxVisitsPerDay_initializers, _maxVisitsPerDay_extraInitializers);
        __esDecorate(null, null, _defaultTimeWindows_decorators, { kind: "field", name: "defaultTimeWindows", static: false, private: false, access: { has: function (obj) { return "defaultTimeWindows" in obj; }, get: function (obj) { return obj.defaultTimeWindows; }, set: function (obj, value) { obj.defaultTimeWindows = value; } }, metadata: _metadata }, _defaultTimeWindows_initializers, _defaultTimeWindows_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceProfile = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceProfile = _classThis;
}();
exports.ServiceProfile = ServiceProfile;
