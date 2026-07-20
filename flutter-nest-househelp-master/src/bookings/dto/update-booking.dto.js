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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var booking_entity_1 = require("../entities/booking.entity");
var UpdateBookingDto = function () {
    var _a;
    var _workerId_decorators;
    var _workerId_initializers = [];
    var _workerId_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _assignmentState_decorators;
    var _assignmentState_initializers = [];
    var _assignmentState_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _responsibilityTransferred_decorators;
    var _responsibilityTransferred_initializers = [];
    var _responsibilityTransferred_extraInitializers = [];
    var _systemMonitoring_decorators;
    var _systemMonitoring_initializers = [];
    var _systemMonitoring_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateBookingDto() {
                this.workerId = __runInitializers(this, _workerId_initializers, void 0);
                this.startTime = (__runInitializers(this, _workerId_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.status = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.assignmentState = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _assignmentState_initializers, void 0));
                this.notes = (__runInitializers(this, _assignmentState_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.responsibilityTransferred = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _responsibilityTransferred_initializers, void 0));
                this.systemMonitoring = (__runInitializers(this, _responsibilityTransferred_extraInitializers), __runInitializers(this, _systemMonitoring_initializers, void 0));
                __runInitializers(this, _systemMonitoring_extraInitializers);
            }
            return UpdateBookingDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _workerId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _startTime_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _endTime_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(booking_entity_1.BookingStatus)];
            _assignmentState_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(booking_entity_1.AssignmentState)];
            _notes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _responsibilityTransferred_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _systemMonitoring_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _workerId_decorators, { kind: "field", name: "workerId", static: false, private: false, access: { has: function (obj) { return "workerId" in obj; }, get: function (obj) { return obj.workerId; }, set: function (obj, value) { obj.workerId = value; } }, metadata: _metadata }, _workerId_initializers, _workerId_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _assignmentState_decorators, { kind: "field", name: "assignmentState", static: false, private: false, access: { has: function (obj) { return "assignmentState" in obj; }, get: function (obj) { return obj.assignmentState; }, set: function (obj, value) { obj.assignmentState = value; } }, metadata: _metadata }, _assignmentState_initializers, _assignmentState_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _responsibilityTransferred_decorators, { kind: "field", name: "responsibilityTransferred", static: false, private: false, access: { has: function (obj) { return "responsibilityTransferred" in obj; }, get: function (obj) { return obj.responsibilityTransferred; }, set: function (obj, value) { obj.responsibilityTransferred = value; } }, metadata: _metadata }, _responsibilityTransferred_initializers, _responsibilityTransferred_extraInitializers);
            __esDecorate(null, null, _systemMonitoring_decorators, { kind: "field", name: "systemMonitoring", static: false, private: false, access: { has: function (obj) { return "systemMonitoring" in obj; }, get: function (obj) { return obj.systemMonitoring; }, set: function (obj, value) { obj.systemMonitoring = value; } }, metadata: _metadata }, _systemMonitoring_initializers, _systemMonitoring_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateBookingDto = UpdateBookingDto;
