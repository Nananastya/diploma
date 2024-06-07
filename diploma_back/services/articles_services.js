import { articles_model } from "../models/articles_model.js";

async function getAllArticles(query) {
	const articles = await articles_model.find(query);
	return articles;
}

async function create_article(articleData) {
	const newArticle = await articles_model.create(articleData);
	return newArticle;
}

async function delete_article_by_id(id) {
	try {
		const deletedArticle = await articles_model.findByIdAndDelete(id);
		if (!deletedArticle) {
			throw new Error("Article not found");
		}
		return deletedArticle;
	} catch (error) {
		throw error;
	}
}

async function findArticlesByCriteria({ criteria, limit = 3 }) {
	try {
		if (!criteria) {
			throw new Error("Criteria object is required");
		}

		const articles = await articles_model.find({});

		const articlesWithSimilarity = articles.map((article) => {
			let similarityScore = 0;
			for (const [key, value] of Object.entries(criteria)) {
				if (article[key] === value) {
					similarityScore++;
				}
			}
			return { article, similarityScore };
		});

		articlesWithSimilarity.sort(
			(a, b) => b.similarityScore - a.similarityScore
		);
		const topArticles = articlesWithSimilarity
			.slice(0, limit)
			.map((item) => item.article);
		return topArticles;
	} catch (error) {
		throw new Error(
			`Unable to find articles with similar characteristics: ${error.message}`
		);
	}
}

async function find_article_by_id(id) {
	const article = await articles_model.findById(id);
	return article;
}

async function update_article_data(id, newData) {
	const updatedArticle = await articles_model.findByIdAndUpdate(id, newData, {
		new: true,
	});
	return updatedArticle;
}

export default {
	getAllArticles,
	findArticlesByCriteria,
	create_article,
	delete_article_by_id,
	find_article_by_id,
	update_article_data,
};
