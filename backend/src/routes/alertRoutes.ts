import { Router } from "express";
import AlertsController from "../controllers/alertController";

const router = Router();

router.post("/alerts", AlertsController.createAlert);
router.get("/alerts", AlertsController.getAlerts);
router.put("/alerts/:id", AlertsController.updateAlert);
router.delete("/alerts/:id", AlertsController.deleteAlert);

export default router;
