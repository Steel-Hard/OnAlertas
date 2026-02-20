import { Router } from "express";
import AlertsController from "./alertRoutes";
import UsersController from "./userRoutes";

const router = Router();

router.use("/alerts", AlertsController);
router.use("/users", UsersController);


export default router;
