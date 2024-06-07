import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginPage() {
	const navigate = useNavigate();
	const [passwordType, setPasswordType] = useState("password");

	const togglePassword = (e) => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};
	const validationSchema = Yup.object().shape({
		login: Yup.string().required("Login is required"),
		password: Yup.string().required("Password is required"),
	});

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		try {
			const response = await fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (response.status === 200) {
				const responseData = await response.json();
				const userId = responseData.userId;
				localStorage.setItem("userId", userId);

				navigate("/verify-code");
			} else if (response.status === 401) {
				console.error("Authentication failed: Invalid credentials");
				setErrors({
					login: "Invalid credentials",
					password: "Invalid credentials",
				});
			} else {
				throw new Error("Failed to authenticate");
			}
		} catch (error) {
			console.error("Authentication error:", error.message);
			setErrors({
				login: "Failed to authenticate",
				password: "Failed to authenticate",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<Formik
				initialValues={{ login: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ isSubmitting, errors }) => (
					<Form>
						<label
							style={{
								marginBottom: "0.5rem",
							}}>
							Login:
							<Field type="text" name="login" />
						</label>
						<br />
						<label>
							Password:
							<Field type={passwordType} name="password" />
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
							<ErrorMessage
								name="password"
								component="div"
								className="text-danger"
							/>
						</label>

						<br />
						<button type="submit" disabled={isSubmitting}>
							Login
						</button>
						<button
							type="button"
							style={{
								marginLeft: "0.5rem",
							}}
							onClick={() => {
								navigate("/registration");
							}}>
							Register
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default LoginPage;
