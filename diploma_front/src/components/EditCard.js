import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditCard() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		species: "",
		age: "",
		gender: "male",
		imageUrl: "",
		size: "",
		activityLevel: "High",
		guard: false,
		friendly: false,
		adaptability: false,
		hypoallergenic: false,
	});

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		type: Yup.string().required("Type is required"),
		species: Yup.string(),
		age: Yup.number().required("Age is required"),
		gender: Yup.string().required("Gender is required"),
		imageUrl: Yup.string().required("Image URL is required"),
		size: Yup.string(),
		activityLevel: Yup.string().required("Activity Level is required"),
		guard: Yup.boolean(),
		friendly: Yup.boolean(),
		adaptability: Yup.boolean(),
		hypoallergenic: Yup.boolean(),
		organisation: Yup.string(),
	});

	useEffect(() => {
		fetch(`http://localhost:8080/animals/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setFormData(data);
			})
			.catch((error) => console.error("Failed to fetch animal data:", error));
	}, [id]);

	const handleSubmit = async (values, { setSubmitting }) => {
		values.age = values.age.toString();
		delete values._id;
		try {
			const response = await fetch(
				`http://localhost:8080/animals/update/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(values),
				}
			);
			if (response.ok) {
				navigate("/admin/page");
			}
		} catch (error) {
			console.error("Failed to edit animal card:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container">
			<h2>Edit Animal Card</h2>
			<Formik
				enableReinitialize
				initialValues={formData}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Name:
							</label>
							<Field
								type="text"
								className="form-control"
								id="name"
								name="name"
							/>
							<ErrorMessage
								name="name"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="age" className="form-label">
								Age:
							</label>
							<Field
								type="number"
								className="form-control"
								id="age"
								name="age"
							/>
							<ErrorMessage
								name="age"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="gender" className="form-label">
								Gender:
							</label>
							<Field
								as="select"
								className="form-select"
								id="gender"
								name="gender">
								<option value="male">Male</option>
								<option value="female">Female</option>
							</Field>
							<ErrorMessage
								name="gender"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="type" className="form-label">
								Type:
							</label>
							<Field as="select" className="form-select" id="type" name="type">
								<option value="Cat">Cat</option>
								<option value="Dog">Dog</option>
							</Field>
							<ErrorMessage
								name="type"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="activityLevel" className="form-label">
								Activity Level:
							</label>
							<Field
								as="select"
								className="form-select"
								id="activityLevel"
								name="activityLevel">
								<option value="High">High</option>
								<option value="Low">Low</option>
							</Field>
							<ErrorMessage
								name="activityLevel"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="species" className="form-label">
								Species:
							</label>
							<Field
								type="text"
								className="form-control"
								id="species"
								name="species"
							/>
							<ErrorMessage
								name="species"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="imageUrl" className="form-label">
								Image URL from Google Disk:
							</label>
							<Field
								type="text"
								className="form-control"
								id="imageUrl"
								name="imageUrl"
							/>
							<ErrorMessage
								name="imageUrl"
								component="div"
								className="text-danger"
							/>
						</div>
						{formData.type === "Dog" && (
							<div className="mb-3">
								<label htmlFor="guard" className="form-label">
									Guard:
								</label>
								<Field
									type="checkbox"
									className="form-check-input"
									id="guard"
									name="guard"
								/>
								<ErrorMessage
									name="guard"
									component="div"
									className="text-danger"
								/>
							</div>
						)}
						<div className="mb-3">
							<label htmlFor="adaptability" className="form-label">
								Adaptability:
							</label>
							<Field
								type="checkbox"
								className="form-check-input"
								id="adaptability"
								name="adaptability"
							/>
							<ErrorMessage
								name="adaptability"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="friendly" className="form-label">
								Friendly:
							</label>
							<Field
								type="checkbox"
								className="form-check-input"
								id="friendly"
								name="friendly"
							/>
							<ErrorMessage
								name="friendly"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="hypoallergenic" className="form-label">
								Hypoallergenic:
							</label>
							<Field
								type="checkbox"
								className="form-check-input"
								id="hypoallergenic"
								name="hypoallergenic"
							/>
							<ErrorMessage
								name="hypoallergenic"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="size" className="form-label">
								Size:
							</label>
							<Field as="select" className="form-select" id="size" name="size">
								<option value="Large">більше 40 кг</option>
								<option value="Medium">10-40 кг</option>
								<option value="Small">менше ніж 10 кг</option>
							</Field>
							<ErrorMessage
								name="size"
								component="div"
								className="text-danger"
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary"
							disabled={isSubmitting}>
							Edit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EditCard;
