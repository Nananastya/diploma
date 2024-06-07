import express from "express";
import animal_controller from "../controllers/animal_controller.js";
import { animal_schema } from "../schemas/animal_schema.js";
import validateBody from "../helpers/validate_body.js";

const animal_router = express.Router();

animal_router.get("/", animal_controller.get_animals);
animal_router.get("/:id", animal_controller.get_animal_by_id);
animal_router.get(
	"/organisation/:organisation",
	animal_controller.get_animals_from_organisation
);
animal_router.post(
	"/",
	validateBody(animal_schema),
	animal_controller.post_animal
);
animal_router.put(
	"/update/:id",
	validateBody(animal_schema),
	animal_controller.update_animal
);
animal_router.delete("/delete/:id", animal_controller.delete_animal);
animal_router.get("/search/:term", animal_controller.search_animals);
animal_router.post("/searchCriteria", animal_controller.find_test_animals);

export default animal_router;
