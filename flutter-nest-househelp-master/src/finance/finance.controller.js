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
exports.FinanceController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var FinanceController = function () {
    var _classDecorators = [(0, common_1.Controller)('admin/finance'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getPayouts_decorators;
    var _getPendingPayouts_decorators;
    var _getPayoutSummary_decorators;
    var _getPayoutById_decorators;
    var _createPayout_decorators;
    var _processPayout_decorators;
    var _getRefunds_decorators;
    var _getRefundById_decorators;
    var _createRefund_decorators;
    var _processRefund_decorators;
    var _getRevenueReport_decorators;
    var _getPayoutReport_decorators;
    var FinanceController = _classThis = /** @class */ (function () {
        function FinanceController_1(financeService) {
            this.financeService = (__runInitializers(this, _instanceExtraInitializers), financeService);
        }
        // Payout endpoints
        FinanceController_1.prototype.getPayouts = function (status, workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var filters;
                return __generator(this, function (_a) {
                    filters = {};
                    if (status)
                        filters.status = status;
                    if (workerId)
                        filters.workerId = workerId;
                    return [2 /*return*/, this.financeService.getPayouts(filters)];
                });
            });
        };
        FinanceController_1.prototype.getPendingPayouts = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.getPendingPayouts()];
                });
            });
        };
        FinanceController_1.prototype.getPayoutSummary = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.getPayoutSummary()];
                });
            });
        };
        FinanceController_1.prototype.getPayoutById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.getPayoutById(Number(id))];
                });
            });
        };
        FinanceController_1.prototype.createPayout = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.createPayout(dto)];
                });
            });
        };
        FinanceController_1.prototype.processPayout = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.processPayout(Number(id), dto)];
                });
            });
        };
        // Refund endpoints
        FinanceController_1.prototype.getRefunds = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var filters;
                return __generator(this, function (_a) {
                    filters = {};
                    if (status)
                        filters.status = status;
                    return [2 /*return*/, this.financeService.getRefunds(filters)];
                });
            });
        };
        FinanceController_1.prototype.getRefundById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.getRefundById(Number(id))];
                });
            });
        };
        FinanceController_1.prototype.createRefund = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.createRefund(dto)];
                });
            });
        };
        FinanceController_1.prototype.processRefund = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeService.processRefund(Number(id), dto)];
                });
            });
        };
        // Revenue report endpoints
        FinanceController_1.prototype.getRevenueReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var start, end;
                return __generator(this, function (_a) {
                    start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    end = endDate || new Date().toISOString().split('T')[0];
                    return [2 /*return*/, this.financeService.generateRevenueReport(start, end)];
                });
            });
        };
        FinanceController_1.prototype.getPayoutReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var start, end;
                return __generator(this, function (_a) {
                    start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    end = endDate || new Date().toISOString().split('T')[0];
                    return [2 /*return*/, this.financeService.generatePayoutReport(start, end)];
                });
            });
        };
        return FinanceController_1;
    }());
    __setFunctionName(_classThis, "FinanceController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getPayouts_decorators = [(0, common_1.Get)('payouts')];
        _getPendingPayouts_decorators = [(0, common_1.Get)('payouts/pending')];
        _getPayoutSummary_decorators = [(0, common_1.Get)('payouts/summary')];
        _getPayoutById_decorators = [(0, common_1.Get)('payouts/:id')];
        _createPayout_decorators = [(0, common_1.Post)('payouts')];
        _processPayout_decorators = [(0, common_1.Patch)('payouts/:id')];
        _getRefunds_decorators = [(0, common_1.Get)('refunds')];
        _getRefundById_decorators = [(0, common_1.Get)('refunds/:id')];
        _createRefund_decorators = [(0, common_1.Post)('refunds')];
        _processRefund_decorators = [(0, common_1.Patch)('refunds/:id')];
        _getRevenueReport_decorators = [(0, common_1.Get)('reports/revenue')];
        _getPayoutReport_decorators = [(0, common_1.Get)('reports/payouts')];
        __esDecorate(_classThis, null, _getPayouts_decorators, { kind: "method", name: "getPayouts", static: false, private: false, access: { has: function (obj) { return "getPayouts" in obj; }, get: function (obj) { return obj.getPayouts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPendingPayouts_decorators, { kind: "method", name: "getPendingPayouts", static: false, private: false, access: { has: function (obj) { return "getPendingPayouts" in obj; }, get: function (obj) { return obj.getPendingPayouts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPayoutSummary_decorators, { kind: "method", name: "getPayoutSummary", static: false, private: false, access: { has: function (obj) { return "getPayoutSummary" in obj; }, get: function (obj) { return obj.getPayoutSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPayoutById_decorators, { kind: "method", name: "getPayoutById", static: false, private: false, access: { has: function (obj) { return "getPayoutById" in obj; }, get: function (obj) { return obj.getPayoutById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPayout_decorators, { kind: "method", name: "createPayout", static: false, private: false, access: { has: function (obj) { return "createPayout" in obj; }, get: function (obj) { return obj.createPayout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _processPayout_decorators, { kind: "method", name: "processPayout", static: false, private: false, access: { has: function (obj) { return "processPayout" in obj; }, get: function (obj) { return obj.processPayout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRefunds_decorators, { kind: "method", name: "getRefunds", static: false, private: false, access: { has: function (obj) { return "getRefunds" in obj; }, get: function (obj) { return obj.getRefunds; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRefundById_decorators, { kind: "method", name: "getRefundById", static: false, private: false, access: { has: function (obj) { return "getRefundById" in obj; }, get: function (obj) { return obj.getRefundById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createRefund_decorators, { kind: "method", name: "createRefund", static: false, private: false, access: { has: function (obj) { return "createRefund" in obj; }, get: function (obj) { return obj.createRefund; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _processRefund_decorators, { kind: "method", name: "processRefund", static: false, private: false, access: { has: function (obj) { return "processRefund" in obj; }, get: function (obj) { return obj.processRefund; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRevenueReport_decorators, { kind: "method", name: "getRevenueReport", static: false, private: false, access: { has: function (obj) { return "getRevenueReport" in obj; }, get: function (obj) { return obj.getRevenueReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPayoutReport_decorators, { kind: "method", name: "getPayoutReport", static: false, private: false, access: { has: function (obj) { return "getPayoutReport" in obj; }, get: function (obj) { return obj.getPayoutReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceController = _classThis;
}();
exports.FinanceController = FinanceController;
