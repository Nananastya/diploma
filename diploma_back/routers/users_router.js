import express from "express";
import users_controller from "../controllers/users_controller.js";
import { users_schema } from "../schemas/users_schema.js";
import validateBody from "../helpers/validate_body.js";
import { users_model } from "../models/users_model.js";

const users_router = express.Router();

users_router.get("/", users_controller.get_users);
users_router.get("/:id", users_controller.get_user_by_id);
users_router.post("/add-user", users_controller.post_user);
users_router.put("/logout", users_controller.logout);
users_router.put("/update/:id", users_controller.update_user);
users_router.delete("/delete/:id", users_controller.delete_user);

export default users_router;
