import express from "express";
import "dotenv/config";
import "./db.js";
import animal_router from "./routers/animal_router.js";
import users_router from "./routers/users_router.js";
import login_router from "./routers/login_router.js";
import documents_router from "./routers/documents_router.js";
import articles_router from "./routers/articles_router.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/animals", animal_router);
app.use("/users", users_router);
app.use("/api", login_router);
app.use("/documents", documents_router);
app.use("/articles", articles_router);

app.listen(8080, () => {
	console.log("app listens port 8080");
});
