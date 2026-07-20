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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var typeorm_1 = require("typeorm");
var worker_entity_1 = require("../../workers/entities/worker.entity");
var service_request_entity_1 = require("../../service-requests/entities/service-request.entity");
var crypto_1 = require("crypto");
var Service = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('service')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _publicId_decorators;
    var _publicId_initializers = [];
    var _publicId_extraInitializers = [];
    var _generatePublicId_decorators;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _basePrice_decorators;
    var _basePrice_initializers = [];
    var _basePrice_extraInitializers = [];
    var _reassuranceText_decorators;
    var _reassuranceText_initializers = [];
    var _reassuranceText_extraInitializers = [];
    var _whatWillHappen_decorators;
    var _whatWillHappen_initializers = [];
    var _whatWillHappen_extraInitializers = [];
    var _whatWillNotHappen_decorators;
    var _whatWillNotHappen_initializers = [];
    var _whatWillNotHappen_extraInitializers = [];
    var _ifSomethingGoesWrong_decorators;
    var _ifSomethingGoesWrong_initializers = [];
    var _ifSomethingGoesWrong_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _subcategory_decorators;
    var _subcategory_initializers = [];
    var _subcategory_extraInitializers = [];
    var _isAvailable_decorators;
    var _isAvailable_initializers = [];
    var _isAvailable_extraInitializers = [];
    var _isFastBooking_decorators;
    var _isFastBooking_initializers = [];
    var _isFastBooking_extraInitializers = [];
    var _estimatedWaitTime_decorators;
    var _estimatedWaitTime_initializers = [];
    var _estimatedWaitTime_extraInitializers = [];
    var _workerCount_decorators;
    var _workerCount_initializers = [];
    var _workerCount_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _slots_decorators;
    var _slots_initializers = [];
    var _slots_extraInitializers = [];
    var _workers_decorators;
    var _workers_initializers = [];
    var _workers_extraInitializers = [];
    var _serviceRequests_decorators;
    var _serviceRequests_initializers = [];
    var _serviceRequests_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Service = _classThis = /** @class */ (function () {
        function Service_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0)); // Internal ID
            this.publicId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _publicId_initializers, void 0)); // Public API ID
            this.name = (__runInitializers(this, _publicId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.basePrice = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _basePrice_initializers, void 0));
            this.reassuranceText = (__runInitializers(this, _basePrice_extraInitializers), __runInitializers(this, _reassuranceText_initializers, void 0)); // "A safe choice for most homes"
            this.whatWillHappen = (__runInitializers(this, _reassuranceText_extraInitializers), __runInitializers(this, _whatWillHappen_initializers, void 0)); // ["Helper will arrive and confirm task", "Work done with standard tools"]
            this.whatWillNotHappen = (__runInitializers(this, _whatWillHappen_extraInitializers), __runInitializers(this, _whatWillNotHappen_initializers, void 0)); // ["No upselling without approval", "No extra work added silently"]
            this.ifSomethingGoesWrong = (__runInitializers(this, _whatWillNotHappen_extraInitializers), __runInitializers(this, _ifSomethingGoesWrong_initializers, void 0)); // "Sevaq will replace or refund immediately"
            this.category = (__runInitializers(this, _ifSomethingGoesWrong_extraInitializers), __runInitializers(this, _category_initializers, void 0)); // Simple string category for now
            this.subcategory = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _subcategory_initializers, void 0));
            this.isAvailable = (__runInitializers(this, _subcategory_extraInitializers), __runInitializers(this, _isAvailable_initializers, void 0));
            this.isFastBooking = (__runInitializers(this, _isAvailable_extraInitializers), __runInitializers(this, _isFastBooking_initializers, void 0));
            this.estimatedWaitTime = (__runInitializers(this, _isFastBooking_extraInitializers), __runInitializers(this, _estimatedWaitTime_initializers, void 0));
            this.workerCount = (__runInitializers(this, _estimatedWaitTime_extraInitializers), __runInitializers(this, _workerCount_initializers, void 0));
            this.imageUrl = (__runInitializers(this, _workerCount_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
            this.duration = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.slots = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _slots_initializers, void 0));
            this.workers = (__runInitializers(this, _slots_extraInitializers), __runInitializers(this, _workers_initializers, void 0));
            this.serviceRequests = (__runInitializers(this, _workers_extraInitializers), __runInitializers(this, _serviceRequests_initializers, void 0));
            this.createdAt = (__runInitializers(this, _serviceRequests_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        Service_1.prototype.generatePublicId = function () {
            if (!this.publicId) {
                this.publicId = (0, crypto_1.randomUUID)();
            }
        };
        return Service_1;
    }());
    __setFunctionName(_classThis, "Service");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _publicId_decorators = [(0, typeorm_1.Column)('uuid', { unique: true, nullable: false })];
        _generatePublicId_decorators = [(0, typeorm_1.BeforeInsert)()];
        _name_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _basePrice_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 })];
        _reassuranceText_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _whatWillHappen_decorators = [(0, typeorm_1.Column)('text', { array: true, default: '{}' })];
        _whatWillNotHappen_decorators = [(0, typeorm_1.Column)('text', { array: true, default: '{}' })];
        _ifSomethingGoesWrong_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _category_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _subcategory_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _isAvailable_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _isFastBooking_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _estimatedWaitTime_decorators = [(0, typeorm_1.Column)({ type: 'integer', nullable: true })];
        _workerCount_decorators = [(0, typeorm_1.Column)({ type: 'integer', nullable: true })];
        _imageUrl_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _duration_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 2 })];
        _slots_decorators = [(0, typeorm_1.Column)('text', { array: true, default: '{"morning", "afternoon", "evening"}' })];
        _workers_decorators = [(0, typeorm_1.ManyToMany)(function () { return worker_entity_1.Worker; }, function (worker) { return worker.services; })];
        _serviceRequests_decorators = [(0, typeorm_1.OneToMany)(function () { return service_request_entity_1.ServiceRequest; }, function (serviceRequest) { return serviceRequest.service; })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(_classThis, null, _generatePublicId_decorators, { kind: "method", name: "generatePublicId", static: false, private: false, access: { has: function (obj) { return "generatePublicId" in obj; }, get: function (obj) { return obj.generatePublicId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _publicId_decorators, { kind: "field", name: "publicId", static: false, private: false, access: { has: function (obj) { return "publicId" in obj; }, get: function (obj) { return obj.publicId; }, set: function (obj, value) { obj.publicId = value; } }, metadata: _metadata }, _publicId_initializers, _publicId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _basePrice_decorators, { kind: "field", name: "basePrice", static: false, private: false, access: { has: function (obj) { return "basePrice" in obj; }, get: function (obj) { return obj.basePrice; }, set: function (obj, value) { obj.basePrice = value; } }, metadata: _metadata }, _basePrice_initializers, _basePrice_extraInitializers);
        __esDecorate(null, null, _reassuranceText_decorators, { kind: "field", name: "reassuranceText", static: false, private: false, access: { has: function (obj) { return "reassuranceText" in obj; }, get: function (obj) { return obj.reassuranceText; }, set: function (obj, value) { obj.reassuranceText = value; } }, metadata: _metadata }, _reassuranceText_initializers, _reassuranceText_extraInitializers);
        __esDecorate(null, null, _whatWillHappen_decorators, { kind: "field", name: "whatWillHappen", static: false, private: false, access: { has: function (obj) { return "whatWillHappen" in obj; }, get: function (obj) { return obj.whatWillHappen; }, set: function (obj, value) { obj.whatWillHappen = value; } }, metadata: _metadata }, _whatWillHappen_initializers, _whatWillHappen_extraInitializers);
        __esDecorate(null, null, _whatWillNotHappen_decorators, { kind: "field", name: "whatWillNotHappen", static: false, private: false, access: { has: function (obj) { return "whatWillNotHappen" in obj; }, get: function (obj) { return obj.whatWillNotHappen; }, set: function (obj, value) { obj.whatWillNotHappen = value; } }, metadata: _metadata }, _whatWillNotHappen_initializers, _whatWillNotHappen_extraInitializers);
        __esDecorate(null, null, _ifSomethingGoesWrong_decorators, { kind: "field", name: "ifSomethingGoesWrong", static: false, private: false, access: { has: function (obj) { return "ifSomethingGoesWrong" in obj; }, get: function (obj) { return obj.ifSomethingGoesWrong; }, set: function (obj, value) { obj.ifSomethingGoesWrong = value; } }, metadata: _metadata }, _ifSomethingGoesWrong_initializers, _ifSomethingGoesWrong_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _subcategory_decorators, { kind: "field", name: "subcategory", static: false, private: false, access: { has: function (obj) { return "subcategory" in obj; }, get: function (obj) { return obj.subcategory; }, set: function (obj, value) { obj.subcategory = value; } }, metadata: _metadata }, _subcategory_initializers, _subcategory_extraInitializers);
        __esDecorate(null, null, _isAvailable_decorators, { kind: "field", name: "isAvailable", static: false, private: false, access: { has: function (obj) { return "isAvailable" in obj; }, get: function (obj) { return obj.isAvailable; }, set: function (obj, value) { obj.isAvailable = value; } }, metadata: _metadata }, _isAvailable_initializers, _isAvailable_extraInitializers);
        __esDecorate(null, null, _isFastBooking_decorators, { kind: "field", name: "isFastBooking", static: false, private: false, access: { has: function (obj) { return "isFastBooking" in obj; }, get: function (obj) { return obj.isFastBooking; }, set: function (obj, value) { obj.isFastBooking = value; } }, metadata: _metadata }, _isFastBooking_initializers, _isFastBooking_extraInitializers);
        __esDecorate(null, null, _estimatedWaitTime_decorators, { kind: "field", name: "estimatedWaitTime", static: false, private: false, access: { has: function (obj) { return "estimatedWaitTime" in obj; }, get: function (obj) { return obj.estimatedWaitTime; }, set: function (obj, value) { obj.estimatedWaitTime = value; } }, metadata: _metadata }, _estimatedWaitTime_initializers, _estimatedWaitTime_extraInitializers);
        __esDecorate(null, null, _workerCount_decorators, { kind: "field", name: "workerCount", static: false, private: false, access: { has: function (obj) { return "workerCount" in obj; }, get: function (obj) { return obj.workerCount; }, set: function (obj, value) { obj.workerCount = value; } }, metadata: _metadata }, _workerCount_initializers, _workerCount_extraInitializers);
        __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _slots_decorators, { kind: "field", name: "slots", static: false, private: false, access: { has: function (obj) { return "slots" in obj; }, get: function (obj) { return obj.slots; }, set: function (obj, value) { obj.slots = value; } }, metadata: _metadata }, _slots_initializers, _slots_extraInitializers);
        __esDecorate(null, null, _workers_decorators, { kind: "field", name: "workers", static: false, private: false, access: { has: function (obj) { return "workers" in obj; }, get: function (obj) { return obj.workers; }, set: function (obj, value) { obj.workers = value; } }, metadata: _metadata }, _workers_initializers, _workers_extraInitializers);
        __esDecorate(null, null, _serviceRequests_decorators, { kind: "field", name: "serviceRequests", static: false, private: false, access: { has: function (obj) { return "serviceRequests" in obj; }, get: function (obj) { return obj.serviceRequests; }, set: function (obj, value) { obj.serviceRequests = value; } }, metadata: _metadata }, _serviceRequests_initializers, _serviceRequests_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Service = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Service = _classThis;
}();
exports.Service = Service;
