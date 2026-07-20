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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./entities/user.entity");
var bcrypt = __importStar(require("bcrypt"));
var uuid_1 = require("uuid");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(usersRepository, dataSource) {
            this.usersRepository = usersRepository;
            this.dataSource = dataSource;
        }
        UsersService_1.prototype.create = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingEmail, existingPhone, salt, hashedPassword, user, error_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.findOneByEmail(createUserDto.email)];
                        case 1:
                            existingEmail = _c.sent();
                            if (existingEmail) {
                                throw new common_1.ConflictException('User with this email already exists');
                            }
                            if (!createUserDto.phone) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.findOneByPhone(createUserDto.phone)];
                        case 2:
                            existingPhone = _c.sent();
                            if (existingPhone) {
                                throw new common_1.ConflictException('User with this phone number already exists');
                            }
                            _c.label = 3;
                        case 3: return [4 /*yield*/, bcrypt.genSalt()];
                        case 4:
                            salt = _c.sent();
                            return [4 /*yield*/, bcrypt.hash(createUserDto.password, salt)];
                        case 5:
                            hashedPassword = _c.sent();
                            user = this.usersRepository.create(__assign(__assign({}, createUserDto), { password: hashedPassword, publicId: (0, uuid_1.v4)() }));
                            _c.label = 6;
                        case 6:
                            _c.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 7: return [2 /*return*/, _c.sent()];
                        case 8:
                            error_1 = _c.sent();
                            // Handle unique constraint violations from database
                            if (error_1.code === '23505') {
                                // PostgreSQL unique violation code
                                if ((_a = error_1.detail) === null || _a === void 0 ? void 0 : _a.includes('email')) {
                                    throw new common_1.ConflictException('User with this email already exists');
                                }
                                if ((_b = error_1.detail) === null || _b === void 0 ? void 0 : _b.includes('phone')) {
                                    throw new common_1.ConflictException('User with this phone number already exists');
                                }
                                throw new common_1.ConflictException('User with these credentials already exists');
                            }
                            throw new common_1.InternalServerErrorException('Failed to create user');
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create user within a transaction - for OTP flow to prevent race conditions
         */
        UsersService_1.prototype.createWithTransaction = function (createUserDto, phone) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, existingUser, salt, hashedPassword, user, savedUser, error_2, existingUser;
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
                            _a.trys.push([3, 11, 15, 17]);
                            return [4 /*yield*/, queryRunner.manager.findOne(user_entity_1.User, {
                                    where: { phone: phone },
                                    lock: { mode: 'pessimistic_write' },
                                })];
                        case 4:
                            existingUser = _a.sent();
                            if (!existingUser) return [3 /*break*/, 6];
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, existingUser];
                        case 6: return [4 /*yield*/, bcrypt.genSalt()];
                        case 7:
                            salt = _a.sent();
                            return [4 /*yield*/, bcrypt.hash(createUserDto.password, salt)];
                        case 8:
                            hashedPassword = _a.sent();
                            user = queryRunner.manager.create(user_entity_1.User, __assign(__assign({}, createUserDto), { password: hashedPassword, publicId: (0, uuid_1.v4)() }));
                            return [4 /*yield*/, queryRunner.manager.save(user)];
                        case 9:
                            savedUser = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 10:
                            _a.sent();
                            return [2 /*return*/, savedUser];
                        case 11:
                            error_2 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 12:
                            _a.sent();
                            if (!(error_2.code === '23505')) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.findOneByPhone(phone)];
                        case 13:
                            existingUser = _a.sent();
                            if (existingUser) {
                                return [2 /*return*/, existingUser];
                            }
                            throw new common_1.ConflictException('User creation conflict');
                        case 14: throw new common_1.InternalServerErrorException('Failed to create user');
                        case 15: return [4 /*yield*/, queryRunner.release()];
                        case 16:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findAll = function () {
            return this.usersRepository.find();
        };
        UsersService_1.prototype.findAllPaginated = function (skip_1, take_1, sortBy_1) {
            return __awaiter(this, arguments, void 0, function (skip, take, sortBy, sortOrder) {
                var order;
                if (sortOrder === void 0) { sortOrder = 'DESC'; }
                return __generator(this, function (_a) {
                    order = {};
                    order[sortBy || 'createdAt'] = sortOrder;
                    return [2 /*return*/, this.usersRepository.findAndCount({
                            skip: skip,
                            take: take,
                            order: order,
                        })];
                });
            });
        };
        UsersService_1.prototype.findOne = function (id) {
            return this.usersRepository.findOneBy({ publicId: id });
        };
        UsersService_1.prototype.findOneByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersRepository.findOneBy({ email: email })];
                });
            });
        };
        UsersService_1.prototype.findOneByPhone = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersRepository.findOneBy({ phone: phone })];
                });
            });
        };
        UsersService_1.prototype.update = function (publicId, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(publicId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            // Update using the numeric id
                            return [2 /*return*/, this.usersRepository.update(user.id, updateUserDto)];
                    }
                });
            });
        };
        UsersService_1.prototype.updateFcmToken = function (userId, fcmToken) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate FCM token format
                            if (!fcmToken || typeof fcmToken !== 'string' || fcmToken.trim().length === 0) {
                                throw new common_1.ForbiddenException('FCM token cannot be empty');
                            }
                            if (fcmToken.length > 512) {
                                throw new common_1.ForbiddenException('FCM token exceeds maximum allowed length');
                            }
                            if (!(typeof userId === 'number' || !isNaN(Number(userId)))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.usersRepository.findOneBy({ id: Number(userId) })];
                        case 1:
                            // Numeric internal ID
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.findOne(userId)];
                        case 3:
                            // UUID publicId
                            user = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            // Update using the numeric id
                            return [4 /*yield*/, this.usersRepository.update(user.id, {
                                    fcmToken: fcmToken.trim(),
                                    updatedAt: new Date()
                                })];
                        case 6:
                            // Update using the numeric id
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_3 = _a.sent();
                            throw new common_1.InternalServerErrorException('Failed to save FCM token');
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.ForbiddenException('User not found');
                            }
                            if (user.role === 'admin') {
                                throw new common_1.ForbiddenException('Cannot delete admin users');
                            }
                            return [2 /*return*/, this.usersRepository.delete(id)];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
