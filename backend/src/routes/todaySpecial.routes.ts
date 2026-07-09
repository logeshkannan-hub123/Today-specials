import { Router } from "express";
import * as todaySpecialController from "../controllers/todaySpecial.controller";
import {
  validateCreateTodaySpecial,
  validateIdParam,
  validateUpdateTodaySpecial,
} from "../middlewares/validateTodaySpecial.middleware";

const router = Router();

router.get("/", todaySpecialController.getAllTodaySpecials);
router.get("/active", todaySpecialController.getActiveTodaySpecials);
router.get("/:id", validateIdParam, todaySpecialController.getTodaySpecialById);
router.post(
  "/",
  validateCreateTodaySpecial,
  todaySpecialController.createTodaySpecial,
);
router.put(
  "/:id",
  validateIdParam,
  validateUpdateTodaySpecial,
  todaySpecialController.updateTodaySpecial,
);
router.delete(
  "/:id",
  validateIdParam,
  todaySpecialController.deleteTodaySpecial,
);

export default router;
