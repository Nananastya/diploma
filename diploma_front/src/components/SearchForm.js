import React, { useState } from "react";

function SearchForm({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSearch}>
			<div className="mb-3">
				<label htmlFor="searchTerm" className="form-label">
					Search:
				</label>
				<input
					type="text"
					className="form-control"
					id="searchTerm"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Search
			</button>
		</form>
	);
}

export default SearchForm;
