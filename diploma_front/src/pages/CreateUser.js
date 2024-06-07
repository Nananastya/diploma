import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateUser() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [formData, setFormData] = useState({
		name: "",
		login: "",
		password: "",
		verify: false,
		code: "",
		token: "",
		role: "admin",
	});
	const [passwordType, setPasswordType] = useState("password");

	const togglePassword = (e) => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "Назва повинен бути хоча б 3 символи")
			.required("Name is required"),
		login: Yup.string()
			.email("Invalid email address")
			.required("Login is required"),
		password: Yup.string()
			.min(6, "Пароль повинен бути хоча б 6 символів")
			.required("Password is required"),
	});

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		try {
			const response = await fetch("http://localhost:8080/users/add-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				navigate("/superadmin/page");
			} else {
				setErrors({ name: "Failed to create user card" });
			}
		} catch (error) {
			console.error("Failed to create user card:", error);
			setErrors({ name: "Failed to create user card" });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container">
			<h2>Add New Admin</h2>
			<Formik
				initialValues={formData}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="name" className="form-label">
							Name of organisation:
							<Field type="text" name="name" className="form-control" />
							<ErrorMessage
								name="name"
								component="div"
								className="text-danger"
							/>
						</label>
						<br />
						<label htmlFor="login" className="form-label">
							Login:
							<Field type="text" name="login" className="form-control" />
							<ErrorMessage
								name="login"
								component="div"
								className="text-danger"
							/>
						</label>
						<br />
						<label htmlFor="password" className="form-label">
							Password:
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: "0.5rem",
								}}>
								<Field
									type={passwordType}
									name="password"
									className="form-control"
								/>
								<button
									type="button"
									style={{ marginLeft: "0.2rem", padding: "0.2rem 0.5rem" }}
									className="btn btn-outline-primary"
									onClick={togglePassword}>
									{passwordType === "password" ? (
										<i className="bi bi-eye-slash"></i>
									) : (
										<i className="bi bi-eye"></i>
									)}
								</button>
							</div>
							<ErrorMessage
								name="password"
								component="div"
								className="text-danger"
							/>
						</label>
						<br />
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

export default CreateUser;
