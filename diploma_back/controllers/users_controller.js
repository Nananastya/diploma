import users_services from "../services/users_services.js";
import { users_schema } from "../schemas/users_schema.js";
import { users_model } from "../models/users_model.js";

async function get_users(req, res, next) {
	try {
		const users = await users_services.get_users();
		res.send(users);
	} catch (error) {
		next(error);
	}
}

async function get_user_by_id(req, res, next) {
	try {
		const { id } = req.params;
		const users = await users_services.get_user_by_id(id);
		res.send(users);
	} catch (error) {
		next(error);
	}
}

async function logout(req, res, next) {
	try {
		const { id } = req.params;
		const newData = {
			token: "",
			code: "",
		};
		const updatedUser = await users_services.update_user_data(id, newData);
		res.json(updatedUser);
	} catch (error) {
		next(error);
	}
}

async function update_user(req, res, next) {
	try {
		const { id } = req.params;
		const newData = req.body;
		const updatedUser = await users_services.update_user_data(id, newData);
		res.json(updatedUser);
	} catch (error) {
		next(error);
	}
}

async function delete_user(req, res, next) {
	try {
		const { id } = req.params;
		const deletedUser = await users_services.delete_article_by_id(id);
		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(deletedUser);
	} catch (error) {
		next(error);
	}
}

async function post_user(req, res, next) {
	try {
		const newUserData = req.body;
		console.log("New UserData data:", newUserData);
		const result = users_schema.validate(newUserData);
		let login = newUserData.login;
		const existingUser = await users_model.findOne({ login });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User with this login already exists" });
		}
		if (result.error) {
			console.log("Validation error:", result.error.message);
			throw new Error(result.error.message);
		}
		const newData = await users_services.create_admin_and_user(newUserData);
		res.status(201).json(newData);
	} catch (error) {
		console.log("Error creating UserData:", error.message);
		next(error);
	}
}

export default {
	get_users,
	get_user_by_id,
	post_user,
	update_user,
	delete_user,
	logout,
};
