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
exports.AuditLog = void 0;
var typeorm_1 = require("typeorm");
var AuditLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('audit_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _adminId_decorators;
    var _adminId_initializers = [];
    var _adminId_extraInitializers = [];
    var _adminEmail_decorators;
    var _adminEmail_initializers = [];
    var _adminEmail_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _entityType_decorators;
    var _entityType_initializers = [];
    var _entityType_extraInitializers = [];
    var _entityId_decorators;
    var _entityId_initializers = [];
    var _entityId_extraInitializers = [];
    var _oldValue_decorators;
    var _oldValue_initializers = [];
    var _oldValue_extraInitializers = [];
    var _newValue_decorators;
    var _newValue_initializers = [];
    var _newValue_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AuditLog = _classThis = /** @class */ (function () {
        function AuditLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.adminId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _adminId_initializers, void 0));
            this.adminEmail = (__runInitializers(this, _adminId_extraInitializers), __runInitializers(this, _adminEmail_initializers, void 0));
            this.action = (__runInitializers(this, _adminEmail_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.entityType = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _entityType_initializers, void 0));
            this.entityId = (__runInitializers(this, _entityType_extraInitializers), __runInitializers(this, _entityId_initializers, void 0));
            this.oldValue = (__runInitializers(this, _entityId_extraInitializers), __runInitializers(this, _oldValue_initializers, void 0));
            this.newValue = (__runInitializers(this, _oldValue_extraInitializers), __runInitializers(this, _newValue_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _newValue_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.createdAt = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AuditLog_1;
    }());
    __setFunctionName(_classThis, "AuditLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _adminId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _adminEmail_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _action_decorators = [(0, typeorm_1.Column)()];
        _entityType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _entityId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _oldValue_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _newValue_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _adminId_decorators, { kind: "field", name: "adminId", static: false, private: false, access: { has: function (obj) { return "adminId" in obj; }, get: function (obj) { return obj.adminId; }, set: function (obj, value) { obj.adminId = value; } }, metadata: _metadata }, _adminId_initializers, _adminId_extraInitializers);
        __esDecorate(null, null, _adminEmail_decorators, { kind: "field", name: "adminEmail", static: false, private: false, access: { has: function (obj) { return "adminEmail" in obj; }, get: function (obj) { return obj.adminEmail; }, set: function (obj, value) { obj.adminEmail = value; } }, metadata: _metadata }, _adminEmail_initializers, _adminEmail_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _entityType_decorators, { kind: "field", name: "entityType", static: false, private: false, access: { has: function (obj) { return "entityType" in obj; }, get: function (obj) { return obj.entityType; }, set: function (obj, value) { obj.entityType = value; } }, metadata: _metadata }, _entityType_initializers, _entityType_extraInitializers);
        __esDecorate(null, null, _entityId_decorators, { kind: "field", name: "entityId", static: false, private: false, access: { has: function (obj) { return "entityId" in obj; }, get: function (obj) { return obj.entityId; }, set: function (obj, value) { obj.entityId = value; } }, metadata: _metadata }, _entityId_initializers, _entityId_extraInitializers);
        __esDecorate(null, null, _oldValue_decorators, { kind: "field", name: "oldValue", static: false, private: false, access: { has: function (obj) { return "oldValue" in obj; }, get: function (obj) { return obj.oldValue; }, set: function (obj, value) { obj.oldValue = value; } }, metadata: _metadata }, _oldValue_initializers, _oldValue_extraInitializers);
        __esDecorate(null, null, _newValue_decorators, { kind: "field", name: "newValue", static: false, private: false, access: { has: function (obj) { return "newValue" in obj; }, get: function (obj) { return obj.newValue; }, set: function (obj, value) { obj.newValue = value; } }, metadata: _metadata }, _newValue_initializers, _newValue_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditLog = _classThis;
}();
exports.AuditLog = AuditLog;
