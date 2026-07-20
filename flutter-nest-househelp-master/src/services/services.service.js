"use strict";
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
exports.ServicesService = void 0;
var common_1 = require("@nestjs/common");
var ServicesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesService = _classThis = /** @class */ (function () {
        function ServicesService_1(servicesRepository) {
            this.servicesRepository = servicesRepository;
        }
        ServicesService_1.prototype.validateServicePricing = function (basePrice) {
            if (basePrice <= 0) {
                throw new common_1.BadRequestException('Service price must be positive');
            }
            if (basePrice > 10000) {
                throw new common_1.BadRequestException('Service price cannot exceed 10000');
            }
        };
        ServicesService_1.prototype.create = function (createServiceDto) {
            return __awaiter(this, void 0, void 0, function () {
                var service;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.validateServicePricing(createServiceDto.basePrice);
                            service = this.servicesRepository.create(createServiceDto);
                            return [4 /*yield*/, this.servicesRepository.save(service)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ServicesService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.servicesRepository.find({
                                where: [{ category: 'Cleaning' }, { category: 'Cooking' }],
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ServicesService_1.prototype.findAllPaginated = function (skip_1, take_1, sortBy_1) {
            return __awaiter(this, arguments, void 0, function (skip, take, sortBy, sortOrder) {
                var order;
                if (sortOrder === void 0) { sortOrder = 'DESC'; }
                return __generator(this, function (_a) {
                    order = {};
                    order[sortBy || 'createdAt'] = sortOrder;
                    return [2 /*return*/, this.servicesRepository.findAndCount({
                            where: [{ category: 'Cleaning' }, { category: 'Cooking' }],
                            skip: skip,
                            take: take,
                            order: order,
                        })];
                });
            });
        };
        ServicesService_1.prototype.getCategoryAvailability = function () {
            return __awaiter(this, void 0, void 0, function () {
                var services, categoryMap, _i, services_1, service, categoryName, existing, result, _a, categoryMap_1, _b, name_1, data;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.servicesRepository.find({
                                where: [{ category: 'Cleaning' }, { category: 'Cooking' }],
                            })];
                        case 1:
                            services = _c.sent();
                            categoryMap = new Map();
                            for (_i = 0, services_1 = services; _i < services_1.length; _i++) {
                                service = services_1[_i];
                                categoryName = service.category || 'Unknown';
                                existing = categoryMap.get(categoryName);
                                if (existing) {
                                    existing.servicesCount++;
                                }
                                else {
                                    categoryMap.set(categoryName, { servicesCount: 1 });
                                }
                            }
                            result = [];
                            for (_a = 0, categoryMap_1 = categoryMap; _a < categoryMap_1.length; _a++) {
                                _b = categoryMap_1[_a], name_1 = _b[0], data = _b[1];
                                result.push({
                                    name: name_1,
                                    isAvailable: true,
                                    availableServicesCount: data.servicesCount,
                                    availableWorkersCount: Math.ceil(data.servicesCount / 2), // Estimate workers based on services
                                });
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        ServicesService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var isUUID;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isUUID = id.includes('-');
                            return [4 /*yield*/, this.servicesRepository.findOne({
                                    where: isUUID ? { publicId: id } : { id: parseInt(id) },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ServicesService_1.prototype.update = function (id, updateServiceDto) {
            return __awaiter(this, void 0, void 0, function () {
                var isUUID, whereClause;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isUUID = id.includes('-');
                            whereClause = isUUID ? { publicId: id } : { id: parseInt(id) };
                            return [4 /*yield*/, this.servicesRepository.update(whereClause, updateServiceDto)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.findOne(id)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ServicesService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var service, isUUID, whereClause;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            service = _a.sent();
                            if (!service) {
                                throw new common_1.ForbiddenException('Service not found');
                            }
                            if (service.category === 'Cleaning' || service.category === 'Cooking') {
                                throw new common_1.ForbiddenException('Cannot delete critical services');
                            }
                            isUUID = id.includes('-');
                            whereClause = isUUID ? { publicId: id } : { id: parseInt(id) };
                            return [4 /*yield*/, this.servicesRepository.delete(whereClause)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        /**
         * Find a service by its category name (e.g., 'CLEANING', 'COOKING', 'MAID')
         */
        ServicesService_1.prototype.findByCategory = function (category) {
            return __awaiter(this, void 0, void 0, function () {
                var categoryMap, dbCategory;
                return __generator(this, function (_a) {
                    categoryMap = {
                        'CLEANING': 'Cleaning',
                        'COOKING': 'Cooking',
                        'MAID': 'Cleaning', // Maid is part of cleaning
                        'HOME_CLEANING': 'Cleaning',
                        'COOK': 'Cooking',
                    };
                    dbCategory = categoryMap[category.toUpperCase()] || category;
                    return [2 /*return*/, this.servicesRepository.findOne({
                            where: { category: dbCategory },
                        })];
                });
            });
        };
        return ServicesService_1;
    }());
    __setFunctionName(_classThis, "ServicesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesService = _classThis;
}();
exports.ServicesService = ServicesService;
