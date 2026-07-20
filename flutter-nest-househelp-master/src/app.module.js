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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var throttler_1 = require("@nestjs/throttler");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_module_1 = require("./users/users.module");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var auth_module_1 = require("./auth/auth.module");
var services_module_1 = require("./services/services.module");
var workers_module_1 = require("./workers/workers.module");
var slots_module_1 = require("./slots/slots.module");
var bookings_module_1 = require("./bookings/bookings.module");
var payments_module_1 = require("./payments/payments.module");
var reviews_module_1 = require("./reviews/reviews.module");
var locations_module_1 = require("./locations/locations.module");
var service_requests_module_1 = require("./service-requests/service-requests.module");
var system_status_module_1 = require("./system-status/system-status.module");
var home_module_1 = require("./home/home.module");
var health_module_1 = require("./health/health.module");
var notifications_module_1 = require("./notifications/notifications.module");
var nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
var service_profiles_module_1 = require("./service-profiles/service-profiles.module");
var admin_module_1 = require("./admin/admin.module");
var subscriptions_module_1 = require("./subscriptions/subscriptions.module");
var addresses_module_1 = require("./addresses/addresses.module");
var user_entity_1 = require("./users/entities/user.entity");
var fcm_guest_token_entity_1 = require("./users/entities/fcm-guest-token.entity");
var service_entity_1 = require("./services/entities/service.entity");
var worker_entity_1 = require("./workers/entities/worker.entity");
var slot_entity_1 = require("./slots/entities/slot.entity");
var booking_entity_1 = require("./bookings/entities/booking.entity");
var payment_entity_1 = require("./payments/entities/payment.entity");
var review_entity_1 = require("./reviews/entities/review.entity");
var micro_zone_entity_1 = require("./locations/entities/micro_zone.entity");
var service_area_entity_1 = require("./locations/entities/service_area.entity");
var waitlist_entity_1 = require("./locations/entities/waitlist.entity");
var service_request_entity_1 = require("./service-requests/entities/service-request.entity");
var service_profile_entity_1 = require("./service-profiles/entities/service-profile.entity");
var subscription_entity_1 = require("./subscriptions/entities/subscription.entity");
var audit_module_1 = require("./audit/audit.module");
var admin_user_entity_1 = require("./admin/entities/admin-user.entity");
var audit_log_entity_1 = require("./audit/entities/audit-log.entity");
var finance_module_1 = require("./finance/finance.module");
var support_module_1 = require("./support/support.module");
var config_module_1 = require("./config/config.module");
var advertisements_module_1 = require("./advertisements/advertisements.module");
var advertisement_entity_1 = require("./advertisements/entities/advertisement.entity");
var validation_exception_filter_1 = require("./common/filters/validation-exception.filter");
var response_time_interceptor_1 = require("./common/interceptors/response-time.interceptor");
var support_ticket_entity_1 = require("./support/entities/support-ticket.entity");
var communication_log_entity_1 = require("./support/entities/communication-log.entity");
var notification_template_entity_1 = require("./config/entities/notification-template.entity");
var business_hours_entity_1 = require("./config/entities/business-hours.entity");
var pricing_rule_entity_1 = require("./config/entities/pricing-rule.entity");
var payout_entity_1 = require("./finance/entities/payout.entity");
var refund_entity_1 = require("./finance/entities/refund.entity");
var address_entity_1 = require("./addresses/entities/address.entity");
var refresh_token_entity_1 = require("./auth/entities/refresh-token.entity");
var circuit_breaker_service_1 = require("./common/services/circuit-breaker.service");
var cache_service_1 = require("./common/services/cache.service");
var distributed_lock_service_1 = require("./common/services/distributed-lock.service");
var async_worker_pool_service_1 = require("./common/services/async-worker-pool.service");
var observability_service_1 = require("./common/services/observability.service");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                throttler_1.ThrottlerModule.forRoot({
                    throttlers: [
                        {
                            ttl: 60000, // 1 minute
                            limit: 100, // 100 requests per minute
                        },
                    ],
                }),
                nestjs_prometheus_1.PrometheusModule.register(),
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        var databaseUrl, host, port, username, password, database, url, dbPath, entities;
                        return __generator(this, function (_a) {
                            databaseUrl = configService.get('DATABASE_URL');
                            host = '';
                            port = 5432;
                            username = '';
                            password = '';
                            database = '';
                            // Always try to parse valid DATABASE_URL first when provided
                            // Fallback to individual DB_* variables only if parsing fails
                            if (databaseUrl) {
                                // Parse DATABASE_URL (format: postgres://user:pass@host:port/database)
                                console.log('🔍 Railway DATABASE_URL detected, parsing...');
                                try {
                                    url = new URL(databaseUrl);
                                    host = url.hostname;
                                    port = parseInt(url.port) || 5432;
                                    username = decodeURIComponent(url.username);
                                    password = decodeURIComponent(url.password);
                                    dbPath = url.pathname.replace('/', '');
                                    if (dbPath && !dbPath.includes('.')) {
                                        database = dbPath;
                                    }
                                    else {
                                        // Fall back to DB_NAME env or default
                                        database = configService.get('DB_NAME', 'railway');
                                    }
                                    console.log('📊 Parsed Railway DB config:', { host: host, port: port, username: username, database: '***', hasPassword: !!password });
                                }
                                catch (e) {
                                    console.error('❌ Failed to parse DATABASE_URL:', e.message);
                                    // If URL parsing fails, use fallback
                                    database = configService.get('DB_NAME', 'railway');
                                    host = configService.get('DB_HOST', 'localhost');
                                }
                            }
                            // Fallback to individual DB_* variables only if no DATABASE_URL was provided or parsing failed
                            if (!host || !database) {
                                host = configService.get('DB_HOST', 'localhost');
                                port = configService.get('DB_PORT', 5432);
                                username = configService.get('DB_USERNAME', 'sevaq_user');
                                password = configService.get('DB_PASSWORD', 'sevaq_password');
                                database = configService.get('DB_NAME', 'sevaq_db');
                            }
                            // Trim any trailing carriage returns or whitespaces from parsed variables
                            if (host)
                                host = host.trim();
                            if (username)
                                username = username.trim();
                            if (password)
                                password = password.trim();
                            if (database)
                                database = database.trim();
                            console.log('🔧 Final DB config:', { host: host, port: port, username: username, database: '***', hasPassword: !!password });
                            entities = [
                                user_entity_1.User,
                                fcm_guest_token_entity_1.FcmGuestToken,
                                service_entity_1.Service,
                                worker_entity_1.Worker,
                                slot_entity_1.Slot,
                                booking_entity_1.Booking,
                                payment_entity_1.Payment,
                                review_entity_1.Review,
                                micro_zone_entity_1.MicroZone,
                                service_area_entity_1.ServiceArea,
                                waitlist_entity_1.Waitlist,
                                service_request_entity_1.ServiceRequest,
                                service_profile_entity_1.ServiceProfile,
                                subscription_entity_1.Subscription,
                                admin_user_entity_1.AdminUser,
                                audit_log_entity_1.AuditLog,
                                support_ticket_entity_1.SupportTicket,
                                communication_log_entity_1.CommunicationLog,
                                notification_template_entity_1.NotificationTemplate,
                                business_hours_entity_1.BusinessHours,
                                pricing_rule_entity_1.PricingRule,
                                payout_entity_1.Payout,
                                refund_entity_1.Refund,
                                address_entity_1.Address,
                                refresh_token_entity_1.RefreshToken,
                                advertisement_entity_1.Advertisement,
                            ];
                            return [2 /*return*/, {
                                    type: 'postgres',
                                    host: host,
                                    port: port,
                                    username: username,
                                    password: password,
                                    database: database,
                                    entities: entities,
                                    // ❗ PRODUCTION SAFETY: NEVER enable synchronize in production
                                    // This will DESTROY all production data if enabled
                                    // Only enable this locally for development, never on Railway
                                    // ✅ HARD LOCK: NO ENVIRONMENT VARIABLE CAN OVERRIDE THIS
                                    synchronize: host === '127.0.0.1' || host === 'localhost' || (process.env.NODE_ENV === 'development' && process.env.SYNCHRONIZE === 'true'),
                                    logging: ['error', 'warn'], // Reduce logging to only errors and warnings
                                    logger: 'advanced-console', // Use advanced console logger
                                    // Railway Postgres SSL configuration - required for external connections
                                    ssl: process.env.DB_SSL_REQUIRE === 'true' ? {
                                        rejectUnauthorized: false
                                    } : false,
                                    // Connection pool configuration for Railway
                                    extra: {
                                        max: process.env.NODE_ENV === 'production' ? 15 : 10,
                                        idleTimeoutMillis: 30000, // 30 seconds - give more time before closing idle connections
                                        connectionTimeoutMillis: 8000,
                                        keepAlive: true,
                                        keepAliveInitialDelayMillis: 5000,
                                        statement_timeout: 15000,
                                        query_timeout: 15000,
                                    },
                                }];
                        });
                    }); },
                    inject: [config_1.ConfigService],
                }),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                services_module_1.ServicesModule,
                workers_module_1.WorkersModule,
                slots_module_1.SlotsModule,
                bookings_module_1.BookingsModule,
                payments_module_1.PaymentsModule,
                reviews_module_1.ReviewsModule,
                locations_module_1.LocationsModule,
                service_requests_module_1.ServiceRequestsModule,
                system_status_module_1.SystemStatusModule,
                health_module_1.HealthModule,
                notifications_module_1.NotificationsModule,
                home_module_1.HomeModule,
                service_profiles_module_1.ServiceProfilesModule,
                subscriptions_module_1.SubscriptionsModule,
                admin_module_1.AdminModule,
                advertisements_module_1.AdvertisementsModule,
                // MetricsModule - DISABLED: Broken driver connection causing constant warning logs
                audit_module_1.AuditModule,
                // AnalyticsModule - DISABLED: Empty unused module
                // MonitoringModule - DISABLED: Duplicate monitoring
                finance_module_1.FinanceModule,
                support_module_1.SupportModule,
                config_module_1.SystemConfigModule,
                addresses_module_1.AddressesModule,
                // DatabaseModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                circuit_breaker_service_1.CircuitBreakerService,
                cache_service_1.CacheService,
                distributed_lock_service_1.DistributedLockService,
                async_worker_pool_service_1.AsyncWorkerPoolService,
                observability_service_1.ObservabilityService,
                {
                    provide: 'APP_FILTER',
                    useClass: validation_exception_filter_1.ValidationExceptionFilter,
                },
                (0, nestjs_prometheus_1.makeHistogramProvider)({
                    name: 'http_request_duration_seconds',
                    help: 'Duration of HTTP requests in seconds',
                    labelNames: ['method', 'endpoint', 'status_code'],
                    buckets: [0.1, 0.5, 1, 2, 5, 10],
                }),
                (0, nestjs_prometheus_1.makeCounterProvider)({
                    name: 'http_requests_total',
                    help: 'Total number of HTTP requests',
                    labelNames: ['method', 'endpoint'],
                }),
                (0, nestjs_prometheus_1.makeCounterProvider)({
                    name: 'http_requests_errors_total',
                    help: 'Total number of HTTP request errors',
                    labelNames: ['method', 'endpoint', 'status_code'],
                }),
                {
                    provide: 'APP_GUARD',
                    useClass: throttler_1.ThrottlerGuard,
                },
                {
                    provide: 'APP_INTERCEPTOR',
                    useClass: response_time_interceptor_1.ResponseTimeInterceptor,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
