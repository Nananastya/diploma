import { users_model } from "../models/users_model.js";

async function get_users() {
	const users = await users_model.find({});
	return users;
}

async function get_user_by_login(login) {
	const user = await users_model.find({ login: login });
	return user;
}

async function get_user_by_id(id) {
	let user = {};
	if (id) {
		user = await users_model.findById(id);
	}

	return user;
}

async function create_admin_and_user(userData) {
	const newAdmin = await users_model.create(userData);
	return newAdmin;
}

async function update_user_data(id, newData) {
	try {
		const updatedUser = await users_model.findByIdAndUpdate(id, newData, {
			new: true,
		});
		return updatedUser;
	} catch (error) {
		throw new Error("Failed to update user data");
	}
}

async function delete_user_by_id(id) {
	try {
		const deletedUser = await users_model.findByIdAndDelete(id);
		if (!deletedUser) {
			throw new Error("User not found");
		}
		return deletedUser;
	} catch (error) {
		throw error;
	}
}

export default {
	get_users,
	get_user_by_login,
	get_user_by_id,
	create_admin_and_user,
	update_user_data,
	delete_user_by_id,
};
