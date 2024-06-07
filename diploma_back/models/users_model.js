import mongoose from "mongoose";

const users_schema = new mongoose.Schema(
	{
		login: String,
		password: String,
		verify: Boolean,
		code: String,
		token: String,
		name: String,
		role: String,
	},
	{ versionKey: false }
);
export const users_model = mongoose.model("users", users_schema);
