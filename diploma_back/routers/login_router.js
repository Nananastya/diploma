import express from "express";
import login_controller from "../controllers/login_controller.js";

const login_router = express.Router();

login_router.post("/login", login_controller.login);
login_router.post("/verify/:id", login_controller.verify_code);

export default login_router;
