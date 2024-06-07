import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdoptionRequestForm({ animalId }) {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
	const day = ("0" + currentDate.getDate()).slice(-2);
	const hours = ("0" + currentDate.getHours()).slice(-2);
	const minutes = ("0" + currentDate.getMinutes()).slice(-2);

	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

	const [formData, setFormData] = useState({
		animalId: animalId,
		userId: "",
		purpose: "",
		status: "Not processed",
		date: formattedDateTime,
	});
	const [animal, setAnimal] = useState({});
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	formData.userId = localStorage.getItem("userId");
	useEffect(() => {
		if (!token) {
			navigate("/login");
		} else {
			fetchAnimal();
		}
	}, [token, navigate]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const fetchAnimal = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/animals/${formData.animalId}`,
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
			setAnimal(data);
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8080/documents/post",
				formData
			);
			setFormData({
				animalId: "",
				userId: "",
				purpose: "",
				status: "",
				date: "",
			});
			navigate("/animals");
		} catch (error) {
			console.error("Error creating adoption request:", error);
		}
	};

	return (
		<div>
			<h2>Adoption Request Form</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="animalId">Animal ID:</label>
					<span>{formData.animalId}</span>
				</div>
				<div key={animal._id} className="col-md-4">
					<div className="card border-primary mb-3">
						<div className="card-body d-flex justify-content-between">
							<div>
								<h5 className="card-title">Name: {animal.name}</h5>
								<p className="card-text">Breed: {animal.breed}</p>
								<p className="card-text">Age: {animal.age}</p>
								<p className="card-text">Gender: {animal.gender}</p>
								<p className="card-text">Species: {animal.species}</p>
							</div>
							<div className="text-end">
								{animal.imageUrl && (
									<img
										src={animal.imageUrl}
										alt={animal.name}
										className="img-fluid"
										style={{ width: "100px", height: "100px", margin: "30px" }}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="userId">User ID:</label>
					<span>{formData.userId}</span>
				</div>
				<div>
					<label htmlFor="purpose">Purpose:</label>
					<br />
					<textarea
						id="purpose"
						name="purpose"
						value={formData.purpose}
						onChange={handleChange}
						style={{
							width: "50%",
							minHeight: "100px",
							maxHeight: "200px",
							resize: "vertical",
							overflowY: "auto",
						}}
					/>
				</div>

				<div>
					<label htmlFor="status">Status:</label>
					<p>{formData.status}</p>
				</div>
				<div>
					<label htmlFor="date">Date:</label>
					<p>{formData.date}</p>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AdoptionRequestForm;
