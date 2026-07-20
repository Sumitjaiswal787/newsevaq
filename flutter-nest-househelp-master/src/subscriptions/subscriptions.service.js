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
exports.SubscriptionsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var subscription_entity_1 = require("./entities/subscription.entity");
var service_profile_entity_1 = require("../service-profiles/entities/service-profile.entity");
var booking_entity_1 = require("../bookings/entities/booking.entity");
var service_entity_1 = require("../services/entities/service.entity");
var user_entity_1 = require("../users/entities/user.entity");
var uuid_1 = require("uuid");
var SubscriptionsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SubscriptionsService = _classThis = /** @class */ (function () {
        function SubscriptionsService_1(subscriptionRepository, bookingsRepository, serviceProfilesService, dataSource, subscriptionWorkerSyncService, notificationsService) {
            this.subscriptionRepository = subscriptionRepository;
            this.bookingsRepository = bookingsRepository;
            this.serviceProfilesService = serviceProfilesService;
            this.dataSource = dataSource;
            this.subscriptionWorkerSyncService = subscriptionWorkerSyncService;
            this.notificationsService = notificationsService;
            this.logger = new common_1.Logger(SubscriptionsService.name);
        }
        /**
         * Map service type to a numeric service ID for booking assignment.
         * This ensures subscription bookings have a valid serviceId so the
         * OnDemandAssignmentScheduler can assign workers.
         */
        SubscriptionsService_1.prototype.getServiceIdForSubscription = function (serviceProfileId, customPlanData) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceType, serviceProfile, error_1, err, normalizedType, category, serviceRepo, services, allServices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(serviceProfileId !== null && serviceProfileId !== undefined)) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.serviceProfilesService.getProfileById(serviceProfileId)];
                        case 2:
                            serviceProfile = _a.sent();
                            if (serviceProfile) {
                                serviceType = serviceProfile.serviceType;
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            err = error_1;
                            this.logger.warn("Could not fetch service profile ".concat(serviceProfileId, ": ").concat(err.message));
                            return [3 /*break*/, 4];
                        case 4:
                            // 2. Fallback: try customPlanData.serviceType
                            if (!serviceType && customPlanData && customPlanData.serviceType) {
                                serviceType = customPlanData.serviceType;
                            }
                            if (!serviceType) {
                                this.logger.warn('No serviceType found for subscription, cannot determine serviceId');
                                return [2 /*return*/, undefined];
                            }
                            normalizedType = String(serviceType).toUpperCase();
                            category = null;
                            // Map using ServiceType enum values and common variants
                            // Handle both 'COOK' and 'COOKING' variants
                            if (normalizedType === service_profile_entity_1.ServiceType.COOK || normalizedType === 'COOK' || normalizedType === 'COOKING' || normalizedType.includes('COOK')) {
                                category = 'Cooking';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Cooking\""));
                            }
                            else if (normalizedType === service_profile_entity_1.ServiceType.MAID || normalizedType === 'MAID' || normalizedType.includes('MAID')) {
                                category = 'Maid';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Maid\""));
                            }
                            else if (normalizedType === service_profile_entity_1.ServiceType.CLEANING || normalizedType === 'CLEANING' || normalizedType.includes('CLEAN')) {
                                category = 'Cleaning';
                                this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to category \"Cleaning\""));
                            }
                            else {
                                this.logger.warn("Unknown serviceType \"".concat(serviceType, "\" (normalized: \"").concat(normalizedType, "\"), cannot map to category"));
                            }
                            if (!category) {
                                this.logger.error("No category mapped for serviceType \"".concat(serviceType, "\""));
                                return [2 /*return*/, undefined];
                            }
                            serviceRepo = this.dataSource.getRepository(service_entity_1.Service);
                            this.logger.log("Looking for service with category \"".concat(category, "\"..."));
                            return [4 /*yield*/, serviceRepo.find({
                                    where: { category: category },
                                    order: { basePrice: 'ASC' }, // Pick service with lowest price (typically "Home Cleaning")
                                    take: 1,
                                })];
                        case 5:
                            services = _a.sent();
                            if (services.length > 0) {
                                this.logger.log("Found service: id=".concat(services[0].id, ", name=\"").concat(services[0].name, "\", basePrice=").concat(services[0].basePrice));
                            }
                            if (!(services.length === 0)) return [3 /*break*/, 7];
                            this.logger.error("No service found for category \"".concat(category, "\". Checking all services..."));
                            return [4 /*yield*/, serviceRepo.find()];
                        case 6:
                            allServices = _a.sent();
                            this.logger.error("Available services: ".concat(JSON.stringify(allServices.map(function (s) { return ({ id: s.id, category: s.category, name: s.name }); }))));
                            return [2 /*return*/, undefined];
                        case 7:
                            this.logger.log("Mapped serviceType \"".concat(serviceType, "\" to service ID ").concat(services[0].id, " (category: ").concat(category, ")"));
                            return [2 /*return*/, services[0].id];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.createSubscription = function (userId, serviceProfileId, preferredTimeWindow, startDate, location, monthlyPriceSnapshot, customPlanData) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceProfile, existingSubscription, today, startDateNormalized, subscriptionData, subscription, savedSubscriptions, savedSubscription, mappedServiceId, generatedCount, dayOffset, bookingDate, timeWindows, _i, timeWindows_1, window_1, dateStr, locationData, generatedOtp, bookingData, booking, user, savedBooking, notifyError_1, error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            serviceProfile = null;
                            if (!(serviceProfileId !== null && serviceProfileId !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.serviceProfilesService.getProfileById(serviceProfileId)];
                        case 1:
                            serviceProfile = _b.sent();
                            if (!serviceProfile) {
                                throw new Error('Service profile not found');
                            }
                            _b.label = 2;
                        case 2:
                            existingSubscription = null;
                            if (!(serviceProfileId === null || serviceProfileId === undefined)) return [3 /*break*/, 3];
                            // For custom plans, NEVER reuse existing subscriptions
                            // User might want multiple different custom services
                            this.logger.log("\uD83D\uDD0D Custom plan detected - always creating NEW subscription (not reusing existing)");
                            return [3 /*break*/, 5];
                        case 3:
                            // For serviceProfileId subscriptions, only check if SAME serviceProfileId exists
                            this.logger.log("\uD83D\uDD0D Checking for existing active subscription for user ".concat(userId, " with serviceProfileId ").concat(serviceProfileId));
                            return [4 /*yield*/, this.subscriptionRepository.findOne({
                                    where: {
                                        userId: userId,
                                        serviceProfileId: serviceProfileId,
                                        status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                                    },
                                })];
                        case 4:
                            existingSubscription = _b.sent();
                            _b.label = 5;
                        case 5:
                            if (existingSubscription) {
                                throw new Error("You already have an active subscription for this service (Subscription #".concat(existingSubscription.id, "). Please cancel it first or manage your existing subscription."));
                            }
                            today = new Date();
                            today.setHours(0, 0, 0, 0);
                            startDateNormalized = new Date(startDate);
                            startDateNormalized.setHours(0, 0, 0, 0);
                            if (startDateNormalized < today) {
                                throw new Error('Subscription start date cannot be in the past. Please select a future date.');
                            }
                            subscriptionData = {
                                publicId: (0, uuid_1.v4)(),
                                userId: userId,
                                preferredTimeWindow: preferredTimeWindow,
                                startDate: startDate,
                                status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                                billingCycle: subscription_entity_1.BillingCycle.MONTHLY,
                                location: location,
                            };
                            // Only set serviceProfileId if it's not null (custom plan)
                            if (serviceProfileId !== null && serviceProfileId !== undefined) {
                                subscriptionData.serviceProfileId = serviceProfileId;
                            }
                            // Store customPlanData if provided (for custom plans)
                            if (customPlanData !== undefined && customPlanData !== null) {
                                subscriptionData.customPlanData = customPlanData;
                            }
                            // ✅ FIX: For custom plans, use calculatedPrice from customPlanData
                            // This ensures monthlyPriceSnapshot matches the actual calculated price
                            this.logger.log("\uD83D\uDD0D DEBUG createSubscription: monthlyPriceSnapshot param=".concat(monthlyPriceSnapshot, ", customPlanData=").concat(JSON.stringify(customPlanData)));
                            if (customPlanData && customPlanData.calculatedPrice !== undefined) {
                                this.logger.log("\uD83D\uDD0D DEBUG: Using calculatedPrice from customPlanData: ".concat(customPlanData.calculatedPrice));
                                subscriptionData.monthlyPriceSnapshot = Number(customPlanData.calculatedPrice);
                            }
                            else if (monthlyPriceSnapshot !== undefined && monthlyPriceSnapshot !== null) {
                                this.logger.log("\uD83D\uDD0D DEBUG: Using monthlyPriceSnapshot param: ".concat(monthlyPriceSnapshot));
                                subscriptionData.monthlyPriceSnapshot = monthlyPriceSnapshot;
                            }
                            else if (serviceProfile) {
                                this.logger.log("\uD83D\uDD0D DEBUG: Using serviceProfile.monthlyPrice: ".concat(serviceProfile.monthlyPrice));
                                subscriptionData.monthlyPriceSnapshot = Number(serviceProfile.monthlyPrice);
                            }
                            this.logger.log("\uD83D\uDD0D DEBUG: Final monthlyPriceSnapshot=".concat(subscriptionData.monthlyPriceSnapshot));
                            subscription = this.subscriptionRepository.create(subscriptionData);
                            if (!preferredTimeWindow) {
                                throw new Error('Preferred time window is required');
                            }
                            return [4 /*yield*/, this.subscriptionRepository.save(subscription)];
                        case 6:
                            savedSubscriptions = _b.sent();
                            savedSubscription = Array.isArray(savedSubscriptions) ? savedSubscriptions[0] : savedSubscriptions;
                            return [4 /*yield*/, this.getServiceIdForSubscription(serviceProfileId, customPlanData)];
                        case 7:
                            mappedServiceId = _b.sent();
                            if (mappedServiceId) {
                                this.logger.log("Using serviceId ".concat(mappedServiceId, " for subscription bookings"));
                            }
                            else {
                                this.logger.warn('No serviceId mapped - worker assignment may fail for these bookings');
                            }
                            generatedCount = 0;
                            dayOffset = 0;
                            _b.label = 8;
                        case 8:
                            if (!(generatedCount < 26)) return [3 /*break*/, 22];
                            bookingDate = new Date(startDate);
                            bookingDate.setDate(bookingDate.getDate() + dayOffset);
                            dayOffset++;
                            // 0 = Sunday
                            if (bookingDate.getDay() === 0) {
                                this.logger.log("Skipping Sunday ".concat(bookingDate.toISOString().split('T')[0], " for subscription bookings"));
                                return [3 /*break*/, 8];
                            }
                            timeWindows = this.getMealPlanTimeWindows(customPlanData, preferredTimeWindow);
                            _i = 0, timeWindows_1 = timeWindows;
                            _b.label = 9;
                        case 9:
                            if (!(_i < timeWindows_1.length)) return [3 /*break*/, 21];
                            window_1 = timeWindows_1[_i];
                            _b.label = 10;
                        case 10:
                            _b.trys.push([10, 19, , 20]);
                            dateStr = bookingDate.toISOString().split('T')[0];
                            locationData = {
                                lat: location.lat,
                                lng: location.lng,
                                latitude: location.lat,
                                longitude: location.lng,
                                address: location.address || '',
                            };
                            generatedOtp = undefined;
                            if (generatedCount === 0) {
                                generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
                            }
                            bookingData = {
                                userId: userId,
                                serviceId: mappedServiceId,
                                date: dateStr,
                                startTime: window_1.startTime,
                                endTime: window_1.endTime,
                                location: locationData,
                                type: booking_entity_1.BookingType.SUBSCRIPTION,
                                subscriptionId: savedSubscription.id,
                                status: booking_entity_1.BookingStatus.REQUESTED,
                                isPaid: savedSubscription.isPaid,
                                otp: generatedOtp,
                                isOtpVerified: false,
                                notes: "Auto generated for subscription ".concat(savedSubscription.id, " - Day ").concat(generatedCount + 1).concat(window_1.noteSuffix ? ' - ' + window_1.noteSuffix : ''),
                            };
                            booking = this.bookingsRepository.create(bookingData);
                            return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 11:
                            _b.sent();
                            this.logger.log("\u2705 Created booking day ".concat(generatedCount + 1, " (").concat(window_1.startTime, " - ").concat(window_1.endTime, ") for subscription ").concat(savedSubscription.id));
                            _b.label = 12;
                        case 12:
                            _b.trys.push([12, 17, , 18]);
                            return [4 /*yield*/, this.dataSource.getRepository(user_entity_1.User).findOne({
                                    where: { publicId: userId }
                                })];
                        case 13:
                            user = _b.sent();
                            if (!user) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: booking.id },
                                    relations: ['service'],
                                })];
                        case 14:
                            savedBooking = _b.sent();
                            if (!savedBooking) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.notificationsService.notifyUserBookingConfirmation(user, savedBooking)];
                        case 15:
                            _b.sent();
                            this.logger.log("\u2705 Customer notification sent for booking ".concat(booking.id, " to user ").concat(user.id));
                            _b.label = 16;
                        case 16: return [3 /*break*/, 18];
                        case 17:
                            notifyError_1 = _b.sent();
                            this.logger.error("Failed to send customer notification: ".concat(notifyError_1 instanceof Error ? notifyError_1.message : 'Unknown error'));
                            return [3 /*break*/, 18];
                        case 18: return [3 /*break*/, 20];
                        case 19:
                            error_2 = _b.sent();
                            this.logger.error("\u274C FAILED to create booking day ".concat(generatedCount + 1, " for subscription ").concat(savedSubscription.id, ": ").concat((_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _a !== void 0 ? _a : String(error_2)), error_2 === null || error_2 === void 0 ? void 0 : error_2.stack);
                            throw error_2;
                        case 20:
                            _i++;
                            return [3 /*break*/, 9];
                        case 21:
                            generatedCount++;
                            return [3 /*break*/, 8];
                        case 22:
                            this.logger.log("\u2705 SUCCESS: Created all 26 bookings for subscription ".concat(savedSubscription.id));
                            return [2 /*return*/, savedSubscription];
                    }
                });
            });
        };
        /**
           * Generate weekly bookings for an existing subscription.
           * Used when a subscription is renewed and needs future bookings.
           *
           * @param subscriptionId - The subscription ID
           * @param startDate - The start date for the first new booking
           * @param weeks - Number of weekly bookings to generate (default 4)
           */
        SubscriptionsService_1.prototype.generateBookingsForSubscription = function (subscriptionId_1, startDate_1) {
            return __awaiter(this, arguments, void 0, function (subscriptionId, startDate, weeks) {
                var subscription, userId, serviceProfileId, location, preferredTimeWindow, locationData, derivedServiceId, createdCount, generatedCount, dayOffset, bookingDate, dateStr, existing, timeWindows, _i, timeWindows_2, window_2, bookingData, booking, user, savedBooking, notifyError_2, errorMessage, error_3;
                var _a;
                if (weeks === void 0) { weeks = 4; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.subscriptionRepository.findOne({
                                where: { id: subscriptionId },
                            })];
                        case 1:
                            subscription = _b.sent();
                            if (!subscription) {
                                throw new Error("Subscription ".concat(subscriptionId, " not found"));
                            }
                            userId = subscription.userId, serviceProfileId = subscription.serviceProfileId, location = subscription.location, preferredTimeWindow = subscription.preferredTimeWindow;
                            if (!location) {
                                throw new Error("Subscription ".concat(subscriptionId, " has no location set. Cannot generate bookings."));
                            }
                            locationData = {
                                lat: location.lat,
                                lng: location.lng,
                                latitude: location.lat,
                                longitude: location.lng,
                                address: location.address || '',
                            };
                            return [4 /*yield*/, this.getServiceIdForSubscription(serviceProfileId, subscription.customPlanData)];
                        case 2:
                            derivedServiceId = _b.sent();
                            createdCount = 0;
                            generatedCount = 0;
                            dayOffset = 0;
                            _b.label = 3;
                        case 3:
                            if (!(generatedCount < 26)) return [3 /*break*/, 18];
                            bookingDate = new Date(startDate);
                            bookingDate.setDate(bookingDate.getDate() + dayOffset);
                            dayOffset++;
                            // 0 = Sunday
                            if (bookingDate.getDay() === 0) {
                                this.logger.log("Skipping Sunday ".concat(bookingDate.toISOString().split('T')[0], " for subscription bookings"));
                                return [3 /*break*/, 3];
                            }
                            dateStr = bookingDate.toISOString().split('T')[0];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: {
                                        subscriptionId: subscriptionId,
                                        date: dateStr,
                                    },
                                })];
                        case 4:
                            existing = _b.sent();
                            if (existing) {
                                this.logger.debug("Booking for ".concat(dateStr, " already exists for subscription ").concat(subscriptionId, ", skipping"));
                                generatedCount++;
                                return [3 /*break*/, 3];
                            }
                            timeWindows = this.getMealPlanTimeWindows(subscription.customPlanData, preferredTimeWindow);
                            _i = 0, timeWindows_2 = timeWindows;
                            _b.label = 5;
                        case 5:
                            if (!(_i < timeWindows_2.length)) return [3 /*break*/, 17];
                            window_2 = timeWindows_2[_i];
                            _b.label = 6;
                        case 6:
                            _b.trys.push([6, 15, , 16]);
                            bookingData = {
                                userId: userId,
                                serviceId: derivedServiceId,
                                date: dateStr,
                                startTime: window_2.startTime,
                                endTime: window_2.endTime,
                                location: locationData,
                                type: booking_entity_1.BookingType.SUBSCRIPTION,
                                subscriptionId: subscriptionId,
                                status: booking_entity_1.BookingStatus.REQUESTED,
                                notes: "Auto-generated for subscription ".concat(subscriptionId, " - Day ").concat(generatedCount + 1).concat(window_2.noteSuffix ? ' - ' + window_2.noteSuffix : ''),
                            };
                            booking = this.bookingsRepository.create(bookingData);
                            return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 7:
                            _b.sent();
                            createdCount++;
                            _b.label = 8;
                        case 8:
                            _b.trys.push([8, 13, , 14]);
                            return [4 /*yield*/, this.dataSource.getRepository(user_entity_1.User).findOne({
                                    where: { publicId: userId }
                                })];
                        case 9:
                            user = _b.sent();
                            if (!user) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: { id: booking.id },
                                    relations: ['service'],
                                })];
                        case 10:
                            savedBooking = _b.sent();
                            if (!savedBooking) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.notificationsService.notifyUserBookingConfirmation(user, savedBooking)];
                        case 11:
                            _b.sent();
                            this.logger.log("\u2705 Customer notification sent for booking ".concat(booking.id, " to user ").concat(user.id));
                            _b.label = 12;
                        case 12: return [3 /*break*/, 14];
                        case 13:
                            notifyError_2 = _b.sent();
                            errorMessage = notifyError_2 instanceof Error ? notifyError_2.message : 'Unknown error';
                            this.logger.error("Failed to send customer notification: ".concat(errorMessage));
                            return [3 /*break*/, 14];
                        case 14: return [3 /*break*/, 16];
                        case 15:
                            error_3 = _b.sent();
                            this.logger.error("\u274C FAILED to create booking day ".concat(generatedCount + 1, " for subscription ").concat(subscriptionId, ": ").concat((_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.message) !== null && _a !== void 0 ? _a : String(error_3)), error_3 === null || error_3 === void 0 ? void 0 : error_3.stack);
                            throw error_3;
                        case 16:
                            _i++;
                            return [3 /*break*/, 5];
                        case 17:
                            this.logger.log("\u2705 Created booking for day ".concat(generatedCount + 1, " for subscription ").concat(subscriptionId, " on ").concat(dateStr));
                            generatedCount++;
                            return [3 /*break*/, 3];
                        case 18:
                            this.logger.log("\u2705 Generated ".concat(createdCount, " new bookings for subscription ").concat(subscriptionId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * On application bootstrap, check for active subscriptions with no upcoming bookings
         * and generate missing weekly bookings for them
         */
        SubscriptionsService_1.prototype.onApplicationBootstrap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Running bootstrap check for subscriptions with missing bookings...');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.generateMissingBookingsForActiveSubscriptions()];
                        case 2:
                            result = _a.sent();
                            this.logger.log("Bootstrap check complete: ".concat(result.subscriptionsChecked, " subscriptions checked, ").concat(result.bookingsGenerated, " bookings generated"));
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.error("Error during bootstrap check for missing bookings: ".concat(error_4.message), error_4.stack);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Generate missing weekly bookings for all active subscriptions that have no upcoming bookings
        * This handles the case where subscriptions are renewed but no new bookings are created
        */
        SubscriptionsService_1.prototype.generateMissingBookingsForActiveSubscriptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalBookingsGenerated, subscriptionsChecked, activeSubscriptions, _i, activeSubscriptions_1, subscription, today, existingBookings, lastDate, lastBooking, location_1, locationData, derivedServiceId, generatedCount, dayOffset, bookingsCreated, bookingDate, dateStr, exists, timeWindows, _a, timeWindows_3, window_3, bookingData, booking, err_1, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            totalBookingsGenerated = 0;
                            subscriptionsChecked = 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 18, , 19]);
                            return [4 /*yield*/, this.subscriptionRepository.find({
                                    where: {
                                        status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                                    },
                                    relations: ['user', 'serviceProfile'],
                                })];
                        case 2:
                            activeSubscriptions = _b.sent();
                            this.logger.log("Found ".concat(activeSubscriptions.length, " active subscriptions to check"));
                            _i = 0, activeSubscriptions_1 = activeSubscriptions;
                            _b.label = 3;
                        case 3:
                            if (!(_i < activeSubscriptions_1.length)) return [3 /*break*/, 17];
                            subscription = activeSubscriptions_1[_i];
                            subscriptionsChecked++;
                            today = new Date().toISOString().split('T')[0];
                            return [4 /*yield*/, this.bookingsRepository.find({
                                    where: {
                                        subscriptionId: subscription.id,
                                        date: (0, typeorm_1.MoreThanOrEqual)(today),
                                    },
                                    order: { date: 'ASC' },
                                })];
                        case 4:
                            existingBookings = _b.sent();
                            if (!(existingBookings.length < 26)) return [3 /*break*/, 15];
                            this.logger.log("Subscription ".concat(subscription.id, " has only ").concat(existingBookings.length, " upcoming bookings. Generating daily bookings up to 26 working days..."));
                            lastDate = subscription.startDate ? new Date(subscription.startDate) : new Date();
                            if (existingBookings.length > 0) {
                                lastBooking = existingBookings[existingBookings.length - 1];
                                lastDate = new Date(lastBooking.date);
                                lastDate.setDate(lastDate.getDate() + 1);
                            }
                            location_1 = subscription.location || subscription.user;
                            if (!location_1) {
                                this.logger.error("Subscription ".concat(subscription.id, " has no location data. Skipping."));
                                return [3 /*break*/, 16];
                            }
                            locationData = {
                                lat: location_1.latitude || location_1.lat || 0,
                                lng: location_1.longitude || location_1.lng || 0,
                                latitude: location_1.latitude || location_1.lat || 0,
                                longitude: location_1.longitude || location_1.lng || 0,
                                address: location_1.address || '',
                            };
                            return [4 /*yield*/, this.getServiceIdForSubscription(subscription.serviceProfileId, subscription.customPlanData)];
                        case 5:
                            derivedServiceId = _b.sent();
                            generatedCount = existingBookings.length;
                            dayOffset = 0;
                            bookingsCreated = 0;
                            _b.label = 6;
                        case 6:
                            if (!(generatedCount < 26)) return [3 /*break*/, 14];
                            bookingDate = new Date(lastDate);
                            bookingDate.setDate(bookingDate.getDate() + dayOffset);
                            dayOffset++;
                            // 0 = Sunday
                            if (bookingDate.getDay() === 0) {
                                return [3 /*break*/, 6];
                            }
                            dateStr = bookingDate.toISOString().split('T')[0];
                            return [4 /*yield*/, this.bookingsRepository.findOne({
                                    where: {
                                        subscriptionId: subscription.id,
                                        date: dateStr,
                                    },
                                })];
                        case 7:
                            exists = _b.sent();
                            if (exists) {
                                generatedCount++;
                                return [3 /*break*/, 6];
                            }
                            timeWindows = this.getMealPlanTimeWindows(subscription.customPlanData, subscription.preferredTimeWindow || 'morning');
                            _a = 0, timeWindows_3 = timeWindows;
                            _b.label = 8;
                        case 8:
                            if (!(_a < timeWindows_3.length)) return [3 /*break*/, 13];
                            window_3 = timeWindows_3[_a];
                            _b.label = 9;
                        case 9:
                            _b.trys.push([9, 11, , 12]);
                            bookingData = {
                                userId: subscription.userId,
                                serviceId: derivedServiceId,
                                date: dateStr,
                                startTime: window_3.startTime,
                                endTime: window_3.endTime,
                                location: locationData,
                                type: booking_entity_1.BookingType.SUBSCRIPTION,
                                subscriptionId: subscription.id,
                                status: booking_entity_1.BookingStatus.REQUESTED,
                                notes: "Auto-generated for subscription ".concat(subscription.id, " - Day ").concat(generatedCount + 1).concat(window_3.noteSuffix ? ' - ' + window_3.noteSuffix : ''),
                            };
                            booking = this.bookingsRepository.create(bookingData);
                            return [4 /*yield*/, this.bookingsRepository.save(booking)];
                        case 10:
                            _b.sent();
                            bookingsCreated++;
                            totalBookingsGenerated++;
                            return [3 /*break*/, 12];
                        case 11:
                            err_1 = _b.sent();
                            this.logger.error("Failed to create missing booking for subscription ".concat(subscription.id, " on ").concat(dateStr, ": ").concat(err_1.message));
                            return [3 /*break*/, 12];
                        case 12:
                            _a++;
                            return [3 /*break*/, 8];
                        case 13:
                            generatedCount++;
                            return [3 /*break*/, 6];
                        case 14:
                            this.logger.log("Generated ".concat(bookingsCreated, " missing bookings for subscription ").concat(subscription.id));
                            return [3 /*break*/, 16];
                        case 15:
                            this.logger.debug("Subscription ".concat(subscription.id, " already has ").concat(existingBookings.length, " upcoming bookings, skipping"));
                            _b.label = 16;
                        case 16:
                            _i++;
                            return [3 /*break*/, 3];
                        case 17: return [2 /*return*/, {
                                subscriptionsChecked: subscriptionsChecked,
                                bookingsGenerated: totalBookingsGenerated,
                            }];
                        case 18:
                            error_5 = _b.sent();
                            this.logger.error("Error generating missing bookings: ".concat(error_5.message), error_5.stack);
                            throw error_5;
                        case 19: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Resolves a user identifier to a UUID.
         * Handles legacy integer user IDs by looking up the user's actual UUID.
         */
        SubscriptionsService_1.prototype.resolveUserIdToUuid = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var uuidRegex, userResult, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                            if (uuidRegex.test(userId)) {
                                return [2 /*return*/, userId];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.dataSource.query('SELECT "publicId" FROM "user" WHERE id::text = $1 LIMIT 1', [userId])];
                        case 2:
                            userResult = _a.sent();
                            if (userResult && userResult.length > 0) {
                                return [2 /*return*/, userResult[0].publicId];
                            }
                            // If no user found with integer ID, return original userId
                            // This will result in no subscriptions found
                            return [2 /*return*/, userId];
                        case 3:
                            error_6 = _a.sent();
                            // If query fails, return original userId
                            return [2 /*return*/, userId];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscriptionsByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvedUserId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.resolveUserIdToUuid(userId)];
                        case 1:
                            resolvedUserId = _a.sent();
                            return [2 /*return*/, this.subscriptionRepository.find({
                                    where: { userId: resolvedUserId },
                                    relations: ['serviceProfile', 'assignedWorker', 'assignedWorker.user', 'bookings', 'bookings.service'],
                                    order: { createdAt: 'DESC' },
                                })];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscriptionById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.subscriptionRepository.findOne({ where: { id: id } })];
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscriptionByPublicId = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.subscriptionRepository.findOne({ where: { publicId: publicId } })];
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscriptionsByPublicId = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // subscription.userId directly stores user publicId (UUID), no join needed
                    return [2 /*return*/, this.subscriptionRepository.find({
                            where: { userId: publicId },
                            relations: ['serviceProfile', 'assignedWorker', 'assignedWorker.user'],
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        SubscriptionsService_1.prototype.pauseSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSubscriptionById(id)];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new Error('Subscription not found');
                            }
                            subscription.status = subscription_entity_1.SubscriptionStatus.PAUSED;
                            return [2 /*return*/, this.subscriptionRepository.save(subscription)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.resumeSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSubscriptionById(id)];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new Error('Subscription not found');
                            }
                            subscription.status = subscription_entity_1.SubscriptionStatus.ACTIVE;
                            return [2 /*return*/, this.subscriptionRepository.save(subscription)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.cancelSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSubscriptionById(id)];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new Error('Subscription not found');
                            }
                            subscription.status = subscription_entity_1.SubscriptionStatus.CANCELLED;
                            subscription.endDate = new Date();
                            return [2 /*return*/, this.subscriptionRepository.save(subscription)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getActiveSubscriptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.subscriptionRepository.find({
                            where: {
                                status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                            },
                        })];
                });
            });
        };
        SubscriptionsService_1.prototype.updateSubscription = function (id, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSubscriptionById(id)];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new Error('Subscription not found');
                            }
                            Object.assign(subscription, updates);
                            return [2 /*return*/, this.subscriptionRepository.save(subscription)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscriptionsByStatus = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.subscriptionRepository.find({ where: { status: status } })];
                });
            });
        };
        /**
         * Sync worker assignment from a booking to the parent subscription
         * Updates the subscription's assignedWorkerId and related fields
         */
        SubscriptionsService_1.prototype.assignWorkerToSubscription = function (subscriptionId, workerId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Delegate to the sync service to avoid circular dependency with BookingsService
                        return [4 /*yield*/, this.subscriptionWorkerSyncService.syncWorkerToSubscription(subscriptionId, workerId)];
                        case 1:
                            // Delegate to the sync service to avoid circular dependency with BookingsService
                            _a.sent();
                            return [4 /*yield*/, this.getSubscriptionById(subscriptionId)];
                        case 2:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new Error('Subscription not found');
                            }
                            return [2 /*return*/, subscription];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getMealPlanTimeWindows = function (customPlanData, preferredTimeWindow) {
            var _a, _b;
            var customData = typeof customPlanData === 'string'
                ? JSON.parse(customPlanData)
                : customPlanData;
            var isCooking = ((_a = customData === null || customData === void 0 ? void 0 : customData.serviceType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'cooking' ||
                ((_b = customData === null || customData === void 0 ? void 0 : customData.category) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'cooking';
            var mealPlan = (customData === null || customData === void 0 ? void 0 : customData.mealPlan) || null;
            if (isCooking && mealPlan) {
                var mealPlanStr = String(mealPlan).toUpperCase();
                if (mealPlanStr === 'BF' || mealPlanStr === 'LUNCH' || mealPlanStr === 'BF_LUNCH') {
                    return [{ startTime: '06:00:00', endTime: '12:00:00', noteSuffix: 'Breakfast/Lunch shift (6 AM - 12 PM)' }];
                }
                if (mealPlanStr === 'DINNER') {
                    return [{ startTime: '16:00:00', endTime: '21:00:00', noteSuffix: 'Dinner shift (4 PM - 9 PM)' }];
                }
                if (mealPlanStr === 'LUNCH_DINNER' || mealPlanStr === 'FULL_DAY') {
                    return [
                        { startTime: '06:00:00', endTime: '12:00:00', noteSuffix: 'Breakfast/Lunch shift (6 AM - 12 PM)' },
                        { startTime: '16:00:00', endTime: '21:00:00', noteSuffix: 'Dinner shift (4 PM - 9 PM)' }
                    ];
                }
            }
            // Default legacy mapping fallback
            var startHour = 8;
            var endHour = 12;
            switch (preferredTimeWindow.toLowerCase()) {
                case 'morning':
                    startHour = 8;
                    endHour = 12;
                    break;
                case 'afternoon':
                    startHour = 12;
                    endHour = 17;
                    break;
                case 'evening':
                    startHour = 16;
                    endHour = 21;
                    break;
                case 'early-morning':
                    startHour = 6;
                    endHour = 11;
                    break;
            }
            return [{
                    startTime: "".concat(startHour.toString().padStart(2, '0'), ":00:00"),
                    endTime: "".concat(endHour.toString().padStart(2, '0'), ":00:00"),
                    noteSuffix: ''
                }];
        };
        return SubscriptionsService_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsService = _classThis;
}();
exports.SubscriptionsService = SubscriptionsService;
