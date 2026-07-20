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
exports.SeedServiceAreas = void 0;
var service_area_entity_1 = require("../../locations/entities/service_area.entity");
var micro_zone_entity_1 = require("../../locations/entities/micro_zone.entity");
var common_1 = require("@nestjs/common");
var SeedServiceAreas = /** @class */ (function () {
    function SeedServiceAreas() {
        this.logger = new common_1.Logger(SeedServiceAreas.name);
    }
    SeedServiceAreas.prototype.run = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceAreaRepository, microZoneRepository, existingArea, serviceArea201306, microZones, _i, microZones_1, zoneData, microZone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceAreaRepository = dataSource.getRepository(service_area_entity_1.ServiceArea);
                        microZoneRepository = dataSource.getRepository(micro_zone_entity_1.MicroZone);
                        this.logger.log('Starting service area seeding...');
                        return [4 /*yield*/, serviceAreaRepository.findOne({
                                where: {
                                    name: '201306 Area',
                                },
                            })];
                    case 1:
                        existingArea = _a.sent();
                        if (!existingArea) return [3 /*break*/, 3];
                        this.logger.log('201306 service area already exists, skipping creation');
                        return [4 /*yield*/, this.verifySeedData(serviceAreaRepository, microZoneRepository)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        this.logger.log('Creating 201306 service area with approximate coordinates for Noida/Greater Noida region');
                        serviceArea201306 = serviceAreaRepository.create({
                            name: '201306 Area',
                            pincode: '201306',
                            minLat: 28.61, // Approximate latitude for 201306
                            maxLat: 28.63,
                            minLng: 77.36, // Approximate longitude for 201306
                            maxLng: 77.38,
                            isActive: true,
                            coverageMap: {
                                type: 'MultiPolygon',
                                coordinates: [
                                    [
                                        [
                                            [77.36, 28.61],
                                            [77.38, 28.61],
                                            [77.38, 28.63],
                                            [77.36, 28.63],
                                            [77.36, 28.61],
                                        ],
                                    ],
                                ],
                            },
                        });
                        return [4 /*yield*/, serviceAreaRepository.save(serviceArea201306)];
                    case 4:
                        _a.sent();
                        this.logger.log('Created 201306 service area');
                        microZones = [
                            {
                                name: '201306 - Sector 1',
                                centerLat: 28.615,
                                centerLng: 77.365,
                                radiusKm: 1.0,
                                zoneType: 'static',
                                isActive: true,
                            },
                            {
                                name: '201306 - Sector 2',
                                centerLat: 28.62,
                                centerLng: 77.37,
                                radiusKm: 1.0,
                                zoneType: 'static',
                                isActive: true,
                            },
                            {
                                name: '201306 - Sector 3',
                                centerLat: 28.625,
                                centerLng: 77.375,
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
                        microZone = microZoneRepository.create(__assign(__assign({}, zoneData), { serviceArea: serviceArea201306, boundaries: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [zoneData.centerLng - 0.005, zoneData.centerLat - 0.005],
                                        [zoneData.centerLng + 0.005, zoneData.centerLat - 0.005],
                                        [zoneData.centerLng + 0.005, zoneData.centerLat + 0.005],
                                        [zoneData.centerLng - 0.005, zoneData.centerLat + 0.005],
                                        [zoneData.centerLng - 0.005, zoneData.centerLat - 0.005],
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
                        this.logger.log('Service area seeding completed for 201306');
                        return [4 /*yield*/, this.verifySeedData(serviceAreaRepository, microZoneRepository)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedServiceAreas.prototype.verifySeedData = function (serviceAreaRepository, microZoneRepository) {
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
    return SeedServiceAreas;
}());
exports.SeedServiceAreas = SeedServiceAreas;
