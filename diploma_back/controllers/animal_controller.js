import animal_services from "../services/animal_services.js";
import { animal_schema } from "../schemas/animal_schema.js";

async function get_animals(req, res, next) {
	try {
		const animals = await animal_services.get_animals();
		const animalsWithThumbnails = await Promise.all(
			animals.map(async (animal) => {
				animal.imageUrl = await get_img(animal.imageUrl);
				return animal;
			})
		);
		res.send(animalsWithThumbnails);
	} catch (error) {
		next(error);
	}
}

async function post_animal(req, res, next) {
	try {
		const newAnimalData = req.body;
		const result = animal_schema.validate(newAnimalData);
		if (result.error) {
			console.log("Validation error:", result.error.message);
			throw new Error(result.error.message);
		}
		const newAnimal = await animal_services.create_animal(newAnimalData);
		res.status(201).json(newAnimal);
	} catch (error) {
		console.log("Error creating animal:", error.message);
		next(error);
	}
}

async function update_animal(req, res, next) {
	try {
		const { id } = req.params;
		const newData = req.body;
		console.log("id", id);
		console.log("newData", newData);
		const updatedAnimal = await animal_services.update_animal_data(id, newData);
		res.json(updatedAnimal);
	} catch (error) {
		next(error);
	}
}

async function get_animal_by_id(req, res, next) {
	try {
		const { id } = req.params;
		const animal = await animal_services.find_animal_by_id(id);

		if (animal) {
			// animal.imageUrl = await get_img(animal.imageUrl);
			res.json(animal);
		} else {
			res.status(404).json({ error: "Animal not found" });
		}
	} catch (error) {
		next(error);
	}
}

async function delete_animal(req, res, next) {
	try {
		const { id } = req.params;
		const deletedAnimal = await animal_services.delete_animal_by_id(id);
		if (!deletedAnimal) {
			return res.status(404).json({ error: "Animal not found" });
		}
		res.status(200).json(deletedAnimal);
	} catch (error) {
		next(error);
	}
}

async function get_img(rawURL) {
	if (!rawURL) {
		return "";
	}
	const RAW_URL1 = rawURL.split("/d/");
	const RAW_URL2 = RAW_URL1[1].split("/view");
	const IMAGE_ID = RAW_URL2[0];
	return `https://drive.google.com/thumbnail?id=${IMAGE_ID}&sz=w1000`;
}

async function search_animals(req, res, next) {
	try {
		const searchTerm = req.params.term;
		let animals;
		animals = await animal_services.search_animals_by_name(searchTerm);
		if (animals && animals.length > 0) {
			const animalsWithThumbnails = await Promise.all(
				animals.map(async (animal) => {
					if (animal.imageUrl) {
						animal.imageUrl = await get_img(animal.imageUrl);
					}
					return animal;
				})
			);
			res.json(animalsWithThumbnails);
		} else {
			res.json([]);
		}
	} catch (error) {
		next(error);
	}
}

async function get_animals_from_organisation(req, res, next) {
	try {
		const organisation = req.params.organisation;
		let animals;

		animals = await animal_services.get_animals_by_organization(organisation);
		if (animals && animals.length > 0) {
			const animalsWithThumbnails = await Promise.all(
				animals.map(async (animal) => {
					if (animal.imageUrl) {
						animal.imageUrl = await get_img(animal.imageUrl);
					}
					return animal;
				})
			);
			res.json(animalsWithThumbnails);
		} else {
			res.json([]);
		}
	} catch (error) {
		next(error);
	}
}

// async function find_test_animals(req, res, next) {
// 	try {
// 		const searchCriteria = req.body;
// 		// console.log("searchCriteria from test animals", searchCriteria);
// 		// Викликаємо метод пошуку тварин за критеріями
// 		const animals = await animal_services.searchAnimalsByCriteria({
// 			criteria: searchCriteria,
// 		});
// 		// console.log("animals from test", animals);
// 		if (animals && animals.length > 0) {
// 			const animalsWithThumbnails = await Promise.all(
// 				animals.map(async (animal) => {
// 					if (animal.imageUrl) {
// 						animal.imageUrl = await get_img(animal.imageUrl);
// 					}
// 					return animal;
// 				})
// 			);
// 			res.json(animalsWithThumbnails);
// 		} else {
// 			res.json([]);
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// }

const questions = [
	{
		id: "1",
		question:
			"Чи хочете і чи зможете ви кожен день відводити час на прогулянки?",
		options: ["Так", "Ні"],
		attribute: "type",
	},
	{
		id: "2",
		question:
			"Чи хочете ви завести середню тварину (10-40 кг) і чи впораєтесь ви з нею?",
		options: ["Так", "Ні"],
		attribute: "size",
	},
	{
		id: "3",
		question:
			"Чи хочете ви завести велику тварину (більше 40 кг) і чи впораєтесь ви з нею?",
		options: ["Так", "Ні"],
		attribute: "size",
	},

	{
		id: "4",
		question:
			"Ви хочете більш спокійну тварину, яка не потребує постійних ігор?",
		options: ["Так", "Ні"],
		attribute: "activityLevel",
	},
	{
		id: "5",
		question:
			"Чи важлива для вас здатність тварини захищати дім або територію?",
		options: ["Так", "Ні"],
		attribute: "guard",
	},
	{
		id: "6",
		question:
			"Чи важлива для вас дружелюбність тварини з іншими людьми та тваринами?",
		options: ["Так", "Ні"],
		attribute: "friendly",
	},
	{
		id: "7",
		question:
			"Чи важлива для вас здатність тварини легко адаптуватися до нових умов життя?",
		options: ["Так", "Ні"],
		attribute: "adaptability",
	},
	{
		id: "8",
		question: "Вам потрібна гіпоалергенна тварина?",
		options: ["Так", "Ні"],
		attribute: "hypoallergenic",
	},
	{
		id: "9",
		question: "Вам потрібна тваринка жіночого роду?",
		options: ["Так", "Ні"],
		attribute: "gender",
	},
];

class DecisionTreeNode {
	constructor(
		question = null,
		attribute = null,
		isLeaf = false,
		result = null
	) {
		this.question = question;
		this.attribute = attribute;
		this.isLeaf = isLeaf;
		this.result = result;
		this.children = {};
	}
}

// const build_decision_tree = (data, questions, unansweredQuestions) => {
// 	if (
// 		!data ||
// 		data.length === 0 ||
// 		!unansweredQuestions ||
// 		unansweredQuestions.length === 0
// 	) {
// 		return null;
// 	}
// 	console.log("data", data);
// 	const uniqueResults = new Set(data.map((d) => JSON.stringify(d)));

// 	if (uniqueResults.size === 1) {
// 		return new DecisionTreeNode(
// 			null,
// 			null,
// 			true,
// 			JSON.parse([...uniqueResults][0])
// 		);
// 	}

// 	const attributeinfo_gains = unansweredQuestions.map((question) => ({
// 		question,
// 		gain: info_gain(data, question.attribute),
// 	}));
// 	console.log("attributeinfo_gains", attributeinfo_gains);
// 	const bestQuestion = attributeinfo_gains.reduce((max, current) =>
// 		max.gain > current.gain ? max : current
// 	).question;

// 	const node = new DecisionTreeNode(bestQuestion, bestQuestion.attribute);

// 	const attributeValues = Array.from(
// 		new Set(data.map((d) => d[bestQuestion.attribute]))
// 	);

// 	attributeValues.forEach((value) => {
// 		const subset = data.filter((d) => d[bestQuestion.attribute] === value);
// 		const remainingQuestions = unansweredQuestions.filter(
// 			(q) => q.id !== bestQuestion.id
// 		);
// 		node.children[value] = build_decision_tree(
// 			subset,
// 			questions,
// 			remainingQuestions
// 		);
// 	});

// 	return node;
// };

const build_decision_tree = (data, questions, unansweredQuestions) => {
	if (
		!data ||
		data.length === 0 ||
		!unansweredQuestions ||
		unansweredQuestions.length === 0
	) {
		return null;
	}

	// Перетворюємо критерії на відповіді
	const dataWithAnswers = data.map((d) => convert_criteria_to_answers(d));

	// Перевірка на унікальні результати
	const uniqueResults = new Set(dataWithAnswers.map((d) => JSON.stringify(d)));
	if (uniqueResults.size === 1) {
		return new DecisionTreeNode(
			null,
			null,
			true,
			JSON.parse([...uniqueResults][0])
		);
	}

	// Обчислення приросту інформації для кожного питання
	const attributeinfo_gains = unansweredQuestions.map((question) => ({
		question,
		gain: info_gain(dataWithAnswers, question.id),
	}));
	console.log("1attributeinfo_gains", attributeinfo_gains);
	// Вибір питання з максимальним приростом інформації
	const bestQuestion = attributeinfo_gains.reduce((max, current) =>
		max.gain > current.gain ? max : current
	).question;

	const node = new DecisionTreeNode(bestQuestion, bestQuestion.attribute);

	// Групування даних за значенням найкращого питання
	const attributeValues = Array.from(
		new Set(dataWithAnswers.map((d) => d[bestQuestion.id]))
	);
	attributeValues.forEach((value) => {
		const subset = data.filter(
			(d) => convert_criteria_to_answers(d)[bestQuestion.id] === value
		);
		const remainingQuestions = unansweredQuestions.filter(
			(q) => q.id !== bestQuestion.id
		);
		node.children[value] = build_decision_tree(
			subset,
			questions,
			remainingQuestions
		);
	});

	return node;
};

function calculate_entropy(data) {
	const total = data.length;
	const counts = data.reduce((acc, value) => {
		acc[value] = (acc[value] || 0) + 1;
		return acc;
	}, {});
	return Object.values(counts).reduce((entropy, count) => {
		const p = count / total;
		return entropy - p * Math.log2(p);
	}, 0);
}

function calculate_info_gain(parentEntropy, subsets) {
	const total = subsets.reduce((sum, subset) => sum + subset.length, 0);
	const weightedEntropy = subsets.reduce((sum, subset) => {
		const subsetEntropy = calculate_entropy(
			subset.map((item) => JSON.stringify(item))
		);
		return sum + (subset.length / total) * subsetEntropy;
	}, 0);

	return parentEntropy - weightedEntropy;
}
function info_gain(data, attribute) {
	const parentEntropy = calculate_entropy(
		data.map((item) => JSON.stringify(item))
	);
	const subsets = Array.from(new Set(data.map((d) => d[attribute]))).map(
		(value) => data.filter((d) => d[attribute] === value)
	);
	return calculate_info_gain(parentEntropy, subsets);
}
const convert_answers_to_criteria = (answers) => {
	let searchAnimalData = {};
	if (answers["1"]) {
		searchAnimalData.type = answers["1"] === "Так" ? "Dog" : "Cat";
	}
	if (answers["2"] === "Так") {
		searchAnimalData.size = "Large";
	}
	if (answers["3"]) {
		searchAnimalData.size = answers["3"] === "Так" ? "Medium" : "Small";
	}
	if (answers["4"]) {
		searchAnimalData.activityLevel = answers["4"] === "Так" ? "High" : "Low";
	}
	if (answers["5"]) {
		searchAnimalData.guard = answers["5"] === "Так" ? true : false;
	}
	if (answers["6"]) {
		searchAnimalData.friendly = answers["6"] === "Так" ? true : false;
	}
	if (answers["7"]) {
		searchAnimalData.adaptability = answers["7"] === "Так" ? true : false;
	}
	if (answers["8"]) {
		searchAnimalData.hypoallergenic = answers["8"] === "Так" ? true : false;
	}
	if (answers["9"]) {
		searchAnimalData.gender = answers["9"] === "Так" ? "female" : "male";
	}
	return searchAnimalData;
};

const convert_criteria_to_answers = (criteria) => {
	const answers = {};
	if (criteria.type) answers["1"] = criteria.type === "Dog" ? "Так" : "Ні";
	if (criteria.size === "Large") {
		answers["2"] = "Так";
		answers["3"] = "Ні";
	}
	if (criteria.size === "Medium") {
		answers["3"] = "Так";
		answers["2"] = "Ні";
	}
	if (criteria.size === "Small") {
		answers["2"] = "Ні";
		answers["3"] = "Ні";
	}
	if (criteria.activityLevel === "High") answers["4"] = "Так";
	if (criteria.activityLevel === "Low") answers["4"] = "Ні";
	if (criteria.guard) {
		answers["5"] = "Так";
	} else {
		answers["5"] = "Ні";
	}
	if (criteria.friendly) {
		answers["6"] = "Так";
	} else {
		answers["6"] = "Ні";
	}
	if (criteria.adaptability) {
		answers["7"] = "Так";
	} else {
		answers["7"] = "Ні";
	}
	if (criteria.hypoallergenic) {
		answers["8"] = "Так";
	} else {
		answers["8"] = "Ні";
	}
	if (criteria.gender === "female") {
		answers["9"] = "Так";
	} else {
		answers["p"] = "Ні";
	}
	return answers;
};

const relatedQuestions = {
	2: { relatedId: "3", condition: "Так" },
	3: { relatedId: "2", condition: "Так" },
	1: { relatedId: "5", condition: "Так" },
	5: { relatedId: "1", condition: "Так" },
};

const next_question = (node, searchCriteria) => {
	if (!node || node.isLeaf) {
		return null;
	}

	const value = searchCriteria[node.attribute];
	if (!value) {
		// Check if the current question has any related question dependency
		if (node.id in relatedQuestions) {
			const { relatedId, condition } = relatedQuestions[node.id];
			// If the condition matches the response for the related question, skip the current question
			if (condition !== null && searchCriteria[relatedId] === condition) {
				return next_question(node.children[value], searchCriteria);
			}
		}
		return node.question;
	}

	// Move to the next question based on the current answer
	const nextNode = node.children[value];

	// If the next node has dependencies, check them
	if (nextNode && nextNode.id in relatedQuestions) {
		const { relatedId, condition } = relatedQuestions[nextNode.id];
		if (condition !== null && searchCriteria[relatedId] === condition) {
			// Skip the next node if the dependency condition is met
			return next_question(nextNode, searchCriteria);
		}
	}

	return next_question(nextNode, searchCriteria);
};

async function find_test_animals(req, res, next) {
	try {
		const searchCriteria = req.body;
		const animals = await animal_services.get_animals();

		if (!animals || animals.length === 0) {
			return res.json({ message: "No animals found in the database." });
		}

		let unansweredQuestions = questions.filter(
			(q) => !(q.id in searchCriteria)
		);

		for (const [key, { relatedId, condition }] of Object.entries(
			relatedQuestions
		)) {
			if (key in searchCriteria && searchCriteria[key] === condition) {
				unansweredQuestions = unansweredQuestions.filter(
					(q) => q.id !== relatedId
				);
			}
		}

		if (unansweredQuestions.length === 0) {
			const searchAnimals = convert_answers_to_criteria(searchCriteria);
			const filteredAnimals = await animal_services.searchAnimalsByCriteria({
				criteria: searchAnimals,
			});
			if (filteredAnimals.length > 0) {
				const animalsWithThumbnails = await Promise.all(
					filteredAnimals.map(async (animal) => {
						if (animal.imageUrl) {
							animal.imageUrl = await get_img(animal.imageUrl);
						}
						return animal;
					})
				);
				return res.json({ result: { animals: animalsWithThumbnails } });
			} else {
				return res.json({});
			}
		} else {
			let decisionTree = build_decision_tree(
				animals,
				questions,
				unansweredQuestions
			);
			let nextQuestion = next_question(decisionTree, searchCriteria);
			res.json({ nextQuestion });
		}
	} catch (error) {
		next(error);
	}
}

export default {
	find_test_animals,
	search_animals,
	get_animals,
	post_animal,
	update_animal,
	get_animal_by_id,
	delete_animal,
	get_animals_from_organisation,
};
