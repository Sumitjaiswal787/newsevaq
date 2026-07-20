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
exports.VerifyOtpLoginDto = void 0;
var class_validator_1 = require("class-validator");
var VerifyOtpLoginDto = function () {
    var _a;
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _idToken_decorators;
    var _idToken_initializers = [];
    var _idToken_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function VerifyOtpLoginDto() {
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                this.idToken = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _idToken_initializers, void 0));
                this.firstName = (__runInitializers(this, _idToken_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                __runInitializers(this, _lastName_extraInitializers);
            }
            return VerifyOtpLoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, class_validator_1.IsString)({ message: 'Phone number must be a string' }), (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }), (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, {
                    message: 'Phone number must be in E.164 format (e.g., +919876543210)',
                })];
            _idToken_decorators = [(0, class_validator_1.IsString)({ message: 'ID token must be a string' }), (0, class_validator_1.IsNotEmpty)({ message: 'ID token is required' })];
            _firstName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'First name must be a string' }), (0, class_validator_1.MinLength)(2, { message: 'First name must be at least 2 characters' }), (0, class_validator_1.MaxLength)(50, { message: 'First name must be maximum 50 characters' })];
            _lastName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Last name must be a string' }), (0, class_validator_1.MinLength)(2, { message: 'Last name must be at least 2 characters' }), (0, class_validator_1.MaxLength)(50, { message: 'Last name must be maximum 50 characters' })];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _idToken_decorators, { kind: "field", name: "idToken", static: false, private: false, access: { has: function (obj) { return "idToken" in obj; }, get: function (obj) { return obj.idToken; }, set: function (obj, value) { obj.idToken = value; } }, metadata: _metadata }, _idToken_initializers, _idToken_extraInitializers);
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.VerifyOtpLoginDto = VerifyOtpLoginDto;
