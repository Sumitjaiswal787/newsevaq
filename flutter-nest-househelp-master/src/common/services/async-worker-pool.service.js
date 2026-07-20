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
exports.AsyncWorkerPoolService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Async Worker Pool Service
 *
 * Background job processing queue with concurrency control
 * Offloads expensive operations from API request threads
 * Provides graceful shutdown with job completion
 */
var AsyncWorkerPoolService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AsyncWorkerPoolService = _classThis = /** @class */ (function () {
        function AsyncWorkerPoolService_1() {
            this.logger = new common_1.Logger(AsyncWorkerPoolService.name);
            this.queue = [];
            this.activeWorkers = 0;
            this.isShuttingDown = false;
            this.isProcessing = false;
            this.DEFAULT_CONCURRENCY = 4;
            this.concurrency = this.DEFAULT_CONCURRENCY;
        }
        /**
         * Submit job to worker pool
         */
        AsyncWorkerPoolService_1.prototype.submitJob = function (fn, priority) {
            var _this = this;
            if (priority === void 0) { priority = 0; }
            if (this.isShuttingDown) {
                throw new Error('Worker pool is shutting down, not accepting new jobs');
            }
            var jobId = crypto.randomUUID();
            this.queue.push({
                id: jobId,
                fn: fn,
                priority: priority,
            });
            // Sort queue by priority (higher first)
            this.queue.sort(function (a, b) { return b.priority - a.priority; });
            this.logger.debug("Submitted job ".concat(jobId.substring(0, 8), ", queue length: ").concat(this.queue.length));
            setImmediate(function () { return _this.processQueue(); });
            return jobId;
        };
        /**
         * Process jobs from queue
         */
        AsyncWorkerPoolService_1.prototype.processQueue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _loop_1, this_1, state_1;
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.isProcessing) {
                        return [2 /*return*/];
                    }
                    this.isProcessing = true;
                    _loop_1 = function () {
                        var job = this_1.queue.shift();
                        if (!job) {
                            return "break";
                        }
                        this_1.activeWorkers++;
                        setImmediate(function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, 3, 4]);
                                        this.logger.debug("Running job ".concat(job.id.substring(0, 8)));
                                        return [4 /*yield*/, job.fn()];
                                    case 1:
                                        _a.sent();
                                        this.logger.debug("Completed job ".concat(job.id.substring(0, 8)));
                                        return [3 /*break*/, 4];
                                    case 2:
                                        error_1 = _a.sent();
                                        this.logger.error("Job ".concat(job.id.substring(0, 8), " failed: ").concat(error_1.message), error_1.stack);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        this.activeWorkers--;
                                        setImmediate(function () { return _this.processQueue(); });
                                        return [7 /*endfinally*/];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    };
                    this_1 = this;
                    while (this.queue.length > 0 && this.activeWorkers < this.concurrency && !this.isShuttingDown) {
                        state_1 = _loop_1();
                        if (state_1 === "break")
                            break;
                    }
                    this.isProcessing = false;
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Get current worker pool statistics
         */
        AsyncWorkerPoolService_1.prototype.getStats = function () {
            return {
                queuedJobs: this.queue.length,
                activeWorkers: this.activeWorkers,
                concurrency: this.concurrency,
                isShuttingDown: this.isShuttingDown,
            };
        };
        /**
         * Wait for all currently active jobs to complete
         */
        AsyncWorkerPoolService_1.prototype.waitForIdle = function () {
            return __awaiter(this, arguments, void 0, function (timeoutMs) {
                var start;
                if (timeoutMs === void 0) { timeoutMs = 30000; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            start = Date.now();
                            _a.label = 1;
                        case 1:
                            if (!(this.activeWorkers > 0 || this.queue.length > 0)) return [3 /*break*/, 3];
                            if (Date.now() - start > timeoutMs) {
                                this.logger.warn("Timeout waiting for worker pool idle, ".concat(this.activeWorkers, " active, ").concat(this.queue.length, " queued"));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Graceful shutdown handler
         */
        AsyncWorkerPoolService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Initiating graceful shutdown for worker pool (".concat(this.activeWorkers, " active, ").concat(this.queue.length, " queued)"));
                            this.isShuttingDown = true;
                            return [4 /*yield*/, this.waitForIdle()];
                        case 1:
                            _a.sent();
                            this.logger.log('Worker pool shutdown complete');
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Clear all queued jobs
         */
        AsyncWorkerPoolService_1.prototype.clearQueue = function () {
            var clearedCount = this.queue.length;
            this.queue.length = 0;
            if (clearedCount > 0) {
                this.logger.log("Cleared ".concat(clearedCount, " jobs from queue"));
            }
        };
        return AsyncWorkerPoolService_1;
    }());
    __setFunctionName(_classThis, "AsyncWorkerPoolService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AsyncWorkerPoolService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AsyncWorkerPoolService = _classThis;
}();
exports.AsyncWorkerPoolService = AsyncWorkerPoolService;
