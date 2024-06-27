import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";

function UserCard({ user, isAdmin }) {
	const [deleteModal, setDeleteModal] = useState(null);

	useEffect(() => {
		const modalElement = document.getElementById(`modal-${user._id}`);
		if (modalElement) {
			const modalInstance = new Modal(modalElement);
			setDeleteModal(modalInstance);
		}
	}, [user]);

	const handleDelete = () => {
		if (deleteModal) {
			deleteModal.show();
		}
	};
	const handleConfirmDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/users/delete/${user._id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete user");
			}
			deleteModal.hide();
			window.location.reload();
		} catch (error) {
			console.error("Error user article:", error.message);
		}
	};

	return (
		<div key={user._id} className="col-md-3 mb-3 d-flex align-items-stretch">
			<div className="card border-primary mb-3" style={{ width: "18rem" }}>
				<div className="card-body">
					<p>Login: {user.login}</p>
					<p>Role: {user.role}</p>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center">
					{isAdmin && (
						<>
							<button className="btn btn-danger mb-2" onClick={handleDelete}>
								Видалити
							</button>
							<div
								className="modal fade"
								id={`modal-${user._id}`}
								tabIndex="-1"
								aria-labelledby={`modal-${user._id}-label`}
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5
												className="modal-title"
												id={`modal-${user._id}-label`}>
												Підтвердіть видалення
											</h5>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body">
											Ви дійсно хочете видалити цього юзера?
										</div>
										<div className="modal-footer">
											<button
												type="button"
												className="btn btn-secondary"
												data-bs-dismiss="modal">
												Скасувати
											</button>
											<button
												type="button"
												className="btn btn-danger"
												onClick={handleConfirmDelete}>
												Видалити
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
	);
}

export default UserCard;
