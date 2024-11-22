import express from "express";
import { getAllUser, Signup, login } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);
router.post("/Signup", Signup);
router.post("/login", login);

export default router;
