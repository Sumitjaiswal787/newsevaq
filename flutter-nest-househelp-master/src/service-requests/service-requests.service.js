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
exports.ServiceRequestsService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var service_request_entity_1 = require("./entities/service-request.entity");
var subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
var ServiceRequestsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServiceRequestsService = _classThis = /** @class */ (function () {
        function ServiceRequestsService_1(serviceRequestsRepository, assignmentQueue, assignmentWorker, workersRepository, usersRepository, servicesRepository, subscriptionsRepository) {
            this.serviceRequestsRepository = serviceRequestsRepository;
            this.assignmentQueue = assignmentQueue;
            this.assignmentWorker = assignmentWorker;
            this.workersRepository = workersRepository;
            this.usersRepository = usersRepository;
            this.servicesRepository = servicesRepository;
            this.subscriptionsRepository = subscriptionsRepository;
            this.logger = new common_1.Logger(ServiceRequestsService.name);
        }
        ServiceRequestsService_1.prototype.create = function (userIdOrPublicId, // Can be either numeric ID or UUID (publicId)
        createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var numericUserId, user, service, availableServices, serviceIds, serviceRequestData, serviceRequest, savedRequest, singleRequest, userToUpdate, locErr_1, error_1, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(userIdOrPublicId.includes('-') && userIdOrPublicId.length === 36)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: userIdOrPublicId },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('User not found with the provided ID');
                            }
                            // User.id is now correctly typed as number (auto-increment)
                            numericUserId = user.id;
                            this.logger.debug("Converted publicId ".concat(userIdOrPublicId, " to numeric userId ").concat(numericUserId));
                            return [3 /*break*/, 3];
                        case 2:
                            // It's already a numeric ID
                            numericUserId = parseInt(userIdOrPublicId, 10);
                            if (isNaN(numericUserId)) {
                                throw new common_1.BadRequestException('Invalid user ID format');
                            }
                            _a.label = 3;
                        case 3:
                            if (!createDto.serviceId) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: { id: createDto.serviceId },
                                })];
                        case 4:
                            service = _a.sent();
                            if (!!service) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.servicesRepository.find({ take: 10 })];
                        case 5:
                            availableServices = _a.sent();
                            serviceIds = availableServices.map(function (s) { return "".concat(s.id, " (").concat(s.name, ")"); }).join(', ');
                            this.logger.warn("Service ID ".concat(createDto.serviceId, " not found. Available services: ").concat(serviceIds));
                            throw new common_1.BadRequestException("Service with ID ".concat(createDto.serviceId, " not found. Available service IDs: ").concat(serviceIds));
                        case 6:
                            this.logger.debug("Validated serviceId ".concat(createDto.serviceId, " -> ").concat(service.name));
                            _a.label = 7;
                        case 7:
                            serviceRequestData = {
                                publicId: (0, uuid_1.v4)(),
                                userId: numericUserId,
                                serviceId: createDto.serviceId,
                                serviceProfileId: createDto.serviceProfileId,
                                date: new Date(createDto.date),
                                timeWindow: createDto.timeWindow,
                                priceSnapshot: createDto.priceSnapshot,
                                assignmentStatus: 'REQUESTED',
                                failureReason: null,
                                assignedWorkerId: null,
                                assignedSlotId: null,
                                source: createDto.source,
                                metadata: createDto.location
                                    ? { location: createDto.location }
                                    : undefined,
                            };
                            serviceRequest = this.serviceRequestsRepository.create(serviceRequestData);
                            return [4 /*yield*/, this.serviceRequestsRepository.save(serviceRequest)];
                        case 8:
                            savedRequest = _a.sent();
                            singleRequest = Array.isArray(savedRequest)
                                ? savedRequest[0]
                                : savedRequest;
                            if (!(createDto.location && createDto.location.lat && createDto.location.lng)) return [3 /*break*/, 14];
                            _a.label = 9;
                        case 9:
                            _a.trys.push([9, 13, , 14]);
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { id: numericUserId },
                                })];
                        case 10:
                            userToUpdate = _a.sent();
                            if (!userToUpdate) return [3 /*break*/, 12];
                            userToUpdate.latitude = createDto.location.lat;
                            userToUpdate.longitude = createDto.location.lng;
                            return [4 /*yield*/, this.usersRepository.save(userToUpdate)];
                        case 11:
                            _a.sent();
                            this.logger.debug("Updated user ".concat(numericUserId, " location: ").concat(createDto.location.lat, ", ").concat(createDto.location.lng));
                            _a.label = 12;
                        case 12: return [3 /*break*/, 14];
                        case 13:
                            locErr_1 = _a.sent();
                            this.logger.warn("Failed to update user location: ".concat(locErr_1.message || locErr_1));
                            return [3 /*break*/, 14];
                        case 14:
                            _a.trys.push([14, 16, , 17]);
                            return [4 /*yield*/, this.assignmentWorker.processAssignment(singleRequest.id)];
                        case 15:
                            _a.sent();
                            this.logger.log("Assignment processing completed for service request id: ".concat(singleRequest.id, ", publicId: ").concat(singleRequest.publicId));
                            return [3 /*break*/, 17];
                        case 16:
                            error_1 = _a.sent();
                            errorMessage = error_1 instanceof Error ? error_1.message : 'Unknown error';
                            this.logger.error("Failed to process assignment for service request ".concat(singleRequest.publicId, ": ").concat(errorMessage));
                            return [3 /*break*/, 17];
                        case 17: return [2 /*return*/, singleRequest];
                    }
                });
            });
        };
        ServiceRequestsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Finding service request with id: ".concat(id));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.serviceRequestsRepository.findOne({
                                    where: { id: id },
                                })];
                        case 2:
                            result = _a.sent();
                            this.logger.log("Found service request: ".concat(result ? 'yes' : 'no'));
                            return [2 /*return*/, result];
                        case 3:
                            error_2 = _a.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : 'Unknown error';
                            errorStack = error_2 instanceof Error ? error_2.stack : undefined;
                            this.logger.error("Error finding service request ".concat(id, ": ").concat(errorMessage), errorStack);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ServiceRequestsService_1.prototype.markAsAssigned = function (requestId, workerId, slotId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                assignmentStatus: 'ASSIGNED',
                                assignedWorkerId: workerId,
                                assignedSlotId: slotId,
                                failureReason: '',
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ServiceRequestsService_1.prototype.markAsFailed = function (requestId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.serviceRequestsRepository.update(requestId, {
                                assignmentStatus: 'FAILED_TO_ASSIGN',
                                failureReason: reason,
                                assignedWorkerId: null,
                                assignedSlotId: null,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ServiceRequestsService_1.prototype.getStatus = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                var request, worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.serviceRequestsRepository.findOne({
                                where: { publicId: publicId },
                            })];
                        case 1:
                            request = _a.sent();
                            if (!request) {
                                throw new Error('Service request not found');
                            }
                            if (!(request.assignmentStatus === 'ASSIGNED' && request.assignedWorkerId)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.workersRepository.findOne({
                                    where: { id: request.assignedWorkerId },
                                    relations: ['user', 'services'],
                                })];
                        case 2:
                            worker = _a.sent();
                            if (worker) {
                                return [2 /*return*/, {
                                        assignmentStatus: request.assignmentStatus,
                                        assignedWorker: {
                                            id: worker.id,
                                            user: worker.user,
                                            bio: worker.bio,
                                            rating: worker.rating,
                                            reviewCount: worker.reviewCount,
                                            services: worker.services,
                                        },
                                    }];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, {
                                assignmentStatus: request.assignmentStatus,
                                failureReason: request.failureReason,
                            }];
                    }
                });
            });
        };
        ServiceRequestsService_1.prototype.findPendingRequests = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.serviceRequestsRepository.find({
                            where: { assignmentStatus: 'REQUESTED' },
                            take: 10, // Process up to 10 pending requests at a time
                        })];
                });
            });
        };
        ServiceRequestsService_1.prototype.triggerAssignmentProcessing = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // This method can be used to manually trigger assignment processing
                    // For now, it's a placeholder that can be expanded with actual logic
                    this.logger.log('Assignment processing triggered manually');
                    return [2 /*return*/];
                });
            });
        };
        /**
          * Get user's active booking for home screen display
          * Returns the most recent in-progress or confirmed booking
          * Also checks for active subscriptions with assigned workers
          */
        ServiceRequestsService_1.prototype.getUserActiveBooking = function (userIdOrPublicId) {
            return __awaiter(this, void 0, void 0, function () {
                var numericUserId, user, activeBooking, etaMinutes, today, nextWeek, upcomingSubscriptionBooking, now, currentHour, etaMinutes, activeSubscription, now, currentHour, etaMinutes, serviceType, operationTitle, error_3, errorMessage, errorStack;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!(userIdOrPublicId.includes('-') && userIdOrPublicId.length === 36)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: userIdOrPublicId },
                                })];
                        case 1:
                            user = _f.sent();
                            if (!user) {
                                return [2 /*return*/, null];
                            }
                            numericUserId = user.id;
                            return [3 /*break*/, 3];
                        case 2:
                            numericUserId = parseInt(userIdOrPublicId, 10);
                            if (isNaN(numericUserId)) {
                                return [2 /*return*/, null];
                            }
                            _f.label = 3;
                        case 3:
                            _f.trys.push([3, 7, , 8]);
                            return [4 /*yield*/, this.serviceRequestsRepository
                                    .createQueryBuilder('request')
                                    .leftJoinAndSelect('request.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .leftJoinAndSelect('request.service', 'service')
                                    .where('request.userId = :userId', { userId: numericUserId })
                                    .andWhere('request.assignmentStatus IN (:...statuses)', {
                                    statuses: ['ASSIGNED', 'IN_PROGRESS']
                                })
                                    .orderBy('request.createdAt', 'DESC')
                                    .limit(1)
                                    .getOne()];
                        case 4:
                            activeBooking = _f.sent();
                            if (activeBooking) {
                                etaMinutes = 24;
                                return [2 /*return*/, {
                                        operationTitle: ((_a = activeBooking.service) === null || _a === void 0 ? void 0 : _a.name) || 'Service',
                                        assignedTo: ((_b = activeBooking.worker) === null || _b === void 0 ? void 0 : _b.user)
                                            ? "".concat(activeBooking.worker.user.firstName || '', " ").concat(activeBooking.worker.user.lastName || '').trim() || 'Worker'
                                            : 'Worker',
                                        eta: "".concat(etaMinutes, " mins"),
                                        status: activeBooking.assignmentStatus,
                                    }];
                            }
                            today = new Date();
                            today.setHours(0, 0, 0, 0);
                            nextWeek = new Date(today);
                            nextWeek.setDate(nextWeek.getDate() + 7);
                            return [4 /*yield*/, this.serviceRequestsRepository
                                    .createQueryBuilder('request')
                                    .leftJoinAndSelect('request.worker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .leftJoinAndSelect('request.service', 'service')
                                    .where('request.userId = :userId', { userId: numericUserId })
                                    .andWhere('request.source = :source', { source: service_request_entity_1.ServiceRequestSource.SUBSCRIPTION })
                                    .andWhere('request.date >= :today', { today: today.toISOString().split('T')[0] })
                                    .andWhere('request.date <= :nextWeek', { nextWeek: nextWeek.toISOString().split('T')[0] })
                                    .andWhere('request.assignmentStatus IN (:...statuses)', {
                                    statuses: ['ASSIGNED', 'IN_PROGRESS', 'REQUESTED', 'CONFIRMED']
                                })
                                    .orderBy('request.date', 'ASC')
                                    .addOrderBy('request.startTime', 'ASC')
                                    .limit(1)
                                    .getOne()];
                        case 5:
                            upcomingSubscriptionBooking = _f.sent();
                            if (upcomingSubscriptionBooking) {
                                now = new Date();
                                currentHour = now.getHours();
                                etaMinutes = 24;
                                // Estimate ETA based on time window (lowercase values in DB)
                                if (upcomingSubscriptionBooking.timeWindow === 'morning' && currentHour < 12) {
                                    etaMinutes = 24;
                                }
                                else if (upcomingSubscriptionBooking.timeWindow === 'afternoon' && currentHour >= 12 && currentHour < 17) {
                                    etaMinutes = 24;
                                }
                                else if (upcomingSubscriptionBooking.timeWindow === 'evening' && currentHour >= 17) {
                                    etaMinutes = 24;
                                }
                                return [2 /*return*/, {
                                        operationTitle: ((_c = upcomingSubscriptionBooking.service) === null || _c === void 0 ? void 0 : _c.name) || 'Service',
                                        assignedTo: ((_d = upcomingSubscriptionBooking.worker) === null || _d === void 0 ? void 0 : _d.user)
                                            ? "".concat(upcomingSubscriptionBooking.worker.user.firstName || '', " ").concat(upcomingSubscriptionBooking.worker.user.lastName || '').trim() || 'Worker'
                                            : 'Worker',
                                        eta: "".concat(etaMinutes, " mins"),
                                        status: upcomingSubscriptionBooking.assignmentStatus,
                                    }];
                            }
                            return [4 /*yield*/, this.subscriptionsRepository
                                    .createQueryBuilder('subscription')
                                    .leftJoinAndSelect('subscription.assignedWorker', 'worker')
                                    .leftJoinAndSelect('worker.user', 'workerUser')
                                    .where('subscription.userId = :userId', { userId: numericUserId })
                                    .andWhere('subscription.status = :status', { status: subscription_entity_1.SubscriptionStatus.ACTIVE })
                                    .andWhere('subscription.assignedWorkerId IS NOT NULL')
                                    .orderBy('subscription.createdAt', 'DESC')
                                    .limit(1)
                                    .getOne()];
                        case 6:
                            activeSubscription = _f.sent();
                            if (activeSubscription && activeSubscription.assignedWorker) {
                                now = new Date();
                                currentHour = now.getHours();
                                etaMinutes = 24;
                                // Estimate ETA based on time window
                                if (activeSubscription.preferredTimeWindow === 'MORNING' && currentHour < 12) {
                                    etaMinutes = 24;
                                }
                                else if (activeSubscription.preferredTimeWindow === 'AFTERNOON' && currentHour >= 12 && currentHour < 17) {
                                    etaMinutes = 24;
                                }
                                else if (activeSubscription.preferredTimeWindow === 'EVENING' && currentHour >= 17) {
                                    etaMinutes = 24;
                                }
                                serviceType = ((_e = activeSubscription.customPlanData) === null || _e === void 0 ? void 0 : _e.serviceType) || 'Cleaning';
                                operationTitle = serviceType === 'CLEANING' ? 'House Cleaning' :
                                    serviceType === 'COOKING' ? 'Cooking Support' :
                                        serviceType.charAt(0).toUpperCase() + serviceType.slice(1).toLowerCase();
                                return [2 /*return*/, {
                                        operationTitle: operationTitle,
                                        assignedTo: activeSubscription.assignedWorker.user
                                            ? "".concat(activeSubscription.assignedWorker.user.firstName || '', " ").concat(activeSubscription.assignedWorker.user.lastName || '').trim() || 'Worker'
                                            : 'Worker',
                                        eta: "".concat(etaMinutes, " mins"),
                                        status: 'IN_PROGRESS',
                                    }];
                            }
                            return [2 /*return*/, null];
                        case 7:
                            error_3 = _f.sent();
                            errorMessage = error_3 instanceof Error ? error_3.message : String(error_3);
                            errorStack = error_3 instanceof Error ? error_3.stack : undefined;
                            this.logger.error("Error in getUserActiveBooking: ".concat(errorMessage), errorStack);
                            // Return null instead of throwing to avoid 500 error
                            return [2 /*return*/, null];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        return ServiceRequestsService_1;
    }());
    __setFunctionName(_classThis, "ServiceRequestsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceRequestsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceRequestsService = _classThis;
}();
exports.ServiceRequestsService = ServiceRequestsService;
