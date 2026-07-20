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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateServiceDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var AdminUpdateServiceDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _subcategory_decorators;
    var _subcategory_initializers = [];
    var _subcategory_extraInitializers = [];
    var _basePrice_decorators;
    var _basePrice_initializers = [];
    var _basePrice_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _isAvailable_decorators;
    var _isAvailable_initializers = [];
    var _isAvailable_extraInitializers = [];
    var _isFastBooking_decorators;
    var _isFastBooking_initializers = [];
    var _isFastBooking_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _slots_decorators;
    var _slots_initializers = [];
    var _slots_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AdminUpdateServiceDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.category = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.subcategory = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _subcategory_initializers, void 0));
                this.basePrice = (__runInitializers(this, _subcategory_extraInitializers), __runInitializers(this, _basePrice_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _basePrice_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                this.isAvailable = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _isAvailable_initializers, void 0));
                this.isFastBooking = (__runInitializers(this, _isAvailable_extraInitializers), __runInitializers(this, _isFastBooking_initializers, void 0));
                this.duration = (__runInitializers(this, _isFastBooking_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
                this.slots = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _slots_initializers, void 0));
                __runInitializers(this, _slots_extraInitializers);
            }
            return AdminUpdateServiceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === '' ? undefined : value;
                }), (0, class_validator_1.IsString)({ message: 'Service name must be a string' }), (0, class_validator_1.MinLength)(2, { message: 'Service name must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(100, { message: 'Service name must not exceed 100 characters' })];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === '' ? undefined : value;
                }), (0, class_validator_1.IsString)({ message: 'Description must be a string' }), (0, class_validator_1.MaxLength)(1000, { message: 'Description must not exceed 1000 characters' })];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === '' ? undefined : value;
                }), (0, class_validator_1.IsString)({ message: 'Category must be a string' }), (0, class_validator_1.MinLength)(2, { message: 'Category must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(50, { message: 'Category must not exceed 50 characters' })];
            _subcategory_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === '' ? undefined : value;
                }), (0, class_validator_1.IsString)({ message: 'Subcategory must be a string' }), (0, class_validator_1.MinLength)(2, { message: 'Subcategory must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(50, { message: 'Subcategory must not exceed 50 characters' })];
            _basePrice_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)({}, { message: 'Base price must be a number' }), (0, class_validator_1.Min)(0, { message: 'Base price must be greater than or equal to 0' })];
            _imageUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === '' ? undefined : value;
                }), (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }), (0, class_validator_1.MaxLength)(500, { message: 'Image URL must not exceed 500 characters' })];
            _isAvailable_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'isAvailable must be a boolean' })];
            _isFastBooking_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'isFastBooking must be a boolean' })];
            _duration_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)({}, { message: 'Duration must be a number' })];
            _slots_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true, message: 'Each slot must be a string' })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _subcategory_decorators, { kind: "field", name: "subcategory", static: false, private: false, access: { has: function (obj) { return "subcategory" in obj; }, get: function (obj) { return obj.subcategory; }, set: function (obj, value) { obj.subcategory = value; } }, metadata: _metadata }, _subcategory_initializers, _subcategory_extraInitializers);
            __esDecorate(null, null, _basePrice_decorators, { kind: "field", name: "basePrice", static: false, private: false, access: { has: function (obj) { return "basePrice" in obj; }, get: function (obj) { return obj.basePrice; }, set: function (obj, value) { obj.basePrice = value; } }, metadata: _metadata }, _basePrice_initializers, _basePrice_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _isAvailable_decorators, { kind: "field", name: "isAvailable", static: false, private: false, access: { has: function (obj) { return "isAvailable" in obj; }, get: function (obj) { return obj.isAvailable; }, set: function (obj, value) { obj.isAvailable = value; } }, metadata: _metadata }, _isAvailable_initializers, _isAvailable_extraInitializers);
            __esDecorate(null, null, _isFastBooking_decorators, { kind: "field", name: "isFastBooking", static: false, private: false, access: { has: function (obj) { return "isFastBooking" in obj; }, get: function (obj) { return obj.isFastBooking; }, set: function (obj, value) { obj.isFastBooking = value; } }, metadata: _metadata }, _isFastBooking_initializers, _isFastBooking_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _slots_decorators, { kind: "field", name: "slots", static: false, private: false, access: { has: function (obj) { return "slots" in obj; }, get: function (obj) { return obj.slots; }, set: function (obj, value) { obj.slots = value; } }, metadata: _metadata }, _slots_initializers, _slots_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AdminUpdateServiceDto = AdminUpdateServiceDto;
