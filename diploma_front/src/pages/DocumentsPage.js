import React, { useState, useEffect } from "react";
import DocumentCard from "../components/DocumentCard";

function DocumentsPage() {
	const [documents, setDocuments] = useState([]);
	const [admin, setAdmin] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");
		const fetchUser = async () => {
			try {
				const response = await fetch(`http://localhost:8080/users/${userId}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();

					if (data.role === "admin") {
						setAdmin(true);
					}
				}
			} catch (error) {
				console.error("Не вдалося отримати роль користувача:", error);
			}

			setIsLoading(false);
		};
		fetchUser();
	}, [admin]);
	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const response = await fetch("http://localhost:8080/documents/get");
				if (!response.ok) {
					throw new Error("Failed to fetch Documents");
				}
				const data = await response.json();
				setDocuments(data);
			} catch (error) {
				console.error("Error fetching Documents:", error.message);
			}
		};

		fetchDocuments();
	}, []);

	const deleteUserRequest = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:8080/documents/delete/${id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error(
					`Network response was not ok for message: ${response.statusText}`
				);
			}
		} catch (error) {
			console.error("Delete error:", error);
		}
	};

	return (
		<div className="container">
			<h1>Documents Page</h1>
			<div className="document-list">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						{documents.map((document) => (
							<DocumentCard
								key={document._id}
								document={document}
								onDelete={deleteUserRequest}
								isAdmin={admin}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default DocumentsPage;
