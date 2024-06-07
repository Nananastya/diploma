import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";

function AdminPage() {
	const [animals, setAnimals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

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
					setUser(data);
					fetch(`http://localhost:8080/animals/organisation/${data.name}`)
						.then((response) => response.json())
						.then((data) => {
							setAnimals(data);
							setIsLoading(false);
						})
						.catch((error) => {
							console.error("Failed to fetch animal data:", error);
							setIsLoading(false);
						});
				}
			} catch (error) {
				console.error("Не вдалося отримати роль користувача:", error);
			}

			setIsLoading(false);
		};
		fetchUser();
	}, [user]);

	const handleLogout = async () => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`http://localhost:8080/users/update/${userId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						token: "",
						code: "",
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			} else {
				localStorage.removeItem("userId");
				localStorage.removeItem("token");
				window.location.reload();
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div className="container">
			<h1>Admin Page</h1>
			<Link
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				to="/admin/create-animal">
				Create New Animal
			</Link>
			<button
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				onClick={handleLogout}>
				Logout
			</button>
			<Link
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				to="/admin/documents">
				View Documents
			</Link>

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="row mt-4">
					{animals.map((animal) => (
						<AnimalCard key={animal._id} animal={animal} isAdmin={true} />
					))}
				</div>
			)}
		</div>
	);
}

export default AdminPage;
