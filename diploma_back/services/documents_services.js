import { documents_model } from "../models/documents_model.js";

async function get_documents() {
	const documents = await documents_model.find({});
	return documents;
}

async function create_document(documentData) {
	const newDocument = await documents_model.create(documentData);
	return newDocument;
}

async function find_user_document(userId) {
	try {
		const userRequests = await documents_model.find({ userId: userId });
		return userRequests;
	} catch (error) {
		throw error;
	}
}

async function delete_document_by_id(documentId) {
	try {
		const deletedDocument = await documents_model.findByIdAndDelete(documentId);
		if (!deletedDocument) {
			throw new Error("Document not found");
		}
		return deletedDocument;
	} catch (error) {
		throw error;
	}
}

async function update_document_data(id, newData) {
	try {
		const updatedUser = await documents_model.findByIdAndUpdate(id, newData, {
			new: true,
		});
		return updatedUser;
	} catch (error) {
		throw new Error("Failed to update user data");
	}
}

export default {
	get_documents,
	create_document,
	find_user_document,
	delete_document_by_id,
	update_document_data,
};
