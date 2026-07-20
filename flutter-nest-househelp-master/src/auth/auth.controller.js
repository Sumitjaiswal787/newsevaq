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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var throttler_1 = require("@nestjs/throttler");
var jwt_auth_guard_1 = require("./jwt-auth.guard");
var AuthController = function () {
    var _classDecorators = [(0, common_1.Controller)('auth'), (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true }))];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _login_decorators;
    var _refresh_decorators;
    var _signup_decorators;
    var _registerWorker_decorators;
    var _registerWorkerProfile_decorators;
    var _debugUserCheck_decorators;
    var _verifyOtpLogin_decorators;
    var _verifyIdToken_decorators;
    var _getUserByPhone_decorators;
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, firebaseAuthService, workersService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.firebaseAuthService = firebaseAuthService;
            this.workersService = workersService;
            this.logger = new common_1.Logger(AuthController.name);
        }
        AuthController_1.prototype.login = function (loginDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var startTime, requestId, user, result, duration, error_1, duration, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startTime = Date.now();
                            requestId = Math.random().toString(36).substring(7);
                            this.logger.log("\uD83D\uDD10 [".concat(requestId, "] Login request received - Email: ").concat(loginDto.email || 'N/A'));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            this.logger.debug("\uD83D\uDD0D [".concat(requestId, "] Starting user validation for email: ").concat(loginDto.email));
                            return [4 /*yield*/, this.authService.validateUser(loginDto.email, loginDto.password)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                this.logger.warn("\u274C [".concat(requestId, "] Authentication failed - Invalid credentials for email: ").concat(loginDto.email));
                                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
                            }
                            this.logger.log("\u2705 [".concat(requestId, "] User authenticated successfully - ID: ").concat(user.id, ", Email: ").concat(user.email, ", Role: ").concat(user.role));
                            return [4 /*yield*/, this.authService.login(user)];
                        case 3:
                            result = _a.sent();
                            duration = Date.now() - startTime;
                            this.logger.log("\uD83D\uDE80 [".concat(requestId, "] Login completed successfully - User: ").concat(user.email, ", Duration: ").concat(duration, "ms"));
                            return [2 /*return*/, result];
                        case 4:
                            error_1 = _a.sent();
                            duration = Date.now() - startTime;
                            errorMessage = error_1 instanceof Error ? error_1.message : 'Unknown error';
                            this.logger.error("\uD83D\uDCA5 [".concat(requestId, "] Login failed - Email: ").concat(loginDto.email || 'N/A', ", Error: ").concat(errorMessage, ", Duration: ").concat(duration, "ms"));
                            throw error_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.refresh = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Refresh token request received');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.authService.refreshToken(body.refresh_token)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 3:
                            error_2 = _a.sent();
                            errorMessage = error_2 instanceof Error ? error_2.message : 'Unknown error';
                            this.logger.error("Refresh token failed: ".concat(errorMessage));
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.signup = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Signup request received: ".concat(createUserDto.email));
                            return [4 /*yield*/, this.authService.signup(createUserDto)];
                        case 1:
                            result = _a.sent();
                            this.logger.log("Signup successful for user: ".concat(createUserDto.email));
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * Worker registration - creates both user account and worker profile
         * POST /auth/workers/register
         */
        AuthController_1.prototype.registerWorker = function (createWorkerDto) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_3, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Worker registration request received: ".concat(createWorkerDto.email));
                            this.logger.log("Worker registration DTO: ".concat(JSON.stringify(createWorkerDto)));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.authService.registerWorker(createWorkerDto)];
                        case 2:
                            result = _a.sent();
                            this.logger.log("Worker registration successful: ".concat(createWorkerDto.email));
                            return [2 /*return*/, result];
                        case 3:
                            error_3 = _a.sent();
                            errorMessage = error_3 instanceof Error ? error_3.message : 'Unknown error';
                            this.logger.error("Worker registration failed: ".concat(errorMessage));
                            this.logger.error("Error details: ".concat(JSON.stringify(error_3)));
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create worker profile for logged-in user (authenticated)
         * POST /auth/workers/register-authenticated
         * This endpoint is for existing users who want to become workers
         * Uses JWT auth - requires Bearer token
         */
        AuthController_1.prototype.registerWorkerProfile = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var existingWorker, worker, error_4, errorMessage, errorStack;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Worker profile creation request from user: ".concat(req.user.userId));
                            this.logger.log("Request body: ".concat(JSON.stringify(body)));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.workersService.findByUserId(req.user.userId)];
                        case 2:
                            existingWorker = _a.sent();
                            if (existingWorker) {
                                return [2 /*return*/, {
                                        worker: existingWorker,
                                        message: 'Worker profile already exists',
                                        needsApproval: false
                                    }];
                            }
                            return [4 /*yield*/, this.workersService.createWorkerProfile(req.user.userId, body.bio || '', body.serviceIds || [], body.latitude || 28.5804579, body.longitude || 77.4392951)];
                        case 3:
                            worker = _a.sent();
                            this.logger.log("Worker profile created for user: ".concat(req.user.userId));
                            return [2 /*return*/, {
                                    worker: worker,
                                    message: 'Worker registered successfully. Pending admin approval.',
                                    needsApproval: true
                                }];
                        case 4:
                            error_4 = _a.sent();
                            errorMessage = error_4 instanceof Error ? error_4.message : 'Unknown error';
                            errorStack = error_4 instanceof Error ? error_4.stack : undefined;
                            this.logger.error("Worker profile creation failed: ".concat(errorMessage), errorStack);
                            throw error_4;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Debug endpoint to check user by phone (TEMPORARY - no guard for testing)
        AuthController_1.prototype.debugUserCheck = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var phoneVariations, results, _i, phoneVariations_1, variant, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Debug: Checking user with phone: ".concat(phone));
                            phoneVariations = this.firebaseAuthService['generatePhoneVariations'](phone);
                            this.logger.log("Debug: Phone variations: ".concat(JSON.stringify(phoneVariations)));
                            results = [];
                            _i = 0, phoneVariations_1 = phoneVariations;
                            _a.label = 1;
                        case 1:
                            if (!(_i < phoneVariations_1.length)) return [3 /*break*/, 4];
                            variant = phoneVariations_1[_i];
                            return [4 /*yield*/, this.firebaseAuthService.getUserByPhone(variant)];
                        case 2:
                            user = _a.sent();
                            results.push({
                                variant: variant,
                                found: !!user,
                                userId: user === null || user === void 0 ? void 0 : user.id,
                                publicId: user === null || user === void 0 ? void 0 : user.publicId,
                                isActive: user === null || user === void 0 ? void 0 : user.isActive,
                                phoneInDb: user === null || user === void 0 ? void 0 : user.phone,
                            });
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, { phone: phone, variations: results }];
                    }
                });
            });
        };
        // OTP Login endpoints
        AuthController_1.prototype.verifyOtpLogin = function (verifyOtpLoginDto) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_5, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("OTP login request received - Phone: ".concat(verifyOtpLoginDto.phone));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.firebaseAuthService.verifyPhoneAndLogin(verifyOtpLoginDto.phone, verifyOtpLoginDto.idToken, verifyOtpLoginDto.firstName, verifyOtpLoginDto.lastName)];
                        case 2:
                            result = _a.sent();
                            // Validate result is serializable before logging success
                            // This catches any serialization errors that would otherwise happen after returning
                            JSON.stringify(result);
                            this.logger.log("OTP login successful for phone: ".concat(verifyOtpLoginDto.phone));
                            return [2 /*return*/, result];
                        case 3:
                            error_5 = _a.sent();
                            errorMessage = error_5 instanceof Error ? error_5.message : 'Unknown error';
                            this.logger.error("OTP login failed: ".concat(errorMessage));
                            throw error_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.verifyIdToken = function (verifyIdTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                var decodedToken, error_6, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('OTP token verification request received');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.firebaseAuthService.verifyIdToken(verifyIdTokenDto.idToken)];
                        case 2:
                            decodedToken = _a.sent();
                            return [2 /*return*/, decodedToken];
                        case 3:
                            error_6 = _a.sent();
                            errorMessage = error_6 instanceof Error ? error_6.message : 'Unknown error';
                            this.logger.error("Token verification failed: ".concat(errorMessage));
                            throw error_6;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.getUserByPhone = function (getUserByPhoneDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_7, errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Getting user by phone: ".concat(getUserByPhoneDto.phone));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.firebaseAuthService.getUserByPhone(getUserByPhoneDto.phone)];
                        case 2:
                            user = _a.sent();
                            return [2 /*return*/, { user: user }];
                        case 3:
                            error_7 = _a.sent();
                            errorMessage = error_7 instanceof Error ? error_7.message : 'Unknown error';
                            this.logger.error("Get user by phone failed: ".concat(errorMessage));
                            throw error_7;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.getProfile = function (req) {
            return req.user;
        };
        AuthController_1.prototype.updateProfile = function (req, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    userId = req.user.userId;
                    return [2 /*return*/, this.authService.updateProfile(userId, updateUserDto)];
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _login_decorators = [(0, common_1.Post)('login'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 5 } })];
        _refresh_decorators = [(0, common_1.Post)('refresh'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 10 } })];
        _signup_decorators = [(0, common_1.Post)('signup'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 3 } })];
        _registerWorker_decorators = [(0, common_1.Post)('workers/register'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 3 } })];
        _registerWorkerProfile_decorators = [(0, common_1.Post)('workers/register-authenticated'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _debugUserCheck_decorators = [(0, common_1.Get)('debug/user-check')];
        _verifyOtpLogin_decorators = [(0, common_1.Post)('otp/verify-login'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 10 } })];
        _verifyIdToken_decorators = [(0, common_1.Post)('otp/verify-token'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 10 } })];
        _getUserByPhone_decorators = [(0, common_1.Post)('otp/get-user'), (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 10 } })];
        _getProfile_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Get)('profile')];
        _updateProfile_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Patch)('profile')];
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: function (obj) { return "refresh" in obj; }, get: function (obj) { return obj.refresh; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _signup_decorators, { kind: "method", name: "signup", static: false, private: false, access: { has: function (obj) { return "signup" in obj; }, get: function (obj) { return obj.signup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerWorker_decorators, { kind: "method", name: "registerWorker", static: false, private: false, access: { has: function (obj) { return "registerWorker" in obj; }, get: function (obj) { return obj.registerWorker; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registerWorkerProfile_decorators, { kind: "method", name: "registerWorkerProfile", static: false, private: false, access: { has: function (obj) { return "registerWorkerProfile" in obj; }, get: function (obj) { return obj.registerWorkerProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _debugUserCheck_decorators, { kind: "method", name: "debugUserCheck", static: false, private: false, access: { has: function (obj) { return "debugUserCheck" in obj; }, get: function (obj) { return obj.debugUserCheck; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyOtpLogin_decorators, { kind: "method", name: "verifyOtpLogin", static: false, private: false, access: { has: function (obj) { return "verifyOtpLogin" in obj; }, get: function (obj) { return obj.verifyOtpLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyIdToken_decorators, { kind: "method", name: "verifyIdToken", static: false, private: false, access: { has: function (obj) { return "verifyIdToken" in obj; }, get: function (obj) { return obj.verifyIdToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserByPhone_decorators, { kind: "method", name: "getUserByPhone", static: false, private: false, access: { has: function (obj) { return "getUserByPhone" in obj; }, get: function (obj) { return obj.getUserByPhone; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
