"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user-model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = userData;
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }
    else {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({ name, email, password: hashedPassword });
        return yield newUser.save();
    }
});
exports.createUser = createUser;
const loginUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error('Invalid User');
    }
    else {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        // Generate JWT token
        const payload = {
            userId: user._id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return token;
    }
});
exports.loginUserService = loginUserService;
