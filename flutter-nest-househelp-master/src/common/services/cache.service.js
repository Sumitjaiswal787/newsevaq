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
exports.CacheService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Cache Service
 *
 * Multi-layer caching with automatic invalidation
 * Provides TTL based in-memory caching with namespace support
 *
 * Can be extended with Redis for distributed caching
 */
var CacheService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CacheService = _classThis = /** @class */ (function () {
        function CacheService_1() {
            this.logger = new common_1.Logger(CacheService.name);
            this.cache = new Map();
            this.DEFAULT_TTL = 300000; // 5 minutes
        }
        /**
         * Get value from cache
         */
        CacheService_1.prototype.get = function (key) {
            var entry = this.cache.get(key);
            if (!entry) {
                return null;
            }
            if (Date.now() > entry.expiresAt) {
                this.cache.delete(key);
                return null;
            }
            return entry.value;
        };
        /**
         * Set value in cache with optional TTL and tags
         */
        CacheService_1.prototype.set = function (key, value, ttl, tags) {
            var effectiveTtl = ttl !== null && ttl !== void 0 ? ttl : this.DEFAULT_TTL;
            this.cache.set(key, {
                value: value,
                expiresAt: Date.now() + effectiveTtl,
                tags: tags !== null && tags !== void 0 ? tags : [],
            });
        };
        /**
         * Get cached value or execute factory and cache result
         */
        CacheService_1.prototype.getOrSet = function (key, factory, ttl, tags) {
            return __awaiter(this, void 0, void 0, function () {
                var cached, value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cached = this.get(key);
                            if (cached !== null) {
                                return [2 /*return*/, cached];
                            }
                            return [4 /*yield*/, factory()];
                        case 1:
                            value = _a.sent();
                            this.set(key, value, ttl, tags);
                            return [2 /*return*/, value];
                    }
                });
            });
        };
        /**
         * Delete specific key
         */
        CacheService_1.prototype.delete = function (key) {
            return this.cache.delete(key);
        };
        /**
         * Invalidate all cache entries with given tag
         */
        CacheService_1.prototype.invalidateTag = function (tag) {
            var count = 0;
            for (var _i = 0, _a = this.cache.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], entry = _b[1];
                if (entry.tags.includes(tag)) {
                    this.cache.delete(key);
                    count++;
                }
            }
            if (count > 0) {
                this.logger.debug("Invalidated ".concat(count, " cache entries for tag: ").concat(tag));
            }
        };
        /**
         * Invalidate multiple tags
         */
        CacheService_1.prototype.invalidateTags = function (tags) {
            var _this = this;
            tags.forEach(function (tag) { return _this.invalidateTag(tag); });
        };
        /**
         * Clear entire cache
         */
        CacheService_1.prototype.clear = function () {
            this.cache.clear();
            this.logger.log('Cache cleared completely');
        };
        /**
         * Get cache statistics
         */
        CacheService_1.prototype.getStats = function () {
            var now = Date.now();
            var validEntries = 0;
            var expiredEntries = 0;
            for (var _i = 0, _a = this.cache.values(); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (now > entry.expiresAt) {
                    expiredEntries++;
                }
                else {
                    validEntries++;
                }
            }
            return {
                totalEntries: this.cache.size,
                validEntries: validEntries,
                expiredEntries: expiredEntries,
            };
        };
        return CacheService_1;
    }());
    __setFunctionName(_classThis, "CacheService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CacheService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CacheService = _classThis;
}();
exports.CacheService = CacheService;
