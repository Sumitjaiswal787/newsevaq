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
exports.SupportController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var communication_log_entity_1 = require("./entities/communication-log.entity");
var SupportController = function () {
    var _classDecorators = [(0, common_1.Controller)('admin/support'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getTickets_decorators;
    var _getTicketById_decorators;
    var _createTicket_decorators;
    var _updateTicket_decorators;
    var _assignTicket_decorators;
    var _resolveTicket_decorators;
    var _getCommunicationLog_decorators;
    var _addCommunicationLog_decorators;
    var SupportController = _classThis = /** @class */ (function () {
        function SupportController_1(supportService) {
            this.supportService = (__runInitializers(this, _instanceExtraInitializers), supportService);
        }
        // Ticket endpoints
        SupportController_1.prototype.getTickets = function (status, priority) {
            return __awaiter(this, void 0, void 0, function () {
                var filters;
                return __generator(this, function (_a) {
                    filters = {};
                    if (status)
                        filters.status = status;
                    if (priority)
                        filters.priority = priority;
                    return [2 /*return*/, this.supportService.getTickets(filters)];
                });
            });
        };
        SupportController_1.prototype.getTicketById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.getTicketById(Number(id))];
                });
            });
        };
        SupportController_1.prototype.createTicket = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.createTicket(dto)];
                });
            });
        };
        SupportController_1.prototype.updateTicket = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.updateTicket(Number(id), dto)];
                });
            });
        };
        SupportController_1.prototype.assignTicket = function (id, adminId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.assignTicket(Number(id), adminId)];
                });
            });
        };
        SupportController_1.prototype.resolveTicket = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.resolveTicket(Number(id))];
                });
            });
        };
        // Communication log endpoints
        SupportController_1.prototype.getCommunicationLog = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.getCommunicationLog(Number(ticketId))];
                });
            });
        };
        SupportController_1.prototype.addCommunicationLog = function (ticketId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.supportService.addCommunicationLog(Number(ticketId), dto.direction === communication_log_entity_1.CommunicationDirection.INBOUND ? 1 : 1, // Default userId, should be passed in body
                        null, // adminId should be passed in body
                        dto)];
                });
            });
        };
        return SupportController_1;
    }());
    __setFunctionName(_classThis, "SupportController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getTickets_decorators = [(0, common_1.Get)('tickets')];
        _getTicketById_decorators = [(0, common_1.Get)('tickets/:id')];
        _createTicket_decorators = [(0, common_1.Post)('tickets')];
        _updateTicket_decorators = [(0, common_1.Patch)('tickets/:id')];
        _assignTicket_decorators = [(0, common_1.Post)('tickets/:id/assign')];
        _resolveTicket_decorators = [(0, common_1.Post)('tickets/:id/resolve')];
        _getCommunicationLog_decorators = [(0, common_1.Get)('tickets/:ticketId/communications')];
        _addCommunicationLog_decorators = [(0, common_1.Post)('tickets/:ticketId/communications')];
        __esDecorate(_classThis, null, _getTickets_decorators, { kind: "method", name: "getTickets", static: false, private: false, access: { has: function (obj) { return "getTickets" in obj; }, get: function (obj) { return obj.getTickets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTicketById_decorators, { kind: "method", name: "getTicketById", static: false, private: false, access: { has: function (obj) { return "getTicketById" in obj; }, get: function (obj) { return obj.getTicketById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createTicket_decorators, { kind: "method", name: "createTicket", static: false, private: false, access: { has: function (obj) { return "createTicket" in obj; }, get: function (obj) { return obj.createTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateTicket_decorators, { kind: "method", name: "updateTicket", static: false, private: false, access: { has: function (obj) { return "updateTicket" in obj; }, get: function (obj) { return obj.updateTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignTicket_decorators, { kind: "method", name: "assignTicket", static: false, private: false, access: { has: function (obj) { return "assignTicket" in obj; }, get: function (obj) { return obj.assignTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resolveTicket_decorators, { kind: "method", name: "resolveTicket", static: false, private: false, access: { has: function (obj) { return "resolveTicket" in obj; }, get: function (obj) { return obj.resolveTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCommunicationLog_decorators, { kind: "method", name: "getCommunicationLog", static: false, private: false, access: { has: function (obj) { return "getCommunicationLog" in obj; }, get: function (obj) { return obj.getCommunicationLog; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addCommunicationLog_decorators, { kind: "method", name: "addCommunicationLog", static: false, private: false, access: { has: function (obj) { return "addCommunicationLog" in obj; }, get: function (obj) { return obj.addCommunicationLog; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SupportController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SupportController = _classThis;
}();
exports.SupportController = SupportController;
