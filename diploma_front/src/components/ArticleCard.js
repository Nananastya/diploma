import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

function ArticleCard({ article, isAdmin }) {
	const [deleteModal, setDeleteModal] = useState(null);

	useEffect(() => {
		const modalElement = document.getElementById(`modal-${article._id}`);
		if (modalElement) {
			const modalInstance = new Modal(modalElement);
			setDeleteModal(modalInstance);
		}
	}, [article]);

	const handleDelete = () => {
		if (deleteModal) {
			deleteModal.show();
		}
	};

	const handleConfirmDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/articles/delete/${article._id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete article");
			}
			deleteModal.hide();
			window.location.reload();
		} catch (error) {
			console.error("Error deleting article:", error.message);
		}
	};

	return (
		<div key={article._id} className="col-md-4 mb-3 d-flex align-items-stretch">
			<div className="card h-100">
				<Link to={`/articles/${article.url}`} />
				<img
					src={article.imageUrl}
					alt="Article_img"
					className="card-img-top"
					style={{ width: "100%", height: "200px" }}
				/>
				<div className="card-body d-flex flex-column align-items-center mb-3">
					<Link to={article.link} style={{ textDecoration: "none" }}>
						<h5 className="card-title">{article.name}</h5>
					</Link>
					{/* <p className="card-text">{article.content}</p> */}
				</div>
				{isAdmin && (
					<div className="d-flex flex-column justify-content-center align-items-center">
						<div className="mb-2">
							<Link
								to={`/superadmin/edit-article/${article._id}`}
								className="btn btn-primary me-3">
								Редагувати
							</Link>
							<button className="btn btn-danger" onClick={handleDelete}>
								Видалити
							</button>
						</div>
						<div
							className="modal fade"
							id={`modal-${article._id}`}
							tabIndex="-1"
							aria-labelledby={`modal-${article._id}-label`}
							aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5
											className="modal-title"
											id={`modal-${article._id}-label`}>
											Підтвердіть видалення
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Ви дійсно хочете видалити цю статтю?
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
					</div>
				)}
			</div>
		</div>
	);
}

export default ArticleCard;
