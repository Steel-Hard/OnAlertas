import { Router } from "express";
import UsersController from "../controllers/userControler";

const router = Router();

router.post("/users/register", UsersController.register);
router.post("/users/login", UsersController.authenticate);

export default router;
