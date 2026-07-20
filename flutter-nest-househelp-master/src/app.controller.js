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
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var seed_service_areas_1 = require("./database/seeds/seed-service-areas");
var seed_greater_noida_1 = require("./database/seeds/seed-greater-noida");
var enhanced_worker_seeding_1 = require("./database/seeds/enhanced-worker-seeding");
var seed_customers_1 = require("./database/seeds/seed-customers");
var seed_service_profiles_1 = require("./database/seeds/seed-service-profiles");
var seed_services_1 = require("./database/seeds/seed-services");
var admin_guard_1 = require("./auth/admin.guard");
var AppController = function () {
    var _classDecorators = [(0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getRoot_decorators;
    var _getHealth_decorators;
    var _runSeed_decorators;
    var _resetProductionDatabase_decorators;
    var _updateWorkerLocations_decorators;
    var AppController = _classThis = /** @class */ (function () {
        function AppController_1(appService, healthService, dataSource) {
            this.appService = (__runInitializers(this, _instanceExtraInitializers), appService);
            this.healthService = healthService;
            this.dataSource = dataSource;
        }
        AppController_1.prototype.getRoot = function () {
            return {
                status: 'ok',
                message: 'Househelp API Server is running',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development'
            };
        };
        AppController_1.prototype.getHealth = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.healthService.check()];
                });
            });
        };
        AppController_1.prototype.runSeed = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ds, results, seedServiceAreas, e_1, seedGreaterNoida, e_2, seedCustomers, e_3, seedServiceProfiles, e_4, seedServices, e_5, enhancedWorker, e_6, updateResult, e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ds = this.dataSource;
                            console.log('🌱 Starting database seeding...');
                            results = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            seedServiceAreas = new seed_service_areas_1.SeedServiceAreas();
                            return [4 /*yield*/, seedServiceAreas.run(ds)];
                        case 2:
                            _a.sent();
                            results.push('✅ Service areas seeded');
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            results.push("\u274C Service areas: ".concat(e_1.message));
                            return [3 /*break*/, 4];
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            seedGreaterNoida = new seed_greater_noida_1.SeedGreaterNoidaAreas();
                            return [4 /*yield*/, seedGreaterNoida.run(ds)];
                        case 5:
                            _a.sent();
                            results.push('✅ Greater Noida areas seeded');
                            return [3 /*break*/, 7];
                        case 6:
                            e_2 = _a.sent();
                            results.push("\u274C Greater Noida: ".concat(e_2.message));
                            return [3 /*break*/, 7];
                        case 7:
                            _a.trys.push([7, 9, , 10]);
                            seedCustomers = new seed_customers_1.SeedCustomers();
                            return [4 /*yield*/, seedCustomers.run(ds)];
                        case 8:
                            _a.sent();
                            results.push('✅ Customers seeded');
                            return [3 /*break*/, 10];
                        case 9:
                            e_3 = _a.sent();
                            results.push("\u274C Customers: ".concat(e_3.message));
                            return [3 /*break*/, 10];
                        case 10:
                            _a.trys.push([10, 12, , 13]);
                            seedServiceProfiles = new seed_service_profiles_1.SeedServiceProfiles();
                            return [4 /*yield*/, seedServiceProfiles.run(ds)];
                        case 11:
                            _a.sent();
                            results.push('✅ Service profiles seeded');
                            return [3 /*break*/, 13];
                        case 12:
                            e_4 = _a.sent();
                            results.push("\u274C Service profiles: ".concat(e_4.message));
                            return [3 /*break*/, 13];
                        case 13:
                            _a.trys.push([13, 15, , 16]);
                            seedServices = new seed_services_1.SeedServices();
                            return [4 /*yield*/, seedServices.run(ds)];
                        case 14:
                            _a.sent();
                            results.push('✅ Services seeded');
                            return [3 /*break*/, 16];
                        case 15:
                            e_5 = _a.sent();
                            results.push("\u274C Services: ".concat(e_5.message));
                            return [3 /*break*/, 16];
                        case 16:
                            _a.trys.push([16, 18, , 19]);
                            enhancedWorker = new enhanced_worker_seeding_1.EnhancedWorkerSeeding();
                            return [4 /*yield*/, enhancedWorker.run(ds)];
                        case 17:
                            _a.sent();
                            results.push('✅ Workers seeded');
                            return [3 /*break*/, 19];
                        case 18:
                            e_6 = _a.sent();
                            results.push("\u274C Workers: ".concat(e_6.message));
                            return [3 /*break*/, 19];
                        case 19:
                            _a.trys.push([19, 21, , 22]);
                            return [4 /*yield*/, ds.query("\n        UPDATE workers \n        SET \"serviceAreaId\" = '67856b26-d323-4ead-95f2-1be8fa361704',\n            \"serviceRadiusKm\" = 25,\n            latitude = 28.58,\n            longitude = 77.43,\n            \"currentLat\" = 28.58,\n            \"currentLng\" = 77.43\n        WHERE id IN (17, 21)\n      ")];
                        case 20:
                            updateResult = _a.sent();
                            results.push('✅ Worker locations updated');
                            return [3 /*break*/, 22];
                        case 21:
                            e_7 = _a.sent();
                            console.error('Worker location update error:', e_7.message);
                            results.push("\u274C Worker locations: ".concat(e_7.message));
                            return [3 /*break*/, 22];
                        case 22:
                            console.log('🌱 Seeding complete:', results);
                            return [2 /*return*/, { message: 'Seeding complete', results: results }];
                    }
                });
            });
        };
        AppController_1.prototype.resetProductionDatabase = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (process.env.NODE_ENV === 'production') {
                                return [2 /*return*/, {
                                        success: false,
                                        message: '❌ This endpoint is disabled in production environment'
                                    }];
                            }
                            ds = this.dataSource;
                            console.log('⚠️  FULL PRODUCTION DATABASE RESET STARTED');
                            return [4 /*yield*/, ds.query("SET session_replication_role = replica;")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE bookings CASCADE;")];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE subscriptions CASCADE;")];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE workers CASCADE;")];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE users CASCADE;")];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE addresses CASCADE;")];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE service_areas CASCADE;")];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE audit_logs CASCADE;")];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, ds.query("TRUNCATE TABLE notifications CASCADE;")];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, ds.query("SET session_replication_role = DEFAULT;")];
                        case 10:
                            _a.sent();
                            // Recreate service areas table
                            return [4 /*yield*/, ds.query("\n      CREATE TABLE IF NOT EXISTS service_areas (\n          id SERIAL PRIMARY KEY,\n          name VARCHAR(255) NOT NULL,\n          city VARCHAR(255),\n          state VARCHAR(255),\n          latitude DOUBLE PRECISION NOT NULL,\n          longitude DOUBLE PRECISION NOT NULL,\n          radiusKm DOUBLE PRECISION DEFAULT 25,\n          isActive BOOLEAN DEFAULT true,\n          createdAt TIMESTAMP DEFAULT NOW(),\n          updatedAt TIMESTAMP DEFAULT NOW()\n      );\n    ")];
                        case 11:
                            // Recreate service areas table
                            _a.sent();
                            // Insert default service area
                            return [4 /*yield*/, ds.query("\n      INSERT INTO service_areas (name, city, state, latitude, longitude)\n      VALUES ('Greater Noida', 'Bisrakh Jalapur', 'Uttar Pradesh', 28.578109, 77.439027);\n    ")];
                        case 12:
                            // Insert default service area
                            _a.sent();
                            console.log('✅ PRODUCTION DATABASE RESET COMPLETE');
                            return [2 /*return*/, {
                                    success: true,
                                    message: '✅ All customers, workers, bookings completely deleted. Database is clean. Service area created successfully.',
                                    timestamp: new Date().toISOString()
                                }];
                    }
                });
            });
        };
        // Quick endpoint to update worker 17 and 21 location to service area
        AppController_1.prototype.updateWorkerLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ds, result, e_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ds = this.dataSource;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, ds.query("\n        UPDATE workers \n        SET \"serviceAreaId\" = '67856b26-d323-4ead-95f2-1be8fa361704',\n            \"serviceRadiusKm\" = 25,\n            latitude = 28.58,\n            longitude = 77.43,\n            \"currentLat\" = 28.58,\n            \"currentLng\" = 77.43\n        WHERE id IN (17, 21)\n      ")];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, { message: 'Worker locations updated', result: result }];
                        case 3:
                            e_8 = _a.sent();
                            return [2 /*return*/, { message: 'Error updating locations', error: e_8.message }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return AppController_1;
    }());
    __setFunctionName(_classThis, "AppController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getRoot_decorators = [(0, common_1.Get)()];
        _getHealth_decorators = [(0, common_1.Get)('health')];
        _runSeed_decorators = [(0, common_1.Post)('seed'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        _resetProductionDatabase_decorators = [(0, common_1.Post)('reset-production-database'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        _updateWorkerLocations_decorators = [(0, common_1.Post)('update-worker-locations'), (0, common_1.UseGuards)(admin_guard_1.AdminGuard)];
        __esDecorate(_classThis, null, _getRoot_decorators, { kind: "method", name: "getRoot", static: false, private: false, access: { has: function (obj) { return "getRoot" in obj; }, get: function (obj) { return obj.getRoot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getHealth_decorators, { kind: "method", name: "getHealth", static: false, private: false, access: { has: function (obj) { return "getHealth" in obj; }, get: function (obj) { return obj.getHealth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _runSeed_decorators, { kind: "method", name: "runSeed", static: false, private: false, access: { has: function (obj) { return "runSeed" in obj; }, get: function (obj) { return obj.runSeed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetProductionDatabase_decorators, { kind: "method", name: "resetProductionDatabase", static: false, private: false, access: { has: function (obj) { return "resetProductionDatabase" in obj; }, get: function (obj) { return obj.resetProductionDatabase; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateWorkerLocations_decorators, { kind: "method", name: "updateWorkerLocations", static: false, private: false, access: { has: function (obj) { return "updateWorkerLocations" in obj; }, get: function (obj) { return obj.updateWorkerLocations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppController = _classThis;
}();
exports.AppController = AppController;
