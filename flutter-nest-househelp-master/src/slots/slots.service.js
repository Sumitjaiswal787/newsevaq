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
exports.SlotsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var slot_entity_1 = require("./entities/slot.entity");
var SlotsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SlotsService = _classThis = /** @class */ (function () {
        function SlotsService_1(slotsRepository, workersRepository, dataSource) {
            this.slotsRepository = slotsRepository;
            this.workersRepository = workersRepository;
            this.dataSource = dataSource;
            this.logger = new common_1.Logger(SlotsService.name);
        }
        SlotsService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.slotsRepository.find({ relations: ['worker'] })];
                });
            });
        };
        /**
         * Find all available (unbooked) slots
         */
        SlotsService_1.prototype.findAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.slotsRepository.find({
                            where: { isBooked: false },
                            relations: ['worker'],
                            order: { startTime: 'ASC' },
                        })];
                });
            });
        };
        /**
         * Find available slots for a specific date and optional serviceId
         */
        SlotsService_1.prototype.findAvailableByDate = function (date, serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                var startOfDay, endOfDay, qb;
                return __generator(this, function (_a) {
                    startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);
                    qb = this.slotsRepository.createQueryBuilder('slot')
                        .leftJoinAndSelect('slot.worker', 'worker')
                        .where('slot.startTime BETWEEN :start AND :end', { start: startOfDay, end: endOfDay })
                        .andWhere('slot.isBooked = :isBooked', { isBooked: false })
                        .orderBy('slot.startTime', 'ASC');
                    if (serviceId) {
                        qb.innerJoin('worker.services', 'service', 'service.id = :serviceId', { serviceId: serviceId });
                    }
                    return [2 /*return*/, qb.getMany()];
                });
            });
        };
        SlotsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.slotsRepository.findOne({
                            where: { id: id },
                            relations: ['worker'],
                        })];
                });
            });
        };
        SlotsService_1.prototype.findAvailableSlot = function (workerId, startTime, endTime) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.log("Finding available slot for workerId: ".concat(workerId, " (type: ").concat(typeof workerId, ")"));
                    return [2 /*return*/, this.slotsRepository.findOne({
                            where: {
                                worker: { id: workerId },
                                startTime: startTime,
                                endTime: endTime,
                                isBooked: false,
                            },
                        })];
                });
            });
        };
        SlotsService_1.prototype.findBookedSlot = function (workerId, startTime, endTime) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.slotsRepository.findOne({
                            where: {
                                worker: { id: workerId },
                                startTime: startTime,
                                endTime: endTime,
                                isBooked: true,
                            },
                        })];
                });
            });
        };
        /**
         * Find available slot with flexible time matching
         * This method allows for flexible time matching to improve worker availability
         */
        SlotsService_1.prototype.findAvailableSlotFlexible = function (workerId_1, requestedStartTime_1, requestedEndTime_1) {
            return __awaiter(this, arguments, void 0, function (workerId, requestedStartTime, requestedEndTime, disableSameDayFallback) {
                var startOfDay, endOfDay, allSlotsToday, exactMatch, flexibilityMinutes, startTimeWindow, flexibleSlots, requestedDate, nextDay, sameDaySlots, error_1;
                if (disableSameDayFallback === void 0) { disableSameDayFallback = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Finding flexible slot for worker ".concat(workerId, " from ").concat(requestedStartTime, " to ").concat(requestedEndTime, " (disableSameDayFallback: ").concat(disableSameDayFallback, ")"));
                            // DEBUG: Log timezone info
                            this.logger.log("\uD83D\uDD0D DEBUG: requestedStartTime ISO: ".concat(requestedStartTime.toISOString(), ", local: ").concat(requestedStartTime.toString()));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            startOfDay = new Date(requestedStartTime);
                            startOfDay.setHours(0, 0, 0, 0);
                            endOfDay = new Date(requestedStartTime);
                            endOfDay.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.slotsRepository.find({
                                    where: {
                                        worker: { id: workerId },
                                        startTime: (0, typeorm_1.Between)(startOfDay, endOfDay),
                                    }
                                })];
                        case 2:
                            allSlotsToday = _a.sent();
                            this.logger.log("\uD83D\uDD0D DEBUG: Worker ".concat(workerId, " has ").concat(allSlotsToday.length, " slots today. First slot: ").concat(allSlotsToday.length > 0 ? allSlotsToday[0].startTime.toISOString() + ' to ' + allSlotsToday[0].endTime.toISOString() : 'none'));
                            return [4 /*yield*/, this.findAvailableSlot(workerId, requestedStartTime, requestedEndTime)];
                        case 3:
                            exactMatch = _a.sent();
                            if (exactMatch) {
                                this.logger.log("Found exact match for worker ".concat(workerId));
                                return [2 /*return*/, exactMatch];
                            }
                            flexibilityMinutes = 30;
                            startTimeWindow = {
                                start: new Date(requestedStartTime.getTime() - flexibilityMinutes * 60000),
                                end: new Date(requestedStartTime.getTime() + flexibilityMinutes * 60000),
                            };
                            // Find available slots within the time window
                            this.logger.log("\uD83D\uDD0D DEBUG: Querying slots with Between ".concat(startTimeWindow.start.toISOString(), " and ").concat(startTimeWindow.end.toISOString()));
                            return [4 /*yield*/, this.slotsRepository.find({
                                    where: {
                                        worker: { id: workerId },
                                        startTime: (0, typeorm_1.Between)(startTimeWindow.start, startTimeWindow.end),
                                        isBooked: false,
                                    },
                                    order: {
                                        startTime: 'ASC',
                                    },
                                })];
                        case 4:
                            flexibleSlots = _a.sent();
                            this.logger.log("\uD83D\uDD0D DEBUG: Found ".concat(flexibleSlots.length, " slots for worker ").concat(workerId, " in flexible search"));
                            if (flexibleSlots.length > 0) {
                                this.logger.log("Found ".concat(flexibleSlots.length, " flexible slots for worker ").concat(workerId));
                                return [2 /*return*/, flexibleSlots[0]]; // Return the earliest available slot
                            }
                            if (disableSameDayFallback) {
                                this.logger.log("Exact/flexible match only. Skipping same-day fallback search for worker ".concat(workerId, "."));
                                return [2 /*return*/, null];
                            }
                            requestedDate = new Date(requestedStartTime.getFullYear(), requestedStartTime.getMonth(), requestedStartTime.getDate());
                            nextDay = new Date(requestedDate);
                            nextDay.setDate(requestedDate.getDate() + 1);
                            this.logger.log("\uD83D\uDD0D DEBUG: Same-day search - requestedDate: ".concat(requestedDate.toISOString(), ", nextDay: ").concat(nextDay.toISOString()));
                            return [4 /*yield*/, this.slotsRepository.find({
                                    where: {
                                        worker: { id: workerId },
                                        startTime: (0, typeorm_1.Between)(requestedDate, nextDay),
                                        isBooked: false,
                                    },
                                    order: {
                                        startTime: 'ASC',
                                    },
                                })];
                        case 5:
                            sameDaySlots = _a.sent();
                            this.logger.log("\uD83D\uDD0D DEBUG: Found ".concat(sameDaySlots.length, " same-day slots for worker ").concat(workerId));
                            if (sameDaySlots.length > 0) {
                                this.logger.log("Found ".concat(sameDaySlots.length, " same-day slots for worker ").concat(workerId));
                                return [2 /*return*/, sameDaySlots[0]];
                            }
                            this.logger.log("No flexible slots found for worker ".concat(workerId));
                            return [2 /*return*/, null];
                        case 6:
                            error_1 = _a.sent();
                            this.logger.error("Error finding flexible slot for worker ".concat(workerId, ":"), error_1);
                            throw error_1;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Enhanced slot creation with better availability management
         */
        SlotsService_1.prototype.createSlotsForWorker = function (workerId, date, timeSlots) {
            return __awaiter(this, void 0, void 0, function () {
                var worker_1, startOfDay, endOfDay, existingSlots_1, slotsToCreate, createdSlots, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Creating ".concat(timeSlots.length, " slots for worker ").concat(workerId, " on ").concat(date));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: workerId },
                                })];
                        case 2:
                            worker_1 = _a.sent();
                            if (!worker_1) {
                                throw new Error("Worker with ID ".concat(workerId, " not found"));
                            }
                            startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
                            return [4 /*yield*/, this.slotsRepository.find({
                                    where: {
                                        worker: { id: workerId },
                                        startTime: (0, typeorm_1.Between)(startOfDay, endOfDay),
                                    },
                                })];
                        case 3:
                            existingSlots_1 = _a.sent();
                            slotsToCreate = timeSlots
                                .filter(function (slotData) {
                                var isDuplicate = existingSlots_1.some(function (existing) {
                                    var existingTime = new Date(existing.startTime).getTime();
                                    var targetTime = new Date(slotData.startTime).getTime();
                                    return existingTime === targetTime;
                                });
                                return !isDuplicate;
                            })
                                .map(function (slotData) {
                                var slot = new slot_entity_1.Slot();
                                slot.worker = worker_1;
                                slot.date = date;
                                slot.startTime = slotData.startTime;
                                slot.endTime = slotData.endTime;
                                slot.isBooked = false;
                                slot.maxBookings = 1;
                                slot.currentBookings = 0;
                                return slot;
                            });
                            if (slotsToCreate.length === 0) {
                                this.logger.log("All ".concat(timeSlots.length, " slots for worker ").concat(workerId, " on ").concat(date, " already exist. Skipping slot creation."));
                                return [2 /*return*/, existingSlots_1];
                            }
                            return [4 /*yield*/, this.slotsRepository.save(slotsToCreate)];
                        case 4:
                            createdSlots = _a.sent();
                            this.logger.log("Successfully created ".concat(createdSlots.length, " slots for worker ").concat(workerId));
                            return [2 /*return*/, createdSlots];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error("Error creating slots for worker ".concat(workerId, ":"), error_2);
                            throw error_2;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Bulk create slots for multiple workers
         */
        SlotsService_1.prototype.createSlotsForMultipleWorkers = function (workerSlots) {
            return __awaiter(this, void 0, void 0, function () {
                var promises, error_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Creating slots for ".concat(workerSlots.length, " workers"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            promises = workerSlots.map(function (workerSlot) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.createSlotsForWorker(workerSlot.workerId, workerSlot.date, workerSlot.timeSlots)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(promises)];
                        case 2:
                            _a.sent();
                            this.logger.log("Successfully created slots for all workers");
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error('Error creating slots for multiple workers:', error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get available slots for a worker within a date range
         */
        SlotsService_1.prototype.getAvailableSlotsForWorker = function (workerId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var slots;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDD0D DEBUG: getAvailableSlotsForWorker - workerId: ".concat(workerId, ", startDate: ").concat(startDate.toISOString(), ", endDate: ").concat(endDate.toISOString()));
                            return [4 /*yield*/, this.slotsRepository.find({
                                    where: {
                                        worker: { id: workerId },
                                        startTime: (0, typeorm_1.Between)(startDate, endDate),
                                        isBooked: false,
                                    },
                                    order: {
                                        startTime: 'ASC',
                                    },
                                })];
                        case 1:
                            slots = _a.sent();
                            this.logger.log("\uD83D\uDD0D DEBUG: getAvailableSlotsForWorker found ".concat(slots.length, " slots for worker ").concat(workerId));
                            return [2 /*return*/, slots];
                    }
                });
            });
        };
        /**
         * Get booking statistics for a worker
         */
        SlotsService_1.prototype.getWorkerSlotStats = function (workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var totalSlots, availableSlots, bookedSlots, bookingRate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slotsRepository.count({
                                where: { worker: { id: workerId } },
                            })];
                        case 1:
                            totalSlots = _a.sent();
                            return [4 /*yield*/, this.slotsRepository.count({
                                    where: {
                                        worker: { id: workerId },
                                        isBooked: false,
                                    },
                                })];
                        case 2:
                            availableSlots = _a.sent();
                            bookedSlots = totalSlots - availableSlots;
                            bookingRate = totalSlots > 0 ? (bookedSlots / totalSlots) * 100 : 0;
                            return [2 /*return*/, {
                                    totalSlots: totalSlots,
                                    availableSlots: availableSlots,
                                    bookedSlots: bookedSlots,
                                    bookingRate: bookingRate,
                                }];
                    }
                });
            });
        };
        SlotsService_1.prototype.markAsAvailable = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slotsRepository
                                .createQueryBuilder()
                                .update(slot_entity_1.Slot)
                                .set({ isBooked: false, currentBookings: 0 })
                                .where('id = :id AND "isBooked" = true', { id: id })
                                .execute()];
                        case 1:
                            result = _a.sent();
                            if (result.affected === 0) {
                                this.logger.warn("markAsAvailable: Slot ".concat(id, " was not booked or does not exist"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Atomically mark a slot as booked using a conditional UPDATE.
         * Prevents race conditions where two concurrent requests could book the same slot.
         * The WHERE clause ensures only an unbooked slot can be marked as booked.
         */
        SlotsService_1.prototype.markAsBooked = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slotsRepository
                                .createQueryBuilder()
                                .update(slot_entity_1.Slot)
                                .set({
                                isBooked: true,
                                currentBookings: function () { return '"currentBookings" + 1'; },
                            })
                                .where('id = :id AND "isBooked" = false', { id: id })
                                .execute()];
                        case 1:
                            result = _a.sent();
                            if (result.affected === 0) {
                                this.logger.warn("markAsBooked: Slot ".concat(id, " is already booked or does not exist (race condition prevented)"));
                                return [2 /*return*/, false];
                            }
                            this.logger.log("Successfully marked slot ".concat(id, " as booked (atomic)"));
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Find available slots for multiple workers in a single query
         * Optimized to avoid N+1 query problem
         */
        SlotsService_1.prototype.findAvailableSlotsForWorkers = function (workerIds, startTime, endTime) {
            return __awaiter(this, void 0, void 0, function () {
                var slots;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (workerIds.length === 0) {
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.slotsRepository
                                    .createQueryBuilder('slot')
                                    .select([
                                    'slot.id',
                                    'slot.startTime',
                                    'slot.endTime',
                                    'worker.id as worker_id',
                                ])
                                    .leftJoin('slot.worker', 'worker')
                                    .where('worker.id IN (:...workerIds)', { workerIds: workerIds })
                                    .andWhere('slot.startTime = :startTime', { startTime: startTime })
                                    .andWhere('slot.endTime = :endTime')
                                    .andWhere('slot.isBooked = :isBooked', { isBooked: false })
                                    .getRawMany()];
                        case 1:
                            slots = _a.sent();
                            return [2 /*return*/, slots.map(function (slot) { return ({
                                    workerId: slot.worker_id,
                                    id: slot.slot_id,
                                    startTime: slot.slot_start_time,
                                    endTime: slot.slot_end_time,
                                }); })];
                    }
                });
            });
        };
        /**
         * Atomic slot booking with optimistic locking - prevents race conditions
         * Uses database transaction and version column for concurrency control
         */
        SlotsService_1.prototype.bookSlotAtomic = function (slotId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, slot, updatedSlot, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 13, 15, 17]);
                            return [4 /*yield*/, queryRunner.manager.findOne(slot_entity_1.Slot, {
                                    where: { id: slotId },
                                    lock: { mode: 'pessimistic_write' },
                                })];
                        case 4:
                            slot = _a.sent();
                            if (!!slot) return [3 /*break*/, 6];
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { success: false, error: 'Slot not found' }];
                        case 6:
                            if (!slot.isBooked) return [3 /*break*/, 8];
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 7:
                            _a.sent();
                            return [2 /*return*/, { success: false, error: 'Slot is already booked' }];
                        case 8:
                            if (!(slot.currentBookings >= slot.maxBookings)) return [3 /*break*/, 10];
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, { success: false, error: 'Slot capacity exceeded' }];
                        case 10:
                            // Update slot atomically
                            slot.isBooked = true;
                            slot.currentBookings += 1;
                            return [4 /*yield*/, queryRunner.manager.save(slot)];
                        case 11:
                            updatedSlot = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 12:
                            _a.sent();
                            this.logger.log("Successfully booked slot ".concat(slotId, " atomically"));
                            return [2 /*return*/, { success: true, slot: updatedSlot }];
                        case 13:
                            error_4 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 14:
                            _a.sent();
                            this.logger.error("Error in atomic slot booking for ".concat(slotId, ":"), error_4);
                            return [2 /*return*/, {
                                    success: false,
                                    error: 'Booking failed due to concurrent modification',
                                }];
                        case 15: return [4 /*yield*/, queryRunner.release()];
                        case 16:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Legacy slot booking method - kept for backward compatibility
         * @deprecated Use bookSlotAtomic instead
         */
        SlotsService_1.prototype.bookSlot = function (slotId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookSlotAtomic(slotId)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.success];
                    }
                });
            });
        };
        /**
         * Enhanced slot unbooking with validation
         */
        SlotsService_1.prototype.unbookSlot = function (slotId) {
            return __awaiter(this, void 0, void 0, function () {
                var slot, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.slotsRepository.findOne({
                                    where: { id: slotId },
                                })];
                        case 1:
                            slot = _a.sent();
                            if (!slot) {
                                this.logger.warn("Slot ".concat(slotId, " not found"));
                                return [2 /*return*/, false];
                            }
                            if (!slot.isBooked) {
                                this.logger.warn("Slot ".concat(slotId, " is not booked"));
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.slotsRepository.update(slotId, { isBooked: false })];
                        case 2:
                            _a.sent();
                            this.logger.log("Successfully unbooked slot ".concat(slotId));
                            return [2 /*return*/, true];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error("Error unbooking slot ".concat(slotId, ":"), error_5);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return SlotsService_1;
    }());
    __setFunctionName(_classThis, "SlotsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SlotsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SlotsService = _classThis;
}();
exports.SlotsService = SlotsService;
