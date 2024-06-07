import Joi from "joi";

export const documents_schema = Joi.object({
	animalId: Joi.string().required(),
	userId: Joi.string().required(),
	purpose: Joi.string().required(),
	status: Joi.string().required(),
	date: Joi.date().required(),
});
