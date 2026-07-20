"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.AssignmentState = exports.BookingType = exports.BookingStatus = exports.LocationData = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var crypto = __importStar(require("crypto"));
var class_validator_1 = require("class-validator");
var user_entity_1 = require("../../users/entities/user.entity");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var service_entity_1 = require("../../services/entities/service.entity");
var slot_entity_1 = require("../../slots/entities/slot.entity");
var payment_entity_1 = require("../../payments/entities/payment.entity");
var service_request_entity_1 = require("../../service-requests/entities/service-request.entity");
var subscription_entity_1 = require("../../subscriptions/entities/subscription.entity");
var LocationData = function () {
    var _a;
    var _lat_decorators;
    var _lat_initializers = [];
    var _lat_extraInitializers = [];
    var _lng_decorators;
    var _lng_initializers = [];
    var _lng_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LocationData() {
                this.lat = __runInitializers(this, _lat_initializers, void 0);
                this.lng = (__runInitializers(this, _lat_extraInitializers), __runInitializers(this, _lng_initializers, void 0));
                this.latitude = (__runInitializers(this, _lng_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.address = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                __runInitializers(this, _address_extraInitializers);
            }
            return LocationData;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _lat_decorators = [(0, class_transformer_1.Expose)(), (0, class_validator_1.IsNumber)()];
            _lng_decorators = [(0, class_transformer_1.Expose)(), (0, class_validator_1.IsNumber)()];
            _latitude_decorators = [(0, class_transformer_1.Expose)(), (0, class_validator_1.IsNumber)()];
            _longitude_decorators = [(0, class_transformer_1.Expose)(), (0, class_validator_1.IsNumber)()];
            _address_decorators = [(0, class_transformer_1.Expose)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _lat_decorators, { kind: "field", name: "lat", static: false, private: false, access: { has: function (obj) { return "lat" in obj; }, get: function (obj) { return obj.lat; }, set: function (obj, value) { obj.lat = value; } }, metadata: _metadata }, _lat_initializers, _lat_extraInitializers);
            __esDecorate(null, null, _lng_decorators, { kind: "field", name: "lng", static: false, private: false, access: { has: function (obj) { return "lng" in obj; }, get: function (obj) { return obj.lng; }, set: function (obj, value) { obj.lng = value; } }, metadata: _metadata }, _lng_initializers, _lng_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LocationData = LocationData;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["REQUESTED"] = "requested";
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["IN_PROGRESS"] = "in_progress";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["NO_SHOW"] = "no_show";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var BookingType;
(function (BookingType) {
    BookingType["ON_DEMAND"] = "on_demand";
    BookingType["SCHEDULED"] = "scheduled";
    BookingType["SUBSCRIPTION"] = "subscription";
})(BookingType || (exports.BookingType = BookingType = {}));
var AssignmentState;
(function (AssignmentState) {
    AssignmentState["PENDING"] = "pending";
    AssignmentState["ASSIGNED"] = "assigned";
    AssignmentState["CONFIRMED"] = "confirmed";
    AssignmentState["REASSIGNING"] = "reassigning";
    AssignmentState["CANCELLED"] = "cancelled";
    AssignmentState["PROVISIONAL_ASSIGNED"] = "provisional_assigned";
    AssignmentState["PROVISIONAL_EXPIRED"] = "provisional_expired";
})(AssignmentState || (exports.AssignmentState = AssignmentState = {}));
var Booking = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('booking')];
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
    var _worker_decorators;
    var _worker_initializers = [];
    var _worker_extraInitializers = [];
    var _workerId_decorators;
    var _workerId_initializers = [];
    var _workerId_extraInitializers = [];
    var _assignedWorker_decorators;
    var _assignedWorker_initializers = [];
    var _assignedWorker_extraInitializers = [];
    var _assignedWorkerId_decorators;
    var _assignedWorkerId_initializers = [];
    var _assignedWorkerId_extraInitializers = [];
    var _serviceId_decorators;
    var _serviceId_initializers = [];
    var _serviceId_extraInitializers = [];
    var _preServiceReminderSent_decorators;
    var _preServiceReminderSent_initializers = [];
    var _preServiceReminderSent_extraInitializers = [];
    var _service_decorators;
    var _service_initializers = [];
    var _service_extraInitializers = [];
    var _slotId_decorators;
    var _slotId_initializers = [];
    var _slotId_extraInitializers = [];
    var _slot_decorators;
    var _slot_initializers = [];
    var _slot_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _totalAmount_decorators;
    var _totalAmount_initializers = [];
    var _totalAmount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _serviceRequestId_decorators;
    var _serviceRequestId_initializers = [];
    var _serviceRequestId_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _responsibilityTransferred_decorators;
    var _responsibilityTransferred_initializers = [];
    var _responsibilityTransferred_extraInitializers = [];
    var _systemMonitoring_decorators;
    var _systemMonitoring_initializers = [];
    var _systemMonitoring_extraInitializers = [];
    var _protectionStatus_decorators;
    var _protectionStatus_initializers = [];
    var _protectionStatus_extraInitializers = [];
    var _assignmentState_decorators;
    var _assignmentState_initializers = [];
    var _assignmentState_extraInitializers = [];
    var _isPaid_decorators;
    var _isPaid_initializers = [];
    var _isPaid_extraInitializers = [];
    var _assignmentReason_decorators;
    var _assignmentReason_initializers = [];
    var _assignmentReason_extraInitializers = [];
    var _reassignmentCount_decorators;
    var _reassignmentCount_initializers = [];
    var _reassignmentCount_extraInitializers = [];
    var _assignmentTimestamp_decorators;
    var _assignmentTimestamp_initializers = [];
    var _assignmentTimestamp_extraInitializers = [];
    var _notificationSent_decorators;
    var _notificationSent_initializers = [];
    var _notificationSent_extraInitializers = [];
    var _guestFcmToken_decorators;
    var _guestFcmToken_initializers = [];
    var _guestFcmToken_extraInitializers = [];
    var _assignmentMetadata_decorators;
    var _assignmentMetadata_initializers = [];
    var _assignmentMetadata_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _serviceRequest_decorators;
    var _serviceRequest_initializers = [];
    var _serviceRequest_extraInitializers = [];
    var _subscriptionId_decorators;
    var _subscriptionId_initializers = [];
    var _subscriptionId_extraInitializers = [];
    var _subscription_decorators;
    var _subscription_initializers = [];
    var _subscription_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _version_decorators;
    var _version_initializers = [];
    var _version_extraInitializers = [];
    var _otp_decorators;
    var _otp_initializers = [];
    var _otp_extraInitializers = [];
    var _isOtpVerified_decorators;
    var _isOtpVerified_initializers = [];
    var _isOtpVerified_extraInitializers = [];
    var _get_isOtpRequired_decorators;
    var Booking = _classThis = /** @class */ (function () {
        function Booking_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public-facing UUID identifier
            this.userId = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.worker = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _worker_initializers, void 0));
            this.workerId = (__runInitializers(this, _worker_extraInitializers), __runInitializers(this, _workerId_initializers, void 0));
            this.assignedWorker = (__runInitializers(this, _workerId_extraInitializers), __runInitializers(this, _assignedWorker_initializers, void 0));
            this.assignedWorkerId = (__runInitializers(this, _assignedWorker_extraInitializers), __runInitializers(this, _assignedWorkerId_initializers, void 0));
            this.serviceId = (__runInitializers(this, _assignedWorkerId_extraInitializers), __runInitializers(this, _serviceId_initializers, void 0));
            this.preServiceReminderSent = (__runInitializers(this, _serviceId_extraInitializers), __runInitializers(this, _preServiceReminderSent_initializers, void 0));
            this.service = (__runInitializers(this, _preServiceReminderSent_extraInitializers), __runInitializers(this, _service_initializers, void 0));
            this.slotId = (__runInitializers(this, _service_extraInitializers), __runInitializers(this, _slotId_initializers, void 0));
            this.slot = (__runInitializers(this, _slotId_extraInitializers), __runInitializers(this, _slot_initializers, void 0));
            this.date = (__runInitializers(this, _slot_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.startTime = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.amount = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.totalAmount = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _totalAmount_initializers, void 0));
            this.status = (__runInitializers(this, _totalAmount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.type = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.notes = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.serviceRequestId = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _serviceRequestId_initializers, void 0));
            this.location = (__runInitializers(this, _serviceRequestId_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.responsibilityTransferred = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _responsibilityTransferred_initializers, void 0));
            this.systemMonitoring = (__runInitializers(this, _responsibilityTransferred_extraInitializers), __runInitializers(this, _systemMonitoring_initializers, void 0));
            this.protectionStatus = (__runInitializers(this, _systemMonitoring_extraInitializers), __runInitializers(this, _protectionStatus_initializers, void 0));
            this.assignmentState = (__runInitializers(this, _protectionStatus_extraInitializers), __runInitializers(this, _assignmentState_initializers, void 0));
            this.isPaid = (__runInitializers(this, _assignmentState_extraInitializers), __runInitializers(this, _isPaid_initializers, void 0));
            this.assignmentReason = (__runInitializers(this, _isPaid_extraInitializers), __runInitializers(this, _assignmentReason_initializers, void 0));
            this.reassignmentCount = (__runInitializers(this, _assignmentReason_extraInitializers), __runInitializers(this, _reassignmentCount_initializers, void 0));
            this.assignmentTimestamp = (__runInitializers(this, _reassignmentCount_extraInitializers), __runInitializers(this, _assignmentTimestamp_initializers, void 0));
            this.notificationSent = (__runInitializers(this, _assignmentTimestamp_extraInitializers), __runInitializers(this, _notificationSent_initializers, void 0));
            this.guestFcmToken = (__runInitializers(this, _notificationSent_extraInitializers), __runInitializers(this, _guestFcmToken_initializers, void 0));
            this.assignmentMetadata = (__runInitializers(this, _guestFcmToken_extraInitializers), __runInitializers(this, _assignmentMetadata_initializers, void 0));
            // TEMPORARY DISABLED - this column was never created in production database causing critical failures
            // @Column({ type: 'json', nullable: true })
            // metadata: any;
            this.payment = (__runInitializers(this, _assignmentMetadata_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            this.serviceRequest = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _serviceRequest_initializers, void 0));
            this.subscriptionId = (__runInitializers(this, _serviceRequest_extraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.subscription = (__runInitializers(this, _subscriptionId_extraInitializers), __runInitializers(this, _subscription_initializers, void 0));
            this.createdAt = (__runInitializers(this, _subscription_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.version = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _version_initializers, void 0));
            this.otp = (__runInitializers(this, _version_extraInitializers), __runInitializers(this, _otp_initializers, void 0));
            this.isOtpVerified = (__runInitializers(this, _otp_extraInitializers), __runInitializers(this, _isOtpVerified_initializers, void 0));
            __runInitializers(this, _isOtpVerified_extraInitializers);
        }
        Booking_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = crypto.randomUUID();
            }
        };
        Object.defineProperty(Booking_1.prototype, "isOtpRequired", {
            get: function () {
                return !!this.otp && !this.isOtpVerified;
            },
            enumerable: false,
            configurable: true
        });
        return Booking_1;
    }());
    __setFunctionName(_classThis, "Booking");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _userId_decorators = [(0, typeorm_1.Column)({ name: 'userId', type: 'uuid' })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'publicId' })];
        _worker_decorators = [(0, typeorm_1.ManyToOne)(function () { return worker_entity_1.Worker; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'workerId' })];
        _workerId_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'workerId' })];
        _assignedWorker_decorators = [(0, typeorm_1.ManyToOne)(function () { return worker_entity_1.Worker; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'assignedWorkerId' })];
        _assignedWorkerId_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'assignedWorkerId' })];
        _serviceId_decorators = [(0, typeorm_1.Column)({ name: 'serviceId', type: 'int', nullable: true })];
        _preServiceReminderSent_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _service_decorators = [(0, typeorm_1.ManyToOne)(function () { return service_entity_1.Service; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'serviceId' })];
        _slotId_decorators = [(0, typeorm_1.Column)({ name: 'slotId', type: 'int', nullable: true })];
        _slot_decorators = [(0, typeorm_1.ManyToOne)(function () { return slot_entity_1.Slot; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'slotId' })];
        _date_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'time' })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'time' })];
        _amount_decorators = [(0, typeorm_1.Column)({
                name: 'amount',
                type: 'decimal',
                precision: 10,
                scale: 2,
                default: 0,
            })];
        _totalAmount_decorators = [(0, typeorm_1.Column)({
                name: 'totalAmount',
                type: 'decimal',
                precision: 10,
                scale: 2,
                default: 0,
            })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'text', default: BookingStatus.PENDING })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'text', default: BookingType.ON_DEMAND })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _serviceRequestId_decorators = [(0, typeorm_1.Column)({ name: 'serviceRequestId', type: 'uuid', nullable: true })];
        _location_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true }), (0, class_transformer_1.Type)(function () { return LocationData; })];
        _responsibilityTransferred_decorators = [(0, typeorm_1.Column)({ default: false })];
        _systemMonitoring_decorators = [(0, typeorm_1.Column)({ default: false })];
        _protectionStatus_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _assignmentState_decorators = [(0, typeorm_1.Column)({ type: 'text', default: AssignmentState.PENDING })];
        _isPaid_decorators = [(0, typeorm_1.Column)({ default: false })];
        _assignmentReason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _reassignmentCount_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 0 })];
        _assignmentTimestamp_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _notificationSent_decorators = [(0, typeorm_1.Column)({ default: false })];
        _guestFcmToken_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'guest_fcm_token' })];
        _assignmentMetadata_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _payment_decorators = [(0, typeorm_1.OneToOne)(function () { return payment_entity_1.Payment; }, function (payment) { return payment.booking; })];
        _serviceRequest_decorators = [(0, typeorm_1.ManyToOne)(function () { return service_request_entity_1.ServiceRequest; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'serviceRequestId' })];
        _subscriptionId_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _subscription_decorators = [(0, class_transformer_1.Expose)(), (0, typeorm_1.ManyToOne)(function () { return subscription_entity_1.Subscription; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'subscriptionId' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _version_decorators = [(0, typeorm_1.VersionColumn)()];
        _otp_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _isOtpVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _get_isOtpRequired_decorators = [(0, class_transformer_1.Expose)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isOtpRequired_decorators, { kind: "getter", name: "isOtpRequired", static: false, private: false, access: { has: function (obj) { return "isOtpRequired" in obj; }, get: function (obj) { return obj.isOtpRequired; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _worker_decorators, { kind: "field", name: "worker", static: false, private: false, access: { has: function (obj) { return "worker" in obj; }, get: function (obj) { return obj.worker; }, set: function (obj, value) { obj.worker = value; } }, metadata: _metadata }, _worker_initializers, _worker_extraInitializers);
        __esDecorate(null, null, _workerId_decorators, { kind: "field", name: "workerId", static: false, private: false, access: { has: function (obj) { return "workerId" in obj; }, get: function (obj) { return obj.workerId; }, set: function (obj, value) { obj.workerId = value; } }, metadata: _metadata }, _workerId_initializers, _workerId_extraInitializers);
        __esDecorate(null, null, _assignedWorker_decorators, { kind: "field", name: "assignedWorker", static: false, private: false, access: { has: function (obj) { return "assignedWorker" in obj; }, get: function (obj) { return obj.assignedWorker; }, set: function (obj, value) { obj.assignedWorker = value; } }, metadata: _metadata }, _assignedWorker_initializers, _assignedWorker_extraInitializers);
        __esDecorate(null, null, _assignedWorkerId_decorators, { kind: "field", name: "assignedWorkerId", static: false, private: false, access: { has: function (obj) { return "assignedWorkerId" in obj; }, get: function (obj) { return obj.assignedWorkerId; }, set: function (obj, value) { obj.assignedWorkerId = value; } }, metadata: _metadata }, _assignedWorkerId_initializers, _assignedWorkerId_extraInitializers);
        __esDecorate(null, null, _serviceId_decorators, { kind: "field", name: "serviceId", static: false, private: false, access: { has: function (obj) { return "serviceId" in obj; }, get: function (obj) { return obj.serviceId; }, set: function (obj, value) { obj.serviceId = value; } }, metadata: _metadata }, _serviceId_initializers, _serviceId_extraInitializers);
        __esDecorate(null, null, _preServiceReminderSent_decorators, { kind: "field", name: "preServiceReminderSent", static: false, private: false, access: { has: function (obj) { return "preServiceReminderSent" in obj; }, get: function (obj) { return obj.preServiceReminderSent; }, set: function (obj, value) { obj.preServiceReminderSent = value; } }, metadata: _metadata }, _preServiceReminderSent_initializers, _preServiceReminderSent_extraInitializers);
        __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: function (obj) { return "service" in obj; }, get: function (obj) { return obj.service; }, set: function (obj, value) { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
        __esDecorate(null, null, _slotId_decorators, { kind: "field", name: "slotId", static: false, private: false, access: { has: function (obj) { return "slotId" in obj; }, get: function (obj) { return obj.slotId; }, set: function (obj, value) { obj.slotId = value; } }, metadata: _metadata }, _slotId_initializers, _slotId_extraInitializers);
        __esDecorate(null, null, _slot_decorators, { kind: "field", name: "slot", static: false, private: false, access: { has: function (obj) { return "slot" in obj; }, get: function (obj) { return obj.slot; }, set: function (obj, value) { obj.slot = value; } }, metadata: _metadata }, _slot_initializers, _slot_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _totalAmount_decorators, { kind: "field", name: "totalAmount", static: false, private: false, access: { has: function (obj) { return "totalAmount" in obj; }, get: function (obj) { return obj.totalAmount; }, set: function (obj, value) { obj.totalAmount = value; } }, metadata: _metadata }, _totalAmount_initializers, _totalAmount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _serviceRequestId_decorators, { kind: "field", name: "serviceRequestId", static: false, private: false, access: { has: function (obj) { return "serviceRequestId" in obj; }, get: function (obj) { return obj.serviceRequestId; }, set: function (obj, value) { obj.serviceRequestId = value; } }, metadata: _metadata }, _serviceRequestId_initializers, _serviceRequestId_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _responsibilityTransferred_decorators, { kind: "field", name: "responsibilityTransferred", static: false, private: false, access: { has: function (obj) { return "responsibilityTransferred" in obj; }, get: function (obj) { return obj.responsibilityTransferred; }, set: function (obj, value) { obj.responsibilityTransferred = value; } }, metadata: _metadata }, _responsibilityTransferred_initializers, _responsibilityTransferred_extraInitializers);
        __esDecorate(null, null, _systemMonitoring_decorators, { kind: "field", name: "systemMonitoring", static: false, private: false, access: { has: function (obj) { return "systemMonitoring" in obj; }, get: function (obj) { return obj.systemMonitoring; }, set: function (obj, value) { obj.systemMonitoring = value; } }, metadata: _metadata }, _systemMonitoring_initializers, _systemMonitoring_extraInitializers);
        __esDecorate(null, null, _protectionStatus_decorators, { kind: "field", name: "protectionStatus", static: false, private: false, access: { has: function (obj) { return "protectionStatus" in obj; }, get: function (obj) { return obj.protectionStatus; }, set: function (obj, value) { obj.protectionStatus = value; } }, metadata: _metadata }, _protectionStatus_initializers, _protectionStatus_extraInitializers);
        __esDecorate(null, null, _assignmentState_decorators, { kind: "field", name: "assignmentState", static: false, private: false, access: { has: function (obj) { return "assignmentState" in obj; }, get: function (obj) { return obj.assignmentState; }, set: function (obj, value) { obj.assignmentState = value; } }, metadata: _metadata }, _assignmentState_initializers, _assignmentState_extraInitializers);
        __esDecorate(null, null, _isPaid_decorators, { kind: "field", name: "isPaid", static: false, private: false, access: { has: function (obj) { return "isPaid" in obj; }, get: function (obj) { return obj.isPaid; }, set: function (obj, value) { obj.isPaid = value; } }, metadata: _metadata }, _isPaid_initializers, _isPaid_extraInitializers);
        __esDecorate(null, null, _assignmentReason_decorators, { kind: "field", name: "assignmentReason", static: false, private: false, access: { has: function (obj) { return "assignmentReason" in obj; }, get: function (obj) { return obj.assignmentReason; }, set: function (obj, value) { obj.assignmentReason = value; } }, metadata: _metadata }, _assignmentReason_initializers, _assignmentReason_extraInitializers);
        __esDecorate(null, null, _reassignmentCount_decorators, { kind: "field", name: "reassignmentCount", static: false, private: false, access: { has: function (obj) { return "reassignmentCount" in obj; }, get: function (obj) { return obj.reassignmentCount; }, set: function (obj, value) { obj.reassignmentCount = value; } }, metadata: _metadata }, _reassignmentCount_initializers, _reassignmentCount_extraInitializers);
        __esDecorate(null, null, _assignmentTimestamp_decorators, { kind: "field", name: "assignmentTimestamp", static: false, private: false, access: { has: function (obj) { return "assignmentTimestamp" in obj; }, get: function (obj) { return obj.assignmentTimestamp; }, set: function (obj, value) { obj.assignmentTimestamp = value; } }, metadata: _metadata }, _assignmentTimestamp_initializers, _assignmentTimestamp_extraInitializers);
        __esDecorate(null, null, _notificationSent_decorators, { kind: "field", name: "notificationSent", static: false, private: false, access: { has: function (obj) { return "notificationSent" in obj; }, get: function (obj) { return obj.notificationSent; }, set: function (obj, value) { obj.notificationSent = value; } }, metadata: _metadata }, _notificationSent_initializers, _notificationSent_extraInitializers);
        __esDecorate(null, null, _guestFcmToken_decorators, { kind: "field", name: "guestFcmToken", static: false, private: false, access: { has: function (obj) { return "guestFcmToken" in obj; }, get: function (obj) { return obj.guestFcmToken; }, set: function (obj, value) { obj.guestFcmToken = value; } }, metadata: _metadata }, _guestFcmToken_initializers, _guestFcmToken_extraInitializers);
        __esDecorate(null, null, _assignmentMetadata_decorators, { kind: "field", name: "assignmentMetadata", static: false, private: false, access: { has: function (obj) { return "assignmentMetadata" in obj; }, get: function (obj) { return obj.assignmentMetadata; }, set: function (obj, value) { obj.assignmentMetadata = value; } }, metadata: _metadata }, _assignmentMetadata_initializers, _assignmentMetadata_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _serviceRequest_decorators, { kind: "field", name: "serviceRequest", static: false, private: false, access: { has: function (obj) { return "serviceRequest" in obj; }, get: function (obj) { return obj.serviceRequest; }, set: function (obj, value) { obj.serviceRequest = value; } }, metadata: _metadata }, _serviceRequest_initializers, _serviceRequest_extraInitializers);
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: function (obj) { return "subscriptionId" in obj; }, get: function (obj) { return obj.subscriptionId; }, set: function (obj, value) { obj.subscriptionId = value; } }, metadata: _metadata }, _subscriptionId_initializers, _subscriptionId_extraInitializers);
        __esDecorate(null, null, _subscription_decorators, { kind: "field", name: "subscription", static: false, private: false, access: { has: function (obj) { return "subscription" in obj; }, get: function (obj) { return obj.subscription; }, set: function (obj, value) { obj.subscription = value; } }, metadata: _metadata }, _subscription_initializers, _subscription_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: function (obj) { return "version" in obj; }, get: function (obj) { return obj.version; }, set: function (obj, value) { obj.version = value; } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
        __esDecorate(null, null, _otp_decorators, { kind: "field", name: "otp", static: false, private: false, access: { has: function (obj) { return "otp" in obj; }, get: function (obj) { return obj.otp; }, set: function (obj, value) { obj.otp = value; } }, metadata: _metadata }, _otp_initializers, _otp_extraInitializers);
        __esDecorate(null, null, _isOtpVerified_decorators, { kind: "field", name: "isOtpVerified", static: false, private: false, access: { has: function (obj) { return "isOtpVerified" in obj; }, get: function (obj) { return obj.isOtpVerified; }, set: function (obj, value) { obj.isOtpVerified = value; } }, metadata: _metadata }, _isOtpVerified_initializers, _isOtpVerified_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Booking = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Booking = _classThis;
}();
exports.Booking = Booking;
