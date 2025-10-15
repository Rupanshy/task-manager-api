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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserDetails = getUserDetails;
const auth_service_1 = require("../services/auth-service");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Registering User');
        try {
            const user = yield (0, auth_service_1.createUser)(req.body);
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('User is logging in');
        try {
            const user = yield (0, auth_service_1.loginUserService)(req.body);
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function getUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ user: req.user });
    });
}
