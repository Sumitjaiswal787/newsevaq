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
exports.CommunicationLog = exports.CommunicationDirection = exports.CommunicationType = void 0;
var typeorm_1 = require("typeorm");
var support_ticket_entity_1 = require("./support-ticket.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var CommunicationType;
(function (CommunicationType) {
    CommunicationType["EMAIL"] = "email";
    CommunicationType["SMS"] = "sms";
    CommunicationType["PUSH"] = "push";
    CommunicationType["NOTE"] = "note";
})(CommunicationType || (exports.CommunicationType = CommunicationType = {}));
var CommunicationDirection;
(function (CommunicationDirection) {
    CommunicationDirection["INBOUND"] = "inbound";
    CommunicationDirection["OUTBOUND"] = "outbound";
})(CommunicationDirection || (exports.CommunicationDirection = CommunicationDirection = {}));
var CommunicationLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('communication_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _ticket_decorators;
    var _ticket_initializers = [];
    var _ticket_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _adminId_decorators;
    var _adminId_initializers = [];
    var _adminId_extraInitializers = [];
    var _admin_decorators;
    var _admin_initializers = [];
    var _admin_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _direction_decorators;
    var _direction_initializers = [];
    var _direction_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var CommunicationLog = _classThis = /** @class */ (function () {
        function CommunicationLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.ticketId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
            this.ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
            this.userId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.adminId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _adminId_initializers, void 0));
            this.admin = (__runInitializers(this, _adminId_extraInitializers), __runInitializers(this, _admin_initializers, void 0));
            this.type = (__runInitializers(this, _admin_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.direction = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _direction_initializers, void 0));
            this.content = (__runInitializers(this, _direction_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.createdAt = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return CommunicationLog_1;
    }());
    __setFunctionName(_classThis, "CommunicationLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _ticketId_decorators = [(0, typeorm_1.Column)()];
        _ticket_decorators = [(0, typeorm_1.ManyToOne)(function () { return support_ticket_entity_1.SupportTicket; }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _adminId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _admin_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'adminId' })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: CommunicationType,
            })];
        _direction_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: CommunicationDirection,
            })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
        __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: function (obj) { return "ticket" in obj; }, get: function (obj) { return obj.ticket; }, set: function (obj, value) { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _adminId_decorators, { kind: "field", name: "adminId", static: false, private: false, access: { has: function (obj) { return "adminId" in obj; }, get: function (obj) { return obj.adminId; }, set: function (obj, value) { obj.adminId = value; } }, metadata: _metadata }, _adminId_initializers, _adminId_extraInitializers);
        __esDecorate(null, null, _admin_decorators, { kind: "field", name: "admin", static: false, private: false, access: { has: function (obj) { return "admin" in obj; }, get: function (obj) { return obj.admin; }, set: function (obj, value) { obj.admin = value; } }, metadata: _metadata }, _admin_initializers, _admin_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _direction_decorators, { kind: "field", name: "direction", static: false, private: false, access: { has: function (obj) { return "direction" in obj; }, get: function (obj) { return obj.direction; }, set: function (obj, value) { obj.direction = value; } }, metadata: _metadata }, _direction_initializers, _direction_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommunicationLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommunicationLog = _classThis;
}();
exports.CommunicationLog = CommunicationLog;
