"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.CircuitBreakerService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Circuit Breaker Service
 *
 * Implements circuit breaker pattern to prevent cascading failures
 * when external services are unavailable.
 *
 * States:
 * - CLOSED: Normal operation, requests pass through
 * - OPEN: Failure threshold exceeded, requests blocked immediately
 * - HALF_OPEN: Recovery period, allow test requests
 */
var CircuitBreakerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CircuitBreakerService = _classThis = /** @class */ (function () {
        function CircuitBreakerService_1() {
            this.logger = new common_1.Logger(CircuitBreakerService.name);
            this.circuitStates = new Map();
            this.DEFAULT_CONFIG = {
                failureThreshold: 5,
                resetTimeout: 30000,
                halfOpenSuccessThreshold: 2,
            };
        }
        /**
         * Execute operation with circuit breaker protection
         */
        CircuitBreakerService_1.prototype.execute = function (circuitName, operation, fallback, config) {
            return __awaiter(this, void 0, void 0, function () {
                var state, effectiveConfig, timeSinceFailure, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            state = this.getCircuitState(circuitName);
                            effectiveConfig = __assign(__assign({}, this.DEFAULT_CONFIG), config);
                            if (state.state === 'OPEN') {
                                timeSinceFailure = Date.now() - state.lastFailureTime;
                                if (timeSinceFailure > effectiveConfig.resetTimeout) {
                                    this.logger.log("Circuit ".concat(circuitName, " entering HALF_OPEN state"));
                                    state.state = 'HALF_OPEN';
                                    state.successCount = 0;
                                }
                                else {
                                    this.logger.debug("Circuit ".concat(circuitName, " is OPEN, using fallback"));
                                    return [2 /*return*/, fallback()];
                                }
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, operation()];
                        case 2:
                            result = _a.sent();
                            if (state.state === 'HALF_OPEN') {
                                state.successCount++;
                                if (state.successCount >= effectiveConfig.halfOpenSuccessThreshold) {
                                    this.logger.log("Circuit ".concat(circuitName, " closing after successful recovery"));
                                    state.state = 'CLOSED';
                                    state.failureCount = 0;
                                    state.successCount = 0;
                                }
                            }
                            state.failureCount = 0;
                            return [2 /*return*/, result];
                        case 3:
                            error_1 = _a.sent();
                            state.failureCount++;
                            state.lastFailureTime = Date.now();
                            if (state.state === 'HALF_OPEN') {
                                this.logger.warn("Circuit ".concat(circuitName, " failed during recovery, reopening"));
                                state.state = 'OPEN';
                            }
                            else if (state.failureCount >= effectiveConfig.failureThreshold) {
                                this.logger.error("Circuit ".concat(circuitName, " OPEN after ").concat(state.failureCount, " consecutive failures"));
                                state.state = 'OPEN';
                            }
                            this.logger.debug("Circuit ".concat(circuitName, " failure count: ").concat(state.failureCount));
                            return [2 /*return*/, fallback()];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get or create circuit state
         */
        CircuitBreakerService_1.prototype.getCircuitState = function (name) {
            if (!this.circuitStates.has(name)) {
                this.circuitStates.set(name, {
                    state: 'CLOSED',
                    failureCount: 0,
                    lastFailureTime: 0,
                    successCount: 0,
                });
            }
            return this.circuitStates.get(name);
        };
        /**
         * Get current circuit status for monitoring
         */
        CircuitBreakerService_1.prototype.getCircuitStatus = function (circuitName) {
            return this.circuitStates.get(circuitName);
        };
        /**
         * Manually reset circuit
         */
        CircuitBreakerService_1.prototype.resetCircuit = function (circuitName) {
            this.circuitStates.delete(circuitName);
            this.logger.log("Circuit ".concat(circuitName, " manually reset"));
        };
        /**
         * Get all circuit statuses for monitoring
         */
        CircuitBreakerService_1.prototype.getAllStatuses = function () {
            var statuses = {};
            for (var _i = 0, _a = this.circuitStates.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], name_1 = _b[0], state = _b[1];
                statuses[name_1] = {
                    state: state.state,
                    failureCount: state.failureCount,
                    lastFailureTime: state.lastFailureTime,
                    lastFailureAgo: state.lastFailureTime ? Date.now() - state.lastFailureTime : null,
                    successCount: state.successCount
                };
            }
            return {
                totalCircuits: this.circuitStates.size,
                circuits: statuses,
                summary: {
                    closed: Array.from(this.circuitStates.values()).filter(function (s) { return s.state === 'CLOSED'; }).length,
                    open: Array.from(this.circuitStates.values()).filter(function (s) { return s.state === 'OPEN'; }).length,
                    halfOpen: Array.from(this.circuitStates.values()).filter(function (s) { return s.state === 'HALF_OPEN'; }).length
                }
            };
        };
        return CircuitBreakerService_1;
    }());
    __setFunctionName(_classThis, "CircuitBreakerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CircuitBreakerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CircuitBreakerService = _classThis;
}();
exports.CircuitBreakerService = CircuitBreakerService;
