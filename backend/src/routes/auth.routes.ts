import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateAuthCredentials } from "../middlewares/validateAuth.middleware";

const router = Router();

router.post("/login", validateAuthCredentials, authController.login);
router.post("/register", validateAuthCredentials, authController.register);

export default router;
