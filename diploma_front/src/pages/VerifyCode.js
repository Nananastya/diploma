import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function VerifyCode({ setUserRole }) {
	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	const validationSchema = Yup.object().shape({
		code: Yup.string().required("Verification code is required"),
	});

	const handleUserRole = async () => {
		try {
			const response = await fetch(`http://localhost:8080/users/${userId}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setUserRole(data.role);
			} else {
				setUserRole("user");
			}
		} catch (error) {
			console.error("Не вдалося отримати роль користувача:", error);
			setUserRole("user");
		}
	};

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/verify/${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("token", data.token);
				handleUserRole();
			}
		} catch (error) {
			console.error("Failed to send verification code:", error);
			setErrors({ code: "Failed to send verification code" });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={{ code: "" }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			{({ isSubmitting, errors }) => (
				<Form>
					<label>
						Verification code:
						<Field type="text" name="code" />
						<ErrorMessage name="code" component="div" className="text-danger" />
					</label>
					<br />
					<button type="submit" disabled={isSubmitting}>
						Verify code
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default VerifyCode;
