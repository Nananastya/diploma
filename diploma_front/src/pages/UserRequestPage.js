import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";

function UserRequestsPage() {
	const [userRequests, setUserRequests] = useState([]);
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserRequests = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/documents/user-get/${userId}`
				);
				if (!response.ok) {
					throw new Error(
						`Network response was not ok for message: ${response.statusText}`
					);
				}
				const data = await response.json();
				setUserRequests(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};
		fetchUserRequests();
	}, [userId]);

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
			setUserRequests(userRequests.filter((request) => request._id !== id));
		} catch (error) {
			console.error("Delete error:", error);
		}
	};

	const handleReturn = () => {
		navigate("/animals");
	};

	return (
		<div>
			<h2>User Requests</h2>
			<button onClick={handleReturn}>Return to Homepage</button>
			<div className="document-list">
				{userRequests.length > 0 ? (
					userRequests.map((request) => (
						<DocumentCard
							key={request._id}
							document={request}
							onDelete={deleteUserRequest}
						/>
					))
				) : (
					<p>No requests</p>
				)}
			</div>
		</div>
	);
}

export default UserRequestsPage;
