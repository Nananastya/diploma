import express from "express";
import articles_controller from "../controllers/articles_controller.js";

const articles_router = express.Router();

articles_router.get("/", articles_controller.get_articles);
articles_router.get("/:id", articles_controller.get_article_by_id);
articles_router.post("/test", articles_controller.get_test_articles);
articles_router.post("/add-article", articles_controller.post_article);
articles_router.delete("/delete/:id", articles_controller.delete_article);
articles_router.put("/update/:id", articles_controller.update_article);

export default articles_router;
