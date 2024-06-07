import Joi from "joi";

export const animal_schema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
	species: Joi.string().required(),
	age: Joi.string().required(),
	gender: Joi.string().required(),
	imageUrl: Joi.string().uri().required(),
	size: Joi.string().required(),
	activityLevel: Joi.string().required(),
	guard: Joi.boolean().required(),
	friendly: Joi.boolean().required(),
	adaptability: Joi.boolean().required(),
	hypoallergenic: Joi.boolean().required(),
	organisation: Joi.string(),
});
