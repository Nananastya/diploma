import React from "react";
import AdoptionRequestForm from "../components/AdoptionRequestForm";
import { useParams } from "react-router-dom";

function AdoptionRequestPage() {
	const { animalId } = useParams();
	return (
		<div>
			<h1>Adoption Request Form</h1>
			<AdoptionRequestForm animalId={animalId} />
		</div>
	);
}

export default AdoptionRequestPage;
