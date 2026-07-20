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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
var common_1 = require("@nestjs/common");
var pricing_constants_1 = require("../common/constants/pricing.constants");
var PricingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PricingService = _classThis = /** @class */ (function () {
        function PricingService_1() {
        }
        /**
         * Calculate monthly cleaning subscription price based on apartment size
         * @param bhkType Apartment BHK type (1, 2, or 3)
         * @returns Monthly price in INR
         * @throws Error if BHK type is invalid
         */
        PricingService_1.prototype.calculateCleaningPrice = function (bhkType) {
            if (!pricing_constants_1.CLEANING_PRICES.hasOwnProperty(bhkType)) {
                throw new Error('Invalid BHK type. Must be 1, 2, or 3.');
            }
            return pricing_constants_1.CLEANING_PRICES[bhkType];
        };
        /**
         * Calculate monthly cooking subscription price
         * @param persons Number of persons (1 to 6 inclusive)
         * @param mealPlan Selected meal plan
         * @returns Monthly price in INR
         * @throws Error if persons or mealPlan are invalid
         */
        PricingService_1.prototype.calculateCookingPrice = function (persons, mealPlan) {
            // Validate persons count
            if (!Number.isInteger(persons) || persons < 1 || persons > 6) {
                throw new Error('Invalid number of persons. Must be an integer between 1 and 6.');
            }
            // Validate meal plan
            if (!pricing_constants_1.VALID_MEAL_PLANS.includes(mealPlan)) {
                throw new Error("Invalid meal plan. Must be one of: ".concat(pricing_constants_1.VALID_MEAL_PLANS.join(', ')));
            }
            // Handle full day plan
            if (mealPlan === 'FULL_DAY') {
                return pricing_constants_1.COOKING_FULL_DAY_PRICES[persons];
            }
            // Handle individual meal plans
            return pricing_constants_1.COOKING_MEAL_PRICES[persons][mealPlan];
        };
        return PricingService_1;
    }());
    __setFunctionName(_classThis, "PricingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PricingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PricingService = _classThis;
}();
exports.PricingService = PricingService;
