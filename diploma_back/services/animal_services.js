import { animal_model } from "../models/animals_model.js";

async function get_animals() {
	const animals = await animal_model.find({});
	return animals;
}

async function find_animal_by_id(id) {
	const animal = await animal_model.findById(id);
	return animal;
}

async function create_animal(animalData) {
	const newAnimal = await animal_model.create(animalData);
	return newAnimal;
}

async function update_animal_data(id, newData) {
	const updatedAnimal = await animal_model.findByIdAndUpdate(id, newData, {
		new: true,
	});
	return updatedAnimal;
}

async function delete_animal_by_id(id) {
	try {
		const deletedAnimal = await animal_model.findByIdAndDelete(id);
		if (!deletedAnimal) {
			throw new Error("Animal not found");
		}
		return deletedAnimal;
	} catch (error) {
		throw error;
	}
}

async function search_animals_by_name(name) {
	const animals = await animal_model.find({
		$or: [
			{ name: { $regex: name, $options: "i" } },
			{ type: { $regex: name, $options: "i" } },
			{ gender: { $regex: name, $options: "i" } },
			{ species: { $regex: name, $options: "i" } },
			{ size: { $regex: name, $options: "i" } },
			{ organisation: { $regex: name, $options: "i" } },
		],
	});
	return animals;
}

async function get_animals_by_organization(organisation) {
	const animals = await animal_model.find({ organisation });
	return animals;
}

async function searchAnimalsByCriteria({ criteria, limit = 4 }) {
	try {
		if (!criteria) {
			throw new Error("Criteria object is required");
		}

		const animals = await animal_model.find({});

		const animalsWithSimilarity = animals.map((animal) => {
			let similarityScore = 0;
			for (const [key, value] of Object.entries(criteria)) {
				if (animal[key] === value) {
					similarityScore++;
				}
			}
			return { animal, similarityScore };
		});

		animalsWithSimilarity.sort((a, b) => b.similarityScore - a.similarityScore);
		const topAnimals = animalsWithSimilarity
			.slice(0, limit)
			.map((item) => item.animal);
		return topAnimals;
	} catch (error) {
		throw new Error(
			`Unable to find animals with similar characteristics: ${error.message}`
		);
	}
}

export default {
	searchAnimalsByCriteria,
	get_animals,
	find_animal_by_id,
	create_animal,
	update_animal_data,
	delete_animal_by_id,
	search_animals_by_name,
	get_animals_by_organization,
};
