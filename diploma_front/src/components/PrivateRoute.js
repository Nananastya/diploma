import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
	const token = localStorage.getItem("token");

	return token ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
