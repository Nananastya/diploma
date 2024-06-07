import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

function AnimalCard({ animal, isAdmin }) {
	const [deleteModal, setDeleteModal] = useState(null);

	useEffect(() => {
		const modalElement = document.getElementById(`modal-${animal._id}`);
		if (modalElement) {
			const modalInstance = new Modal(modalElement);
			setDeleteModal(modalInstance);
		}
	}, [animal]);

	const handleDelete = () => {
		if (deleteModal) {
			deleteModal.show();
		}
	};

	const handleConfirmDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/animals/delete/${animal._id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete animal");
			}
			deleteModal.hide();
			window.location.reload();
		} catch (error) {
			console.error("Error deleting animal:", error.message);
		}
	};

	return (
		<div key={animal._id} className="col-md-4 mb-3 d-flex align-items-stretch">
			<div className="card border-primary mb-3">
				<div className="card-body d-flex justify-content-between">
					<div>
						<h5 className="card-title">Name: {animal.name}</h5>
						<h5 className="card-title">Organisation: {animal.organisation}</h5>
						<p className="card-text">Type: {animal.type}</p>
						<p className="card-text">Age: {animal.age}</p>
						<p className="card-text">Gender: {animal.gender}</p>
						<p className="card-text">Species: {animal.species}</p>
						<p className="card-text">Size: {animal.size}</p>
						<p className="card-text">Activity Level: {animal.activityLevel}</p>
						<p className="card-text">
							Guard:
							{animal.guard ? (
								<span style={{ fontWeight: "bold" }} className="text-success">
									Так
								</span>
							) : (
								<span style={{ fontWeight: "bold" }} className="text-danger">
									Ні
								</span>
							)}
						</p>
						<p className="card-text">
							Friendly:
							{animal.friendly ? (
								<span style={{ fontWeight: "bold" }} className="text-success">
									Так
								</span>
							) : (
								<span style={{ fontWeight: "bold" }} className="text-danger">
									Ні
								</span>
							)}
						</p>
						<p className="card-text">
							Adaptability:
							{animal.adaptability ? (
								<span style={{ fontWeight: "bold" }} className="text-success">
									Так
								</span>
							) : (
								<span style={{ fontWeight: "bold" }} className="text-danger">
									Ні
								</span>
							)}
						</p>
					</div>
					<div className="text-end">
						{animal.imageUrl && (
							<img
								src={animal.imageUrl}
								alt={animal.name}
								className="img-fluid"
								style={{ width: "100px", height: "100px", margin: "30px" }}
							/>
						)}

						{!isAdmin && (
							<Link
								to={`/adoption-request/${animal._id}`}
								className="btn btn-primary">
								Adopt
							</Link>
						)}

						{isAdmin && (
							<>
								<Link
									to={`/admin/edit-card/${animal._id}`}
									className="btn btn-primary">
									Edit
								</Link>
								<button className="btn btn-danger" onClick={handleDelete}>
									Delete
								</button>
								<div
									className="modal fade"
									id={`modal-${animal._id}`}
									tabIndex="-1"
									aria-labelledby={`modal-${animal._id}-label`}
									aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h5
													className="modal-title"
													id={`modal-${animal._id}-label`}>
													Confirm Delete
												</h5>
												<button
													type="button"
													className="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"></button>
											</div>
											<div className="modal-body">
												Are you sure you want to delete this animal?
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-secondary"
													data-bs-dismiss="modal">
													Cancel
												</button>
												<button
													type="button"
													className="btn btn-danger"
													onClick={handleConfirmDelete}>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnimalCard;
