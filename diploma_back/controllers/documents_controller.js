import { documents_model } from "../models/documents_model.js";
import { documents_schema } from "../schemas/documents_schema.js";
import documents_services from "../services/documents_services.js";

async function createAdoptionRequest(req, res, next) {
	try {
		const { error } = documents_schema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const adoptionRequest = await documents_services.create_document(req.body);

		res.status(201).json({
			message: "Adoption request created successfully",
			data: adoptionRequest,
		});
	} catch (error) {
		next(error);
	}
}

async function get_documents(req, res, next) {
	try {
		const documents = await documents_services.get_documents();
		res.send(documents);
	} catch (error) {
		next(error);
	}
}

async function user_get_document(req, res, next) {
	try {
		const userId = req.params.id;
		const documents = await documents_services.find_user_document(userId);
		res.status(200).json(documents);
	} catch (error) {
		next(error);
	}
}

async function delete_document(req, res, next) {
	try {
		const id = req.params.id;
		const deletedDocument = await documents_services.delete_document_by_id(id);

		if (!deletedDocument) {
			return res.status(404).json({ error: "Document not found" });
		}
		res.status(204).end();
	} catch (error) {
		next(error);
	}
}

async function update_document(req, res, next) {
	try {
		const { id } = req.params;
		const newData = req.body;
		const updatedUser = await documents_services.update_document_data(
			id,
			newData
		);
		res.json(updatedUser);
	} catch (error) {
		next(error);
	}
}

export default {
	createAdoptionRequest,
	get_documents,
	user_get_document,
	delete_document,
	update_document,
};
