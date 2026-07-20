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
exports.PaymentsService = void 0;
var common_1 = require("@nestjs/common");
var payment_entity_1 = require("./entities/payment.entity");
var Razorpay = require("razorpay");
var crypto = __importStar(require("crypto"));
var uuid_1 = require("uuid");
var PaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentsService = _classThis = /** @class */ (function () {
        function PaymentsService_1(paymentsRepository, usersRepository, workersRepository, servicesRepository, configService, bookingsService, subscriptionsService, notificationsService, fcmGuestTokenService, dataSource) {
            this.paymentsRepository = paymentsRepository;
            this.usersRepository = usersRepository;
            this.workersRepository = workersRepository;
            this.servicesRepository = servicesRepository;
            this.configService = configService;
            this.bookingsService = bookingsService;
            this.subscriptionsService = subscriptionsService;
            this.notificationsService = notificationsService;
            this.fcmGuestTokenService = fcmGuestTokenService;
            this.dataSource = dataSource;
            this.logger = new common_1.Logger(PaymentsService.name);
            var keyId = this.configService.get('RAZORPAY_KEY_ID');
            var keySecret = this.configService.get('RAZORPAY_KEY_SECRET');
            if (!keyId || !keySecret) {
                this.logger.error('Razorpay credentials not configured');
                throw new Error('Payment gateway not properly configured');
            }
            this.razorpay = new Razorpay({
                key_id: keyId,
                key_secret: keySecret,
            });
        }
        PaymentsService_1.prototype.serializeBooking = function (booking) {
            if (!booking)
                return null;
            var serialized = {
                id: booking.id,
                publicId: booking.publicId,
                userId: booking.userId,
                workerId: booking.workerId,
                serviceId: booking.serviceId,
                serviceRequestId: booking.serviceRequestId,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                totalAmount: booking.totalAmount ? booking.totalAmount / 100 : 0,
                amount: booking.totalAmount ? booking.totalAmount / 100 : 0,
                status: booking.status,
                isPaid: booking.isPaid,
                type: booking.type,
                notes: booking.notes,
                location: booking.location,
                metadata: booking.metadata,
            };
            // Include worker with user if available
            if (booking.worker) {
                serialized.worker = {
                    id: booking.worker.id,
                    publicId: booking.worker.publicId,
                    rating: booking.worker.rating,
                    reviewCount: booking.worker.reviewCount,
                    bio: booking.worker.bio,
                };
                if (booking.worker.user) {
                    serialized.worker.user = {
                        id: booking.worker.user.id,
                        publicId: booking.worker.user.publicId,
                        firstName: booking.worker.user.firstName,
                        lastName: booking.worker.user.lastName,
                        email: booking.worker.user.email,
                    };
                }
            }
            // Include service if available
            if (booking.service) {
                serialized.service = {
                    id: booking.service.id,
                    publicId: booking.service.publicId,
                    name: booking.service.name,
                    description: booking.service.description,
                    basePrice: booking.service.basePrice,
                    category: booking.service.category,
                };
            }
            // Include user if available
            if (booking.user) {
                serialized.user = {
                    id: booking.user.id,
                    publicId: booking.user.publicId,
                    firstName: booking.user.firstName,
                    lastName: booking.user.lastName,
                    email: booking.user.email,
                    phone: booking.user.phone,
                    address: booking.user.address,
                };
            }
            return serialized;
        };
        PaymentsService_1.prototype.createOrder = function (amount_1) {
            return __awaiter(this, arguments, void 0, function (amount, currency) {
                var options, order;
                if (currency === void 0) { currency = 'INR'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = {
                                amount: amount, // Razorpay expects amount in paise
                                currency: currency,
                                receipt: 'receipt_' + Date.now(),
                            };
                            return [4 /*yield*/, this.razorpay.orders.create(options)];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        PaymentsService_1.prototype.verifyPayment = function (razorpayOrderId, razorpayPaymentId, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var secret, generated_signature;
                return __generator(this, function (_a) {
                    secret = this.configService.get('RAZORPAY_KEY_SECRET');
                    if (!secret) {
                        throw new Error('Payment verification configuration error');
                    }
                    generated_signature = crypto
                        .createHmac('sha256', secret)
                        .update(razorpayOrderId + '|' + razorpayPaymentId)
                        .digest('hex');
                    return [2 /*return*/, generated_signature === signature];
                });
            });
        };
        /**
         * Atomically verify payment and create booking in a single transaction.
         * Ensures that if booking creation fails, no partial state is left behind,
         * and if verification fails, no booking is created.
         */
        PaymentsService_1.prototype.verifyAndCreateBooking = function (razorpayOrderId, razorpayPaymentId, signature, bookingData) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyPayment(razorpayOrderId, razorpayPaymentId, signature)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new Error('Invalid payment signature');
                            }
                            // Step 2: Create booking + payment record atomically in a transaction
                            return [2 /*return*/, this.createBookingAfterPayment(bookingData, razorpayOrderId, razorpayPaymentId)];
                    }
                });
            });
        };
        /**
         * Atomically verify payment and create subscription in a single transaction.
         * Ensures that if subscription creation fails, no partial state is left behind.
         */
        PaymentsService_1.prototype.verifyAndCreateSubscription = function (razorpayOrderId, razorpayPaymentId, signature, subscriptionData) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyPayment(razorpayOrderId, razorpayPaymentId, signature)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new Error('Invalid payment signature');
                            }
                            // Step 2: Create subscription + payment record atomically in a transaction
                            return [2 /*return*/, this.createSubscriptionAfterPayment(subscriptionData, razorpayOrderId, razorpayPaymentId)];
                    }
                });
            });
        };
        PaymentsService_1.prototype.convertToTimeString = function (dateInput) {
            if (!dateInput)
                return '';
            var date = new Date(dateInput);
            var hours = String(date.getHours()).padStart(2, '0');
            var minutes = String(date.getMinutes()).padStart(2, '0');
            var seconds = String(date.getSeconds()).padStart(2, '0');
            return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
        };
        PaymentsService_1.prototype.convertToDateString = function (dateInput) {
            if (!dateInput)
                return '';
            var date = new Date(dateInput);
            var year = date.getFullYear();
            var month = String(date.getMonth() + 1).padStart(2, '0');
            var day = String(date.getDate()).padStart(2, '0');
            return "".concat(year, "-").concat(month, "-").concat(day);
        };
        PaymentsService_1.prototype.createBookingAfterPayment = function (bookingData, razorpayOrderId, razorpayPaymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, booking, bookingRepo, validBookingData, srId, serviceRequest, errorMsg, userIdStr, user, userIdInt, user, workerIdValue, workerIdStr, worker, serviceIdValue, serviceIdStr, service, amountValue, generatedOtp, bookingRepo, newBooking, slotRepo, slot, guestToken, paymentRepo, payment, workerId, Worker_1, worker, serviceName, bookingDate, error_1, errorMsg, notificationFcmToken, notificationSource, user, error_2, errorMsg, serviceName, bookingDate, error_3, errorMsg, error_4;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.logger.log("Creating booking after payment for order: ".concat(razorpayOrderId));
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, 54, 56, 58]);
                            booking = void 0;
                            if (!bookingData.id) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.bookingsService.findOne(bookingData.id)];
                        case 4:
                            booking = _e.sent();
                            if (!booking) {
                                throw new Error("Booking with id ".concat(bookingData.id, " not found"));
                            }
                            // Update booking with payment info
                            return [4 /*yield*/, queryRunner.manager.update('Booking', booking.id, {
                                    isPaid: true,
                                    status: 'confirmed',
                                })];
                        case 5:
                            // Update booking with payment info
                            _e.sent();
                            bookingRepo = queryRunner.manager.getRepository('Booking');
                            return [4 /*yield*/, bookingRepo.findOne({
                                    where: { id: booking.id },
                                    select: ['id', 'publicId', 'userId', 'workerId', 'serviceId', 'serviceRequestId', 'date', 'startTime', 'endTime', 'totalAmount', 'amount', 'status', 'isPaid', 'type', 'notes', 'location', 'guestFcmToken'],
                                    relations: ['worker', 'worker.user', 'service', 'user'],
                                })];
                        case 6:
                            booking = _e.sent();
                            // ✅ Validate persistence actually succeeded
                            if (!booking) {
                                throw new Error("Booking ".concat(bookingData.id, " vanished after update - persistence failure"));
                            }
                            if (!booking.isPaid) {
                                throw new Error("Booking ".concat(booking.id, " was not marked as paid in database - critical persistence failure"));
                            }
                            if (booking.status !== 'confirmed') {
                                throw new Error("Booking ".concat(booking.id, " status was not updated to confirmed - persistence failure"));
                            }
                            this.logger.log("\u2705 Verified booking ".concat(booking.id, " persisted correctly: isPaid=").concat(booking.isPaid, ", status=").concat(booking.status));
                            return [3 /*break*/, 32];
                        case 7:
                            validBookingData = {};
                            if (!(bookingData.assignmentId || bookingData.serviceRequestId)) return [3 /*break*/, 12];
                            validBookingData.serviceRequestId =
                                bookingData.assignmentId || bookingData.serviceRequestId;
                            srId = bookingData.assignmentId || bookingData.serviceRequestId;
                            this.logger.debug("Looking for service request with ID: ".concat(srId, ", Type: ").concat(typeof srId));
                            serviceRequest = void 0;
                            if (!String(srId).includes('-')) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.dataSource.query('SELECT id, date, "serviceId", "assignedWorkerId", "assignedSlotId" FROM service_request WHERE publicId = $1 LIMIT 1', [srId])];
                        case 8:
                            // It's a UUID (publicId)
                            serviceRequest = _e.sent();
                            this.logger.debug('Querying by publicId');
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.dataSource.query('SELECT id, date, "serviceId", "assignedWorkerId", "assignedSlotId" FROM service_request WHERE id = $1 LIMIT 1', [parseInt(srId)])];
                        case 10:
                            // It's a numeric ID
                            serviceRequest = _e.sent();
                            this.logger.debug('Querying by numeric ID');
                            _e.label = 11;
                        case 11:
                            this.logger.debug("Service request query result: ".concat(JSON.stringify(serviceRequest)));
                            if (serviceRequest && serviceRequest.length > 0 && serviceRequest[0].date) {
                                validBookingData.date = this.convertToDateString(serviceRequest[0].date);
                                this.logger.debug("Got date from service request: ".concat(validBookingData.date));
                                if (serviceRequest[0].serviceId) {
                                    validBookingData.serviceId = serviceRequest[0].serviceId;
                                    this.logger.debug("Got serviceId from service request: ".concat(validBookingData.serviceId));
                                }
                                if (serviceRequest[0].assignedWorkerId) {
                                    validBookingData.workerId = serviceRequest[0].assignedWorkerId;
                                    this.logger.debug("Got workerId from service request: ".concat(validBookingData.workerId));
                                }
                                if (serviceRequest[0].assignedSlotId) {
                                    validBookingData.slotId = serviceRequest[0].assignedSlotId;
                                    this.logger.debug("Got slotId from service request: ".concat(validBookingData.slotId));
                                }
                            }
                            else {
                                errorMsg = "Service request ".concat(srId, " does not have a valid date. Cannot create booking.");
                                this.logger.error(errorMsg);
                                throw new Error(errorMsg);
                            }
                            return [3 /*break*/, 23];
                        case 12:
                            if (!bookingData.userId) return [3 /*break*/, 16];
                            userIdStr = String(bookingData.userId);
                            if (!userIdStr.includes('-')) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: userIdStr },
                                })];
                        case 13:
                            user = _e.sent();
                            if (user) {
                                validBookingData.userId = userIdStr; // Use the UUID directly
                            }
                            else {
                                this.logger.warn("User not found for publicId: ".concat(userIdStr));
                                throw new Error("User with publicId ".concat(userIdStr, " not found"));
                            }
                            return [3 /*break*/, 16];
                        case 14:
                            userIdInt = parseInt(userIdStr);
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: userIdInt },
                                })];
                        case 15:
                            user = _e.sent();
                            if (user) {
                                validBookingData.userId = user.publicId; // Use the UUID publicId
                            }
                            else {
                                this.logger.warn("User not found for id: ".concat(userIdInt));
                                throw new Error("User with id ".concat(userIdInt, " not found"));
                            }
                            _e.label = 16;
                        case 16:
                            workerIdValue = bookingData.worker || bookingData.workerId;
                            if (!workerIdValue) return [3 /*break*/, 19];
                            workerIdStr = String(workerIdValue);
                            if (!workerIdStr.includes('-')) return [3 /*break*/, 18];
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { publicId: workerIdStr },
                                })];
                        case 17:
                            worker = _e.sent();
                            if (worker) {
                                validBookingData.workerId = worker.id;
                            }
                            else {
                                this.logger.warn("Worker not found for publicId: ".concat(workerIdStr));
                            }
                            return [3 /*break*/, 19];
                        case 18:
                            validBookingData.workerId = parseInt(workerIdStr);
                            _e.label = 19;
                        case 19:
                            serviceIdValue = bookingData.service || bookingData.serviceId;
                            if (!serviceIdValue) return [3 /*break*/, 22];
                            serviceIdStr = String(serviceIdValue);
                            if (!serviceIdStr.includes('-')) return [3 /*break*/, 21];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { publicId: serviceIdStr },
                                })];
                        case 20:
                            service = _e.sent();
                            if (service) {
                                validBookingData.serviceId = service.id;
                            }
                            else {
                                this.logger.warn("Service not found for publicId: ".concat(serviceIdStr));
                            }
                            return [3 /*break*/, 22];
                        case 21:
                            validBookingData.serviceId = parseInt(serviceIdStr);
                            _e.label = 22;
                        case 22:
                            if (bookingData.startTime)
                                validBookingData.startTime = this.convertToTimeString(bookingData.startTime);
                            if (bookingData.endTime)
                                validBookingData.endTime = this.convertToTimeString(bookingData.endTime);
                            if (bookingData.date) {
                                validBookingData.date = this.convertToDateString(bookingData.date);
                            }
                            else if (bookingData.startTime) {
                                // Extract date from startTime datetime string
                                validBookingData.date = this.convertToDateString(bookingData.startTime);
                            }
                            // Handle amount - FIX: The amount from payment verification is in paise, convert to rupees
                            // bookingData.amount comes from Razorpay which uses paise (1200 rupees = 120000 paise)
                            if (bookingData.amount !== undefined) {
                                amountValue = Number(bookingData.amount) / 100;
                                this.logger.debug("bookingData.amount = ".concat(bookingData.amount, " -> converted to ").concat(amountValue));
                                validBookingData.totalAmount = amountValue;
                                validBookingData.amount = amountValue;
                            }
                            // Get date from startTime if available (extracted from service request)
                            if (bookingData.startTime && !validBookingData.date) {
                                validBookingData.date = this.convertToDateString(bookingData.startTime);
                            }
                            if (bookingData.notes)
                                validBookingData.notes = bookingData.notes;
                            if (bookingData.type)
                                validBookingData.type = bookingData.type;
                            if (bookingData.metadata)
                                validBookingData.metadata = bookingData.metadata;
                            if (bookingData.location)
                                validBookingData.location = bookingData.location;
                            // Save FCM token to booking for notification delivery
                            if (bookingData.fcmToken) {
                                validBookingData.guestFcmToken = bookingData.fcmToken;
                                this.logger.log("Saved FCM token to booking data for notification delivery");
                            }
                            _e.label = 23;
                        case 23:
                            generatedOtp = undefined;
                            if (!validBookingData.type || validBookingData.type === 'on_demand') {
                                generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
                            }
                            bookingRepo = queryRunner.manager.getRepository('Booking');
                            newBooking = bookingRepo.create(__assign(__assign({}, validBookingData), { isPaid: true, status: 'confirmed', otp: generatedOtp, isOtpVerified: false }));
                            return [4 /*yield*/, bookingRepo.save(newBooking)];
                        case 24:
                            booking = _e.sent();
                            if (!validBookingData.slotId) return [3 /*break*/, 27];
                            slotRepo = queryRunner.manager.getRepository('Slot');
                            return [4 /*yield*/, slotRepo.findOne({
                                    where: { id: validBookingData.slotId },
                                    lock: { mode: 'pessimistic_write' },
                                })];
                        case 25:
                            slot = _e.sent();
                            if (!slot) {
                                throw new Error("Slot ".concat(validBookingData.slotId, " not found"));
                            }
                            if (slot.isBooked) {
                                throw new Error("Slot ".concat(validBookingData.slotId, " is already booked by another user"));
                            }
                            slot.isBooked = true;
                            slot.currentBookings += 1;
                            return [4 /*yield*/, slotRepo.save(slot)];
                        case 26:
                            _e.sent();
                            this.logger.log("Locked slot ".concat(validBookingData.slotId, " successfully after payment"));
                            _e.label = 27;
                        case 27:
                            if (!bookingData.deviceId) return [3 /*break*/, 30];
                            return [4 /*yield*/, this.fcmGuestTokenService.getToken(bookingData.deviceId)];
                        case 28:
                            guestToken = _e.sent();
                            if (!guestToken) return [3 /*break*/, 30];
                            return [4 /*yield*/, bookingRepo.update({ id: booking.id }, { guestFcmToken: guestToken })];
                        case 29:
                            _e.sent();
                            this.logger.log("Attached guest FCM token to booking ".concat(booking.id, " via deviceId ").concat(bookingData.deviceId));
                            _e.label = 30;
                        case 30: return [4 /*yield*/, bookingRepo.findOne({
                                where: { id: booking.id },
                                select: ['id', 'publicId', 'userId', 'workerId', 'serviceId',
                                    'serviceRequestId', 'date', 'startTime', 'endTime',
                                    'totalAmount', 'amount', 'status', 'isPaid', 'type',
                                    'notes', 'location', 'guestFcmToken',
                                ],
                                relations: ['worker', 'worker.user', 'service', 'user'],
                            })];
                        case 31:
                            // Fetch the booking with related data for the response
                            booking = _e.sent();
                            _e.label = 32;
                        case 32:
                            paymentRepo = queryRunner.manager.getRepository(payment_entity_1.Payment);
                            payment = paymentRepo.create({
                                publicId: (0, uuid_1.v4)(),
                                transactionId: razorpayPaymentId,
                                orderId: razorpayOrderId,
                                amount: bookingData.amount ? bookingData.amount / 100 : 0,
                                paymentMethod: 'RAZORPAY',
                                status: payment_entity_1.PaymentStatus.COMPLETED,
                                booking: { id: booking.id },
                                paidAt: new Date(),
                            });
                            return [4 /*yield*/, paymentRepo.save(payment)];
                        case 33:
                            _e.sent();
                            // Commit transaction
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 34:
                            // Commit transaction
                            _e.sent();
                            this.logger.log("Payment and booking transaction completed successfully for booking: ".concat(booking.id));
                            if (!(booking.workerId || booking.assignedWorkerId)) return [3 /*break*/, 39];
                            workerId = booking.workerId || booking.assignedWorkerId;
                            this.logger.log("Payment complete for booking ".concat(booking.id, ", notifying worker ").concat(workerId));
                            Worker_1 = require('../workers/entities/worker.entity').Worker;
                            return [4 /*yield*/, this.dataSource.getRepository('Worker').findOne({
                                    where: { id: workerId },
                                    relations: ['user'],
                                })];
                        case 35:
                            worker = _e.sent();
                            if (!worker) return [3 /*break*/, 39];
                            serviceName = ((_a = booking.service) === null || _a === void 0 ? void 0 : _a.name) || 'Service';
                            bookingDate = booking.date || new Date().toISOString().split('T')[0];
                            _e.label = 36;
                        case 36:
                            _e.trys.push([36, 38, , 39]);
                            return [4 /*yield*/, this.notificationsService.sendFullScreenPushNotification(worker.fcmToken, 'नई बुकिंग मिली! 🎉', "".concat(serviceName, " - ").concat(bookingDate, " \u0915\u094B\u0964 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u092A\u0924\u093E \u0914\u0930 \u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0910\u092A \u0916\u094B\u0932\u0947\u0902\u0964"), {
                                    type: 'new_booking',
                                    bookingId: booking.id.toString(),
                                    serviceName: serviceName,
                                    serviceDate: bookingDate,
                                    startTime: (_b = booking.startTime) !== null && _b !== void 0 ? _b : '',
                                    assignmentType: booking.type || 'on_demand',
                                    timestamp: new Date().toISOString(),
                                })];
                        case 37:
                            _e.sent();
                            this.logger.log("Sent full-screen payment-confirmed notification to worker ".concat(workerId, " for booking ").concat(booking.id));
                            return [3 /*break*/, 39];
                        case 38:
                            error_1 = _e.sent();
                            errorMsg = error_1 instanceof Error ? error_1.message : String(error_1);
                            this.logger.error("Error sending notification to worker ".concat(workerId, ": ").concat(errorMsg));
                            return [3 /*break*/, 39];
                        case 39:
                            notificationFcmToken = null;
                            notificationSource = 'none';
                            if (!booking.userId) return [3 /*break*/, 47];
                            this.logger.log("Payment complete for booking ".concat(booking.id, ", checking customer ").concat(booking.userId));
                            _e.label = 40;
                        case 40:
                            _e.trys.push([40, 46, , 47]);
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: booking.userId }
                                })];
                        case 41:
                            user = _e.sent();
                            if (!(user && user.fcmToken)) return [3 /*break*/, 42];
                            notificationFcmToken = user.fcmToken;
                            notificationSource = 'authenticated_user';
                            this.logger.debug("Using authenticated user FCM token for booking ".concat(booking.id));
                            return [3 /*break*/, 45];
                        case 42:
                            if (!(user && !user.fcmToken && booking.guestFcmToken)) return [3 /*break*/, 44];
                            // ✅ AUTO-MIGRATION: Save guest token to user profile permanently
                            this.logger.log("\uD83D\uDD04 Auto-migrating guest FCM token to user ".concat(booking.userId));
                            // Direct update via repository (no UsersService dependency required)
                            // Update by publicId since booking.userId is User.publicId (UUID)
                            return [4 /*yield*/, this.usersRepository.update({ publicId: booking.userId }, {
                                    fcmToken: booking.guestFcmToken.trim(),
                                    updatedAt: new Date()
                                })];
                        case 43:
                            // Direct update via repository (no UsersService dependency required)
                            // Update by publicId since booking.userId is User.publicId (UUID)
                            _e.sent();
                            notificationFcmToken = booking.guestFcmToken;
                            notificationSource = 'auto_migrated_guest_token';
                            this.logger.log("\u2705 Successfully migrated FCM token for user ".concat(booking.userId));
                            return [3 /*break*/, 45];
                        case 44:
                            this.logger.debug("User ".concat(booking.userId, " has no FCM token, checking booking guest token"));
                            _e.label = 45;
                        case 45: return [3 /*break*/, 47];
                        case 46:
                            error_2 = _e.sent();
                            errorMsg = error_2 instanceof Error ? error_2.message : String(error_2);
                            this.logger.error("Error loading user ".concat(booking.userId, ": ").concat(errorMsg));
                            return [3 /*break*/, 47];
                        case 47:
                            // ✅ FALLBACK: Check for guest FCM token attached directly to booking
                            if (!notificationFcmToken && booking.guestFcmToken) {
                                notificationFcmToken = booking.guestFcmToken;
                                notificationSource = 'guest_booking_token';
                                this.logger.debug("Using GUEST FCM token attached to booking ".concat(booking.id));
                            }
                            if (!notificationFcmToken) return [3 /*break*/, 52];
                            serviceName = ((_c = booking.service) === null || _c === void 0 ? void 0 : _c.name) || 'Service';
                            bookingDate = booking.date || new Date().toISOString().split('T')[0];
                            _e.label = 48;
                        case 48:
                            _e.trys.push([48, 50, , 51]);
                            return [4 /*yield*/, this.notificationsService.sendPushNotification(notificationFcmToken, 'Booking Confirmed ✅', "Your ".concat(serviceName, " booking for ").concat(bookingDate, " has been confirmed successfully. We have assigned a worker for your service."), {
                                    type: 'booking_confirmed',
                                    bookingId: booking.id.toString(),
                                    serviceName: serviceName,
                                    serviceDate: bookingDate,
                                    startTime: (_d = booking.startTime) !== null && _d !== void 0 ? _d : '',
                                    timestamp: new Date().toISOString(),
                                })];
                        case 49:
                            _e.sent();
                            this.logger.log("\u2705 Sent booking confirmation notification to customer for booking ".concat(booking.id, " (source: ").concat(notificationSource, ")"));
                            return [3 /*break*/, 51];
                        case 50:
                            error_3 = _e.sent();
                            errorMsg = error_3 instanceof Error ? error_3.message : String(error_3);
                            this.logger.error("\u274C Error sending notification for booking ".concat(booking.id, ": ").concat(errorMsg));
                            this.logger.debug("Full error: ".concat(error_3));
                            return [3 /*break*/, 51];
                        case 51: return [3 /*break*/, 53];
                        case 52:
                            this.logger.warn("\u26A0\uFE0F NO FCM TOKEN FOUND for booking ".concat(booking.id, " - cannot send customer confirmation"));
                            this.logger.debug("userId = ".concat(booking.userId, ", guestFcmToken exists = ").concat(!!booking.guestFcmToken));
                            _e.label = 53;
                        case 53: 
                        // Serialize the booking to ensure relations are included in response
                        return [2 /*return*/, this.serializeBooking(booking)];
                        case 54:
                            error_4 = _e.sent();
                            // Rollback transaction on error
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 55:
                            // Rollback transaction on error
                            _e.sent();
                            this.logger.error("Payment transaction failed: ".concat(error_4.message), error_4.stack);
                            throw new Error("Payment processing failed: ".concat(error_4.message));
                        case 56: return [4 /*yield*/, queryRunner.release()];
                        case 57:
                            _e.sent();
                            return [7 /*endfinally*/];
                        case 58: return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.createSubscriptionAfterPayment = function (subscriptionData, razorpayOrderId, razorpayPaymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, subscription, subscriptionRepo, SubscriptionStatus, serviceProfileId, existingSubscription, newSubscription, error_5, existingSubscription_1, paymentRepo, payment, assignmentQueryRunner, userRepo, user, bookingsRepo, startDate, firstBooking, genError_1, assignmentError_1, error_6;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.logger.log("Creating subscription after payment for order: ".concat(razorpayOrderId));
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 35, 37, 39]);
                            subscription = void 0;
                            if (!subscriptionData.id) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.subscriptionsService.getSubscriptionById(subscriptionData.id)];
                        case 4:
                            subscription = _c.sent();
                            if (!subscription) {
                                throw new Error("Subscription with id ".concat(subscriptionData.id, " not found"));
                            }
                            // Update subscription status
                            return [4 /*yield*/, queryRunner.manager.update('Subscription', subscription.id, {
                                    status: 'active',
                                    isPaid: true,
                                })];
                        case 5:
                            // Update subscription status
                            _c.sent();
                            return [3 /*break*/, 18];
                        case 6:
                            subscriptionRepo = queryRunner.manager.getRepository('Subscription');
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../subscriptions/entities/subscription.entity')); })];
                        case 7:
                            SubscriptionStatus = (_c.sent()).SubscriptionStatus;
                            // ✅ CORRECT FIX: Subscriptions table expects UUID (publicId) for userId column
                            // Subscription entity joins User on publicId, not internal integer id
                            // subscriptionData.userId is already the correct UUID publicId, use it directly
                            // 🔍 DEBUG LOG
                            this.logger.log('🔍 subscriptionData payload:', JSON.stringify(subscriptionData, null, 2));
                            serviceProfileId = (_a = subscriptionData.serviceProfileId) !== null && _a !== void 0 ? _a : subscriptionData.profileId;
                            // If serviceProfileId is null, check if customPlanData is provided
                            if (serviceProfileId == null) {
                                if (subscriptionData.customPlanData) {
                                    // Use customPlanData as primary source - no need to look up ServiceProfile
                                    this.logger.log("\uD83D\uDD0D Using customPlanData for subscription creation (no serviceProfileId provided)");
                                    // serviceProfileId remains null, which is now allowed
                                }
                                else {
                                    // Neither serviceProfileId nor customPlanData provided - throw error
                                    throw new Error('Cannot create subscription: Neither serviceProfileId nor customPlanData provided');
                                }
                            }
                            this.logger.log("\uD83D\uDD0D Final selected serviceProfileId: ".concat(serviceProfileId));
                            existingSubscription = null;
                            if (!subscriptionData.customPlanData) return [3 /*break*/, 8];
                            // For custom plans, NEVER reuse existing subscriptions
                            // User might want multiple different custom services
                            this.logger.log("\uD83D\uDD0D Custom plan detected - always creating NEW subscription (not reusing existing)");
                            return [3 /*break*/, 10];
                        case 8:
                            if (!serviceProfileId) return [3 /*break*/, 10];
                            // For serviceProfileId subscriptions, only reuse if SAME serviceProfileId
                            this.logger.log("\uD83D\uDD0D Checking for existing active subscription for user ".concat(subscriptionData.userId, " with serviceProfileId ").concat(serviceProfileId));
                            return [4 /*yield*/, subscriptionRepo.findOne({
                                    select: ['id'],
                                    where: {
                                        userId: subscriptionData.userId,
                                        serviceProfileId: serviceProfileId,
                                        status: SubscriptionStatus.ACTIVE
                                    }
                                })];
                        case 9:
                            existingSubscription = _c.sent();
                            _c.label = 10;
                        case 10:
                            if (!existingSubscription) return [3 /*break*/, 11];
                            this.logger.log("\u2705 Found existing active subscription id=".concat(existingSubscription.id, " for same serviceProfileId, reusing instead of creating new one"));
                            // Existing active subscription is already paid - no need to update
                            subscription = existingSubscription;
                            return [3 /*break*/, 18];
                        case 11:
                            this.logger.log("\uD83D\uDD04 No existing active subscription found (or custom plan), creating new subscription");
                            _c.label = 12;
                        case 12:
                            _c.trys.push([12, 14, , 18]);
                            newSubscription = subscriptionRepo.create({
                                publicId: (0, uuid_1.v4)(), // Generate unique publicId
                                userId: subscriptionData.userId, // ✅ Using UUID publicId directly as expected by schema
                                serviceProfileId: serviceProfileId,
                                preferredTimeWindow: subscriptionData.preferredTimeWindow,
                                startDate: new Date(subscriptionData.startDate),
                                location: subscriptionData.location,
                                monthlyPriceSnapshot: (_b = subscriptionData.monthlyPriceSnapshot) !== null && _b !== void 0 ? _b : 0, // Default to 0 if null
                                status: SubscriptionStatus.ACTIVE,
                                isPaid: true,
                                customPlanData: subscriptionData.customPlanData || null, // ✅ Save custom plan data
                            });
                            return [4 /*yield*/, subscriptionRepo.save(newSubscription)];
                        case 13:
                            subscription = _c.sent();
                            return [3 /*break*/, 18];
                        case 14:
                            error_5 = _c.sent();
                            if (!(error_5.code === '23505')) return [3 /*break*/, 16];
                            this.logger.warn("Duplicate key error caught for user ".concat(subscriptionData.userId, " and serviceProfileId ").concat(serviceProfileId, ". Fetching existing subscription."));
                            return [4 /*yield*/, subscriptionRepo.findOne({
                                    select: ['id'],
                                    where: {
                                        userId: subscriptionData.userId,
                                        serviceProfileId: serviceProfileId,
                                        status: SubscriptionStatus.ACTIVE
                                    }
                                })];
                        case 15:
                            existingSubscription_1 = _c.sent();
                            if (existingSubscription_1) {
                                this.logger.log("\u2705 Found existing active subscription id=".concat(existingSubscription_1.id, " after duplicate key error, returning it"));
                                subscription = existingSubscription_1;
                            }
                            else {
                                // If we somehow still don't find it, re-throw the original error
                                this.logger.error("Duplicate key error but no existing subscription found for user ".concat(subscriptionData.userId, " and serviceProfileId ").concat(serviceProfileId));
                                throw error_5;
                            }
                            return [3 /*break*/, 17];
                        case 16: 
                        // Re-throw non-duplicate key errors
                        throw error_5;
                        case 17: return [3 /*break*/, 18];
                        case 18:
                            paymentRepo = queryRunner.manager.getRepository(payment_entity_1.Payment);
                            payment = paymentRepo.create({
                                publicId: (0, uuid_1.v4)(),
                                transactionId: razorpayPaymentId,
                                orderId: razorpayOrderId,
                                amount: subscriptionData.amount ? subscriptionData.amount / 100 : 0,
                                paymentMethod: 'RAZORPAY',
                                status: payment_entity_1.PaymentStatus.COMPLETED,
                                subscription: { id: subscription.id },
                                paidAt: new Date(),
                            });
                            return [4 /*yield*/, paymentRepo.save(payment)];
                        case 19:
                            _c.sent();
                            // Commit transaction
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 20:
                            // Commit transaction
                            _c.sent();
                            this.logger.log("Payment and subscription transaction completed successfully for subscription: ".concat(subscription.id));
                            _c.label = 21;
                        case 21:
                            _c.trys.push([21, 33, , 34]);
                            if (!(subscriptionData && subscriptionData.startDate)) return [3 /*break*/, 32];
                            assignmentQueryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, assignmentQueryRunner.connect()];
                        case 22:
                            _c.sent();
                            userRepo = assignmentQueryRunner.manager.getRepository('user');
                            return [4 /*yield*/, userRepo.findOne({
                                    where: { publicId: subscription.userId },
                                })];
                        case 23:
                            user = _c.sent();
                            if (!!user) return [3 /*break*/, 25];
                            this.logger.warn("User not found for publicId: ".concat(subscription.userId, " - cannot assign worker"));
                            return [4 /*yield*/, assignmentQueryRunner.release()];
                        case 24:
                            _c.sent();
                            return [3 /*break*/, 32];
                        case 25:
                            bookingsRepo = assignmentQueryRunner.manager.getRepository('booking');
                            startDate = new Date(subscriptionData.startDate);
                            return [4 /*yield*/, bookingsRepo.findOne({
                                    where: {
                                        userId: user.publicId, // ✅ FIX: Use UUID publicId (booking.userId is UUID, not integer)
                                        date: startDate,
                                    },
                                    order: { id: 'ASC' },
                                })];
                        case 26:
                            firstBooking = _c.sent();
                            return [4 /*yield*/, assignmentQueryRunner.release()];
                        case 27:
                            _c.sent();
                            if (!(firstBooking && firstBooking.id)) return [3 /*break*/, 28];
                            this.logger.log("Found first booking for subscription ".concat(subscription.id, ", booking ").concat(firstBooking.id, " - worker assignment will be handled by scheduler"));
                            return [3 /*break*/, 32];
                        case 28:
                            this.logger.warn("No upcoming bookings found for subscription ".concat(subscription.id, ". Generating new weekly bookings..."));
                            _c.label = 29;
                        case 29:
                            _c.trys.push([29, 31, , 32]);
                            return [4 /*yield*/, this.subscriptionsService.generateBookingsForSubscription(subscription.id, startDate)];
                        case 30:
                            _c.sent();
                            this.logger.log("\u2705 Successfully generated new bookings for subscription ".concat(subscription.id));
                            return [3 /*break*/, 32];
                        case 31:
                            genError_1 = _c.sent();
                            this.logger.error("Failed to generate bookings for subscription ".concat(subscription.id, ": ").concat(genError_1.message), genError_1.stack);
                            return [3 /*break*/, 32];
                        case 32: return [3 /*break*/, 34];
                        case 33:
                            assignmentError_1 = _c.sent();
                            this.logger.error("Failed to trigger immediate assignment for subscription ".concat(subscription.id, ": ").concat(assignmentError_1.message), assignmentError_1.stack);
                            return [3 /*break*/, 34];
                        case 34: return [2 /*return*/, subscription];
                        case 35:
                            error_6 = _c.sent();
                            // Rollback transaction on error
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 36:
                            // Rollback transaction on error
                            _c.sent();
                            this.logger.error("Subscription payment transaction failed: ".concat(error_6.message), error_6.stack);
                            throw new Error("Subscription payment processing failed: ".concat(error_6.message));
                        case 37: return [4 /*yield*/, queryRunner.release()];
                        case 38:
                            _c.sent();
                            return [7 /*endfinally*/];
                        case 39: return [2 /*return*/];
                    }
                });
            });
        };
        return PaymentsService_1;
    }());
    __setFunctionName(_classThis, "PaymentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsService = _classThis;
}();
exports.PaymentsService = PaymentsService;
