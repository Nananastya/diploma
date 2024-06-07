import React, { useState, useEffect } from "react";

function DocumentCard({ document, onDelete, isAdmin = false }) {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [del, setDel] = useState(false);
	const [reject, setReject] = useState(false);
	const [approve, setApprove] = useState(false);
	let [user, setUser] = useState({});
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchUser = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/users/${document.userId}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setUser(data.login);
				}
			} catch (error) {
				console.error("Не вдалося отримати роль користувача:", error);
			}

			setIsLoading(false);
		};
		fetchUser();
	}, []);

	const handleDeleteConfirmation = () => {
		setDel(true);
		setShowConfirmation(true);
	};
	const handleRejectConfirmation = () => {
		setReject(true);
		setShowConfirmation(true);
	};
	const handleApproveConfirmation = () => {
		setApprove(true);
		setShowConfirmation(true);
	};
	const handleDelete = () => {
		onDelete(document._id);
		setShowConfirmation(false);
	};
	const handleRejectOrApprove = async () => {
		const token = localStorage.getItem("token");
		let status = "";
		if (approve) {
			status = "Approved";
		} else {
			status = "Rejected";
		}
		try {
			const response = await fetch(
				`http://localhost:8080/documents/update-document/${document._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						status: status,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			} else {
				setShowConfirmation(false);
				window.location.reload();
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const handleClose = () => setShowConfirmation(false);

	return (
		<div className="col-md-3 mb-3" style={{ display: "inline-block" }}>
			<div className="card document-card">
				<div className="card-body">
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<>
							<h3
								className={`card-title ${
									document.status === "Not processed" ||
									document.status === "Rejected"
										? "text-danger"
										: "text-success"
								}`}>
								{document.status}
							</h3>
							<p className="card-text">Animal ID: {document.animalId}</p>
							<p className="card-text">User ID: {document.userId}</p>
							<p className="card-text">User Email: {user}</p>
							<p className="card-text">Purpose: {document.purpose}</p>
							{!isAdmin && (
								<button
									className="btn btn-primary"
									onClick={handleDeleteConfirmation}>
									Delete
								</button>
							)}
							{isAdmin && (
								<button
									className="btn btn-primary"
									onClick={handleApproveConfirmation}>
									Approve
								</button>
							)}
							{isAdmin && (
								<button
									className="btn btn-primary"
									onClick={handleRejectConfirmation}>
									Reject
								</button>
							)}
						</>
					)}
				</div>
			</div>

			<div
				className={`modal ${showConfirmation ? "show" : ""}`}
				id={`modal-${document._id}`}
				tabIndex="-1"
				aria-labelledby={`modal-${document._id}-label`}
				aria-hidden={!showConfirmation}
				style={{ display: showConfirmation ? "block" : "none" }}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={`modal-${document._id}-label`}>
								{del && "Confirm Delete"}
								{reject && "Reject adoption request"}
								{approve && "Approve adoption request"}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={handleClose}></button>
						</div>
						<div className="modal-body">
							{del && "Are you sure you want to delete this request?"}
							{reject && "Are you sure you want to reject this request"}
							{approve && "Are you sure you want to approve this request"}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={handleClose}>
								Cancel
							</button>
							{del && !isAdmin && (
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleDelete}>
									Delete
								</button>
							)}
							{reject && isAdmin && (
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleRejectOrApprove}>
									Reject
								</button>
							)}
							{approve && isAdmin && (
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleRejectOrApprove}>
									Approve
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DocumentCard;
