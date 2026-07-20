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
exports.UpdateAddressDto = exports.CreateAddressDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateAddressDto = function () {
    var _a;
    var _societyName_decorators;
    var _societyName_initializers = [];
    var _societyName_extraInitializers = [];
    var _towerNumber_decorators;
    var _towerNumber_initializers = [];
    var _towerNumber_extraInitializers = [];
    var _flatNumber_decorators;
    var _flatNumber_initializers = [];
    var _flatNumber_extraInitializers = [];
    var _landmark_decorators;
    var _landmark_initializers = [];
    var _landmark_extraInitializers = [];
    var _area_decorators;
    var _area_initializers = [];
    var _area_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _pincode_decorators;
    var _pincode_initializers = [];
    var _pincode_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAddressDto() {
                this.societyName = __runInitializers(this, _societyName_initializers, void 0);
                this.towerNumber = (__runInitializers(this, _societyName_extraInitializers), __runInitializers(this, _towerNumber_initializers, void 0));
                this.flatNumber = (__runInitializers(this, _towerNumber_extraInitializers), __runInitializers(this, _flatNumber_initializers, void 0));
                this.landmark = (__runInitializers(this, _flatNumber_extraInitializers), __runInitializers(this, _landmark_initializers, void 0));
                this.area = (__runInitializers(this, _landmark_extraInitializers), __runInitializers(this, _area_initializers, void 0));
                this.city = (__runInitializers(this, _area_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.pincode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _pincode_initializers, void 0));
                this.latitude = (__runInitializers(this, _pincode_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.isDefault = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
                this.label = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _label_initializers, void 0));
                __runInitializers(this, _label_extraInitializers);
            }
            return CreateAddressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _societyName_decorators = [(0, class_validator_1.IsString)()];
            _towerNumber_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _flatNumber_decorators = [(0, class_validator_1.IsString)()];
            _landmark_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _area_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _state_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pincode_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _latitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (value === null || value === undefined || value === '')
                        return undefined;
                    var parsed = parseFloat(value);
                    return isNaN(parsed) ? value : parsed;
                }), (0, class_validator_1.IsNumber)({}, { message: 'Latitude must be a number' })];
            _longitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (value === null || value === undefined || value === '')
                        return undefined;
                    var parsed = parseFloat(value);
                    return isNaN(parsed) ? value : parsed;
                }), (0, class_validator_1.IsNumber)({}, { message: 'Longitude must be a number' })];
            _isDefault_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _label_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _societyName_decorators, { kind: "field", name: "societyName", static: false, private: false, access: { has: function (obj) { return "societyName" in obj; }, get: function (obj) { return obj.societyName; }, set: function (obj, value) { obj.societyName = value; } }, metadata: _metadata }, _societyName_initializers, _societyName_extraInitializers);
            __esDecorate(null, null, _towerNumber_decorators, { kind: "field", name: "towerNumber", static: false, private: false, access: { has: function (obj) { return "towerNumber" in obj; }, get: function (obj) { return obj.towerNumber; }, set: function (obj, value) { obj.towerNumber = value; } }, metadata: _metadata }, _towerNumber_initializers, _towerNumber_extraInitializers);
            __esDecorate(null, null, _flatNumber_decorators, { kind: "field", name: "flatNumber", static: false, private: false, access: { has: function (obj) { return "flatNumber" in obj; }, get: function (obj) { return obj.flatNumber; }, set: function (obj, value) { obj.flatNumber = value; } }, metadata: _metadata }, _flatNumber_initializers, _flatNumber_extraInitializers);
            __esDecorate(null, null, _landmark_decorators, { kind: "field", name: "landmark", static: false, private: false, access: { has: function (obj) { return "landmark" in obj; }, get: function (obj) { return obj.landmark; }, set: function (obj, value) { obj.landmark = value; } }, metadata: _metadata }, _landmark_initializers, _landmark_extraInitializers);
            __esDecorate(null, null, _area_decorators, { kind: "field", name: "area", static: false, private: false, access: { has: function (obj) { return "area" in obj; }, get: function (obj) { return obj.area; }, set: function (obj, value) { obj.area = value; } }, metadata: _metadata }, _area_initializers, _area_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _pincode_decorators, { kind: "field", name: "pincode", static: false, private: false, access: { has: function (obj) { return "pincode" in obj; }, get: function (obj) { return obj.pincode; }, set: function (obj, value) { obj.pincode = value; } }, metadata: _metadata }, _pincode_initializers, _pincode_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAddressDto = CreateAddressDto;
var UpdateAddressDto = function () {
    var _a;
    var _societyName_decorators;
    var _societyName_initializers = [];
    var _societyName_extraInitializers = [];
    var _towerNumber_decorators;
    var _towerNumber_initializers = [];
    var _towerNumber_extraInitializers = [];
    var _flatNumber_decorators;
    var _flatNumber_initializers = [];
    var _flatNumber_extraInitializers = [];
    var _landmark_decorators;
    var _landmark_initializers = [];
    var _landmark_extraInitializers = [];
    var _area_decorators;
    var _area_initializers = [];
    var _area_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _pincode_decorators;
    var _pincode_initializers = [];
    var _pincode_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateAddressDto() {
                this.societyName = __runInitializers(this, _societyName_initializers, void 0);
                this.towerNumber = (__runInitializers(this, _societyName_extraInitializers), __runInitializers(this, _towerNumber_initializers, void 0));
                this.flatNumber = (__runInitializers(this, _towerNumber_extraInitializers), __runInitializers(this, _flatNumber_initializers, void 0));
                this.landmark = (__runInitializers(this, _flatNumber_extraInitializers), __runInitializers(this, _landmark_initializers, void 0));
                this.area = (__runInitializers(this, _landmark_extraInitializers), __runInitializers(this, _area_initializers, void 0));
                this.city = (__runInitializers(this, _area_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.pincode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _pincode_initializers, void 0));
                this.latitude = (__runInitializers(this, _pincode_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.isDefault = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
                this.label = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _label_initializers, void 0));
                __runInitializers(this, _label_extraInitializers);
            }
            return UpdateAddressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _societyName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _towerNumber_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _flatNumber_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _landmark_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _area_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _state_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pincode_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _latitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _longitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _isDefault_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _label_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _societyName_decorators, { kind: "field", name: "societyName", static: false, private: false, access: { has: function (obj) { return "societyName" in obj; }, get: function (obj) { return obj.societyName; }, set: function (obj, value) { obj.societyName = value; } }, metadata: _metadata }, _societyName_initializers, _societyName_extraInitializers);
            __esDecorate(null, null, _towerNumber_decorators, { kind: "field", name: "towerNumber", static: false, private: false, access: { has: function (obj) { return "towerNumber" in obj; }, get: function (obj) { return obj.towerNumber; }, set: function (obj, value) { obj.towerNumber = value; } }, metadata: _metadata }, _towerNumber_initializers, _towerNumber_extraInitializers);
            __esDecorate(null, null, _flatNumber_decorators, { kind: "field", name: "flatNumber", static: false, private: false, access: { has: function (obj) { return "flatNumber" in obj; }, get: function (obj) { return obj.flatNumber; }, set: function (obj, value) { obj.flatNumber = value; } }, metadata: _metadata }, _flatNumber_initializers, _flatNumber_extraInitializers);
            __esDecorate(null, null, _landmark_decorators, { kind: "field", name: "landmark", static: false, private: false, access: { has: function (obj) { return "landmark" in obj; }, get: function (obj) { return obj.landmark; }, set: function (obj, value) { obj.landmark = value; } }, metadata: _metadata }, _landmark_initializers, _landmark_extraInitializers);
            __esDecorate(null, null, _area_decorators, { kind: "field", name: "area", static: false, private: false, access: { has: function (obj) { return "area" in obj; }, get: function (obj) { return obj.area; }, set: function (obj, value) { obj.area = value; } }, metadata: _metadata }, _area_initializers, _area_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _pincode_decorators, { kind: "field", name: "pincode", static: false, private: false, access: { has: function (obj) { return "pincode" in obj; }, get: function (obj) { return obj.pincode; }, set: function (obj, value) { obj.pincode = value; } }, metadata: _metadata }, _pincode_initializers, _pincode_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateAddressDto = UpdateAddressDto;
