import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({
	component: Component,
	redirectTo = "/",
	userRole,
}) => {
	const token = localStorage.getItem("token");

	if (token && userRole === "admin") {
		return <Component />;
	} else {
		if (token) {
			redirectTo = "/animals";
		} else if (token && userRole === "admin") {
			redirectTo = "/superadmin/page";
		}
		return <Navigate to={redirectTo} />;
	}
};
export default PrivateRouteAdmin;
