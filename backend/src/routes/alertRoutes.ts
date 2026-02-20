import { Router } from "express";
import AlertsController from "../controllers/alertController";

const router = Router();

router.post("/alerts", AlertsController.create);
router.get("/alerts", AlertsController.getAll);
router.put("/alerts/:id", AlertsController.getById);
router.delete("/alerts/:id", AlertsController.delete);

export default router;
