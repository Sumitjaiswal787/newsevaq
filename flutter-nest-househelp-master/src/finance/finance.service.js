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
exports.FinanceService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var crypto_1 = require("crypto");
var payout_entity_1 = require("./entities/payout.entity");
var refund_entity_1 = require("./entities/refund.entity");
var FinanceService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FinanceService = _classThis = /** @class */ (function () {
        function FinanceService_1(payoutsRepository, refundsRepository, workersRepository, bookingsRepository, usersRepository) {
            this.payoutsRepository = payoutsRepository;
            this.refundsRepository = refundsRepository;
            this.workersRepository = workersRepository;
            this.bookingsRepository = bookingsRepository;
            this.usersRepository = usersRepository;
            this.logger = new common_1.Logger(FinanceService.name);
        }
        // Payout methods
        FinanceService_1.prototype.getPendingPayouts = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.payoutsRepository.find({
                            where: { status: payout_entity_1.PayoutStatus.PENDING },
                            relations: ['worker', 'worker.user'],
                            order: { requestedAt: 'ASC' },
                        })];
                });
            });
        };
        FinanceService_1.prototype.getPayouts = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = {};
                    if (filters === null || filters === void 0 ? void 0 : filters.status) {
                        where.status = filters.status;
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.workerId) {
                        where.workerId = filters.workerId;
                    }
                    return [2 /*return*/, this.payoutsRepository.find({
                            where: where,
                            relations: ['worker', 'worker.user'],
                            order: { requestedAt: 'DESC' },
                        })];
                });
            });
        };
        FinanceService_1.prototype.createPayout = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, payout;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersRepository.findOne({ where: { id: dto.workerId } })];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException("Worker with ID ".concat(dto.workerId, " not found"));
                            }
                            payout = this.payoutsRepository.create({
                                publicId: (0, crypto_1.randomUUID)(),
                                workerId: dto.workerId,
                                amount: dto.amount,
                                paymentMethod: dto.paymentMethod,
                                notes: dto.notes,
                                status: payout_entity_1.PayoutStatus.PENDING,
                            });
                            return [2 /*return*/, this.payoutsRepository.save(payout)];
                    }
                });
            });
        };
        FinanceService_1.prototype.processPayout = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var payout;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.payoutsRepository.findOne({ where: { id: id } })];
                        case 1:
                            payout = _a.sent();
                            if (!payout) {
                                throw new common_1.NotFoundException("Payout with ID ".concat(id, " not found"));
                            }
                            payout.status = dto.status;
                            if (dto.transactionId) {
                                payout.transactionId = dto.transactionId;
                            }
                            payout.processedAt = new Date();
                            return [2 /*return*/, this.payoutsRepository.save(payout)];
                    }
                });
            });
        };
        FinanceService_1.prototype.getPayoutById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var payout;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.payoutsRepository.findOne({
                                where: { id: id },
                                relations: ['worker', 'worker.user'],
                            })];
                        case 1:
                            payout = _a.sent();
                            if (!payout) {
                                throw new common_1.NotFoundException("Payout with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, payout];
                    }
                });
            });
        };
        FinanceService_1.prototype.getPayoutSummary = function () {
            return __awaiter(this, void 0, void 0, function () {
                var pendingPayouts, totalPending, startOfMonth, paidThisMonth, totalPaidThisMonth;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.payoutsRepository.find({
                                where: { status: payout_entity_1.PayoutStatus.PENDING },
                            })];
                        case 1:
                            pendingPayouts = _a.sent();
                            totalPending = pendingPayouts.reduce(function (sum, p) { return sum + Number(p.amount); }, 0);
                            startOfMonth = new Date();
                            startOfMonth.setDate(1);
                            startOfMonth.setHours(0, 0, 0, 0);
                            return [4 /*yield*/, this.payoutsRepository.find({
                                    where: {
                                        status: payout_entity_1.PayoutStatus.COMPLETED,
                                        processedAt: (0, typeorm_1.Between)(startOfMonth, new Date()),
                                    },
                                })];
                        case 2:
                            paidThisMonth = _a.sent();
                            totalPaidThisMonth = paidThisMonth.reduce(function (sum, p) { return sum + Number(p.amount); }, 0);
                            return [2 /*return*/, { totalPending: totalPending, totalPaidThisMonth: totalPaidThisMonth }];
                    }
                });
            });
        };
        // Refund methods
        FinanceService_1.prototype.getRefunds = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = {};
                    if (filters === null || filters === void 0 ? void 0 : filters.status) {
                        where.status = filters.status;
                    }
                    return [2 /*return*/, this.refundsRepository.find({
                            where: where,
                            relations: ['booking', 'user'],
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        FinanceService_1.prototype.createRefund = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, refund;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingsRepository.findOne({ where: { id: String(dto.bookingId) } })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException("Booking with ID ".concat(dto.bookingId, " not found"));
                            }
                            refund = this.refundsRepository.create({
                                booking: { id: dto.bookingId },
                                user: { id: booking.userId },
                                amount: dto.amount,
                                reason: dto.reason,
                                requestedBy: dto.requestedBy,
                                status: refund_entity_1.RefundStatus.PENDING,
                            });
                            return [2 /*return*/, this.refundsRepository.save(refund)];
                    }
                });
            });
        };
        FinanceService_1.prototype.processRefund = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var refund;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refundsRepository.findOne({ where: { id: id } })];
                        case 1:
                            refund = _a.sent();
                            if (!refund) {
                                throw new common_1.NotFoundException("Refund with ID ".concat(id, " not found"));
                            }
                            refund.status = dto.status;
                            if (dto.approvedBy !== undefined) {
                                refund.approvedBy = dto.approvedBy;
                            }
                            refund.processedAt = new Date();
                            return [2 /*return*/, this.refundsRepository.save(refund)];
                    }
                });
            });
        };
        FinanceService_1.prototype.getRefundById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var refund;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refundsRepository.findOne({
                                where: { id: id },
                                relations: ['booking', 'user'],
                            })];
                        case 1:
                            refund = _a.sent();
                            if (!refund) {
                                throw new common_1.NotFoundException("Refund with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, refund];
                    }
                });
            });
        };
        // Revenue report methods
        FinanceService_1.prototype.generateRevenueReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var start, end, bookings, totalRevenue, totalBookings, averageBookingValue, revenueByServiceMap, revenueByService, revenueByWorkerMap, revenueByWorker, payouts, totalPayouts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            start = new Date(startDate);
                            end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.bookingsRepository
                                    .createQueryBuilder('booking')
                                    .where('booking.date BETWEEN :startDate AND :endDate', {
                                    startDate: start.toISOString().split('T')[0],
                                    endDate: end.toISOString().split('T')[0],
                                })
                                    .andWhere('booking.status IN (:...statuses)', {
                                    statuses: ['completed', 'confirmed', 'in_progress'],
                                })
                                    .leftJoinAndSelect('booking.service', 'service')
                                    .leftJoinAndSelect('booking.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .getMany()];
                        case 1:
                            bookings = _a.sent();
                            totalRevenue = bookings.reduce(function (sum, b) { return sum + Number(b.amount); }, 0);
                            totalBookings = bookings.length;
                            averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
                            revenueByServiceMap = new Map();
                            bookings.forEach(function (b) {
                                var _a;
                                var serviceName = ((_a = b.service) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown';
                                var existing = revenueByServiceMap.get(serviceName) || { revenue: 0, count: 0 };
                                existing.revenue += Number(b.amount);
                                existing.count += 1;
                                revenueByServiceMap.set(serviceName, existing);
                            });
                            revenueByService = Array.from(revenueByServiceMap.entries()).map(function (_a) {
                                var service = _a[0], data = _a[1];
                                return ({
                                    service: service,
                                    revenue: data.revenue,
                                    count: data.count,
                                });
                            });
                            revenueByWorkerMap = new Map();
                            bookings.forEach(function (b) {
                                var _a;
                                var workerName = ((_a = b.worker) === null || _a === void 0 ? void 0 : _a.user)
                                    ? "".concat(b.worker.user.firstName, " ").concat(b.worker.user.lastName).trim()
                                    : 'Unassigned';
                                var existing = revenueByWorkerMap.get(workerName) || { revenue: 0, count: 0 };
                                existing.revenue += Number(b.amount);
                                existing.count += 1;
                                revenueByWorkerMap.set(workerName, existing);
                            });
                            revenueByWorker = Array.from(revenueByWorkerMap.entries()).map(function (_a) {
                                var worker = _a[0], data = _a[1];
                                return ({
                                    worker: worker,
                                    revenue: data.revenue,
                                    count: data.count,
                                });
                            });
                            return [4 /*yield*/, this.payoutsRepository.find({
                                    where: {
                                        status: payout_entity_1.PayoutStatus.COMPLETED,
                                        processedAt: (0, typeorm_1.Between)(start, end),
                                    },
                                })];
                        case 2:
                            payouts = _a.sent();
                            totalPayouts = payouts.reduce(function (sum, p) { return sum + Number(p.amount); }, 0);
                            return [2 /*return*/, {
                                    startDate: startDate,
                                    endDate: endDate,
                                    totalRevenue: totalRevenue,
                                    totalBookings: totalBookings,
                                    averageBookingValue: averageBookingValue,
                                    revenueByService: revenueByService,
                                    revenueByWorker: revenueByWorker,
                                    totalPayouts: totalPayouts,
                                    netRevenue: totalRevenue - totalPayouts,
                                }];
                    }
                });
            });
        };
        FinanceService_1.prototype.generatePayoutReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var start, end, payouts, totalAmount, statusMap, payoutsByStatus, payoutList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            start = new Date(startDate);
                            end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.payoutsRepository.find({
                                    where: {
                                        processedAt: (0, typeorm_1.Between)(start, end),
                                    },
                                    relations: ['worker', 'worker.user'],
                                    order: { processedAt: 'DESC' },
                                })];
                        case 1:
                            payouts = _a.sent();
                            totalAmount = payouts.reduce(function (sum, p) { return sum + Number(p.amount); }, 0);
                            statusMap = new Map();
                            payouts.forEach(function (p) {
                                var existing = statusMap.get(p.status) || { count: 0, amount: 0 };
                                existing.count += 1;
                                existing.amount += Number(p.amount);
                                statusMap.set(p.status, existing);
                            });
                            payoutsByStatus = Array.from(statusMap.entries()).map(function (_a) {
                                var status = _a[0], data = _a[1];
                                return ({
                                    status: status,
                                    count: data.count,
                                    amount: data.amount,
                                });
                            });
                            payoutList = payouts.map(function (p) {
                                var _a;
                                return ({
                                    id: p.publicId,
                                    worker: ((_a = p.worker) === null || _a === void 0 ? void 0 : _a.user)
                                        ? "".concat(p.worker.user.firstName, " ").concat(p.worker.user.lastName).trim()
                                        : 'Unknown',
                                    amount: Number(p.amount),
                                    status: p.status,
                                    processedAt: p.processedAt,
                                });
                            });
                            return [2 /*return*/, {
                                    startDate: startDate,
                                    endDate: endDate,
                                    totalPayouts: payouts.length,
                                    totalAmount: totalAmount,
                                    payoutsByStatus: payoutsByStatus,
                                    payouts: payoutList,
                                }];
                    }
                });
            });
        };
        return FinanceService_1;
    }());
    __setFunctionName(_classThis, "FinanceService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceService = _classThis;
}();
exports.FinanceService = FinanceService;
