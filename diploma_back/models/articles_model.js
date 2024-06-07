import mongoose from "mongoose";

const articles_schema = new mongoose.Schema(
	{
		name: String,
		type: String,
		age: String,
		gender: String,
		species: String,
		size: String,
		activityLevel: String,
		guard: Boolean,
		friendly: Boolean,
		adaptability: Boolean,
		hypoallergenic: Boolean,
		imageUrl: String,
		content: String,
		link: String,
	},
	{ versionKey: false }
);

export const articles_model = mongoose.model("articles", articles_schema);
