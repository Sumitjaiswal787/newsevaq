"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = __importStar(require("bcrypt"));
var user_entity_1 = require("../users/entities/user.entity");
var refresh_token_entity_1 = require("./entities/refresh-token.entity");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(usersService, workersService, servicesService, jwtService, refreshTokenRepository) {
            this.usersService = usersService;
            this.workersService = workersService;
            this.servicesService = servicesService;
            this.jwtService = jwtService;
            this.refreshTokenRepository = refreshTokenRepository;
            this.logger = new common_1.Logger(AuthService.name);
        }
        AuthService_1.prototype.validateUser = function (email, pass) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid, password, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Validating user: ".concat(email));
                            return [4 /*yield*/, this.usersService.findOneByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                this.logger.warn("User not found for email: ".concat(email));
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, bcrypt.compare(pass, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                this.logger.warn("Invalid password for user: ".concat(email));
                                return [2 /*return*/, null];
                            }
                            password = user.password, result = __rest(user, ["password"]);
                            this.logger.debug("Authentication successful for: ".concat(email));
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (user, userAgent, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, accessToken, refreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = {
                                email: user.email,
                                sub: user.publicId, // Use UUID for JWT subject
                                role: user.role,
                            };
                            accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
                            refreshToken = new refresh_token_entity_1.RefreshToken();
                            refreshToken.userId = user.id;
                            refreshToken.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
                            refreshToken.userAgent = userAgent !== null && userAgent !== void 0 ? userAgent : '';
                            refreshToken.ipAddress = ipAddress !== null && ipAddress !== void 0 ? ipAddress : '';
                            return [4 /*yield*/, this.refreshTokenRepository.save(refreshToken)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    access_token: accessToken,
                                    refresh_token: refreshToken.token,
                                    user: {
                                        id: user.id, // Return numeric database id
                                        publicId: user.publicId, // Also return publicId for reference
                                        email: user.email,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        role: user.role,
                                    },
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshToken = function (refreshTokenStr) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshToken, user, payload, newAccessToken, newRefreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.findOne({
                                where: { token: refreshTokenStr },
                                relations: ['user'],
                            })];
                        case 1:
                            refreshToken = _a.sent();
                            if (!refreshToken || !refreshToken.isValid()) {
                                throw new common_1.UnauthorizedException('Invalid or expired refresh token');
                            }
                            user = refreshToken.user;
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found');
                            }
                            payload = {
                                email: user.email,
                                sub: user.publicId,
                                role: user.role,
                            };
                            newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
                            // Rotate refresh token: revoke old one, create new one
                            refreshToken.isRevoked = true;
                            return [4 /*yield*/, this.refreshTokenRepository.save(refreshToken)];
                        case 2:
                            _a.sent();
                            newRefreshToken = new refresh_token_entity_1.RefreshToken();
                            newRefreshToken.userId = user.id;
                            newRefreshToken.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.refreshTokenRepository.save(newRefreshToken)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    access_token: newAccessToken,
                                    refresh_token: newRefreshToken.token,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.signup = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.create(createUserDto)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, this.login(user)];
                    }
                });
            });
        };
        AuthService_1.prototype.updateProfile = function (userId, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.update(userId, updateUserDto)];
                });
            });
        };
        /**
         * Register a new worker (creates both user account and worker profile)
         */
        AuthService_1.prototype.registerWorker = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, existingPhone, createUserDto, user, serviceIds, _i, _a, category, service, worker;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            this.logger.log("Registering new worker: ".concat(dto.email, ", phone: ").concat(dto.phone));
                            return [4 /*yield*/, this.usersService.findOneByEmail(dto.email)];
                        case 1:
                            existingUser = _f.sent();
                            if (existingUser) {
                                throw new common_1.ConflictException('Email already registered');
                            }
                            return [4 /*yield*/, this.usersService.findOneByPhone(dto.phone)];
                        case 2:
                            existingPhone = _f.sent();
                            if (existingPhone) {
                                throw new common_1.ConflictException('Phone number already registered');
                            }
                            createUserDto = {
                                email: dto.email,
                                password: dto.password,
                                firstName: dto.firstName,
                                lastName: dto.lastName,
                                phone: dto.phone,
                                address: dto.address,
                                role: user_entity_1.UserRole.WORKER,
                                latitude: (_b = dto.serviceArea) === null || _b === void 0 ? void 0 : _b.latitude,
                                longitude: (_c = dto.serviceArea) === null || _c === void 0 ? void 0 : _c.longitude,
                            };
                            return [4 /*yield*/, this.usersService.create(createUserDto)];
                        case 3:
                            user = _f.sent();
                            this.logger.log("User created with ID: ".concat(user.id));
                            serviceIds = [];
                            if (!(dto.serviceCategories && dto.serviceCategories.length > 0)) return [3 /*break*/, 7];
                            _i = 0, _a = dto.serviceCategories;
                            _f.label = 4;
                        case 4:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            category = _a[_i];
                            return [4 /*yield*/, this.servicesService.findByCategory(category)];
                        case 5:
                            service = _f.sent();
                            if (service) {
                                serviceIds.push(service.id);
                            }
                            _f.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [4 /*yield*/, this.workersService.create(user.id, dto.bio || '', serviceIds, ((_d = dto.serviceArea) === null || _d === void 0 ? void 0 : _d.latitude) || 0, ((_e = dto.serviceArea) === null || _e === void 0 ? void 0 : _e.longitude) || 0)];
                        case 8:
                            worker = _f.sent();
                            this.logger.log("Worker profile created with ID: ".concat(worker.id));
                            // Return login response with worker info
                            return [2 /*return*/, this.login(user)];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
