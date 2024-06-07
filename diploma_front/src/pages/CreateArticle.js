import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateArticle() {
	const navigate = useNavigate();
	let [formData, setFormData] = useState({
		name: "",
		type: "",
		species: "",
		age: "",
		gender: "",
		imageUrl: "",
		size: "",
		activityLevel: "",
		guard: false,
		friendly: false,
		adaptability: false,
		hypoallergenic: false,
		content: "",
		link: "",
	});
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Ім'я є обов'язковим"),
		type: Yup.string().required("Тип є обов'язковим"),
		species: Yup.string(),
		age: Yup.number(),
		gender: Yup.string(),
		imageUrl: Yup.string().required("URL зображення є обов'язковим"),
		size: Yup.string(),
		activityLevel: Yup.string(),
		guard: Yup.boolean(),
		friendly: Yup.boolean(),
		adaptability: Yup.boolean(),
		hypoallergenic: Yup.boolean(),
		content: Yup.string().required("Контент є обов'язковим"),
		link: Yup.string().required("Посилання є обов'язковим"),
	});
	const removeEmptyFields = () => {
		const updatedFormData = { ...formData };
		Object.entries(updatedFormData).forEach(([key, value]) => {
			if (value === "" || value === " " || value === "-") {
				delete updatedFormData[key];
			}
		});
		setFormData(updatedFormData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		removeEmptyFields();

		if (formData.age) {
			formData.age = formData.age.toString();
		}
		try {
			const response = await fetch(
				"http://localhost:8080/articles/add-article",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				navigate("/superadmin/page");
			}
		} catch (error) {
			console.error("Failed to create animal card:", error);
		}
	};
	return (
		<div className="container">
			<h2>Редагувати статтю</h2>
			<Formik
				enableReinitialize
				initialValues={formData}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ isSubmitting, values }) => (
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
								<option value="">-</option>
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
								ActivityLevel:
							</label>
							<Field
								as="select"
								className="form-select"
								id="activityLevel"
								name="activityLevel">
								<option value="">-</option>
								<option value="High">High</option>
								<option value="Low">Low</option>
							</Field>
							<ErrorMessage
								name="type"
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
						{values.type === "Dog" && (
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
								<option value="">-</option>
								<option value="Large">More than 40 kg</option>
								<option value="Medium">10-40 kg</option>
								<option value="Small">Less than 10 kg</option>
							</Field>
							<ErrorMessage
								name="size"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="link" className="form-label">
								Link:
							</label>
							<Field
								type="text"
								className="form-control"
								id="link"
								name="link"
							/>
							<ErrorMessage
								name="link"
								component="div"
								className="text-danger"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="content" className="form-label">
								Content:
							</label>
							<Field
								type="text"
								className="form-control"
								id="content"
								name="content"
							/>
							<ErrorMessage
								name="content"
								component="div"
								className="text-danger"
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary"
							disabled={isSubmitting}>
							Create
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CreateArticle;
