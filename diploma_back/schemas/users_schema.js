import Joi from "joi";

export const users_schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().required(),
	verify: Joi.boolean(),
	code: Joi.string().allow(""),
	token: Joi.string().allow(""),
	name: Joi.string().allow(""),
	role: Joi.string(),
});
