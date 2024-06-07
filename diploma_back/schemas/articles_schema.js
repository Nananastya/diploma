import Joi from "joi";

export const articles_schema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
	species: Joi.string(),
	age: Joi.string(),
	gender: Joi.string(),
	imageUrl: Joi.string().uri().required(),
	size: Joi.string(),
	activityLevel: Joi.string(),
	guard: Joi.boolean(),
	friendly: Joi.boolean(),
	adaptability: Joi.boolean(),
	hypoallergenic: Joi.boolean(),
	content: Joi.string().required(),
	link: Joi.string().required(),
});
