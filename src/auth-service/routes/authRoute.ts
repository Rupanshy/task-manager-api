import express, { Router } from "express";
import { asyncWrap } from "../../common/http/asyncWrap.js";
import { register, login, refresh, me, requireAuth } from "../controllers/authController.js";

const router: Router = express.Router();

router.post("/register", asyncWrap(register));
router.post("/login",    asyncWrap(login));
router.post("/refresh",  asyncWrap(refresh));
router.get ("/me",       requireAuth, asyncWrap(me));

export const authRouter = router;   // ✅ must export the Router itself
