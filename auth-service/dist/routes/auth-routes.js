"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const auth_controller_2 = require("../controllers/auth-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.registerUser);
router.post('/login', auth_controller_1.loginUser);
router.post('/me', auth_middleware_1.verifyToken, auth_controller_2.getUserDetails);
exports.default = router;
