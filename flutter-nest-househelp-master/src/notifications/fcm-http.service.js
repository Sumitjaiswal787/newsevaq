"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmHttpService = void 0;
var common_1 = require("@nestjs/common");
var jwt = __importStar(require("jsonwebtoken"));
var axios_1 = __importDefault(require("axios"));
var FcmHttpService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FcmHttpService = _classThis = /** @class */ (function () {
        function FcmHttpService_1(usersRepository, workersRepository) {
            this.usersRepository = usersRepository;
            this.workersRepository = workersRepository;
            this.logger = new common_1.Logger(FcmHttpService.name);
            this.accessToken = null;
            this.tokenExpiry = 0;
        }
        FcmHttpService_1.prototype.sendNotification = function (token, title, body, data) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken, payload, response, error_1, errorStatus, errorMessage, fcmErrorCode, errorDetails, fcmError, isInvalidToken, userResult, workerResult;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                return __generator(this, function (_p) {
                    switch (_p.label) {
                        case 0:
                            _p.trys.push([0, 3, , 7]);
                            return [4 /*yield*/, this.getAccessToken()];
                        case 1:
                            accessToken = _p.sent();
                            payload = {
                                message: {
                                    token: token,
                                    notification: {
                                        title: title,
                                        body: body
                                    },
                                    data: data || {},
                                    android: {
                                        priority: 'high',
                                        notification: {
                                            channel_id: 'default',
                                            notification_priority: 'PRIORITY_MAX',
                                            sound: 'default'
                                        }
                                    },
                                    apns: {
                                        payload: {
                                            aps: {
                                                sound: 'default',
                                                contentAvailable: true
                                            }
                                        }
                                    }
                                }
                            };
                            return [4 /*yield*/, axios_1.default.post('https://fcm.googleapis.com/v1/projects/sevaq-6fcc4/messages:send', payload, {
                                    headers: {
                                        'Authorization': "Bearer ".concat(accessToken),
                                        'Content-Type': 'application/json'
                                    },
                                    timeout: 10000
                                })];
                        case 2:
                            response = _p.sent();
                            this.logger.log("FCM notification sent successfully: ".concat(response.data.name));
                            this.logger.log("FCM response details: ".concat(JSON.stringify(response.data)));
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _p.sent();
                            this.logger.error("Failed to send FCM notification: ".concat(error_1.message));
                            this.logger.error("FCM Error Response Status: ".concat((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status));
                            this.logger.error("FCM Error Response Data: ".concat(JSON.stringify((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data)));
                            this.logger.error("FCM Error Details:", (_d = (_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error);
                            errorStatus = (_g = (_f = (_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.status;
                            errorMessage = ((_k = (_j = (_h = error_1.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.message) || '';
                            fcmErrorCode = null;
                            errorDetails = (_o = (_m = (_l = error_1.response) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.error) === null || _o === void 0 ? void 0 : _o.details;
                            if (Array.isArray(errorDetails)) {
                                fcmError = errorDetails.find(function (d) { return d['@type'] === 'type.googleapis.com/google.firebase.fcm.v1.FcmError'; });
                                if (fcmError) {
                                    fcmErrorCode = fcmError.errorCode;
                                }
                            }
                            this.logger.debug("FCM Error Status: ".concat(errorStatus, ", FCM Error Code: ").concat(fcmErrorCode, ", Message: ").concat(errorMessage));
                            isInvalidToken = 
                            // V1 API errors
                            fcmErrorCode === 'UNREGISTERED' ||
                                fcmErrorCode === 'INVALID_ARGUMENT' ||
                                // Legacy error messages
                                errorMessage.includes('InvalidRegistration') ||
                                errorMessage.includes('NotRegistered') ||
                                errorMessage.includes('Requested entity was not found') ||
                                errorMessage.includes('InvalidApnsToken') ||
                                errorMessage.includes('token is not registered');
                            if (!isInvalidToken) return [3 /*break*/, 6];
                            this.logger.warn("\u26A0\uFE0F Invalid / UNREGISTERED FCM token detected, removing from database: ".concat(token.substring(0, 30), "..."));
                            return [4 /*yield*/, this.usersRepository.update({ fcmToken: token }, { fcmToken: '' })];
                        case 4:
                            userResult = _p.sent();
                            return [4 /*yield*/, this.workersRepository.update({ fcmToken: token }, { fcmToken: '' })];
                        case 5:
                            workerResult = _p.sent();
                            this.logger.log("\u2705 Removed invalid FCM token - Users affected: ".concat(userResult.affected, ", Workers affected: ").concat(workerResult.affected));
                            if (userResult.affected === 0 && workerResult.affected === 0) {
                                this.logger.warn("\u26A0\uFE0F Token was not found in database - may have already been removed or whitespace mismatch");
                            }
                            _p.label = 6;
                        case 6: return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        FcmHttpService_1.prototype.getAccessToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceAccount, now, claim, assertion, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Return cached token if still valid
                            if (this.accessToken && Date.now() < this.tokenExpiry - 60000) {
                                return [2 /*return*/, this.accessToken];
                            }
                            serviceAccount = this.getServiceAccount();
                            now = Math.floor(Date.now() / 1000);
                            claim = {
                                iss: serviceAccount.client_email,
                                scope: 'https://www.googleapis.com/auth/firebase.messaging',
                                aud: 'https://oauth2.googleapis.com/token',
                                exp: now + 3600,
                                iat: now
                            };
                            assertion = jwt.sign(claim, serviceAccount.private_key, { algorithm: 'RS256' });
                            return [4 /*yield*/, axios_1.default.post('https://oauth2.googleapis.com/token', new URLSearchParams({
                                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                                    assertion: assertion
                                }), {
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    timeout: 10000
                                })];
                        case 1:
                            response = _a.sent();
                            this.accessToken = response.data.access_token;
                            this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
                            this.logger.log('✅ FCM access token obtained successfully');
                            return [2 /*return*/, this.accessToken];
                    }
                });
            });
        };
        FcmHttpService_1.prototype.getServiceAccount = function () {
            var _a;
            var serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT || '';
            var serviceAccount;
            try {
                serviceAccount = JSON.parse(serviceAccountRaw);
            }
            catch (e) {
                // Fallback: try to fix escaped newlines before parsing
                try {
                    serviceAccount = JSON.parse(serviceAccountRaw.replace(/\\n/g, '\n'));
                }
                catch (e2) {
                    this.logger.error("Failed to parse service account JSON: ".concat(e2.message));
                    throw e2;
                }
            }
            // Clean private key - ensure proper PEM format for RS256
            if (serviceAccount.private_key) {
                // Handle any level of newline escaping
                var key = serviceAccount.private_key;
                while (key.includes('\\n')) {
                    key = key.replace(/\\n/g, '\n');
                }
                // Ensure the key starts and ends properly with correct line breaks
                key = key.trim();
                // Normalize line endings to just \n (Unix-style)
                key = key.replace(/\r\n/g, '\n');
                // ONLY add BEGIN/END markers if they are NOT already present
                if (!key.includes('-----BEGIN PRIVATE KEY-----')) {
                    key = "-----BEGIN PRIVATE KEY-----\n".concat(key, "\n-----END PRIVATE KEY-----");
                }
                serviceAccount.private_key = key;
            }
            this.logger.log("\u2705 Private key formatted successfully, length: ".concat(((_a = serviceAccount.private_key) === null || _a === void 0 ? void 0 : _a.length) || 0));
            return serviceAccount;
        };
        return FcmHttpService_1;
    }());
    __setFunctionName(_classThis, "FcmHttpService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FcmHttpService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FcmHttpService = _classThis;
}();
exports.FcmHttpService = FcmHttpService;
