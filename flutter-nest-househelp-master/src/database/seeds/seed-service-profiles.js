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
exports.SeedServiceProfiles = void 0;
var common_1 = require("@nestjs/common");
var service_profile_entity_1 = require("../../service-profiles/entities/service-profile.entity");
var SeedServiceProfiles = /** @class */ (function () {
    function SeedServiceProfiles() {
        this.logger = new common_1.Logger(SeedServiceProfiles.name);
    }
    SeedServiceProfiles.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceProfileRepository, existingProfiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceProfileRepository = dataSource.getRepository(service_profile_entity_1.ServiceProfile);
                        return [4 /*yield*/, serviceProfileRepository.count()];
                    case 1:
                        existingProfiles = _a.sent();
                        if (existingProfiles > 0) {
                            this.logger.log("Found ".concat(existingProfiles, " existing service profiles, skipping seed"));
                            return [2 /*return*/];
                        }
                        this.logger.log('Seeding service profiles...');
                        // Predefined tier profiles commented out - system now uses custom plans
                        // const serviceProfiles = [
                        //   // Cleaning Services
                        //   {
                        //     serviceType: ServiceType.CLEANING,
                        //     profileName: 'BASIC', // ProfileName enum removed
                        //     description: 'Basic home cleaning - dusting, sweeping, mopping',
                        //     scopeDefinition: 'Living areas and bedrooms',
                        //     maxCapacityHint: '2 visits per day',
                        //     monthlyPrice: 3000,
                        //     visitpattern: 'DAILY',
                        //     maxvisitsperday: 1,
                        //     defaulttimewindows: ['morning', 'afternoon'],
                        //     isActive: true,
                        //   },
                        //   ... (other profiles commented out)
                        // ];
                        // for (const profileData of serviceProfiles) {
                        //   const profile = serviceProfileRepository.create({
                        //     ...profileData,
                        //     publicId: require('crypto').randomUUID(),
                        //   });
                        //   await serviceProfileRepository.save(profile);
                        //   this.logger.log(`Created service profile: ${profile.serviceType} - ${profile.profileName}`);
                        // }
                        // this.logger.log(`Seeded ${serviceProfiles.length} service profiles`);
                        this.logger.log('Skipping service profile seeding - system now uses custom plans');
                        return [4 /*yield*/, this.verifySeedData(serviceProfileRepository)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedServiceProfiles.prototype.verifySeedData = function (serviceProfileRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var profiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, serviceProfileRepository.find()];
                    case 1:
                        profiles = _a.sent();
                        this.logger.log("Verification: Found ".concat(profiles.length, " service profiles in database"));
                        if (profiles.length === 0) {
                            this.logger.error('WARNING: No service profiles found after seeding!');
                        }
                        else {
                            this.logger.log('Service profile seeding completed successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeedServiceProfiles;
}());
exports.SeedServiceProfiles = SeedServiceProfiles;
