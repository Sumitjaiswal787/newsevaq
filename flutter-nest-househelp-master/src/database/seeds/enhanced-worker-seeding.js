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
exports.EnhancedWorkerSeeding = void 0;
var user_entity_1 = require("../../users/entities/user.entity");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var service_entity_1 = require("../../services/entities/service.entity");
var bcrypt = __importStar(require("bcrypt"));
var common_1 = require("@nestjs/common");
var EnhancedWorkerSeeding = /** @class */ (function () {
    function EnhancedWorkerSeeding() {
        this.logger = new common_1.Logger(EnhancedWorkerSeeding.name);
    }
    EnhancedWorkerSeeding.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, workerRepository, serviceRepository, existingWorkers, services, newServices, workers, _i, workers_1, workerData, existingUser, hashedPassword, user, savedUser, worker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = dataSource.getRepository(user_entity_1.User);
                        workerRepository = dataSource.getRepository(worker_entity_1.Worker);
                        serviceRepository = dataSource.getRepository(service_entity_1.Service);
                        this.logger.log('Starting enhanced worker seeding with 15 workers...');
                        return [4 /*yield*/, workerRepository.count()];
                    case 1:
                        existingWorkers = _a.sent();
                        if (existingWorkers > 0) {
                            this.logger.log("".concat(existingWorkers, " workers already exist, skipping creation"));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, serviceRepository.find()];
                    case 2:
                        services = _a.sent();
                        if (!(services.length === 0)) return [3 /*break*/, 5];
                        this.logger.warn('No services found, creating sample services...');
                        return [4 /*yield*/, this.createSampleServices(serviceRepository)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, serviceRepository.find()];
                    case 4:
                        newServices = _a.sent();
                        services.push.apply(services, newServices);
                        _a.label = 5;
                    case 5:
                        this.logger.log("Found ".concat(services.length, " services"));
                        workers = [
                            // Cleaning specialists
                            {
                                firstName: 'Amit',
                                lastName: 'Kumar',
                                email: 'amit.kumar@househelp.com',
                                password: 'password123',
                                phone: '+919876543210',
                                bio: 'Professional cleaner with 5 years of experience. Expert in deep cleaning and sanitization.',
                                rating: 4.5,
                                reviewCount: 127,
                                serviceRadiusKm: 25,
                                currentLat: 28.5805083,
                                currentLng: 77.4392111,
                                isActive: true,
                                services: [services[0], services[1]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '09:00', endTime: '18:00' },
                                    { day: 2, startTime: '09:00', endTime: '18:00' },
                                    { day: 3, startTime: '09:00', endTime: '18:00' },
                                    { day: 4, startTime: '09:00', endTime: '18:00' },
                                    { day: 5, startTime: '09:00', endTime: '18:00' },
                                ],
                            },
                            {
                                firstName: 'Sunita',
                                lastName: 'Devi',
                                email: 'sunita.devi@househelp.com',
                                password: 'password123',
                                phone: '+919876543213',
                                bio: 'Expert in laundry and ironing services. Quick and efficient.',
                                rating: 4.6,
                                reviewCount: 45,
                                serviceRadiusKm: 25,
                                currentLat: 28.582,
                                currentLng: 77.437,
                                isActive: true,
                                services: [services[1], services[6]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '10:00', endTime: '19:00' },
                                    { day: 2, startTime: '10:00', endTime: '19:00' },
                                    { day: 3, startTime: '10:00', endTime: '19:00' },
                                    { day: 4, startTime: '10:00', endTime: '19:00' },
                                    { day: 5, startTime: '10:00', endTime: '19:00' },
                                ],
                            },
                            {
                                firstName: 'Vikram',
                                lastName: 'Singh',
                                email: 'vikram.singh@househelp.com',
                                password: 'password123',
                                phone: '+919876543214',
                                bio: 'Full-time house help. Expert in all household chores and gardening.',
                                rating: 4.4,
                                reviewCount: 112,
                                serviceRadiusKm: 25,
                                currentLat: 28.578,
                                currentLng: 77.442,
                                isActive: true,
                                services: services.slice(0, 3),
                                availabilitySchedule: [
                                    { day: 0, startTime: '06:00', endTime: '20:00' },
                                    { day: 1, startTime: '06:00', endTime: '20:00' },
                                    { day: 2, startTime: '06:00', endTime: '20:00' },
                                    { day: 3, startTime: '06:00', endTime: '20:00' },
                                    { day: 4, startTime: '06:00', endTime: '20:00' },
                                    { day: 5, startTime: '06:00', endTime: '20:00' },
                                    { day: 6, startTime: '06:00', endTime: '14:00' },
                                ],
                            },
                            {
                                firstName: 'Manoj',
                                lastName: 'Sharma',
                                email: 'manoj.sharma@househelp.com',
                                password: 'password123',
                                phone: '+919876543218',
                                bio: 'Multi-skilled professional offering cleaning, cooking, and general household assistance.',
                                rating: 4.5,
                                reviewCount: 145,
                                serviceRadiusKm: 25,
                                currentLat: 28.576,
                                currentLng: 77.444,
                                isActive: true,
                                services: services.slice(0, 4),
                                availabilitySchedule: [
                                    { day: 1, startTime: '06:00', endTime: '18:00' },
                                    { day: 2, startTime: '06:00', endTime: '18:00' },
                                    { day: 3, startTime: '06:00', endTime: '18:00' },
                                    { day: 4, startTime: '06:00', endTime: '18:00' },
                                    { day: 5, startTime: '06:00', endTime: '18:00' },
                                    { day: 6, startTime: '07:00', endTime: '15:00' },
                                ],
                            },
                            {
                                firstName: 'Rita',
                                lastName: 'Gupta',
                                email: 'rita.gupta@househelp.com',
                                password: 'password123',
                                phone: '+919876543219',
                                bio: 'Professional organizer and cleaning expert. Specialized in decluttering and deep cleaning.',
                                rating: 4.7,
                                reviewCount: 89,
                                serviceRadiusKm: 25,
                                currentLat: 28.583,
                                currentLng: 77.436,
                                isActive: true,
                                services: [services[0], services[1]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '08:00', endTime: '18:00' },
                                    { day: 2, startTime: '08:00', endTime: '18:00' },
                                    { day: 3, startTime: '08:00', endTime: '18:00' },
                                    { day: 4, startTime: '08:00', endTime: '18:00' },
                                    { day: 5, startTime: '08:00', endTime: '18:00' },
                                    { day: 6, startTime: '09:00', endTime: '15:00' },
                                ],
                            },
                            // Cooking specialists
                            {
                                firstName: 'Priya',
                                lastName: 'Sharma',
                                email: 'priya.sharma@househelp.com',
                                password: 'password123',
                                phone: '+919876543211',
                                bio: 'Experienced cook specializing in North Indian and South Indian cuisine. Home chef with passion.',
                                rating: 4.8,
                                reviewCount: 89,
                                serviceRadiusKm: 25,
                                currentLat: 28.5812345,
                                currentLng: 77.4389876,
                                isActive: true,
                                services: [services[2], services[3]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '08:00', endTime: '20:00' },
                                    { day: 2, startTime: '08:00', endTime: '20:00' },
                                    { day: 3, startTime: '08:00', endTime: '20:00' },
                                    { day: 4, startTime: '08:00', endTime: '20:00' },
                                    { day: 5, startTime: '08:00', endTime: '20:00' },
                                    { day: 6, startTime: '08:00', endTime: '16:00' },
                                ],
                            },
                            {
                                firstName: 'Pooja',
                                lastName: 'Singh',
                                email: 'pooja.singh@househelp.com',
                                password: 'password123',
                                phone: '+919876543219',
                                bio: 'Professional cook specializing in healthy and organic meals. Nutrition certified.',
                                rating: 4.9,
                                reviewCount: 88,
                                serviceRadiusKm: 25,
                                currentLat: 28.585,
                                currentLng: 77.434,
                                isActive: true,
                                services: [services[2], services[10]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '09:00', endTime: '21:00' },
                                    { day: 2, startTime: '09:00', endTime: '21:00' },
                                    { day: 3, startTime: '09:00', endTime: '21:00' },
                                    { day: 4, startTime: '09:00', endTime: '21:00' },
                                    { day: 5, startTime: '09:00', endTime: '21:00' },
                                    { day: 6, startTime: '10:00', endTime: '18:00' },
                                ],
                            },
                            {
                                firstName: 'Ramesh',
                                lastName: 'Patel',
                                email: 'ramesh.patel@househelp.com',
                                password: 'password123',
                                phone: '+919876543220',
                                bio: 'Expert in traditional Indian cooking and catering for events.',
                                rating: 4.6,
                                reviewCount: 134,
                                serviceRadiusKm: 25,
                                currentLat: 28.577,
                                currentLng: 77.443,
                                isActive: true,
                                services: [services[2], services[3]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '07:00', endTime: '22:00' },
                                    { day: 2, startTime: '07:00', endTime: '22:00' },
                                    { day: 3, startTime: '07:00', endTime: '22:00' },
                                    { day: 4, startTime: '07:00', endTime: '22:00' },
                                    { day: 5, startTime: '07:00', endTime: '22:00' },
                                    { day: 6, startTime: '08:00', endTime: '20:00' },
                                ],
                            },
                            // Driver and errands specialists
                            {
                                firstName: 'Rajesh',
                                lastName: 'Verma',
                                email: 'rajesh.verma@househelp.com',
                                password: 'password123',
                                phone: '+919876543212',
                                bio: 'Reliable driver and errand runner. Safe driver with clean record.',
                                rating: 4.3,
                                reviewCount: 64,
                                serviceRadiusKm: 25,
                                currentLat: 28.5798765,
                                currentLng: 77.4401234,
                                isActive: true,
                                services: [services[4], services[5]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 0, startTime: '07:00', endTime: '21:00' },
                                    { day: 1, startTime: '07:00', endTime: '21:00' },
                                    { day: 2, startTime: '07:00', endTime: '21:00' },
                                    { day: 3, startTime: '07:00', endTime: '21:00' },
                                    { day: 4, startTime: '07:00', endTime: '21:00' },
                                    { day: 5, startTime: '07:00', endTime: '21:00' },
                                    { day: 6, startTime: '07:00', endTime: '21:00' },
                                ],
                            },
                            {
                                firstName: 'Deepak',
                                lastName: 'Mehta',
                                email: 'deepak.mehta@househelp.com',
                                password: 'password123',
                                phone: '+919876543220',
                                bio: 'Errands and shopping expert. Reliable and efficient with excellent time management.',
                                rating: 4.4,
                                reviewCount: 102,
                                serviceRadiusKm: 25,
                                currentLat: 28.575,
                                currentLng: 77.445,
                                isActive: true,
                                services: [services[5], services[11]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '08:00', endTime: '20:00' },
                                    { day: 2, startTime: '08:00', endTime: '20:00' },
                                    { day: 3, startTime: '08:00', endTime: '20:00' },
                                    { day: 4, startTime: '08:00', endTime: '20:00' },
                                    { day: 5, startTime: '08:00', endTime: '20:00' },
                                    { day: 6, startTime: '09:00', endTime: '17:00' },
                                    { day: 0, startTime: '10:00', endTime: '16:00' },
                                ],
                            },
                            {
                                firstName: 'Sanjay',
                                lastName: 'Yadav',
                                email: 'sanjay.yadav@househelp.com',
                                password: 'password123',
                                phone: '+919876543216',
                                bio: 'Gardening and landscaping expert. 8 years of experience in maintaining beautiful gardens.',
                                rating: 4.6,
                                reviewCount: 78,
                                serviceRadiusKm: 25,
                                currentLat: 28.577,
                                currentLng: 77.443,
                                isActive: true,
                                services: [services[8]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '07:00', endTime: '17:00' },
                                    { day: 2, startTime: '07:00', endTime: '17:00' },
                                    { day: 3, startTime: '07:00', endTime: '17:00' },
                                    { day: 4, startTime: '07:00', endTime: '17:00' },
                                    { day: 5, startTime: '07:00', endTime: '17:00' },
                                    { day: 6, startTime: '08:00', endTime: '14:00' },
                                ],
                            },
                            // Specialized care services
                            {
                                firstName: 'Neha',
                                lastName: 'Patel',
                                email: 'neha.patel@househelp.com',
                                password: 'password123',
                                phone: '+919876543215',
                                bio: 'Professional babysitter and nanny with 6 years of experience. Certified childcare provider.',
                                rating: 4.7,
                                reviewCount: 95,
                                serviceRadiusKm: 25,
                                currentLat: 28.583,
                                currentLng: 77.436,
                                isActive: true,
                                services: [services[7]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '08:00', endTime: '20:00' },
                                    { day: 2, startTime: '08:00', endTime: '20:00' },
                                    { day: 3, startTime: '08:00', endTime: '20:00' },
                                    { day: 4, startTime: '08:00', endTime: '20:00' },
                                    { day: 5, startTime: '08:00', endTime: '20:00' },
                                    { day: 6, startTime: '09:00', endTime: '18:00' },
                                ],
                            },
                            {
                                firstName: 'Anita',
                                lastName: 'Gupta',
                                email: 'anita.gupta@househelp.com',
                                password: 'password123',
                                phone: '+919876543217',
                                bio: 'Senior care specialist with medical background. Compassionate and experienced caregiver.',
                                rating: 4.8,
                                reviewCount: 67,
                                serviceRadiusKm: 25,
                                currentLat: 28.584,
                                currentLng: 77.435,
                                isActive: true,
                                services: [services[9]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 0, startTime: '08:00', endTime: '20:00' },
                                    { day: 1, startTime: '08:00', endTime: '20:00' },
                                    { day: 2, startTime: '08:00', endTime: '20:00' },
                                    { day: 3, startTime: '08:00', endTime: '20:00' },
                                    { day: 4, startTime: '08:00', endTime: '20:00' },
                                    { day: 5, startTime: '08:00', endTime: '20:00' },
                                    { day: 6, startTime: '09:00', endTime: '17:00' },
                                ],
                            },
                            {
                                firstName: 'Lata',
                                lastName: 'Mishra',
                                email: 'lata.mishra@househelp.com',
                                password: 'password123',
                                phone: '+919876543221',
                                bio: 'Professional cook specializing in vegetarian and Jain cuisine.',
                                rating: 4.7,
                                reviewCount: 76,
                                serviceRadiusKm: 25,
                                currentLat: 28.586,
                                currentLng: 77.433,
                                isActive: true,
                                services: [services[2], services[3]].filter(Boolean),
                                availabilitySchedule: [
                                    { day: 1, startTime: '07:00', endTime: '19:00' },
                                    { day: 2, startTime: '07:00', endTime: '19:00' },
                                    { day: 3, startTime: '07:00', endTime: '19:00' },
                                    { day: 4, startTime: '07:00', endTime: '19:00' },
                                    { day: 5, startTime: '07:00', endTime: '19:00' },
                                    { day: 6, startTime: '08:00', endTime: '16:00' },
                                ],
                            },
                            {
                                firstName: 'Kamal',
                                lastName: 'Singh',
                                email: 'kamal.singh@househelp.com',
                                password: 'password123',
                                phone: '+919876543222',
                                bio: 'Multi-skilled worker with expertise in cleaning, cooking, and general maintenance.',
                                rating: 4.5,
                                reviewCount: 156,
                                serviceRadiusKm: 25,
                                currentLat: 28.574,
                                currentLng: 77.446,
                                isActive: true,
                                services: services.slice(0, 5),
                                availabilitySchedule: [
                                    { day: 1, startTime: '06:00', endTime: '18:00' },
                                    { day: 2, startTime: '06:00', endTime: '18:00' },
                                    { day: 3, startTime: '06:00', endTime: '18:00' },
                                    { day: 4, startTime: '06:00', endTime: '18:00' },
                                    { day: 5, startTime: '06:00', endTime: '18:00' },
                                    { day: 6, startTime: '07:00', endTime: '15:00' },
                                ],
                            },
                        ];
                        _i = 0, workers_1 = workers;
                        _a.label = 6;
                    case 6:
                        if (!(_i < workers_1.length)) return [3 /*break*/, 12];
                        workerData = workers_1[_i];
                        return [4 /*yield*/, userRepository.findOne({
                                where: { email: workerData.email },
                            })];
                    case 7:
                        existingUser = _a.sent();
                        if (existingUser) {
                            this.logger.log("User ".concat(workerData.email, " already exists, skipping..."));
                            return [3 /*break*/, 11];
                        }
                        return [4 /*yield*/, bcrypt.hash(workerData.password, 10)];
                    case 8:
                        hashedPassword = _a.sent();
                        user = userRepository.create({
                            publicId: require('crypto').randomUUID(),
                            email: workerData.email,
                            password: hashedPassword,
                            firstName: workerData.firstName,
                            lastName: workerData.lastName,
                            phone: workerData.phone,
                            role: user_entity_1.UserRole.WORKER,
                            latitude: workerData.currentLat,
                            longitude: workerData.currentLng,
                            preferredLat: workerData.currentLat,
                            preferredLng: workerData.currentLng,
                            hasCompletedLocationSetup: true,
                        });
                        return [4 /*yield*/, userRepository.save(user)];
                    case 9:
                        savedUser = _a.sent();
                        this.logger.log("Created user: ".concat(savedUser.email));
                        worker = workerRepository.create({
                            publicId: require('crypto').randomUUID(),
                            user: savedUser,
                            bio: workerData.bio,
                            rating: workerData.rating,
                            reviewCount: workerData.reviewCount,
                            serviceRadiusKm: workerData.serviceRadiusKm,
                            currentLat: workerData.currentLat,
                            currentLng: workerData.currentLng,
                            lastLocationUpdate: new Date(),
                            isActive: workerData.isActive,
                            services: workerData.services,
                            availabilitySchedule: workerData.availabilitySchedule,
                        });
                        return [4 /*yield*/, workerRepository.save(worker)];
                    case 10:
                        _a.sent();
                        this.logger.log("Created worker: ".concat(workerData.firstName, " ").concat(workerData.lastName, " at (").concat(workerData.currentLat, ", ").concat(workerData.currentLng, ") with ").concat(workerData.serviceRadiusKm, "km radius"));
                        _a.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 6];
                    case 12:
                        this.logger.log('Enhanced worker seeding completed');
                        return [4 /*yield*/, this.verifyWorkerData(workerRepository)];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EnhancedWorkerSeeding.prototype.createSampleServices = function (serviceRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var sampleServices, _i, sampleServices_1, serviceData, service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sampleServices = [
                            {
                                name: 'Home Cleaning',
                                description: 'Complete home cleaning service',
                                category: 'Cleaning',
                                basePrice: 49,
                            },
                            {
                                name: 'Deep Cleaning',
                                description: 'Deep cleaning for kitchens and bathrooms',
                                category: 'Cleaning',
                                basePrice: 800,
                            },
                            {
                                name: 'Cooking Service',
                                description: 'Home cooking service',
                                category: 'Cooking',
                                basePrice: 149,
                            },
                            {
                                name: 'Driver',
                                description: 'Personal driver service',
                                category: 'Driving',
                                basePrice: 500,
                            },
                            {
                                name: 'Errands',
                                description: 'Running errands and grocery shopping',
                                category: 'Errands',
                                basePrice: 300,
                            },
                            {
                                name: 'Laundry',
                                description: 'Washing, drying, and ironing',
                                category: 'Laundry',
                                basePrice: 350,
                            },
                            {
                                name: 'Babysitting',
                                description: 'Professional childcare services',
                                category: 'Childcare',
                                basePrice: 400,
                            },
                            {
                                name: 'Gardening',
                                description: 'Garden maintenance and landscaping',
                                category: 'Gardening',
                                basePrice: 450,
                            },
                            {
                                name: 'Senior Care',
                                description: 'Elderly care and assistance',
                                category: 'Care',
                                basePrice: 600,
                            },
                            {
                                name: 'Cooking Service',
                                description: 'Nutritious and balanced meal preparation',
                                category: 'Cooking',
                                basePrice: 149,
                            },
                            {
                                name: 'Shopping',
                                description: 'Grocery and shopping assistance',
                                category: 'Errands',
                                basePrice: 250,
                            },
                        ];
                        _i = 0, sampleServices_1 = sampleServices;
                        _a.label = 1;
                    case 1:
                        if (!(_i < sampleServices_1.length)) return [3 /*break*/, 4];
                        serviceData = sampleServices_1[_i];
                        service = serviceRepository.create(__assign(__assign({}, serviceData), { publicId: require('crypto').randomUUID() }));
                        return [4 /*yield*/, serviceRepository.save(service)];
                    case 2:
                        _a.sent();
                        this.logger.log("Created service: ".concat(serviceData.name));
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnhancedWorkerSeeding.prototype.verifyWorkerData = function (workerRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var workers, radiusGroups, serviceCounts, _i, workers_2, worker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log('Verifying seeded worker data...');
                        return [4 /*yield*/, workerRepository.find({
                                relations: ['user', 'services'],
                            })];
                    case 1:
                        workers = _a.sent();
                        this.logger.log("Found ".concat(workers.length, " workers in database"));
                        radiusGroups = workers.reduce(function (acc, worker) {
                            var radius = worker.serviceRadiusKm;
                            if (!acc[radius])
                                acc[radius] = 0;
                            acc[radius]++;
                            return acc;
                        }, {});
                        this.logger.log('Service radius distribution:', radiusGroups);
                        serviceCounts = {};
                        workers.forEach(function (worker) {
                            worker.services.forEach(function (service) {
                                serviceCounts[service.name] = (serviceCounts[service.name] || 0) + 1;
                            });
                        });
                        this.logger.log('Service distribution:', serviceCounts);
                        for (_i = 0, workers_2 = workers; _i < workers_2.length; _i++) {
                            worker = workers_2[_i];
                            this.logger.debug("Worker: ".concat(worker.user.firstName, " ").concat(worker.user.lastName, " - Location: (").concat(worker.currentLat, ", ").concat(worker.currentLng, "), Rating: ").concat(worker.rating, ", Radius: ").concat(worker.serviceRadiusKm, "km"));
                        }
                        this.logger.log('Enhanced worker data verification completed');
                        return [2 /*return*/];
                }
            });
        });
    };
    return EnhancedWorkerSeeding;
}());
exports.EnhancedWorkerSeeding = EnhancedWorkerSeeding;
