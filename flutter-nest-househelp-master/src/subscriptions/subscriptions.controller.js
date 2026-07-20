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
exports.SubscriptionsController = void 0;
var common_1 = require("@nestjs/common");
var subscription_entity_1 = require("./entities/subscription.entity");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var SubscriptionsController = function () {
    var _classDecorators = [(0, common_1.Controller)('subscriptions'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createSubscription_decorators;
    var _getSubscriptionsByUserId_decorators;
    var _getSubscriptionById_decorators;
    var _getSubscriptionByPublicId_decorators;
    var _pauseSubscription_decorators;
    var _resumeSubscription_decorators;
    var _cancelSubscription_decorators;
    var _updateSubscription_decorators;
    var _getAllSubscriptions_decorators;
    var _getCleaningPrice_decorators;
    var _getCookingPrice_decorators;
    var SubscriptionsController = _classThis = /** @class */ (function () {
        function SubscriptionsController_1(subscriptionsService, pricingService) {
            this.subscriptionsService = (__runInitializers(this, _instanceExtraInitializers), subscriptionsService);
            this.pricingService = pricingService;
        }
        SubscriptionsController_1.prototype.createSubscription = function (body, req) {
            return __awaiter(this, void 0, void 0, function () {
                var startDate, errorMessage;
                var _a;
                return __generator(this, function (_b) {
                    try {
                        startDate = new Date(body.startDate);
                        return [2 /*return*/, this.subscriptionsService.createSubscription(req.user.userId, body.serviceProfileId, body.preferredTimeWindow, startDate, body.location, (_a = body.monthlyPriceSnapshot) !== null && _a !== void 0 ? _a : 0)];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        // Check for duplicate subscription error
                        if (errorMessage.includes('already have an active subscription')) {
                            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.CONFLICT);
                        }
                        throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.getSubscriptionsByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var isNumeric;
                return __generator(this, function (_a) {
                    isNumeric = /^[0-9]+$/.test(userId);
                    if (isNumeric) {
                        return [2 /*return*/, this.subscriptionsService.getSubscriptionsByUserId(userId)];
                    }
                    else {
                        // It's a UUID, use publicId
                        return [2 /*return*/, this.subscriptionsService.getSubscriptionsByPublicId(userId)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.getSubscriptionById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.subscriptionsService.getSubscriptionById(parseInt(id))];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new common_1.HttpException('Subscription not found', common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, subscription];
                    }
                });
            });
        };
        SubscriptionsController_1.prototype.getSubscriptionByPublicId = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.subscriptionsService.getSubscriptionByPublicId(publicId)];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription) {
                                throw new common_1.HttpException('Subscription not found', common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, subscription];
                    }
                });
            });
        };
        SubscriptionsController_1.prototype.pauseSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.subscriptionsService.pauseSubscription(parseInt(id))];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.resumeSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.subscriptionsService.resumeSubscription(parseInt(id))];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.cancelSubscription = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.subscriptionsService.cancelSubscription(parseInt(id))];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.updateSubscription = function (id, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.subscriptionsService.updateSubscription(parseInt(id), updates)];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.getAllSubscriptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.subscriptionsService.getSubscriptionsByStatus(subscription_entity_1.SubscriptionStatus.ACTIVE)];
                });
            });
        };
        SubscriptionsController_1.prototype.getCleaningPrice = function (bhkType) {
            return __awaiter(this, void 0, void 0, function () {
                var price, errorMessage;
                return __generator(this, function (_a) {
                    try {
                        price = this.pricingService.calculateCleaningPrice(parseInt(bhkType));
                        return [2 /*return*/, { success: true, price: price, bhkType: parseInt(bhkType) }];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException({ success: false, message: errorMessage }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SubscriptionsController_1.prototype.getCookingPrice = function (persons, mealPlan) {
            return __awaiter(this, void 0, void 0, function () {
                var price, errorMessage;
                return __generator(this, function (_a) {
                    try {
                        price = this.pricingService.calculateCookingPrice(parseInt(persons), mealPlan);
                        return [2 /*return*/, { success: true, price: price, persons: parseInt(persons), mealPlan: mealPlan }];
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : 'Unknown error';
                        throw new common_1.HttpException({ success: false, message: errorMessage }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    return [2 /*return*/];
                });
            });
        };
        return SubscriptionsController_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createSubscription_decorators = [(0, common_1.Post)()];
        _getSubscriptionsByUserId_decorators = [(0, common_1.Get)('user/:userId')];
        _getSubscriptionById_decorators = [(0, common_1.Get)(':id')];
        _getSubscriptionByPublicId_decorators = [(0, common_1.Get)('public/:publicId')];
        _pauseSubscription_decorators = [(0, common_1.Put)(':id/pause')];
        _resumeSubscription_decorators = [(0, common_1.Put)(':id/resume')];
        _cancelSubscription_decorators = [(0, common_1.Put)(':id/cancel')];
        _updateSubscription_decorators = [(0, common_1.Put)(':id')];
        _getAllSubscriptions_decorators = [(0, common_1.Get)()];
        _getCleaningPrice_decorators = [(0, common_1.Get)('pricing/cleaning/:bhkType')];
        _getCookingPrice_decorators = [(0, common_1.Get)('pricing/cooking/:persons/:mealPlan')];
        __esDecorate(_classThis, null, _createSubscription_decorators, { kind: "method", name: "createSubscription", static: false, private: false, access: { has: function (obj) { return "createSubscription" in obj; }, get: function (obj) { return obj.createSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSubscriptionsByUserId_decorators, { kind: "method", name: "getSubscriptionsByUserId", static: false, private: false, access: { has: function (obj) { return "getSubscriptionsByUserId" in obj; }, get: function (obj) { return obj.getSubscriptionsByUserId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSubscriptionById_decorators, { kind: "method", name: "getSubscriptionById", static: false, private: false, access: { has: function (obj) { return "getSubscriptionById" in obj; }, get: function (obj) { return obj.getSubscriptionById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSubscriptionByPublicId_decorators, { kind: "method", name: "getSubscriptionByPublicId", static: false, private: false, access: { has: function (obj) { return "getSubscriptionByPublicId" in obj; }, get: function (obj) { return obj.getSubscriptionByPublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _pauseSubscription_decorators, { kind: "method", name: "pauseSubscription", static: false, private: false, access: { has: function (obj) { return "pauseSubscription" in obj; }, get: function (obj) { return obj.pauseSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resumeSubscription_decorators, { kind: "method", name: "resumeSubscription", static: false, private: false, access: { has: function (obj) { return "resumeSubscription" in obj; }, get: function (obj) { return obj.resumeSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelSubscription_decorators, { kind: "method", name: "cancelSubscription", static: false, private: false, access: { has: function (obj) { return "cancelSubscription" in obj; }, get: function (obj) { return obj.cancelSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateSubscription_decorators, { kind: "method", name: "updateSubscription", static: false, private: false, access: { has: function (obj) { return "updateSubscription" in obj; }, get: function (obj) { return obj.updateSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllSubscriptions_decorators, { kind: "method", name: "getAllSubscriptions", static: false, private: false, access: { has: function (obj) { return "getAllSubscriptions" in obj; }, get: function (obj) { return obj.getAllSubscriptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCleaningPrice_decorators, { kind: "method", name: "getCleaningPrice", static: false, private: false, access: { has: function (obj) { return "getCleaningPrice" in obj; }, get: function (obj) { return obj.getCleaningPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCookingPrice_decorators, { kind: "method", name: "getCookingPrice", static: false, private: false, access: { has: function (obj) { return "getCookingPrice" in obj; }, get: function (obj) { return obj.getCookingPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsController = _classThis;
}();
exports.SubscriptionsController = SubscriptionsController;
