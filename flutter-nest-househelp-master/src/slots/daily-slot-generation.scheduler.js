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
exports.DailySlotGenerationScheduler = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var DailySlotGenerationScheduler = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleDailySlotGeneration_decorators;
    var _handleHourlySlotGeneration_decorators;
    var DailySlotGenerationScheduler = _classThis = /** @class */ (function () {
        function DailySlotGenerationScheduler_1(workersRepository, slotsService) {
            this.workersRepository = (__runInitializers(this, _instanceExtraInitializers), workersRepository);
            this.slotsService = slotsService;
            this.logger = new common_1.Logger(DailySlotGenerationScheduler.name);
        }
        DailySlotGenerationScheduler_1.prototype.onApplicationBootstrap = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Running bootstrap slot generation...');
                            return [4 /*yield*/, this.handleHourlySlotGeneration()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Run daily at 12:00 AM to generate slots for all active workers
         */
        DailySlotGenerationScheduler_1.prototype.handleDailySlotGeneration = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workers, today, dayOffset, targetDate, timeSlots, _i, workers_1, worker, error_1, error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger.log('Running daily slot generation scheduler...');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 11, , 12]);
                            return [4 /*yield*/, this.workersRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            workers = _b.sent();
                            this.logger.log("Found ".concat(workers.length, " active workers"));
                            today = new Date();
                            dayOffset = 0;
                            _b.label = 3;
                        case 3:
                            if (!(dayOffset < 45)) return [3 /*break*/, 10];
                            targetDate = new Date(today);
                            targetDate.setDate(today.getDate() + dayOffset);
                            timeSlots = this.createStandardTimeSlots(targetDate);
                            _i = 0, workers_1 = workers;
                            _b.label = 4;
                        case 4:
                            if (!(_i < workers_1.length)) return [3 /*break*/, 9];
                            worker = workers_1[_i];
                            _b.label = 5;
                        case 5:
                            _b.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.slotsService.createSlotsForWorker(worker.id, targetDate, timeSlots)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_1 = _b.sent();
                            // Silently handle duplicate slot errors
                            if (!((_a = error_1.message) === null || _a === void 0 ? void 0 : _a.includes('already exists'))) {
                                this.logger.error("Failed to create slots for worker ".concat(worker.id, ": ").concat(error_1.message));
                            }
                            return [3 /*break*/, 8];
                        case 8:
                            _i++;
                            return [3 /*break*/, 4];
                        case 9:
                            dayOffset++;
                            return [3 /*break*/, 3];
                        case 10:
                            this.logger.log('Daily slot generation completed successfully');
                            return [3 /*break*/, 12];
                        case 11:
                            error_2 = _b.sent();
                            this.logger.error("Daily slot generation failed: ".concat(error_2.message), error_2.stack);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Run every hour to ensure slots are available for upcoming days
         */
        DailySlotGenerationScheduler_1.prototype.handleHourlySlotGeneration = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workers, today, dayOffset, targetDate, timeSlots, _i, workers_2, worker, error_3, error_4;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger.log('Running hourly slot generation check...');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 11, , 12]);
                            return [4 /*yield*/, this.workersRepository.find({
                                    where: { isActive: true },
                                })];
                        case 2:
                            workers = _b.sent();
                            today = new Date();
                            dayOffset = 0;
                            _b.label = 3;
                        case 3:
                            if (!(dayOffset < 45)) return [3 /*break*/, 10];
                            targetDate = new Date(today);
                            targetDate.setDate(today.getDate() + dayOffset);
                            timeSlots = this.createStandardTimeSlots(targetDate);
                            _i = 0, workers_2 = workers;
                            _b.label = 4;
                        case 4:
                            if (!(_i < workers_2.length)) return [3 /*break*/, 9];
                            worker = workers_2[_i];
                            _b.label = 5;
                        case 5:
                            _b.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.slotsService.createSlotsForWorker(worker.id, targetDate, timeSlots)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_3 = _b.sent();
                            // Silently handle duplicate slot errors
                            if (!((_a = error_3.message) === null || _a === void 0 ? void 0 : _a.includes('already exists'))) {
                                this.logger.error("Failed to create slots for worker ".concat(worker.id, ": ").concat(error_3.message));
                            }
                            return [3 /*break*/, 8];
                        case 8:
                            _i++;
                            return [3 /*break*/, 4];
                        case 9:
                            dayOffset++;
                            return [3 /*break*/, 3];
                        case 10:
                            this.logger.log('Hourly slot generation check completed');
                            return [3 /*break*/, 12];
                        case 11:
                            error_4 = _b.sent();
                            this.logger.error("Hourly slot generation failed: ".concat(error_4.message));
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create standard time slots for a day
         * Covers morning, afternoon, and evening time windows
         * Returns slots that can be used for both subscription and on-demand bookings
         * @param targetDate - The date to create slots for (not today)
         */
        DailySlotGenerationScheduler_1.prototype.createStandardTimeSlots = function (targetDate) {
            var slots = [];
            // Use the target date passed from the caller, not today's date
            var baseDate = new Date(targetDate);
            baseDate.setHours(0, 0, 0, 0);
            // Early morning slots: 5:00 AM - 11:00 AM (6 slots) - for early morning bookings
            var earlyMorningHours = [5, 6, 7, 8, 9, 10];
            for (var _i = 0, earlyMorningHours_1 = earlyMorningHours; _i < earlyMorningHours_1.length; _i++) {
                var hour = earlyMorningHours_1[_i];
                var startTime = new Date(baseDate);
                startTime.setHours(hour, 0, 0, 0);
                var endTime = new Date(baseDate);
                endTime.setHours(hour + 1, 0, 0, 0);
                slots.push({ startTime: startTime, endTime: endTime });
            }
            // Morning slots: 11:00 AM - 12:00 PM (only 1 slot, no overlap with early morning)
            var morningHours = [11];
            for (var _a = 0, morningHours_1 = morningHours; _a < morningHours_1.length; _a++) {
                var hour = morningHours_1[_a];
                var startTime = new Date(baseDate);
                startTime.setHours(hour, 0, 0, 0);
                var endTime = new Date(baseDate);
                endTime.setHours(hour + 1, 0, 0, 0);
                slots.push({ startTime: startTime, endTime: endTime });
            }
            // Afternoon slots: 12:00 PM - 5:00 PM (5 slots)
            var afternoonHours = [12, 13, 14, 15, 16];
            for (var _b = 0, afternoonHours_1 = afternoonHours; _b < afternoonHours_1.length; _b++) {
                var hour = afternoonHours_1[_b];
                var startTime = new Date(baseDate);
                startTime.setHours(hour, 0, 0, 0);
                var endTime = new Date(baseDate);
                endTime.setHours(hour + 1, 0, 0, 0);
                slots.push({ startTime: startTime, endTime: endTime });
            }
            // Evening slots: 5:00 PM - 10:00 PM (5 slots)
            var eveningHours = [17, 18, 19, 20, 21];
            for (var _c = 0, eveningHours_1 = eveningHours; _c < eveningHours_1.length; _c++) {
                var hour = eveningHours_1[_c];
                var startTime = new Date(baseDate);
                startTime.setHours(hour, 0, 0, 0);
                var endTime = new Date(baseDate);
                endTime.setHours(hour + 1, 0, 0, 0);
                slots.push({ startTime: startTime, endTime: endTime });
            }
            return slots;
        };
        /**
         * Manual trigger for slot generation (for testing)
         */
        DailySlotGenerationScheduler_1.prototype.triggerSlotGeneration = function () {
            return __awaiter(this, arguments, void 0, function (daysAhead) {
                var workers, today, dayOffset, targetDate, timeSlots, _i, workers_3, worker;
                if (daysAhead === void 0) { daysAhead = 7; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Manually triggering slot generation for ".concat(daysAhead, " days ahead"));
                            return [4 /*yield*/, this.workersRepository.find({
                                    where: { isActive: true },
                                })];
                        case 1:
                            workers = _a.sent();
                            today = new Date();
                            dayOffset = 0;
                            _a.label = 2;
                        case 2:
                            if (!(dayOffset < daysAhead)) return [3 /*break*/, 7];
                            targetDate = new Date(today);
                            targetDate.setDate(today.getDate() + dayOffset);
                            timeSlots = this.createStandardTimeSlots(targetDate);
                            _i = 0, workers_3 = workers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < workers_3.length)) return [3 /*break*/, 6];
                            worker = workers_3[_i];
                            return [4 /*yield*/, this.slotsService.createSlotsForWorker(worker.id, targetDate, timeSlots)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            dayOffset++;
                            return [3 /*break*/, 2];
                        case 7:
                            this.logger.log('Manual slot generation completed');
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DailySlotGenerationScheduler_1;
    }());
    __setFunctionName(_classThis, "DailySlotGenerationScheduler");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleDailySlotGeneration_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT)];
        _handleHourlySlotGeneration_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
        __esDecorate(_classThis, null, _handleDailySlotGeneration_decorators, { kind: "method", name: "handleDailySlotGeneration", static: false, private: false, access: { has: function (obj) { return "handleDailySlotGeneration" in obj; }, get: function (obj) { return obj.handleDailySlotGeneration; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleHourlySlotGeneration_decorators, { kind: "method", name: "handleHourlySlotGeneration", static: false, private: false, access: { has: function (obj) { return "handleHourlySlotGeneration" in obj; }, get: function (obj) { return obj.handleHourlySlotGeneration; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DailySlotGenerationScheduler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DailySlotGenerationScheduler = _classThis;
}();
exports.DailySlotGenerationScheduler = DailySlotGenerationScheduler;
