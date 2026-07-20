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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCustomers = void 0;
var user_entity_1 = require("../../users/entities/user.entity");
var bcrypt = __importStar(require("bcrypt"));
var common_1 = require("@nestjs/common");
var SeedCustomers = /** @class */ (function () {
    function SeedCustomers() {
        this.logger = new common_1.Logger(SeedCustomers.name);
    }
    SeedCustomers.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, existingCustomers, customers, _i, customers_1, customerData, existingUser, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = dataSource.getRepository(user_entity_1.User);
                        this.logger.log('Starting customer seeding...');
                        return [4 /*yield*/, userRepository.count({
                                where: { role: user_entity_1.UserRole.USER },
                            })];
                    case 1:
                        existingCustomers = _a.sent();
                        if (existingCustomers > 0) {
                            this.logger.log("".concat(existingCustomers, " customers already exist, skipping creation"));
                            return [2 /*return*/];
                        }
                        customers = [
                            {
                                firstName: 'John',
                                lastName: 'Doe',
                                email: 'john.doe@example.com',
                                password: 'password123',
                                phone: '+919876543215',
                                latitude: 28.6139,
                                longitude: 77.209,
                                preferredLat: 28.6139,
                                preferredLng: 77.209,
                                hasCompletedLocationSetup: true,
                                role: user_entity_1.UserRole.USER,
                            },
                            {
                                firstName: 'Jane',
                                lastName: 'Smith',
                                email: 'jane.smith@example.com',
                                password: 'password123',
                                phone: '+919876543216',
                                latitude: 28.6149,
                                longitude: 77.2095,
                                preferredLat: 28.6149,
                                preferredLng: 77.2095,
                                hasCompletedLocationSetup: true,
                                role: user_entity_1.UserRole.USER,
                            },
                        ];
                        _i = 0, customers_1 = customers;
                        _a.label = 2;
                    case 2:
                        if (!(_i < customers_1.length)) return [3 /*break*/, 7];
                        customerData = customers_1[_i];
                        return [4 /*yield*/, userRepository.findOne({
                                where: { email: customerData.email },
                            })];
                    case 3:
                        existingUser = _a.sent();
                        if (existingUser) {
                            this.logger.log("User ".concat(customerData.email, " already exists, skipping..."));
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, bcrypt.hash(customerData.password, 10)];
                    case 4:
                        hashedPassword = _a.sent();
                        user = userRepository.create({
                            email: customerData.email,
                            password: hashedPassword,
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            phone: customerData.phone,
                            role: customerData.role,
                            latitude: customerData.latitude,
                            longitude: customerData.longitude,
                            preferredLat: customerData.preferredLat,
                            preferredLng: customerData.preferredLng,
                            hasCompletedLocationSetup: customerData.hasCompletedLocationSetup,
                        });
                        return [4 /*yield*/, userRepository.save(user)];
                    case 5:
                        _a.sent();
                        this.logger.log("Created customer: ".concat(customerData.firstName, " ").concat(customerData.lastName, " (").concat(customerData.email, ")"));
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        this.logger.log('Customer seeding completed');
                        return [4 /*yield*/, this.verifyCustomerData(userRepository)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedCustomers.prototype.verifyCustomerData = function (userRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var customers, _i, customers_2, customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log('Verifying seeded customer data...');
                        return [4 /*yield*/, userRepository.find({
                                where: { role: user_entity_1.UserRole.USER },
                            })];
                    case 1:
                        customers = _a.sent();
                        this.logger.log("Found ".concat(customers.length, " customers in database"));
                        for (_i = 0, customers_2 = customers; _i < customers_2.length; _i++) {
                            customer = customers_2[_i];
                            this.logger.debug("Customer: ".concat(customer.firstName, " ").concat(customer.lastName, " - Email: ").concat(customer.email, " - Location: (").concat(customer.latitude, ", ").concat(customer.longitude, ")"));
                        }
                        this.logger.log('Customer data verification completed');
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeedCustomers;
}());
exports.SeedCustomers = SeedCustomers;
