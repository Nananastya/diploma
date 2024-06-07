import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import AdminPage from "./pages/AdminPage.js";
import SuperAdminPage from "./pages/SuperAdminPage.js";
import RegistrationPage from "./pages/RegistrationPage.js";
import AnimalsList from "./pages/AnimalsList.js";
import TestPage from "./pages/TestPage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import PrivateRouteSuperAdmin from "./components/PrivateRouteSuperAdmin.js";
import CreateAnimalCard from "./pages/CreateAnimalCard.js";
import EditCard from "./components/EditCard.js";
import AdoptionRequestPage from "./pages/AdoptionRequestPage.js";
import UserRequestsPage from "./pages/UserRequestPage.js";
import DocumentsPage from "./pages/DocumentsPage.js";
import VerifyCode from "./pages/VerifyCode.js";
import PublicRoute from "./components/PublicRoute.js";
import WelcomePage from "./pages/WelcomePage.js";
import Layout from "./components/Layout.js";
import CreateUser from "./pages/CreateUser.js";
import CreateArticle from "./pages/CreateArticle.js";
import EditArticle from "./pages/EditArticle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin.js";

function App() {
	const [userRole, setUserRole] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const fetchUserRole = async () => {
			if (userId && token) {
				try {
					const response = await fetch(
						`http://localhost:8080/users/${userId}`,
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (response.ok) {
						const data = await response.json();
						setUserRole(data.role);
						setUser(data);
					} else {
						setUserRole("user");
					}
				} catch (error) {
					console.error("Не вдалося отримати роль користувача:", error);
					setUserRole("user");
				}
			}
			setLoading(false);
		};

		fetchUserRole();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<LoginPage />} />
					<Route
						path="verify-code"
						element={
							<PublicRoute
								component={(props) => (
									<VerifyCode {...props} setUserRole={setUserRole} />
								)}
								redirectTo="/animals"
								userRole={userRole}
							/>
						}
					/>
					<Route path="registration" element={<RegistrationPage />} />
					<Route
						path="animals"
						element={
							<PrivateRoute
								component={AnimalsList}
								redirectTo="/login"
								userRole={userRole}
							/>
						}
					/>
					<Route index element={<WelcomePage />} />
					<Route path="test" element={<TestPage />} />
					<Route
						path="adoption-request/:animalId"
						element={<AdoptionRequestPage />}
					/>
					<Route path="user-request" element={<UserRequestsPage />} />
					<Route path="admin">
						<Route
							path="page"
							element={
								<PrivateRouteAdmin
									component={(props) => <AdminPage {...props} user={user} />}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="edit-card/:id"
							element={
								<PrivateRouteAdmin
									component={EditCard}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="create-animal"
							element={
								<PrivateRouteAdmin
									component={CreateAnimalCard}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="documents"
							element={
								<PrivateRouteAdmin
									component={DocumentsPage}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
					</Route>
					<Route path="superadmin">
						<Route
							path="page"
							element={
								<PrivateRouteSuperAdmin
									component={SuperAdminPage}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="create-user"
							element={
								<PrivateRouteSuperAdmin
									component={CreateUser}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="create-article"
							element={
								<PrivateRouteSuperAdmin
									component={CreateArticle}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
						<Route
							path="edit-article/:id"
							element={
								<PrivateRouteSuperAdmin
									component={EditArticle}
									redirectTo="/animals"
									userRole={userRole}
								/>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
