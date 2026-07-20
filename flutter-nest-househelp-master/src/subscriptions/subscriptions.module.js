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
exports.SubscriptionsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var schedule_1 = require("@nestjs/schedule");
var subscription_entity_1 = require("./entities/subscription.entity");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var user_entity_1 = require("../users/entities/user.entity");
var service_profile_entity_1 = require("../service-profiles/entities/service-profile.entity");
var service_entity_1 = require("../services/entities/service.entity");
var worker_entity_1 = require("../workers/entities/worker.entity");
var subscriptions_controller_1 = require("./subscriptions.controller");
var subscriptions_service_1 = require("./subscriptions.service");
var pricing_service_1 = require("./pricing.service");
var on_demand_assignment_scheduler_1 = require("./on-demand-assignment.scheduler");
var subscription_sync_module_1 = require("./subscription-sync.module");
var service_profiles_module_1 = require("../service-profiles/service-profiles.module");
var bookings_module_1 = require("../bookings/bookings.module");
var users_module_1 = require("../users/users.module");
var services_module_1 = require("../services/services.module");
var workers_module_1 = require("../workers/workers.module");
var notifications_module_1 = require("../notifications/notifications.module");
var slots_module_1 = require("../slots/slots.module");
var SubscriptionsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription, booking_entity_1.Booking, user_entity_1.User, service_profile_entity_1.ServiceProfile, service_entity_1.Service, worker_entity_1.Worker]),
                service_profiles_module_1.ServiceProfilesModule,
                services_module_1.ServicesModule,
                workers_module_1.WorkersModule,
                bookings_module_1.BookingsModule,
                users_module_1.UsersModule,
                notifications_module_1.NotificationsModule,
                slots_module_1.SlotsModule,
                schedule_1.ScheduleModule.forRoot(),
                subscription_sync_module_1.SubscriptionSyncModule,
            ],
            controllers: [subscriptions_controller_1.SubscriptionsController],
            providers: [
                subscriptions_service_1.SubscriptionsService,
                pricing_service_1.PricingService,
                on_demand_assignment_scheduler_1.OnDemandAssignmentScheduler,
            ],
            exports: [
                subscriptions_service_1.SubscriptionsService,
                pricing_service_1.PricingService,
                on_demand_assignment_scheduler_1.OnDemandAssignmentScheduler,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SubscriptionsModule = _classThis = /** @class */ (function () {
        function SubscriptionsModule_1() {
        }
        return SubscriptionsModule_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsModule = _classThis;
}();
exports.SubscriptionsModule = SubscriptionsModule;
