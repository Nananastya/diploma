import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, redirectTo = "/", userRole }) => {
	const token = localStorage.getItem("token");
	if (token && userRole === "superadmin") {
		return <Navigate to={"/superadmin/page"} />;
	} else if (token && userRole === "admin") {
		return <Navigate to={"/admin/page"} />;
	} else if (token && userRole !== "admin") {
		return <Navigate to={redirectTo} />;
	} else {
		return <Component />;
	}
};

export default PublicRoute;
