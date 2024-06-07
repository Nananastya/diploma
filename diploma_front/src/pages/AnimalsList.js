import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import SearchForm from "../components/SearchForm";

function AnimalsList() {
	const [animals, setAnimals] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
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

		if (token) {
			fetchAnimals();
		}
	}, [token]);

	const handleLogoutClick = async () => {
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

	const handleSearch = async (searchTerm) => {
		try {
			if (!searchTerm) {
				console.error("Search term is undefined or empty");
				return;
			}

			const response = await fetch(
				`http://localhost:8080/animals/search/${searchTerm}`,

				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error(
					`Network response was not ok for message: ${response.statusText}`
				);
			}
			const data = await response.json();
			setSearchResults(data);
		} catch (error) {
			console.error("Search error:", error);
		}
	};

	return (
		<div className="container">
			<button onClick={handleLogoutClick} className="btn btn-primary">
				Logout
			</button>
			<Link to="/test" className="btn btn-primary">
				Go to Test Page
			</Link>
			<Link className="btn btn-primary" to="/user-request">
				Your requests
			</Link>
			<h2 className="text-center">Animals List</h2>
			<SearchForm onSearch={handleSearch} />
			<div className="row mt-4">
				{searchResults.length > 0
					? searchResults.map((animal) => (
							<AnimalCard key={animal._id} animal={animal} isAdmin={false} />
					  ))
					: animals.map((animal) => (
							<AnimalCard key={animal._id} animal={animal} isAdmin={false} />
					  ))}
				{!searchResults && <p>No animals found.</p>}
			</div>
		</div>
	);
}

export default AnimalsList;
