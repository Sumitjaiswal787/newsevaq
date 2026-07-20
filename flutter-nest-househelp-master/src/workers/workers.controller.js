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
exports.WorkersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var WorkersController = function () {
    var _classDecorators = [(0, common_1.Controller)('workers')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _getNearbyWorkersCount_decorators;
    var _getWorkerStats_decorators;
    var _create_decorators;
    var _getMyProfile_decorators;
    var _findOne_decorators;
    var _getMyBookings_decorators;
    var _getMyAcceptedBookings_decorators;
    var _getMyEarnings_decorators;
    var _acceptBooking_decorators;
    var _rejectBooking_decorators;
    var _startBooking_decorators;
    var _completeBooking_decorators;
    var _updateMyAvailability_decorators;
    var _updateMyProfile_decorators;
    var _updateMyName_decorators;
    var _updateMyServices_decorators;
    var _updateMyServiceArea_decorators;
    var _updateMyFcmToken_decorators;
    var _registerWorker_decorators;
    var WorkersController = _classThis = /** @class */ (function () {
        function WorkersController_1(workersService, usersRepository, usersService) {
            this.workersService = (__runInitializers(this, _instanceExtraInitializers), workersService);
            this.usersRepository = usersRepository;
            this.usersService = usersService;
            this.logger = new common_1.Logger(WorkersController.name);
        }
        WorkersController_1.prototype.findAll = function (lat, long, radius) {
            if (lat && long && radius) {
                return this.workersService.search(lat, long, radius);
            }
            return this.workersService.findAll();
        };
        /**
         * Get count of workers near a location
         * GET /workers/nearby/count?lat={lat}&lng={lng}&radius={radius}
         * Used by home screen for "X verified professionals nearby" display
         */
        WorkersController_1.prototype.getNearbyWorkersCount = function (lat, long, radius) {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(lat && long)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.workersService.getNearbyWorkersCount(lat, long, radius || 5)];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, { count: count, radius: radius || 5 }];
                        case 2: return [2 /*return*/, { count: 0, radius: 0 }];
                    }
                });
            });
        };
        /**
         * Get worker statistics (average response time, etc.)
         * GET /workers/stats
         * Used by home screen for "X min average arrival" display
         */
        WorkersController_1.prototype.getWorkerStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var stats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.getWorkerStats()];
                        case 1:
                            stats = _a.sent();
                            return [2 /*return*/, stats];
                    }
                });
            });
        };
        WorkersController_1.prototype.create = function (createWorkerDto) {
            return this.workersService.create(createWorkerDto.userId, createWorkerDto.bio, createWorkerDto.serviceIds, createWorkerDto.latitude, createWorkerDto.longitude);
        };
        // ============================================
        // NEW: Worker-specific endpoints for Worker App
        // ============================================
        /**
         * Get current worker's profile (from JWT token)
         * GET /workers/me
         */
        WorkersController_1.prototype.getMyProfile = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_1, errorMessage, errorStack;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            this.logger.debug("getMyProfile requested for user: ".concat((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId));
                            // Safe check - if no user object from auth guard
                            if (!req.user || !req.user.userId) {
                                this.logger.error('No user in request - auth guard may have failed');
                                return [2 /*return*/, {
                                        message: 'Authentication required',
                                        needsRegistration: false
                                    }];
                            }
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _b.sent();
                            this.logger.debug("findByUserId result: ".concat(worker ? 'found' : 'not found'));
                            if (!worker) {
                                // Return a 200 response with null worker instead of error
                                // This indicates the user hasn't created a worker profile yet
                                return [2 /*return*/, {
                                        message: 'Worker profile not found. Please complete your worker registration.',
                                        worker: null,
                                        needsRegistration: true
                                    }];
                            }
                            return [2 /*return*/, worker];
                        case 2:
                            error_1 = _b.sent();
                            errorMessage = error_1 instanceof Error ? error_1.message : 'Unknown error';
                            errorStack = error_1 instanceof Error ? error_1.stack : undefined;
                            this.logger.error("Error fetching worker profile: ".concat(errorMessage), errorStack);
                            // Return 200 with error info for debugging
                            return [2 /*return*/, {
                                    message: 'Error fetching worker profile',
                                    error: errorMessage,
                                    worker: null
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get worker by numeric ID
         * GET /workers/:id
         */
        WorkersController_1.prototype.findOne = function (id) {
            return this.workersService.findOne(id);
        };
        /**
         * Get current worker's bookings
         * GET /workers/me/bookings
         */
        WorkersController_1.prototype.getMyBookings = function (req, status) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                return [2 /*return*/, []];
                            }
                            // Use worker.id (number) instead of worker.publicId (string)
                            return [2 /*return*/, this.workersService.getWorkerBookings(worker.id, status)];
                    }
                });
            });
        };
        /**
         * Get ONLY ACCEPTED / CONFIRMED bookings for current worker
         * Returns only bookings that have been explicitly accepted by the worker
         * GET /workers/me/accepted-bookings
         */
        WorkersController_1.prototype.getMyAcceptedBookings = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, this.workersService.getAcceptedWorkerBookings(worker.id)];
                    }
                });
            });
        };
        /**
         * Get current worker's earnings summary
         * GET /workers/me/earnings
         */
        WorkersController_1.prototype.getMyEarnings = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                return [2 /*return*/, { totalEarnings: 0, completedJobs: 0, pendingPayments: 0, thisMonth: 0, lastMonth: 0 }];
                            }
                            return [2 /*return*/, this.workersService.getWorkerEarnings(worker.id)];
                    }
                });
            });
        };
        /**
         * Accept a booking
         * POST /workers/bookings/:id/accept
         */
        WorkersController_1.prototype.acceptBooking = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_2, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [4 /*yield*/, this.workersService.acceptBooking(id, worker.id)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_2 = _a.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : 'Unknown error';
                            errorStack = error_2 instanceof Error ? error_2.stack : undefined;
                            this.logger.error("Error accepting booking ".concat(id, ": ").concat(errorMessage), errorStack);
                            if (error_2 instanceof common_1.NotFoundException || error_2 instanceof common_1.BadRequestException) {
                                throw error_2;
                            }
                            throw new common_1.BadRequestException(errorMessage);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reject a booking
         * POST /workers/bookings/:id/reject
         */
        WorkersController_1.prototype.rejectBooking = function (req, id, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_3, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [4 /*yield*/, this.workersService.rejectBooking(id, worker.id, reason)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_3 = _a.sent();
                            errorMessage = error_3 instanceof Error ? error_3.message : 'Unknown error';
                            errorStack = error_3 instanceof Error ? error_3.stack : undefined;
                            this.logger.error("Error rejecting booking ".concat(id, ": ").concat(errorMessage), errorStack);
                            if (error_3 instanceof common_1.NotFoundException || error_3 instanceof common_1.BadRequestException) {
                                throw error_3;
                            }
                            throw new common_1.BadRequestException(errorMessage);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Start a job (mark as in progress)
         * POST /workers/bookings/:id/start
         */
        WorkersController_1.prototype.startBooking = function (req, id, otp) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_4, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [4 /*yield*/, this.workersService.startBooking(id, worker.id, otp)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_4 = _a.sent();
                            errorMessage = error_4 instanceof Error ? error_4.message : 'Unknown error';
                            errorStack = error_4 instanceof Error ? error_4.stack : undefined;
                            this.logger.error("Error starting booking ".concat(id, ": ").concat(errorMessage), errorStack);
                            if (error_4 instanceof common_1.NotFoundException || error_4 instanceof common_1.BadRequestException) {
                                throw error_4;
                            }
                            throw new common_1.BadRequestException(errorMessage);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Complete a job
         * POST /workers/bookings/:id/complete
         */
        WorkersController_1.prototype.completeBooking = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_5, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [4 /*yield*/, this.workersService.completeBooking(id, worker.id)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_5 = _a.sent();
                            errorMessage = error_5 instanceof Error ? error_5.message : 'Unknown error';
                            errorStack = error_5 instanceof Error ? error_5.stack : undefined;
                            this.logger.error("Error completing booking ".concat(id, ": ").concat(errorMessage), errorStack);
                            if (error_5 instanceof common_1.NotFoundException || error_5 instanceof common_1.BadRequestException) {
                                throw error_5;
                            }
                            throw new common_1.BadRequestException(errorMessage);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update worker availability
         * PATCH /workers/me/availability
         */
        WorkersController_1.prototype.updateMyAvailability = function (req, isAvailable) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, error_6, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [4 /*yield*/, this.workersService.updateWorkerAvailability(worker.id, isAvailable)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_6 = _a.sent();
                            errorMessage = error_6 instanceof Error ? error_6.message : 'Unknown error';
                            errorStack = error_6 instanceof Error ? error_6.stack : undefined;
                            this.logger.error("Error updating availability: ".concat(errorMessage), errorStack);
                            if (error_6 instanceof common_1.NotFoundException || error_6 instanceof common_1.BadRequestException) {
                                throw error_6;
                            }
                            throw new common_1.BadRequestException(errorMessage);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update worker profile details
         * PATCH /workers/me
         */
        WorkersController_1.prototype.updateMyProfile = function (req, updateData) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [2 /*return*/, this.workersService.updateWorkerProfile(worker.id, updateData)];
                    }
                });
            });
        };
        /**
         * Update worker's display name (firstName and lastName on user entity)
         * PATCH /workers/me/name
         */
        WorkersController_1.prototype.updateMyName = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var user, worker, error_7, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            this.logger.log("Updating name for user: ".concat(req.user.userId));
                            if (!body.firstName || !body.lastName) {
                                throw new common_1.BadRequestException('firstName and lastName are required');
                            }
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { publicId: req.user.userId },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            // Update the user's name
                            user.firstName = body.firstName;
                            user.lastName = body.lastName;
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 2:
                            _a.sent();
                            this.logger.log("Name updated for user: ".concat(req.user.userId, " to ").concat(body.firstName, " ").concat(body.lastName));
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 3:
                            worker = _a.sent();
                            return [2 /*return*/, {
                                    message: 'Name updated successfully',
                                    worker: worker,
                                }];
                        case 4:
                            error_7 = _a.sent();
                            errorMessage = error_7 instanceof Error ? error_7.message : 'Unknown error';
                            errorStack = error_7 instanceof Error ? error_7.stack : undefined;
                            this.logger.error("Error updating name: ".concat(errorMessage), errorStack);
                            throw error_7;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update worker's service categories
         * PATCH /workers/me/services
         */
        WorkersController_1.prototype.updateMyServices = function (req, serviceCategories) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [2 /*return*/, this.workersService.updateWorkerServices(worker.id, serviceCategories)];
                    }
                });
            });
        };
        /**
         * Update worker's service area
         * PATCH /workers/me/service-area
         */
        WorkersController_1.prototype.updateMyServiceArea = function (req, serviceArea) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!worker) {
                                throw new common_1.NotFoundException('Worker profile not found. Please complete your worker registration.');
                            }
                            return [2 /*return*/, this.workersService.updateWorkerServiceArea(worker.id, serviceArea)];
                    }
                });
            });
        };
        /**
         * Update worker's FCM token for push notifications
         * PATCH /workers/me/fcm-token
         */
        WorkersController_1.prototype.updateMyFcmToken = function (req, fcmToken) {
            return __awaiter(this, void 0, void 0, function () {
                var worker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Updating FCM token for user: ".concat(req.user.userId, ", token: ").concat(fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.substring(0, 30), "..."));
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            worker = _a.sent();
                            if (!!worker) return [3 /*break*/, 3];
                            // Graceful handling: Regular customers are allowed to register FCM tokens too
                            // This is not an error, user just doesn't have a worker profile yet
                            this.logger.warn("Regular user (not a worker) registering FCM token: ".concat(req.user.userId));
                            // Save FCM token to the actual user record for customers
                            return [4 /*yield*/, this.usersService.updateFcmToken(req.user.userId, fcmToken)];
                        case 2:
                            // Save FCM token to the actual user record for customers
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    isWorker: false,
                                    message: 'FCM token registered for user account'
                                }];
                        case 3: return [4 /*yield*/, this.workersService.updateFcmToken(worker.id, fcmToken)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    isWorker: true,
                                    message: 'FCM token registered for worker account'
                                }];
                    }
                });
            });
        };
        /**
         * Create worker profile for logged-in user
         * POST /workers/me/register
         * Protected by JWT - user must already be logged in
         *
         * This endpoint is used when a user with an existing account wants to
         * become a worker by creating a worker profile.
         */
        WorkersController_1.prototype.registerWorker = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var existingWorker, worker, error_8, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            this.logger.log("Worker registration request from user: ".concat(req.user.userId));
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 1:
                            existingWorker = _a.sent();
                            if (existingWorker) {
                                return [2 /*return*/, {
                                        worker: existingWorker,
                                        message: 'Worker profile already exists',
                                        needsApproval: false
                                    }];
                            }
                            return [4 /*yield*/, this.workersService.createWorkerProfile(req.user.userId, body.bio || '', body.serviceIds || [], body.latitude || 28.5804579, body.longitude || 77.4392951)];
                        case 2:
                            worker = _a.sent();
                            this.logger.log("Worker profile created for user: ".concat(req.user.userId));
                            return [2 /*return*/, {
                                    worker: worker,
                                    message: 'Worker registered successfully. Pending admin approval.',
                                    needsApproval: true
                                }];
                        case 3:
                            error_8 = _a.sent();
                            errorMessage = error_8 instanceof Error ? error_8.message : 'Unknown error';
                            errorStack = error_8 instanceof Error ? error_8.stack : undefined;
                            this.logger.error("Worker registration failed: ".concat(errorMessage), errorStack);
                            throw error_8;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return WorkersController_1;
    }());
    __setFunctionName(_classThis, "WorkersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, common_1.Get)()];
        _getNearbyWorkersCount_decorators = [(0, common_1.Get)('nearby/count')];
        _getWorkerStats_decorators = [(0, common_1.Get)('stats')];
        _create_decorators = [(0, common_1.Post)()];
        _getMyProfile_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _getMyBookings_decorators = [(0, common_1.Get)('me/bookings'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getMyAcceptedBookings_decorators = [(0, common_1.Get)('me/accepted-bookings'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getMyEarnings_decorators = [(0, common_1.Get)('me/earnings'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _acceptBooking_decorators = [(0, common_1.Post)('bookings/:id/accept'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _rejectBooking_decorators = [(0, common_1.Post)('bookings/:id/reject'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _startBooking_decorators = [(0, common_1.Post)('bookings/:id/start'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _completeBooking_decorators = [(0, common_1.Post)('bookings/:id/complete'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyAvailability_decorators = [(0, common_1.Patch)('me/availability'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyProfile_decorators = [(0, common_1.Patch)('me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyName_decorators = [(0, common_1.Patch)('me/name'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyServices_decorators = [(0, common_1.Patch)('me/services'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyServiceArea_decorators = [(0, common_1.Patch)('me/service-area'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateMyFcmToken_decorators = [(0, common_1.Patch)('me/fcm-token'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _registerWorker_decorators = [(0, common_1.Post)('me/register'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNearbyWorkersCount_decorators, { kind: "method", name: "getNearbyWorkersCount", static: false, private: false, access: { has: function (obj) { return "getNearbyWorkersCount" in obj; }, get: function (obj) { return obj.getNearbyWorkersCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWorkerStats_decorators, { kind: "method", name: "getWorkerStats", static: false, private: false, access: { has: function (obj) { return "getWorkerStats" in obj; }, get: function (obj) { return obj.getWorkerStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyProfile_decorators, { kind: "method", name: "getMyProfile", static: false, private: false, access: { has: function (obj) { return "getMyProfile" in obj; }, get: function (obj) { return obj.getMyProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyBookings_decorators, { kind: "method", name: "getMyBookings", static: false, private: false, access: { has: function (obj) { return "getMyBookings" in obj; }, get: function (obj) { return obj.getMyBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyAcceptedBookings_decorators, { kind: "method", name: "getMyAcceptedBookings", static: false, private: false, access: { has: function (obj) { return "getMyAcceptedBookings" in obj; }, get: function (obj) { return obj.getMyAcceptedBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyEarnings_decorators, { kind: "method", name: "getMyEarnings", static: false, private: false, access: { has: function (obj) { return "getMyEarnings" in obj; }, get: function (obj) { return obj.getMyEarnings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptBooking_decorators, { kind: "method", name: "acceptBooking", static: false, private: false, access: { has: function (obj) { return "acceptBooking" in obj; }, get: function (obj) { return obj.acceptBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectBooking_decorators, { kind: "method", name: "rejectBooking", static: false, private: false, access: { has: function (obj) { return "rejectBooking" in obj; }, get: function (obj) { return obj.rejectBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _startBooking_decorators, { kind: "method", name: "startBooking", static: false, private: false, access: { has: function (obj) { return "startBooking" in obj; }, get: function (obj) { return obj.startBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _completeBooking_decorators, { kind: "method", name: "completeBooking", static: false, private: false, access: { has: function (obj) { return "completeBooking" in obj; }, get: function (obj) { return obj.completeBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyAvailability_decorators, { kind: "method", name: "updateMyAvailability", static: false, private: false, access: { has: function (obj) { return "updateMyAvailability" in obj; }, get: function (obj) { return obj.updateMyAvailability; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyProfile_decorators, { kind: "method", name: "updateMyProfile", static: false, private: false, access: { has: function (obj) { return "updateMyProfile" in obj; }, get: function (obj) { return obj.updateMyProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyName_decorators, { kind: "method", name: "updateMyName", static: false, private: false, access: { has: function (obj) { return "updateMyName" in obj; }, get: function (obj) { return obj.updateMyName; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyServices_decorators, { kind: "method", name: "updateMyServices", static: false, private: false, access: { has: function (obj) { return "updateMyServices" in obj; }, get: function (obj) { return obj.updateMyServices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyServiceArea_decorators, { kind: "method", name: "updateMyServiceArea", static: false, private: false, access: { has: function (obj) { return "updateMyServiceArea" in obj; }, get: function (obj) { return obj.updateMyServiceArea; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMyFcmToken_decorators, { kind: "method", name: "updateMyFcmToken", static: false, private: false, access: { has: function (obj) { return "updateMyFcmToken" in obj; }, get: function (obj) { return obj.updateMyFcmToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerWorker_decorators, { kind: "method", name: "registerWorker", static: false, private: false, access: { has: function (obj) { return "registerWorker" in obj; }, get: function (obj) { return obj.registerWorker; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WorkersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WorkersController = _classThis;
}();
exports.WorkersController = WorkersController;
