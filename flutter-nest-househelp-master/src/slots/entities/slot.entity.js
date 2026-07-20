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
exports.Slot = void 0;
var typeorm_1 = require("typeorm");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var uuid_1 = require("uuid");
var Slot = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.Index)(['worker', 'startTime', 'isBooked']), (0, typeorm_1.Index)(['worker', 'date', 'isBooked'])];
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
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _isBooked_decorators;
    var _isBooked_initializers = [];
    var _isBooked_extraInitializers = [];
    var _maxBookings_decorators;
    var _maxBookings_initializers = [];
    var _maxBookings_extraInitializers = [];
    var _currentBookings_decorators;
    var _currentBookings_initializers = [];
    var _currentBookings_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _version_decorators;
    var _version_initializers = [];
    var _version_extraInitializers = [];
    var _worker_decorators;
    var _worker_initializers = [];
    var _worker_extraInitializers = [];
    var Slot = _classThis = /** @class */ (function () {
        function Slot_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0)); // Internal ID
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public API ID
            this.date = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.startTime = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.isBooked = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _isBooked_initializers, void 0));
            this.maxBookings = (__runInitializers(this, _isBooked_extraInitializers), __runInitializers(this, _maxBookings_initializers, void 0));
            this.currentBookings = (__runInitializers(this, _maxBookings_extraInitializers), __runInitializers(this, _currentBookings_initializers, void 0));
            this.createdAt = (__runInitializers(this, _currentBookings_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.version = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _version_initializers, void 0)); // Optimistic locking for race condition prevention
            this.worker = (__runInitializers(this, _version_extraInitializers), __runInitializers(this, _worker_initializers, void 0));
            __runInitializers(this, _worker_extraInitializers);
        }
        Slot_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, uuid_1.v4)();
            }
        };
        return Slot_1;
    }());
    __setFunctionName(_classThis, "Slot");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _date_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _isBooked_decorators = [(0, typeorm_1.Column)({ default: false })];
        _maxBookings_decorators = [(0, typeorm_1.Column)({ default: 1 })];
        _currentBookings_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _updatedAt_decorators = [(0, typeorm_1.Column)({
                type: 'timestamp',
                default: function () { return 'CURRENT_TIMESTAMP'; },
                onUpdate: 'CURRENT_TIMESTAMP',
            })];
        _version_decorators = [(0, typeorm_1.VersionColumn)({ default: 1 })];
        _worker_decorators = [(0, typeorm_1.ManyToOne)(function () { return worker_entity_1.Worker; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'workerId' })];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _isBooked_decorators, { kind: "field", name: "isBooked", static: false, private: false, access: { has: function (obj) { return "isBooked" in obj; }, get: function (obj) { return obj.isBooked; }, set: function (obj, value) { obj.isBooked = value; } }, metadata: _metadata }, _isBooked_initializers, _isBooked_extraInitializers);
        __esDecorate(null, null, _maxBookings_decorators, { kind: "field", name: "maxBookings", static: false, private: false, access: { has: function (obj) { return "maxBookings" in obj; }, get: function (obj) { return obj.maxBookings; }, set: function (obj, value) { obj.maxBookings = value; } }, metadata: _metadata }, _maxBookings_initializers, _maxBookings_extraInitializers);
        __esDecorate(null, null, _currentBookings_decorators, { kind: "field", name: "currentBookings", static: false, private: false, access: { has: function (obj) { return "currentBookings" in obj; }, get: function (obj) { return obj.currentBookings; }, set: function (obj, value) { obj.currentBookings = value; } }, metadata: _metadata }, _currentBookings_initializers, _currentBookings_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: function (obj) { return "version" in obj; }, get: function (obj) { return obj.version; }, set: function (obj, value) { obj.version = value; } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
        __esDecorate(null, null, _worker_decorators, { kind: "field", name: "worker", static: false, private: false, access: { has: function (obj) { return "worker" in obj; }, get: function (obj) { return obj.worker; }, set: function (obj, value) { obj.worker = value; } }, metadata: _metadata }, _worker_initializers, _worker_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Slot = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Slot = _classThis;
}();
exports.Slot = Slot;
