import { Router } from "express";
import AlertsController from "../controllers/alertController";

const router = Router();

router.post("/", AlertsController.create);
router.get("/", AlertsController.getAll);
router.get("/:id", AlertsController.getById);
router.put("/:id", AlertsController.update);
router.delete("/:id", AlertsController.delete);

export default router;
