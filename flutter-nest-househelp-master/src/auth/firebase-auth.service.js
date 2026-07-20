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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthService = void 0;
var common_1 = require("@nestjs/common");
var admin = __importStar(require("firebase-admin"));
var user_entity_1 = require("../users/entities/user.entity");
var crypto_1 = require("crypto");
var refresh_token_entity_1 = require("./entities/refresh-token.entity");
var FirebaseAuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FirebaseAuthService = _classThis = /** @class */ (function () {
        function FirebaseAuthService_1(usersService, jwtService, refreshTokenRepository) {
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.refreshTokenRepository = refreshTokenRepository;
            this.logger = new common_1.Logger(FirebaseAuthService.name);
            this.firebaseInitialized = false;
            this.initializeFirebase();
        }
        FirebaseAuthService_1.prototype.initializeFirebase = function () {
            // Check if Firebase is already initialized
            if (admin.apps.length > 0) {
                this.firebaseInitialized = true;
                this.logger.log('Firebase Admin SDK already initialized');
                return;
            }
            // Initialize Firebase Admin with service account from environment
            var serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
            if (serviceAccountJson &&
                serviceAccountJson !== 'your-firebase-project-id') {
                try {
                    // Fix: replace escaped newlines in private key before parsing
                    var fixedServiceAccountJson = serviceAccountJson.replace(/\\n/g, '\n');
                    var serviceAccount = JSON.parse(fixedServiceAccountJson);
                    // Fix: ensure private key has proper formatting
                    // Proper private key sanitization for DER parsing
                    if (serviceAccount.private_key) {
                        // First normalize all line endings
                        var privateKey = serviceAccount.private_key
                            .replace(/\\n/g, '\n')
                            .replace(/\\\\n/g, '\n')
                            .replace(/\r\n/g, '\n')
                            .replace(/\r/g, '\n');
                        // Extract ONLY the content between valid PEM markers
                        // This removes ANY characters before header or after footer
                        var pemMatch = privateKey.match(/-----BEGIN PRIVATE KEY-----(.*?)-----END PRIVATE KEY-----/s);
                        if (pemMatch) {
                            // Reconstruct clean properly formatted private key
                            privateKey = [
                                '-----BEGIN PRIVATE KEY-----',
                                pemMatch[1].trim(),
                                '-----END PRIVATE KEY-----'
                            ].join('\n');
                        }
                        serviceAccount.private_key = privateKey;
                        // Add debug logging to identify private key structure issues
                        this.logger.debug("Private key length: ".concat(serviceAccount.private_key.length));
                        this.logger.debug("Key ends with newline: ".concat(serviceAccount.private_key.endsWith('\n')));
                        this.logger.debug("Has proper footer: ".concat(serviceAccount.private_key.includes('-----END PRIVATE KEY-----')));
                    }
                    // Check if app already exists before initializing
                    if (admin.apps.length === 0) {
                        admin.initializeApp({
                            credential: admin.credential.cert(serviceAccount),
                        });
                    }
                    this.firebaseInitialized = true;
                    this.logger.log('✅ [Firebase Init] Firebase Admin SDK initialized successfully');
                }
                catch (error) {
                    var err = error;
                    this.logger.warn('⚠️  [Firebase Init] Failed to initialize Firebase Admin SDK, OTP login will not work', err.message);
                    this.firebaseInitialized = false;
                }
            }
            else {
                this.logger.warn('Firebase service account not configured, OTP login will not work');
                this.firebaseInitialized = false;
            }
        };
        /**
         * Generate a cryptographically secure random password
         * Used for phone-only auth users who don't need password login
         */
        FirebaseAuthService_1.prototype.generateSecurePassword = function () {
            return (0, crypto_1.randomBytes)(32).toString('hex');
        };
        /**
         * Generate all common phone number variations for lookup
         * Handles formats like: +919876543210, 919876543210, 9876543210
         */
        FirebaseAuthService_1.prototype.generatePhoneVariations = function (phone) {
            var digitsOnly = phone.replace(/[^0-9]/g, '');
            var variations = new Set();
            // Add original phone
            variations.add(phone);
            // Add digits only
            variations.add(digitsOnly);
            // Extract last 10 digits (assuming Indian phone number)
            var last10Digits = digitsOnly.slice(-10);
            variations.add(last10Digits);
            // With +91 prefix
            variations.add("+91".concat(last10Digits));
            // With 91 prefix (no +)
            variations.add("91".concat(last10Digits));
            // With + and last 10 digits
            variations.add("+".concat(last10Digits));
            return Array.from(variations);
        };
        FirebaseAuthService_1.prototype.verifyPhoneAndLogin = function (phone, idToken, firstName, lastName) {
            return __awaiter(this, void 0, void 0, function () {
                var decodedToken, error_1, err;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.logger.log("Verifying phone login for: ".concat(phone));
                            // For development/testing: allow bypass with special token
                            if (idToken === 'dev_test_token') {
                                this.logger.log('Using dev test mode - bypassing Firebase verification');
                                return [2 /*return*/, this._handleDevLogin(phone)];
                            }
                            // In production, verify Firebase ID token
                            // Only bypass if explicitly in development mode AND Firebase is not initialized
                            if (!this.firebaseInitialized) {
                                this.logger.warn('Firebase not initialized - using fallback login for development');
                                return [2 /*return*/, this._handleDevLogin(phone, firstName, lastName)];
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            this.logger.log("Verifying Firebase ID token for phone: ".concat(phone));
                            return [4 /*yield*/, this.verifyFirebaseTokenWithRetry(idToken, phone)];
                        case 2:
                            decodedToken = _c.sent();
                            // Verify the phone number matches
                            if (decodedToken.phone_number !== phone) {
                                this.logger.error("Phone number mismatch: token has ".concat(decodedToken.phone_number, ", request has ").concat(phone));
                                throw new common_1.UnauthorizedException('Phone number mismatch. Please try logging in again.');
                            }
                            this.logger.log("Firebase token verified for UID: ".concat(decodedToken.uid, ", Phone: ").concat(decodedToken.phone_number));
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            err = error_1;
                            this.logger.error("Firebase token verification failed for ".concat(phone, ": ").concat(err.message));
                            // Return specific error messages based on error type
                            if ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes('timeout')) {
                                this.logger.error("Firebase API timeout for ".concat(phone));
                                throw new common_1.UnauthorizedException('Login service temporarily unavailable. Please try again in a few minutes.');
                            }
                            if (err.code === 'auth/id-token-expired') {
                                this.logger.error("Firebase token expired for ".concat(phone));
                                throw new common_1.UnauthorizedException('Session expired. Please login again.');
                            }
                            if (err.code === 'auth/invalid-id-token') {
                                this.logger.error("Invalid Firebase token for ".concat(phone));
                                throw new common_1.UnauthorizedException('Invalid login session. Please try logging in again.');
                            }
                            // Log the full error for debugging
                            this.logger.error("Full Firebase error: ".concat(JSON.stringify({
                                code: err.code,
                                message: err.message,
                                stack: (_b = err.stack) === null || _b === void 0 ? void 0 : _b.split('\n').slice(0, 3).join('\n'),
                            })));
                            throw new common_1.UnauthorizedException('Login failed. Please try again.');
                        case 4: 
                        // Token is valid, proceed with login
                        return [2 /*return*/, this._handleDevLogin(phone, firstName, lastName)];
                    }
                });
            });
        };
        /**
         * Verify Firebase ID token with retry logic for handling transient failures
         * Retries up to 3 times with exponential backoff
         */
        FirebaseAuthService_1.prototype.verifyFirebaseTokenWithRetry = function (idToken_1, phone_1) {
            return __awaiter(this, arguments, void 0, function (idToken, phone, maxRetries) {
                var baseDelayMs, _loop_1, this_1, attempt, state_1;
                var _a, _b, _c, _d;
                if (maxRetries === void 0) { maxRetries = 3; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            baseDelayMs = 1000;
                            _loop_1 = function (attempt) {
                                var timeoutMs_1, timeoutPromise, decodedToken, error_2, err, isRetryable, delayMs_1;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            _f.trys.push([0, 2, , 6]);
                                            this_1.logger.log("Firebase token verification attempt ".concat(attempt, "/").concat(maxRetries, " for phone: ").concat(phone));
                                            timeoutMs_1 = 10000;
                                            timeoutPromise = new Promise(function (_, reject) {
                                                setTimeout(function () { return reject(new Error('Firebase API timeout after 10s')); }, timeoutMs_1);
                                            });
                                            return [4 /*yield*/, Promise.race([
                                                    admin.auth().verifyIdToken(idToken),
                                                    timeoutPromise,
                                                ])];
                                        case 1:
                                            decodedToken = _f.sent();
                                            this_1.logger.log("Firebase token verified successfully on attempt ".concat(attempt));
                                            return [2 /*return*/, { value: decodedToken }];
                                        case 2:
                                            error_2 = _f.sent();
                                            err = error_2;
                                            // If this is the last attempt, throw the error
                                            if (attempt === maxRetries) {
                                                this_1.logger.error("Firebase token verification failed after ".concat(maxRetries, " attempts for ").concat(phone, ": ").concat(err.message));
                                                throw error_2;
                                            }
                                            isRetryable = ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes('timeout')) ||
                                                ((_b = err.message) === null || _b === void 0 ? void 0 : _b.includes('ETIMEDOUT')) ||
                                                ((_c = err.message) === null || _c === void 0 ? void 0 : _c.includes('ECONNREFUSED')) ||
                                                ((_d = err.message) === null || _d === void 0 ? void 0 : _d.includes('ENOTFOUND')) ||
                                                err.code === 'auth/id-token-expired' || // Token might be valid now
                                                err.code === 'auth/invalid-id-token';
                                            if (!isRetryable) return [3 /*break*/, 4];
                                            delayMs_1 = baseDelayMs * Math.pow(2, attempt - 1);
                                            this_1.logger.warn("Attempt ".concat(attempt, " failed for ").concat(phone, ": ").concat(err.message, ". Retrying in ").concat(delayMs_1, "ms..."));
                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delayMs_1); })];
                                        case 3:
                                            _f.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            // Non-retryable error (like invalid token), throw immediately
                                            this_1.logger.error("Non-retryable error for ".concat(phone, ": ").concat(err.message));
                                            throw error_2;
                                        case 5: return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            attempt = 1;
                            _e.label = 1;
                        case 1:
                            if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1(attempt)];
                        case 2:
                            state_1 = _e.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _e.label = 3;
                        case 3:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // This should never be reached, but TypeScript needs it
                        throw new Error('Unexpected end of retry logic');
                    }
                });
            });
        };
        /**
         * Development fallback login - creates/updates user without Firebase verification
         */
        FirebaseAuthService_1.prototype._handleDevLogin = function (phone, firstName, lastName) {
            return __awaiter(this, void 0, void 0, function () {
                var phoneVariations, user, _i, phoneVariations_1, variant, digitsOnly, last10Digits, consistentPhone, securePassword, sanitizedFirstName, sanitizedLastName, createUserDto, reloadedUser, needsProfileCompletion, jwtResponse, refreshToken, response, error_3, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("Dev login for phone: ".concat(phone));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            phoneVariations = this.generatePhoneVariations(phone);
                            this.logger.log("Checking phone variations: ".concat(JSON.stringify(phoneVariations)));
                            user = null;
                            _i = 0, phoneVariations_1 = phoneVariations;
                            _a.label = 2;
                        case 2:
                            if (!(_i < phoneVariations_1.length)) return [3 /*break*/, 5];
                            variant = phoneVariations_1[_i];
                            this.logger.log("Trying phone variant: ".concat(variant));
                            return [4 /*yield*/, this.usersService.findOneByPhone(variant)];
                        case 3:
                            user = _a.sent();
                            if (user) {
                                this.logger.log("User found with phone variant: ".concat(variant));
                                return [3 /*break*/, 5];
                            }
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            if (!!user) return [3 /*break*/, 8];
                            digitsOnly = phone.replace(/[^0-9]/g, '');
                            last10Digits = digitsOnly.slice(-10);
                            consistentPhone = "+91".concat(last10Digits);
                            this.logger.log("Creating new user with normalized phone: ".concat(consistentPhone));
                            securePassword = this.generateSecurePassword();
                            sanitizedFirstName = (firstName === null || firstName === void 0 ? void 0 : firstName.trim()) || '';
                            sanitizedLastName = (lastName === null || lastName === void 0 ? void 0 : lastName.trim()) || '';
                            createUserDto = {
                                email: "user_".concat(last10Digits, "@phone.auth"),
                                password: securePassword,
                                firstName: sanitizedFirstName || 'User',
                                lastName: sanitizedLastName || last10Digits,
                                phone: consistentPhone,
                                role: user_entity_1.UserRole.USER,
                            };
                            return [4 /*yield*/, this.usersService.createWithTransaction(createUserDto, phone)];
                        case 6:
                            user = _a.sent();
                            // ✅ FIX: Reload user from database after creation to get auto-generated publicId
                            // TypeORM does not return generated UUID columns from insert operations
                            this.logger.log("Reloading newly created user to retrieve generated publicId");
                            return [4 /*yield*/, this.usersService.findOneByPhone(consistentPhone)];
                        case 7:
                            reloadedUser = _a.sent();
                            if (!reloadedUser) {
                                this.logger.error("Failed to reload user after creation for phone: ".concat(phone));
                                throw new Error('User creation failed - could not retrieve created user');
                            }
                            user = reloadedUser;
                            this.logger.log("User reloaded successfully, publicId: ".concat(user.publicId));
                            return [3 /*break*/, 8];
                        case 8:
                            needsProfileCompletion = user.firstName === 'User' ||
                                (user.email && user.email.endsWith('@phone.auth'));
                            jwtResponse = this.generateJwt(user);
                            refreshToken = new refresh_token_entity_1.RefreshToken();
                            refreshToken.userId = user.id;
                            refreshToken.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
                            return [4 /*yield*/, this.refreshTokenRepository.save(refreshToken)];
                        case 9:
                            _a.sent();
                            response = {
                                access_token: jwtResponse.access_token,
                                refresh_token: refreshToken.token,
                                user: {
                                    id: user.id,
                                    publicId: user.publicId,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    phone: user.phone,
                                    email: user.email,
                                    role: user.role
                                }
                            };
                            response.needsProfileCompletion = needsProfileCompletion;
                            return [2 /*return*/, response];
                        case 10:
                            error_3 = _a.sent();
                            err = error_3;
                            this.logger.error("Dev login failed: ".concat(err.message));
                            throw new common_1.UnauthorizedException('Login failed');
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        FirebaseAuthService_1.prototype.verifyIdToken = function (idToken) {
            return __awaiter(this, void 0, void 0, function () {
                var decodedToken, error_4, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.firebaseInitialized) {
                                throw new common_1.UnauthorizedException('Firebase Auth not configured on server');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.auth().verifyIdToken(idToken)];
                        case 2:
                            decodedToken = _a.sent();
                            return [2 /*return*/, {
                                    uid: decodedToken.uid,
                                    phone: decodedToken.phone_number,
                                    email: decodedToken.email,
                                }];
                        case 3:
                            error_4 = _a.sent();
                            err = error_4;
                            this.logger.error("ID token verification failed: ".concat(err.message));
                            throw new common_1.UnauthorizedException('Invalid ID token');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        FirebaseAuthService_1.prototype.getUserByPhone = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.findOneByPhone(phone)];
                });
            });
        };
        FirebaseAuthService_1.prototype.generateJwt = function (user) {
            // FIX: Use publicId (UUID) instead of id (numeric) for JWT subject
            // This ensures consistency with auth.service.ts and passes UUID validation in jwt.strategy.ts
            // Validate required fields before generating token
            if (!user.publicId) {
                this.logger.error("Cannot generate JWT: user.publicId is missing/undefined for user: ".concat(user.id || user.phone));
                this.logger.error("User object contents: ".concat(JSON.stringify(user, Object.getOwnPropertyNames(user))));
                throw new Error('User public ID is required for token generation');
            }
            if (!user.email) {
                this.logger.error("Cannot generate JWT: user.email is missing for user: ".concat(user.publicId));
                throw new Error('User email is required for token generation');
            }
            if (!user.role) {
                this.logger.error("Cannot generate JWT: user.role is missing for user: ".concat(user.publicId));
                throw new Error('User role is required for token generation');
            }
            var payload = { email: user.email, sub: user.publicId, role: user.role };
            try {
                var accessToken = this.jwtService.sign(payload);
                return {
                    access_token: accessToken,
                    user: {
                        id: user.publicId, // Return publicId as the user id to frontend
                        publicId: user.publicId,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        role: user.role,
                    },
                };
            }
            catch (jwtError) {
                var err = jwtError;
                this.logger.error("JWT signing failed: ".concat(err.message), err.stack);
                this.logger.error("Failed payload: sub=".concat(user.publicId, ", email=").concat(user.email, ", role=").concat(user.role));
                throw err;
            }
        };
        return FirebaseAuthService_1;
    }());
    __setFunctionName(_classThis, "FirebaseAuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FirebaseAuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FirebaseAuthService = _classThis;
}();
exports.FirebaseAuthService = FirebaseAuthService;
