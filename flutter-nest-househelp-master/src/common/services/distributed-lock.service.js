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
exports.DistributedLockService = void 0;
var common_1 = require("@nestjs/common");
var crypto = __importStar(require("crypto"));
/**
 * Distributed Lock Service
 *
 * Provides advisory locking for race condition protection
 * Uses optimistic locking with token ownership verification
 *
 * Prevents concurrent execution of sensitive operations:
 * - Booking assignments
 * - Slot allocation
 * - Payment processing
 * - Worker status changes
 */
var DistributedLockService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DistributedLockService = _classThis = /** @class */ (function () {
        function DistributedLockService_1() {
            this.logger = new common_1.Logger(DistributedLockService.name);
            this.locks = new Map();
            this.DEFAULT_LOCK_TTL = 30000; // 30 seconds
        }
        /**
         * Attempt to acquire lock for given resource key
         * Returns owner token if lock acquired, null otherwise
         */
        DistributedLockService_1.prototype.tryAcquireLock = function (key, ttl) {
            return __awaiter(this, void 0, void 0, function () {
                var existingLock, ownerToken, effectiveTtl;
                return __generator(this, function (_a) {
                    existingLock = this.locks.get(key);
                    if (existingLock && Date.now() < existingLock.expiresAt) {
                        return [2 /*return*/, null];
                    }
                    ownerToken = crypto.randomUUID();
                    effectiveTtl = ttl !== null && ttl !== void 0 ? ttl : this.DEFAULT_LOCK_TTL;
                    this.locks.set(key, {
                        ownerToken: ownerToken,
                        expiresAt: Date.now() + effectiveTtl,
                    });
                    this.logger.debug("Acquired lock for key: ".concat(key, " (owner: ").concat(ownerToken.substring(0, 8), ")"));
                    return [2 /*return*/, ownerToken];
                });
            });
        };
        /**
         * Release lock using owner token
         * Returns true if lock was released successfully
         */
        DistributedLockService_1.prototype.releaseLock = function (key, ownerToken) {
            return __awaiter(this, void 0, void 0, function () {
                var existingLock;
                return __generator(this, function (_a) {
                    existingLock = this.locks.get(key);
                    if (!existingLock) {
                        return [2 /*return*/, true];
                    }
                    if (existingLock.ownerToken !== ownerToken) {
                        this.logger.warn("Attempted to release lock with invalid owner token: ".concat(key));
                        return [2 /*return*/, false];
                    }
                    this.locks.delete(key);
                    this.logger.debug("Released lock for key: ".concat(key));
                    return [2 /*return*/, true];
                });
            });
        };
        /**
         * Execute function while holding lock
         * Automatically releases lock after execution
         */
        DistributedLockService_1.prototype.executeWithLock = function (key, fn, ttl) {
            return __awaiter(this, void 0, void 0, function () {
                var ownerToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.tryAcquireLock(key, ttl)];
                        case 1:
                            ownerToken = _a.sent();
                            if (!ownerToken) {
                                throw new Error("Could not acquire lock for resource: ".concat(key));
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, , 4, 6]);
                            return [4 /*yield*/, fn()];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4: return [4 /*yield*/, this.releaseLock(key, ownerToken)];
                        case 5:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if lock is currently held
         */
        DistributedLockService_1.prototype.isLocked = function (key) {
            var existingLock = this.locks.get(key);
            return existingLock != null && Date.now() < existingLock.expiresAt;
        };
        /**
         * Get lock time remaining in milliseconds
         */
        DistributedLockService_1.prototype.getLockRemainingTime = function (key) {
            var existingLock = this.locks.get(key);
            if (!existingLock) {
                return null;
            }
            var remaining = existingLock.expiresAt - Date.now();
            return remaining > 0 ? remaining : null;
        };
        /**
         * Clean up expired locks
         */
        DistributedLockService_1.prototype.cleanupExpiredLocks = function () {
            var now = Date.now();
            var cleanedCount = 0;
            for (var _i = 0, _a = this.locks.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], lock = _b[1];
                if (now > lock.expiresAt) {
                    this.locks.delete(key);
                    cleanedCount++;
                }
            }
            if (cleanedCount > 0) {
                this.logger.debug("Cleaned up ".concat(cleanedCount, " expired locks"));
            }
        };
        /**
         * Get lock statistics
         */
        DistributedLockService_1.prototype.getStats = function () {
            this.cleanupExpiredLocks();
            return {
                activeLocks: this.locks.size,
            };
        };
        return DistributedLockService_1;
    }());
    __setFunctionName(_classThis, "DistributedLockService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DistributedLockService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DistributedLockService = _classThis;
}();
exports.DistributedLockService = DistributedLockService;
