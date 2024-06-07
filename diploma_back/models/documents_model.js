import mongoose from "mongoose";

const documents_schema = new mongoose.Schema(
	{
		animalId: { type: String, required: true },
		userId: { type: String, required: true },
		purpose: { type: String, required: true },
		status: { type: String, required: true },
		date: { type: Date, required: true },
	},
	{ versionKey: false }
);

export const documents_model = mongoose.model("documents", documents_schema);
