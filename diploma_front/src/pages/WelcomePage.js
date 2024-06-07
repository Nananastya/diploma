import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div>WelcomePage</div>
			<button
				type="button"
				style={{
					marginBottom: "0.5rem",
				}}
				onClick={() => navigate("/login")}>
				Login
			</button>
			<button
				type="button"
				style={{
					marginLeft: "0.5rem",
				}}
				onClick={() => navigate("/registration")}>
				Register
			</button>
		</>
	);
};

export default WelcomePage;
