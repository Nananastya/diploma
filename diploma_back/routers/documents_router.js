import express from "express";
import documents_controller from "../controllers/documents_controller.js";

const documents_router = express.Router();

documents_router.get("/get", documents_controller.get_documents);
documents_router.delete("/delete/:id", documents_controller.delete_document);
documents_router.get("/user-get/:id", documents_controller.user_get_document);
documents_router.put(
	"/update-document/:id",
	documents_controller.update_document
);
documents_router.post("/post", documents_controller.createAdoptionRequest);

export default documents_router;
