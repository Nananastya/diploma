import mongoose from "mongoose";

const db_url = process.env.db_url;
mongoose
	.connect(db_url)
	.then(() => console.log("DB connected!"))
	.catch((e) => {
		console.log("Database connection error", e);
		process.exit(1);
	});
