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
exports.SeedGreaterNoidaAreas = void 0;
var service_area_entity_1 = require("../../locations/entities/service_area.entity");
var micro_zone_entity_1 = require("../../locations/entities/micro_zone.entity");
var common_1 = require("@nestjs/common");
var SeedGreaterNoidaAreas = /** @class */ (function () {
    function SeedGreaterNoidaAreas() {
        this.logger = new common_1.Logger(SeedGreaterNoidaAreas.name);
    }
    SeedGreaterNoidaAreas.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceAreaRepository, microZoneRepository, existingArea, serviceAreaGN, microZones, _i, microZones_1, zoneData, microZone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceAreaRepository = dataSource.getRepository(service_area_entity_1.ServiceArea);
                        microZoneRepository = dataSource.getRepository(micro_zone_entity_1.MicroZone);
                        this.logger.log('Starting Greater Noida service area seeding...');
                        return [4 /*yield*/, serviceAreaRepository.findOne({
                                where: {
                                    name: 'Greater Noida - Greater Noida West',
                                },
                            })];
                    case 1:
                        existingArea = _a.sent();
                        if (!existingArea) return [3 /*break*/, 3];
                        this.logger.log('Greater Noida service area already exists, skipping creation');
                        return [4 /*yield*/, this.verifySeedData(serviceAreaRepository, microZoneRepository)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        this.logger.log('Creating Greater Noida service area near user location (28.5804571, 77.4392382)');
                        serviceAreaGN = serviceAreaRepository.create({
                            name: 'Greater Noida - Greater Noida West',
                            pincode: '201306',
                            minLat: 28.57, // Covering area around user's location
                            maxLat: 28.59,
                            minLng: 77.43,
                            maxLng: 77.45,
                            isActive: true,
                            coverageMap: {
                                type: 'MultiPolygon',
                                coordinates: [
                                    [
                                        [
                                            [77.43, 28.57],
                                            [77.45, 28.57],
                                            [77.45, 28.59],
                                            [77.43, 28.59],
                                            [77.43, 28.57],
                                        ],
                                    ],
                                ],
                            },
                        });
                        return [4 /*yield*/, serviceAreaRepository.save(serviceAreaGN)];
                    case 4:
                        _a.sent();
                        this.logger.log('Created Greater Noida service area');
                        microZones = [
                            {
                                name: 'Greater Noida - Alpha 1',
                                centerLat: 28.5805, // Near user's location 28.5804571
                                centerLng: 77.4392, // Near user's location 77.4392382
                                radiusKm: 2.0, // 2km radius to cover the area
                                zoneType: 'static',
                                isActive: true,
                            },
                            {
                                name: 'Greater Noida - Alpha 2',
                                centerLat: 28.575,
                                centerLng: 77.445,
                                radiusKm: 1.5,
                                zoneType: 'static',
                                isActive: true,
                            },
                            {
                                name: 'Greater Noida - Beta',
                                centerLat: 28.585,
                                centerLng: 77.435,
                                radiusKm: 1.5,
                                zoneType: 'static',
                                isActive: true,
                            },
                            {
                                name: 'Greater Noida - Commercial Belt',
                                centerLat: 28.582,
                                centerLng: 77.442,
                                radiusKm: 1.0,
                                zoneType: 'static',
                                isActive: true,
                            },
                        ];
                        _i = 0, microZones_1 = microZones;
                        _a.label = 5;
                    case 5:
                        if (!(_i < microZones_1.length)) return [3 /*break*/, 8];
                        zoneData = microZones_1[_i];
                        microZone = microZoneRepository.create(__assign(__assign({}, zoneData), { serviceArea: serviceAreaGN, boundaries: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [zoneData.centerLng - 0.01, zoneData.centerLat - 0.01],
                                        [zoneData.centerLng + 0.01, zoneData.centerLat - 0.01],
                                        [zoneData.centerLng + 0.01, zoneData.centerLat + 0.01],
                                        [zoneData.centerLng - 0.01, zoneData.centerLat + 0.01],
                                        [zoneData.centerLng - 0.01, zoneData.centerLat - 0.01],
                                    ],
                                ],
                            } }));
                        return [4 /*yield*/, microZoneRepository.save(microZone)];
                    case 6:
                        _a.sent();
                        this.logger.log("Created micro-zone: ".concat(zoneData.name, " at (").concat(zoneData.centerLat, ", ").concat(zoneData.centerLng, ")"));
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        this.logger.log('Service area seeding completed for Greater Noida');
                        return [4 /*yield*/, this.verifySeedData(serviceAreaRepository, microZoneRepository)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedGreaterNoidaAreas.prototype.verifySeedData = function (serviceAreaRepository, microZoneRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceAreas, microZones, _i, serviceAreas_1, area, _a, microZones_2, zone;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.log('Verifying seeded data...');
                        return [4 /*yield*/, serviceAreaRepository.find({
                                where: { isActive: true },
                            })];
                    case 1:
                        serviceAreas = _b.sent();
                        this.logger.log("Found ".concat(serviceAreas.length, " active service areas"));
                        return [4 /*yield*/, microZoneRepository.find({
                                where: { isActive: true },
                            })];
                    case 2:
                        microZones = _b.sent();
                        this.logger.log("Found ".concat(microZones.length, " active micro-zones"));
                        for (_i = 0, serviceAreas_1 = serviceAreas; _i < serviceAreas_1.length; _i++) {
                            area = serviceAreas_1[_i];
                            this.logger.debug("Service Area: ".concat(area.name, " - bounds: [").concat(area.minLat, ", ").concat(area.maxLat, "] x [").concat(area.minLng, ", ").concat(area.maxLng, "]"));
                        }
                        for (_a = 0, microZones_2 = microZones; _a < microZones_2.length; _a++) {
                            zone = microZones_2[_a];
                            this.logger.debug("Micro Zone: ".concat(zone.name, " - center: (").concat(zone.centerLat, ", ").concat(zone.centerLng, "), radius: ").concat(zone.radiusKm, "km"));
                        }
                        this.logger.log('Seed data verification completed');
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeedGreaterNoidaAreas;
}());
exports.SeedGreaterNoidaAreas = SeedGreaterNoidaAreas;
