import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateAuthCredentials } from "../middlewares/validateAuth.middleware";

const router = Router();

router.get("/status", authController.getAuthStatus);
router.post("/login", validateAuthCredentials, authController.login);

export default router;
