import { Router } from "express";
import AlertsController from "../controllers/alertController";

const router = Router();

// Base já é "/alerts" no index.ts, então aqui usamos apenas "/"
router.post("/", AlertsController.create);
router.get("/", AlertsController.getAll);
router.get("/:id", AlertsController.getById);
router.put("/:id", AlertsController.update);
router.delete("/:id", AlertsController.delete);

export default router;
