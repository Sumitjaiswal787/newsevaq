"use strict";
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
exports.SeedServices = void 0;
var service_entity_1 = require("../../services/entities/service.entity");
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var SeedServices = /** @class */ (function () {
    function SeedServices() {
        this.logger = new common_1.Logger(SeedServices.name);
    }
    SeedServices.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceRepository, existingCount, services, _i, services_1, serviceData, service, savedServices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceRepository = dataSource.getRepository(service_entity_1.Service);
                        this.logger.log('Starting service seeding...');
                        return [4 /*yield*/, serviceRepository.count()];
                    case 1:
                        existingCount = _a.sent();
                        if (existingCount > 0) {
                            this.logger.log("Found ".concat(existingCount, " existing services, skipping seed"));
                            return [2 /*return*/];
                        }
                        this.logger.log('Creating default services...');
                        services = [
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Home Cleaning',
                                description: 'Complete home cleaning service',
                                basePrice: 49,
                                reassuranceText: 'A safe choice for most homes',
                                whatWillHappen: [
                                    'Helper will arrive and confirm task',
                                    'Work done with standard tools',
                                    'Final inspection before leaving',
                                ],
                                whatWillNotHappen: [
                                    'No upselling without approval',
                                    'No extra work added silently',
                                ],
                                ifSomethingGoesWrong: 'Sevaq will replace or refund immediately',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 30,
                                workerCount: 10,
                            },
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Deep Cleaning',
                                description: 'Thorough deep cleaning for your home',
                                basePrice: 1500,
                                reassuranceText: 'Comprehensive cleaning for dirty homes',
                                whatWillHappen: [
                                    'Helper will arrive with extra equipment',
                                    'Clean every corner including under furniture',
                                    'Use industrial-grade cleaners',
                                ],
                                whatWillNotHappen: [
                                    'No shortcuts on cleaning',
                                    'No areas left untreated',
                                ],
                                ifSomethingGoesWrong: 'Sevaq will send another helper or refund',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: false,
                                estimatedWaitTime: 120,
                                workerCount: 5,
                            },
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Kitchen Cleaning',
                                description: 'Deep cleaning for kitchen appliances and surfaces',
                                basePrice: 800,
                                reassuranceText: 'Make your kitchen sparkle',
                                whatWillHappen: [
                                    'Clean all appliances inside and out',
                                    'Clean counters, cabinets, and sinks',
                                    'Remove grease and stains',
                                ],
                                whatWillNotHappen: [
                                    'No appliance dismantling without approval',
                                    'No use of harsh chemicals on surfaces',
                                ],
                                ifSomethingGoesWrong: 'We will re-clean for free',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 60,
                                workerCount: 8,
                            },
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Bathroom Cleaning',
                                description: 'Professional bathroom sanitization',
                                basePrice: 600,
                                reassuranceText: 'Hygienic and fresh bathroom',
                                whatWillHappen: [
                                    'Clean and sanitize all fixtures',
                                    'Remove limescale and mold',
                                    'Freshen up the entire bathroom',
                                ],
                                whatWillNotHappen: [
                                    'No use of abrasive materials on fixtures',
                                    'No leaving wet surfaces',
                                ],
                                ifSomethingGoesWrong: 'Free re-cleaning service',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 45,
                                workerCount: 8,
                            },
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Sofa Cleaning',
                                description: 'Professional sofa and furniture cleaning',
                                basePrice: 700,
                                reassuranceText: 'Restore your sofa to like new',
                                whatWillHappen: [
                                    'Vacuum all surfaces',
                                    'Treat stains with appropriate solutions',
                                    'Dry clean or steam clean as needed',
                                ],
                                whatWillNotHappen: [
                                    'No harsh chemicals that damage fabric',
                                    'No over-wetting of furniture',
                                ],
                                ifSomethingGoesWrong: 'We will pay for professional repair if needed',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 45,
                                workerCount: 6,
                            },
                            {
                                publicId: (0, crypto_1.randomUUID)(),
                                name: 'Carpet Cleaning',
                                description: 'Deep carpet cleaning service',
                                basePrice: 900,
                                reassuranceText: 'Remove deep stains and odors',
                                whatWillHappen: [
                                    'Vacuum thoroughly before treatment',
                                    'Apply stain treatment for spots',
                                    'Steam clean entire carpet',
                                ],
                                whatWillNotHappen: [
                                    'No using wrong cleaning solutions for carpet type',
                                    'No leaving carpet wet',
                                ],
                                ifSomethingGoesWrong: 'Free re-cleaning or refund',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: false,
                                estimatedWaitTime: 90,
                                workerCount: 5,
                            },
                            {
                                name: 'Window Cleaning',
                                description: 'Interior and exterior window cleaning',
                                basePrice: 400,
                                reassuranceText: 'Crystal clear windows',
                                whatWillHappen: [
                                    'Clean all accessible windows',
                                    'Remove streaks and water marks',
                                    'Clean window frames and sills',
                                ],
                                whatWillNotHappen: [
                                    'No using abrasive materials on glass',
                                    'No leaving soap residue',
                                ],
                                ifSomethingGoesWrong: 'Free touch-up service',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 30,
                                workerCount: 7,
                            },
                            {
                                name: 'Appliance Cleaning',
                                description: 'Clean refrigerators, microwaves, and more',
                                basePrice: 350,
                                reassuranceText: 'Sparkling clean appliances',
                                whatWillHappen: [
                                    'Clean inside and outside of appliances',
                                    'Remove food residues and odors',
                                    'Sanitize all touch points',
                                ],
                                whatWillNotHappen: [
                                    'No moving or unplugging appliances without approval',
                                    'No using harsh chemicals inside fridges',
                                ],
                                ifSomethingGoesWrong: 'We will re-clean for free',
                                category: 'Cleaning',
                                isAvailable: true,
                                isFastBooking: true,
                                estimatedWaitTime: 25,
                                workerCount: 9,
                            },
                            {
                                publicId: '7f8e4b5c-a883-4c6c-b348-f966508fd49d',
                                name: 'Cooking Service',
                                description: 'Home cooking service',
                                basePrice: 149,
                                reassuranceText: 'Professional home cooked meals',
                                whatWillHappen: [
                                    'Cook will arrive with required ingredients',
                                    'Prepare fresh healthy meals',
                                    'Clean up kitchen after cooking',
                                ],
                                whatWillNotHappen: [
                                    'No extra items without approval',
                                    'No unhygienic food preparation',
                                ],
                                ifSomethingGoesWrong: 'Sevaq will replace cook or refund immediately',
                                category: 'Cooking',
                                isAvailable: true,
                                isFastBooking: false,
                                estimatedWaitTime: 120,
                                workerCount: 6,
                            },
                        ];
                        _i = 0, services_1 = services;
                        _a.label = 2;
                    case 2:
                        if (!(_i < services_1.length)) return [3 /*break*/, 5];
                        serviceData = services_1[_i];
                        service = serviceRepository.create(serviceData);
                        return [4 /*yield*/, serviceRepository.save(service)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, serviceRepository.find()];
                    case 6:
                        savedServices = _a.sent();
                        if (savedServices.length === 0) {
                            this.logger.error('WARNING: No services found after seeding!');
                        }
                        else {
                            this.logger.log("Service seeding completed: ".concat(savedServices.length, " services created"));
                        }
                        return [4 /*yield*/, this.verifySeedData(serviceRepository)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedServices.prototype.verifySeedData = function (serviceRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var count, services;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log('Verifying seeded service data...');
                        return [4 /*yield*/, serviceRepository.count()];
                    case 1:
                        count = _a.sent();
                        this.logger.log("Total services in database: ".concat(count));
                        return [4 /*yield*/, serviceRepository.find({ take: 5 })];
                    case 2:
                        services = _a.sent();
                        services.forEach(function (service, index) {
                            _this.logger.log("Service ".concat(index + 1, ": ").concat(service.name, " (publicId: ").concat(service.publicId, ")"));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeedServices;
}());
exports.SeedServices = SeedServices;
