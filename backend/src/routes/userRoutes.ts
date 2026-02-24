import { Router } from "express";
import UsersController from "../controllers/userControler";

const router = Router();

router.post("/register", UsersController.register);
router.post("/login", UsersController.authenticate);

export default router;
