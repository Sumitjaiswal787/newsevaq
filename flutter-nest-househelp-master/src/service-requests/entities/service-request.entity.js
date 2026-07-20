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
exports.ServiceRequest = exports.ServiceRequestSource = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var service_entity_1 = require("../../services/entities/service.entity");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var subscription_entity_1 = require("../../subscriptions/entities/subscription.entity");
var ServiceRequestSource;
(function (ServiceRequestSource) {
    ServiceRequestSource["SUBSCRIPTION"] = "SUBSCRIPTION";
    ServiceRequestSource["ONE_TIME"] = "ONE_TIME";
})(ServiceRequestSource || (exports.ServiceRequestSource = ServiceRequestSource = {}));
var ServiceRequest = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('service_requests'), (0, typeorm_1.Index)(['userId', 'createdAt']), (0, typeorm_1.Index)(['assignmentStatus', 'createdAt'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _publicId_decorators;
    var _publicId_initializers = [];
    var _publicId_extraInitializers = [];
    var _source_decorators;
    var _source_initializers = [];
    var _source_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _serviceId_decorators;
    var _serviceId_initializers = [];
    var _serviceId_extraInitializers = [];
    var _serviceProfileId_decorators;
    var _serviceProfileId_initializers = [];
    var _serviceProfileId_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _timeWindow_decorators;
    var _timeWindow_initializers = [];
    var _timeWindow_extraInitializers = [];
    var _priceSnapshot_decorators;
    var _priceSnapshot_initializers = [];
    var _priceSnapshot_extraInitializers = [];
    var _assignmentStatus_decorators;
    var _assignmentStatus_initializers = [];
    var _assignmentStatus_extraInitializers = [];
    var _assignedWorkerId_decorators;
    var _assignedWorkerId_initializers = [];
    var _assignedWorkerId_extraInitializers = [];
    var _assignedSlotId_decorators;
    var _assignedSlotId_initializers = [];
    var _assignedSlotId_extraInitializers = [];
    var _failureReason_decorators;
    var _failureReason_initializers = [];
    var _failureReason_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _service_decorators;
    var _service_initializers = [];
    var _service_extraInitializers = [];
    var _worker_decorators;
    var _worker_initializers = [];
    var _worker_extraInitializers = [];
    var _subscriptionId_decorators;
    var _subscriptionId_initializers = [];
    var _subscriptionId_extraInitializers = [];
    var _subscription_decorators;
    var _subscription_initializers = [];
    var _subscription_extraInitializers = [];
    var ServiceRequest = _classThis = /** @class */ (function () {
        function ServiceRequest_1() {
            this.id = __runInitializers(this, _id_initializers, void 0); // Internal ID (UUID)
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public API ID
            this.source = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _source_initializers, void 0));
            this.userId = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.serviceId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _serviceId_initializers, void 0));
            this.serviceProfileId = (__runInitializers(this, _serviceId_extraInitializers), __runInitializers(this, _serviceProfileId_initializers, void 0));
            this.date = (__runInitializers(this, _serviceProfileId_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.timeWindow = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _timeWindow_initializers, void 0));
            this.priceSnapshot = (__runInitializers(this, _timeWindow_extraInitializers), __runInitializers(this, _priceSnapshot_initializers, void 0));
            this.assignmentStatus = (__runInitializers(this, _priceSnapshot_extraInitializers), __runInitializers(this, _assignmentStatus_initializers, void 0));
            this.assignedWorkerId = (__runInitializers(this, _assignmentStatus_extraInitializers), __runInitializers(this, _assignedWorkerId_initializers, void 0));
            this.assignedSlotId = (__runInitializers(this, _assignedWorkerId_extraInitializers), __runInitializers(this, _assignedSlotId_initializers, void 0));
            this.failureReason = (__runInitializers(this, _assignedSlotId_extraInitializers), __runInitializers(this, _failureReason_initializers, void 0));
            this.metadata = (__runInitializers(this, _failureReason_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // NOTE: Booking relationship removed - Booking is legacy table
            this.user = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.service = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _service_initializers, void 0));
            this.worker = (__runInitializers(this, _service_extraInitializers), __runInitializers(this, _worker_initializers, void 0));
            this.subscriptionId = (__runInitializers(this, _worker_extraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.subscription = (__runInitializers(this, _subscriptionId_extraInitializers), __runInitializers(this, _subscription_initializers, void 0));
            __runInitializers(this, _subscription_extraInitializers);
        }
        // Business logic methods
        ServiceRequest_1.prototype.canRetry = function () {
            var _a;
            return (this.assignmentStatus === 'FAILED_TO_ASSIGN' &&
                (((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.retryCount) || 0) < 3);
        };
        ServiceRequest_1.prototype.shouldAutoRetry = function () {
            return this.canRetry() && this.failureReason !== 'NO_WORKERS_AVAILABLE';
        };
        return ServiceRequest_1;
    }());
    __setFunctionName(_classThis, "ServiceRequest");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _source_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: ServiceRequestSource,
                default: ServiceRequestSource.ONE_TIME,
            })];
        _userId_decorators = [(0, typeorm_1.Column)('int')];
        _serviceId_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
        _serviceProfileId_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
        _date_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _timeWindow_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: ['morning', 'afternoon', 'evening', 'early-morning'],
                nullable: true,
            })];
        _priceSnapshot_decorators = [(0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 })];
        _assignmentStatus_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                default: 'REQUESTED',
            })];
        _assignedWorkerId_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'int' })];
        _assignedSlotId_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'int' })];
        _failureReason_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'text' })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.serviceRequests; }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _service_decorators = [(0, typeorm_1.ManyToOne)(function () { return service_entity_1.Service; }, function (service) { return service.serviceRequests; }), (0, typeorm_1.JoinColumn)({ name: 'serviceId' })];
        _worker_decorators = [(0, typeorm_1.ManyToOne)(function () { return worker_entity_1.Worker; }, function (worker) { return worker.serviceRequests; }), (0, typeorm_1.JoinColumn)({ name: 'assignedWorkerId' })];
        _subscriptionId_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
        _subscription_decorators = [(0, typeorm_1.ManyToOne)(function () { return subscription_entity_1.Subscription; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'subscriptionId' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _serviceId_decorators, { kind: "field", name: "serviceId", static: false, private: false, access: { has: function (obj) { return "serviceId" in obj; }, get: function (obj) { return obj.serviceId; }, set: function (obj, value) { obj.serviceId = value; } }, metadata: _metadata }, _serviceId_initializers, _serviceId_extraInitializers);
        __esDecorate(null, null, _serviceProfileId_decorators, { kind: "field", name: "serviceProfileId", static: false, private: false, access: { has: function (obj) { return "serviceProfileId" in obj; }, get: function (obj) { return obj.serviceProfileId; }, set: function (obj, value) { obj.serviceProfileId = value; } }, metadata: _metadata }, _serviceProfileId_initializers, _serviceProfileId_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _timeWindow_decorators, { kind: "field", name: "timeWindow", static: false, private: false, access: { has: function (obj) { return "timeWindow" in obj; }, get: function (obj) { return obj.timeWindow; }, set: function (obj, value) { obj.timeWindow = value; } }, metadata: _metadata }, _timeWindow_initializers, _timeWindow_extraInitializers);
        __esDecorate(null, null, _priceSnapshot_decorators, { kind: "field", name: "priceSnapshot", static: false, private: false, access: { has: function (obj) { return "priceSnapshot" in obj; }, get: function (obj) { return obj.priceSnapshot; }, set: function (obj, value) { obj.priceSnapshot = value; } }, metadata: _metadata }, _priceSnapshot_initializers, _priceSnapshot_extraInitializers);
        __esDecorate(null, null, _assignmentStatus_decorators, { kind: "field", name: "assignmentStatus", static: false, private: false, access: { has: function (obj) { return "assignmentStatus" in obj; }, get: function (obj) { return obj.assignmentStatus; }, set: function (obj, value) { obj.assignmentStatus = value; } }, metadata: _metadata }, _assignmentStatus_initializers, _assignmentStatus_extraInitializers);
        __esDecorate(null, null, _assignedWorkerId_decorators, { kind: "field", name: "assignedWorkerId", static: false, private: false, access: { has: function (obj) { return "assignedWorkerId" in obj; }, get: function (obj) { return obj.assignedWorkerId; }, set: function (obj, value) { obj.assignedWorkerId = value; } }, metadata: _metadata }, _assignedWorkerId_initializers, _assignedWorkerId_extraInitializers);
        __esDecorate(null, null, _assignedSlotId_decorators, { kind: "field", name: "assignedSlotId", static: false, private: false, access: { has: function (obj) { return "assignedSlotId" in obj; }, get: function (obj) { return obj.assignedSlotId; }, set: function (obj, value) { obj.assignedSlotId = value; } }, metadata: _metadata }, _assignedSlotId_initializers, _assignedSlotId_extraInitializers);
        __esDecorate(null, null, _failureReason_decorators, { kind: "field", name: "failureReason", static: false, private: false, access: { has: function (obj) { return "failureReason" in obj; }, get: function (obj) { return obj.failureReason; }, set: function (obj, value) { obj.failureReason = value; } }, metadata: _metadata }, _failureReason_initializers, _failureReason_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: function (obj) { return "service" in obj; }, get: function (obj) { return obj.service; }, set: function (obj, value) { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
        __esDecorate(null, null, _worker_decorators, { kind: "field", name: "worker", static: false, private: false, access: { has: function (obj) { return "worker" in obj; }, get: function (obj) { return obj.worker; }, set: function (obj, value) { obj.worker = value; } }, metadata: _metadata }, _worker_initializers, _worker_extraInitializers);
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: function (obj) { return "subscriptionId" in obj; }, get: function (obj) { return obj.subscriptionId; }, set: function (obj, value) { obj.subscriptionId = value; } }, metadata: _metadata }, _subscriptionId_initializers, _subscriptionId_extraInitializers);
        __esDecorate(null, null, _subscription_decorators, { kind: "field", name: "subscription", static: false, private: false, access: { has: function (obj) { return "subscription" in obj; }, get: function (obj) { return obj.subscription; }, set: function (obj, value) { obj.subscription = value; } }, metadata: _metadata }, _subscription_initializers, _subscription_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceRequest = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceRequest = _classThis;
}();
exports.ServiceRequest = ServiceRequest;
