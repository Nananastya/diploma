import mongoose from "mongoose";

const animal_schema = new mongoose.Schema(
	{
		name: String,
		type: String,
		size: String,
		activityLevel: String,
		friendly: Boolean,
		adaptability: Boolean,
		hypoallergenic: Boolean,
		imageUrl: String,
		age: String,
		gender: String,
		species: String,
		guard: Boolean,
		organisation: String,
	},
	{ versionKey: false }
);

export const animal_model = mongoose.model("animals", animal_schema);
