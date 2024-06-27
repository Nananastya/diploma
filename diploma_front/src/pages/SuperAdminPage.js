import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import ArticleCard from "../components/ArticleCard";
import UserCard from "../components/UserCard";

function SuperAdminPage() {
	const [animals, setAnimals] = useState([]);
	const [articles, setArticles] = useState([]);
	const [user, setUser] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const response = await fetch("http://localhost:8080/animals/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(
						`Network response was not ok for message: ${response.statusText}`
					);
				}
				const data = await response.json();
				setAnimals(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		const fetchArticles = async () => {
			try {
				const response = await fetch("http://localhost:8080/articles/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(
						`Network response was not ok for message: ${response.statusText}`
					);
				}
				const data = await response.json();
				setArticles(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		const fetchUserInfo = async () => {
			try {
				const response = await fetch("http://localhost:8080/users/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(
						`Network response was not ok for message: ${response.statusText}`
					);
				}
				const data = await response.json();
				setUser(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		if (token) {
			fetchAnimals();
			fetchArticles();
			fetchUserInfo();
		}
	}, [token]);

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
			<h2>Superadmin page</h2>
			<h3>I am boss here</h3>
			<Link
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				to="/superadmin/create-user">
				Add New User
			</Link>
			<Link
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				to="/superadmin/create-article">
				Add New Article
			</Link>
			<button
				style={{ margin: " 0 10px 10px 0" }}
				className="btn btn-primary"
				onClick={handleLogout}>
				Logout
			</button>
			<div className="row mt-4">
				{animals.map((animal) => (
					<AnimalCard key={animal._id} animal={animal} isAdmin={true} />
				))}
			</div>
			<h3>USERS:</h3>
			<div className="row mt-4">
				{user.map(
					(u) =>
						u.role !== "superadmin" && (
							<UserCard key={u._id} user={u} isAdmin={true} />
						)
				)}
			</div>
			<h3>ARTICLES:</h3>
			<div className="row mt-4">
				{articles.map((article) => (
					<ArticleCard key={article._id} article={article} isAdmin={true} />
				))}
			</div>
		</div>
	);
}

export default SuperAdminPage;
