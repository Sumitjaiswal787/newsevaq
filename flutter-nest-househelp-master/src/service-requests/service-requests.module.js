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
exports.ServiceRequestsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var bull_1 = require("@nestjs/bull");
var service_request_entity_1 = require("./entities/service-request.entity");
var service_requests_controller_1 = require("./service-requests.controller");
var service_requests_service_1 = require("./service-requests.service");
var assignment_worker_1 = require("./assignment.worker");
var assignment_processor_1 = require("./assignment.processor");
var worker_entity_1 = require("../workers/entities/worker.entity");
var service_entity_1 = require("../services/entities/service.entity");
var user_entity_1 = require("../users/entities/user.entity");
var subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var service_request_cleanup_scheduler_1 = require("./service-request-cleanup.scheduler");
var slots_module_1 = require("../slots/slots.module");
var service_profiles_module_1 = require("../service-profiles/service-profiles.module");
var notifications_module_1 = require("../notifications/notifications.module");
var ServiceRequestsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([service_request_entity_1.ServiceRequest, worker_entity_1.Worker, service_entity_1.Service, user_entity_1.User, subscription_entity_1.Subscription, booking_entity_1.Booking]),
                bull_1.BullModule.registerQueue({
                    name: 'assignment',
                }),
                slots_module_1.SlotsModule,
                service_profiles_module_1.ServiceProfilesModule,
                notifications_module_1.NotificationsModule,
            ],
            controllers: [service_requests_controller_1.ServiceRequestsController],
            providers: [service_requests_service_1.ServiceRequestsService, assignment_worker_1.AssignmentWorker, assignment_processor_1.AssignmentProcessor, service_request_cleanup_scheduler_1.ServiceRequestCleanupScheduler],
            exports: [service_requests_service_1.ServiceRequestsService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServiceRequestsModule = _classThis = /** @class */ (function () {
        function ServiceRequestsModule_1() {
        }
        return ServiceRequestsModule_1;
    }());
    __setFunctionName(_classThis, "ServiceRequestsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceRequestsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceRequestsModule = _classThis;
}();
exports.ServiceRequestsModule = ServiceRequestsModule;
