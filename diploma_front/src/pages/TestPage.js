import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import AnimalCard from "../components/AnimalCard";
import ArticleCard from "../components/ArticleCard";

function TestPage() {
	const token = localStorage.getItem("token");

	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [answers, setAnswers] = useState({});
	const [showResult, setShowResult] = useState(false);
	const [animals, setAnimals] = useState([]);
	const [articles, setArticles] = useState([]);

	const fetchArticles = async (currentAnswers) => {
		try {
			const response = await fetch("http://localhost:8080/articles/test", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(currentAnswers),
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const data = await response.json();
			if (data) {
				setArticles(data);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	const fetchNextQuestion = async (currentAnswers) => {
		try {
			const response = await fetch(
				"http://localhost:8080/animals/searchCriteria",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(currentAnswers),
				}
			);

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const data = await response.json();
			if (data.result) {
				setShowResult(true);
				setAnimals(data.result.animals);
				fetchArticles(currentAnswers);
			} else if (data.nextQuestion) {
				setCurrentQuestion(data.nextQuestion);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	const handleOptionSelect = (option) => {
		const currentQuestionId = currentQuestion.id;
		const nextAnswers = { ...answers, [currentQuestionId]: option };
		setAnswers(nextAnswers);

		fetchNextQuestion(nextAnswers);
	};

	const handleReset = () => {
		setCurrentQuestion(null);
		setAnswers({});
		setShowResult(false);
		setAnimals([]);
		setArticles([]);
		window.location.reload();
	};

	useEffect(() => {
		fetchNextQuestion({});
	}, []);

	return (
		<div>
			{showResult ? (
				<div>
					<h2>Результат:</h2>
					<div className="row mt-4">
						{animals.length > 0 ? (
							animals.map((animal) => (
								<AnimalCard key={animal._id} animal={animal} isAdmin={false} />
							))
						) : (
							<p>Тварини не знайдені.</p>
						)}
					</div>
					<h2>Статті:</h2>
					<div className="container">
						<div className="row">
							{articles.length > 0 ? (
								articles.map((article) => (
									<ArticleCard
										key={article._id}
										article={article}
										isAdmin={false}
									/>
								))
							) : (
								<p>Статті не знайдені.</p>
							)}
						</div>
					</div>
					<button onClick={handleReset}>Почати спочатку</button>
					<Link to="/animals">Повернутися до головної сторінки</Link>
				</div>
			) : (
				currentQuestion && (
					<>
						<Question
							question={currentQuestion.question}
							options={currentQuestion.options}
							onSelect={handleOptionSelect}
						/>
						<Link to="/animals">Повернутися до головної сторінки</Link>
					</>
				)
			)}
		</div>
	);
}

export default TestPage;
