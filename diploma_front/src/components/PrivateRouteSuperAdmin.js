import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteSuperAdmin = ({
	component: Component,
	redirectTo = "/",
	userRole,
}) => {
	const token = localStorage.getItem("token");

	if (token && userRole === "superadmin") {
		return <Component />;
	} else {
		if (token) {
			redirectTo = "/animals";
		}
		return <Navigate to={redirectTo} />;
	}
};

export default PrivateRouteSuperAdmin;
