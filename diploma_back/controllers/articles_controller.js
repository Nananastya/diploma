import { articles_model } from "../models/articles_model.js";
import { articles_schema } from "../schemas/articles_schema.js";
import articles_services from "../services/articles_services.js";

const convert_answers_to_criteria = (answers) => {
	const criteria = {};
	if (answers["1"]) criteria.type = answers["1"] === "Так" ? "Dog" : "Cat";
	if (answers["2"] === "Так") criteria.size = "Large";
	if (answers["3"]) criteria.size = answers["3"] === "Так" ? "Medium" : "Small";
	if (answers["4"])
		criteria.activityLevel = answers["4"] === "Так" ? "High" : "Low";
	if (answers["5"]) criteria.guard = answers["5"] === "Так";
	if (answers["6"]) criteria.friendly = answers["6"] === "Так";
	if (answers["7"]) criteria.adaptability = answers["7"] === "Так";
	if (answers["8"]) criteria.hypoallergenic = answers["8"] === "Так";
	if (answers["9"])
		criteria.gender = answers["9"] === "Так" ? "female" : "male";
	return criteria;
};

async function get_test_articles(req, res, next) {
	try {
		const searchCriteria = req.body;
		console.log("searchCriteria from articles", searchCriteria);
		if (!searchCriteria) {
			throw new Error("Search criteria object is required");
		}
		const searchArticles = convert_answers_to_criteria(searchCriteria);

		console.log("searchArticles from articles", searchArticles);
		const articles = await articles_services.findArticlesByCriteria({
			criteria: searchArticles,
		});

		if (articles && articles.length > 0) {
			res.json(articles);
		} else {
			res.json([]);
		}
	} catch (error) {
		next(error);
	}
}

async function get_articles(req, res, next) {
	try {
		const articles = await articles_services.getAllArticles();
		res.send(articles);
	} catch (error) {
		next(error);
	}
}

async function delete_article(req, res, next) {
	try {
		const { id } = req.params;
		const deletedArticle = await articles_services.delete_article_by_id(id);
		if (!deletedArticle) {
			return res.status(404).json({ error: "Article not found" });
		}
		res.status(200).json(deletedArticle);
	} catch (error) {
		next(error);
	}
}

async function post_article(req, res, next) {
	try {
		const newArticleData = req.body;
		const result = articles_schema.validate(newArticleData);
		const newData = await articles_services.create_article(newArticleData);
		res.status(201).json(newData);
	} catch (error) {
		console.log("Error creating article:", error.message);
		next(error);
	}
}

async function get_article_by_id(req, res, next) {
	try {
		const { id } = req.params;
		const article = await articles_services.find_article_by_id(id);
		res.json(article);
	} catch (error) {
		next(error);
	}
}

async function update_article(req, res, next) {
	try {
		const { id } = req.params;
		const newData = req.body;
		console.log("id", id);
		console.log("newData", newData);
		const updatedArticle = await articles_services.update_article_data(
			id,
			newData
		);
		res.json(updatedArticle);
	} catch (error) {
		next(error);
	}
}

export default {
	get_test_articles,
	get_articles,
	post_article,
	delete_article,
	get_article_by_id,
	update_article,
};
