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
exports.SystemConfigController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var SystemConfigController = function () {
    var _classDecorators = [(0, common_1.Controller)('admin/config'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getNotificationTemplates_decorators;
    var _updateNotificationTemplate_decorators;
    var _getBusinessHours_decorators;
    var _updateBusinessHours_decorators;
    var _getServiceAreas_decorators;
    var _createServiceArea_decorators;
    var _updateServiceArea_decorators;
    var _deleteServiceArea_decorators;
    var _getPricingRules_decorators;
    var _createPricingRule_decorators;
    var _updatePricingRule_decorators;
    var _deletePricingRule_decorators;
    var SystemConfigController = _classThis = /** @class */ (function () {
        function SystemConfigController_1(configService) {
            this.configService = (__runInitializers(this, _instanceExtraInitializers), configService);
        }
        // Notification Templates
        SystemConfigController_1.prototype.getNotificationTemplates = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.getNotificationTemplates()];
                });
            });
        };
        SystemConfigController_1.prototype.updateNotificationTemplate = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.updateNotificationTemplate(Number(id), dto)];
                });
            });
        };
        // Business Hours
        SystemConfigController_1.prototype.getBusinessHours = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.getBusinessHours()];
                });
            });
        };
        SystemConfigController_1.prototype.updateBusinessHours = function (hours) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.updateBusinessHours(hours)];
                });
            });
        };
        // Service Areas
        SystemConfigController_1.prototype.getServiceAreas = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.getServiceAreas()];
                });
            });
        };
        SystemConfigController_1.prototype.createServiceArea = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.createServiceArea(dto)];
                });
            });
        };
        SystemConfigController_1.prototype.updateServiceArea = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.updateServiceArea(id, dto)];
                });
            });
        };
        SystemConfigController_1.prototype.deleteServiceArea = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.deleteServiceArea(id)];
                });
            });
        };
        // Pricing Rules
        SystemConfigController_1.prototype.getPricingRules = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.getPricingRules()];
                });
            });
        };
        SystemConfigController_1.prototype.createPricingRule = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.createPricingRule(dto)];
                });
            });
        };
        SystemConfigController_1.prototype.updatePricingRule = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.updatePricingRule(Number(id), dto)];
                });
            });
        };
        SystemConfigController_1.prototype.deletePricingRule = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.configService.deletePricingRule(Number(id))];
                });
            });
        };
        return SystemConfigController_1;
    }());
    __setFunctionName(_classThis, "SystemConfigController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getNotificationTemplates_decorators = [(0, common_1.Get)('notification-templates')];
        _updateNotificationTemplate_decorators = [(0, common_1.Patch)('notification-templates/:id')];
        _getBusinessHours_decorators = [(0, common_1.Get)('business-hours')];
        _updateBusinessHours_decorators = [(0, common_1.Patch)('business-hours')];
        _getServiceAreas_decorators = [(0, common_1.Get)('service-areas')];
        _createServiceArea_decorators = [(0, common_1.Post)('service-areas')];
        _updateServiceArea_decorators = [(0, common_1.Patch)('service-areas/:id')];
        _deleteServiceArea_decorators = [(0, common_1.Delete)('service-areas/:id')];
        _getPricingRules_decorators = [(0, common_1.Get)('pricing-rules')];
        _createPricingRule_decorators = [(0, common_1.Post)('pricing-rules')];
        _updatePricingRule_decorators = [(0, common_1.Patch)('pricing-rules/:id')];
        _deletePricingRule_decorators = [(0, common_1.Delete)('pricing-rules/:id')];
        __esDecorate(_classThis, null, _getNotificationTemplates_decorators, { kind: "method", name: "getNotificationTemplates", static: false, private: false, access: { has: function (obj) { return "getNotificationTemplates" in obj; }, get: function (obj) { return obj.getNotificationTemplates; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateNotificationTemplate_decorators, { kind: "method", name: "updateNotificationTemplate", static: false, private: false, access: { has: function (obj) { return "updateNotificationTemplate" in obj; }, get: function (obj) { return obj.updateNotificationTemplate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBusinessHours_decorators, { kind: "method", name: "getBusinessHours", static: false, private: false, access: { has: function (obj) { return "getBusinessHours" in obj; }, get: function (obj) { return obj.getBusinessHours; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateBusinessHours_decorators, { kind: "method", name: "updateBusinessHours", static: false, private: false, access: { has: function (obj) { return "updateBusinessHours" in obj; }, get: function (obj) { return obj.updateBusinessHours; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getServiceAreas_decorators, { kind: "method", name: "getServiceAreas", static: false, private: false, access: { has: function (obj) { return "getServiceAreas" in obj; }, get: function (obj) { return obj.getServiceAreas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createServiceArea_decorators, { kind: "method", name: "createServiceArea", static: false, private: false, access: { has: function (obj) { return "createServiceArea" in obj; }, get: function (obj) { return obj.createServiceArea; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateServiceArea_decorators, { kind: "method", name: "updateServiceArea", static: false, private: false, access: { has: function (obj) { return "updateServiceArea" in obj; }, get: function (obj) { return obj.updateServiceArea; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteServiceArea_decorators, { kind: "method", name: "deleteServiceArea", static: false, private: false, access: { has: function (obj) { return "deleteServiceArea" in obj; }, get: function (obj) { return obj.deleteServiceArea; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPricingRules_decorators, { kind: "method", name: "getPricingRules", static: false, private: false, access: { has: function (obj) { return "getPricingRules" in obj; }, get: function (obj) { return obj.getPricingRules; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPricingRule_decorators, { kind: "method", name: "createPricingRule", static: false, private: false, access: { has: function (obj) { return "createPricingRule" in obj; }, get: function (obj) { return obj.createPricingRule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePricingRule_decorators, { kind: "method", name: "updatePricingRule", static: false, private: false, access: { has: function (obj) { return "updatePricingRule" in obj; }, get: function (obj) { return obj.updatePricingRule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletePricingRule_decorators, { kind: "method", name: "deletePricingRule", static: false, private: false, access: { has: function (obj) { return "deletePricingRule" in obj; }, get: function (obj) { return obj.deletePricingRule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SystemConfigController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SystemConfigController = _classThis;
}();
exports.SystemConfigController = SystemConfigController;
