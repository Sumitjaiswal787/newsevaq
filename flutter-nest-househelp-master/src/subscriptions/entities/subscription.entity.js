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
exports.Subscription = exports.BillingCycle = exports.SubscriptionStatus = exports.PreferredTimeWindow = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var service_profile_entity_1 = require("../../service-profiles/entities/service-profile.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var crypto_1 = require("crypto");
var PreferredTimeWindow;
(function (PreferredTimeWindow) {
    PreferredTimeWindow["MORNING"] = "MORNING";
    PreferredTimeWindow["AFTERNOON"] = "AFTERNOON";
    PreferredTimeWindow["EVENING"] = "EVENING";
})(PreferredTimeWindow || (exports.PreferredTimeWindow = PreferredTimeWindow = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["PAUSED"] = "PAUSED";
    SubscriptionStatus["CANCELLED"] = "CANCELLED";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var BillingCycle;
(function (BillingCycle) {
    BillingCycle["MONTHLY"] = "MONTHLY";
})(BillingCycle || (exports.BillingCycle = BillingCycle = {}));
var Subscription = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('subscriptions')];
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
    var _serviceProfileId_decorators;
    var _serviceProfileId_initializers = [];
    var _serviceProfileId_extraInitializers = [];
    var _serviceProfile_decorators;
    var _serviceProfile_initializers = [];
    var _serviceProfile_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _preferredTimeWindow_decorators;
    var _preferredTimeWindow_initializers = [];
    var _preferredTimeWindow_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _billingCycle_decorators;
    var _billingCycle_initializers = [];
    var _billingCycle_extraInitializers = [];
    var _monthlyPriceSnapshot_decorators;
    var _monthlyPriceSnapshot_initializers = [];
    var _monthlyPriceSnapshot_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _assignedWorkerId_decorators;
    var _assignedWorkerId_initializers = [];
    var _assignedWorkerId_extraInitializers = [];
    var _availabilityDetectedAt_decorators;
    var _availabilityDetectedAt_initializers = [];
    var _availabilityDetectedAt_extraInitializers = [];
    var _workerAssignmentFailed_decorators;
    var _workerAssignmentFailed_initializers = [];
    var _workerAssignmentFailed_extraInitializers = [];
    var _lastNotificationSentAt_decorators;
    var _lastNotificationSentAt_initializers = [];
    var _lastNotificationSentAt_extraInitializers = [];
    var _assignedWorker_decorators;
    var _assignedWorker_initializers = [];
    var _assignedWorker_extraInitializers = [];
    var _isPaid_decorators;
    var _isPaid_initializers = [];
    var _isPaid_extraInitializers = [];
    var _customPlanData_decorators;
    var _customPlanData_initializers = [];
    var _customPlanData_extraInitializers = [];
    var _version_decorators;
    var _version_initializers = [];
    var _version_extraInitializers = [];
    var Subscription = _classThis = /** @class */ (function () {
        function Subscription_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0));
            this.userId = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.serviceProfileId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _serviceProfileId_initializers, void 0));
            this.serviceProfile = (__runInitializers(this, _serviceProfileId_extraInitializers), __runInitializers(this, _serviceProfile_initializers, void 0));
            this.location = (__runInitializers(this, _serviceProfile_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.preferredTimeWindow = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _preferredTimeWindow_initializers, void 0));
            this.startDate = (__runInitializers(this, _preferredTimeWindow_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            this.status = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.billingCycle = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _billingCycle_initializers, void 0));
            this.monthlyPriceSnapshot = (__runInitializers(this, _billingCycle_extraInitializers), __runInitializers(this, _monthlyPriceSnapshot_initializers, void 0));
            this.createdAt = (__runInitializers(this, _monthlyPriceSnapshot_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.assignedWorkerId = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _assignedWorkerId_initializers, void 0));
            this.availabilityDetectedAt = (__runInitializers(this, _assignedWorkerId_extraInitializers), __runInitializers(this, _availabilityDetectedAt_initializers, void 0));
            this.workerAssignmentFailed = (__runInitializers(this, _availabilityDetectedAt_extraInitializers), __runInitializers(this, _workerAssignmentFailed_initializers, void 0));
            this.lastNotificationSentAt = (__runInitializers(this, _workerAssignmentFailed_extraInitializers), __runInitializers(this, _lastNotificationSentAt_initializers, void 0));
            this.assignedWorker = (__runInitializers(this, _lastNotificationSentAt_extraInitializers), __runInitializers(this, _assignedWorker_initializers, void 0));
            this.isPaid = (__runInitializers(this, _assignedWorker_extraInitializers), __runInitializers(this, _isPaid_initializers, void 0));
            this.customPlanData = (__runInitializers(this, _isPaid_extraInitializers), __runInitializers(this, _customPlanData_initializers, void 0));
            this.version = (__runInitializers(this, _customPlanData_extraInitializers), __runInitializers(this, _version_initializers, void 0));
            __runInitializers(this, _version_extraInitializers);
        }
        Subscription_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, crypto_1.randomUUID)();
            }
        };
        return Subscription_1;
    }());
    __setFunctionName(_classThis, "Subscription");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _userId_decorators = [(0, typeorm_1.Column)('uuid')];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, {
                onDelete: 'CASCADE',
            }), (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'publicId' })];
        _serviceProfileId_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
        _serviceProfile_decorators = [(0, typeorm_1.ManyToOne)(function () { return service_profile_entity_1.ServiceProfile; }, { nullable: true }), (0, typeorm_1.JoinColumn)()];
        _location_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _preferredTimeWindow_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: PreferredTimeWindow,
                name: 'preferredtimewindow',
            })];
        _startDate_decorators = [(0, typeorm_1.Column)('date')];
        _endDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: SubscriptionStatus,
                default: SubscriptionStatus.ACTIVE,
            })];
        _billingCycle_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                enum: BillingCycle,
                default: BillingCycle.MONTHLY,
            })];
        _monthlyPriceSnapshot_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _assignedWorkerId_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
        _availabilityDetectedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _workerAssignmentFailed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'worker_assignment_failed' })];
        _lastNotificationSentAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'last_notification_sent_at' })];
        _assignedWorker_decorators = [(0, class_transformer_1.Expose)(), (0, typeorm_1.ManyToOne)(function () { return worker_entity_1.Worker; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'assignedWorkerId' })];
        _isPaid_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _customPlanData_decorators = [(0, class_transformer_1.Expose)(), (0, typeorm_1.Column)({ type: 'json', nullable: true, name: 'custom_plan_data' })];
        _version_decorators = [(0, typeorm_1.VersionColumn)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _serviceProfileId_decorators, { kind: "field", name: "serviceProfileId", static: false, private: false, access: { has: function (obj) { return "serviceProfileId" in obj; }, get: function (obj) { return obj.serviceProfileId; }, set: function (obj, value) { obj.serviceProfileId = value; } }, metadata: _metadata }, _serviceProfileId_initializers, _serviceProfileId_extraInitializers);
        __esDecorate(null, null, _serviceProfile_decorators, { kind: "field", name: "serviceProfile", static: false, private: false, access: { has: function (obj) { return "serviceProfile" in obj; }, get: function (obj) { return obj.serviceProfile; }, set: function (obj, value) { obj.serviceProfile = value; } }, metadata: _metadata }, _serviceProfile_initializers, _serviceProfile_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _preferredTimeWindow_decorators, { kind: "field", name: "preferredTimeWindow", static: false, private: false, access: { has: function (obj) { return "preferredTimeWindow" in obj; }, get: function (obj) { return obj.preferredTimeWindow; }, set: function (obj, value) { obj.preferredTimeWindow = value; } }, metadata: _metadata }, _preferredTimeWindow_initializers, _preferredTimeWindow_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _billingCycle_decorators, { kind: "field", name: "billingCycle", static: false, private: false, access: { has: function (obj) { return "billingCycle" in obj; }, get: function (obj) { return obj.billingCycle; }, set: function (obj, value) { obj.billingCycle = value; } }, metadata: _metadata }, _billingCycle_initializers, _billingCycle_extraInitializers);
        __esDecorate(null, null, _monthlyPriceSnapshot_decorators, { kind: "field", name: "monthlyPriceSnapshot", static: false, private: false, access: { has: function (obj) { return "monthlyPriceSnapshot" in obj; }, get: function (obj) { return obj.monthlyPriceSnapshot; }, set: function (obj, value) { obj.monthlyPriceSnapshot = value; } }, metadata: _metadata }, _monthlyPriceSnapshot_initializers, _monthlyPriceSnapshot_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _assignedWorkerId_decorators, { kind: "field", name: "assignedWorkerId", static: false, private: false, access: { has: function (obj) { return "assignedWorkerId" in obj; }, get: function (obj) { return obj.assignedWorkerId; }, set: function (obj, value) { obj.assignedWorkerId = value; } }, metadata: _metadata }, _assignedWorkerId_initializers, _assignedWorkerId_extraInitializers);
        __esDecorate(null, null, _availabilityDetectedAt_decorators, { kind: "field", name: "availabilityDetectedAt", static: false, private: false, access: { has: function (obj) { return "availabilityDetectedAt" in obj; }, get: function (obj) { return obj.availabilityDetectedAt; }, set: function (obj, value) { obj.availabilityDetectedAt = value; } }, metadata: _metadata }, _availabilityDetectedAt_initializers, _availabilityDetectedAt_extraInitializers);
        __esDecorate(null, null, _workerAssignmentFailed_decorators, { kind: "field", name: "workerAssignmentFailed", static: false, private: false, access: { has: function (obj) { return "workerAssignmentFailed" in obj; }, get: function (obj) { return obj.workerAssignmentFailed; }, set: function (obj, value) { obj.workerAssignmentFailed = value; } }, metadata: _metadata }, _workerAssignmentFailed_initializers, _workerAssignmentFailed_extraInitializers);
        __esDecorate(null, null, _lastNotificationSentAt_decorators, { kind: "field", name: "lastNotificationSentAt", static: false, private: false, access: { has: function (obj) { return "lastNotificationSentAt" in obj; }, get: function (obj) { return obj.lastNotificationSentAt; }, set: function (obj, value) { obj.lastNotificationSentAt = value; } }, metadata: _metadata }, _lastNotificationSentAt_initializers, _lastNotificationSentAt_extraInitializers);
        __esDecorate(null, null, _assignedWorker_decorators, { kind: "field", name: "assignedWorker", static: false, private: false, access: { has: function (obj) { return "assignedWorker" in obj; }, get: function (obj) { return obj.assignedWorker; }, set: function (obj, value) { obj.assignedWorker = value; } }, metadata: _metadata }, _assignedWorker_initializers, _assignedWorker_extraInitializers);
        __esDecorate(null, null, _isPaid_decorators, { kind: "field", name: "isPaid", static: false, private: false, access: { has: function (obj) { return "isPaid" in obj; }, get: function (obj) { return obj.isPaid; }, set: function (obj, value) { obj.isPaid = value; } }, metadata: _metadata }, _isPaid_initializers, _isPaid_extraInitializers);
        __esDecorate(null, null, _customPlanData_decorators, { kind: "field", name: "customPlanData", static: false, private: false, access: { has: function (obj) { return "customPlanData" in obj; }, get: function (obj) { return obj.customPlanData; }, set: function (obj, value) { obj.customPlanData = value; } }, metadata: _metadata }, _customPlanData_initializers, _customPlanData_extraInitializers);
        __esDecorate(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: function (obj) { return "version" in obj; }, get: function (obj) { return obj.version; }, set: function (obj, value) { obj.version = value; } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Subscription = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Subscription = _classThis;
}();
exports.Subscription = Subscription;
