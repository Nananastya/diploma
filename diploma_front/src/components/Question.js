import React, { useState } from "react";

function Question({ question, options, onSelect, currentQuestionId }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionSelect = (option) => {
		setSelectedOption(option);
		onSelect(option);
		if (currentQuestionId === "question1" && option === "Так") {
			setSelectedOption(null);
		}
	};

	return (
		<div>
			<h3>{question}</h3>
			<div>
				{options.map((option) => (
					<div key={option}>
						<input
							type="radio"
							id={option}
							name="option"
							value={option}
							checked={selectedOption === option}
							onClick={() => handleOptionSelect(option)}
						/>
						<label htmlFor={option}>{option}</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default Question;
