import jwt from "jsonwebtoken";
import { users_model } from "../models/users_model.js";
import { users_schema } from "../schemas/users_schema.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function login(req, res) {
	try {
		const { login, password } = req.body;

		const validation_result = users_schema.validate({ login, password });
		if (validation_result.error) {
			return res.status(400).json({ message: "Invalid login data" });
		}

		const user = await users_model.findOne({ login, password });

		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}
		console.log(user.login);
		send_verification_code(user.login, user.password);
		return res
			.status(200)
			.json({ message: "Authentication successful", userId: user._id });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "anastasiiakonyushenko@gmail.com",
		pass: "qucg uuvi cgft xhgr",
	},
});

function generateRandomCode(length = 6) {
	const characters = "0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

async function send_verification_code(email, password) {
	let verificationCode = generateRandomCode();
	const mailOptions = {
		from: "anastasiiakonyushenko@gmail.com",
		to: email,
		subject: "Verification Code",
		text: `Your verification code is: ${verificationCode}`,
	};

	try {
		const existingUser = await users_model.findOne({ login: email });
		if (!existingUser) {
			await users_model.create({
				login: email,
				password: password,
				code: verificationCode,
			});
		} else {
			await users_model.findOneAndUpdate(
				{ login: email },
				{ code: verificationCode }
			);
		}

		await transporter.sendMail(mailOptions);
		console.log("Verification code sent to", email);
	} catch (error) {
		console.error("Failed to send verification code:", error);
	}
}

async function verify_code(req, res) {
	try {
		const { code } = req.body;
		const _id = req.params.id;
		const user = await users_model.findById({ _id });
		if (user.code != code) {
			return res.status(500).send("Your account is not verified!");
		}

		let token = jwt.sign({ userId: user._id }, "your_secret_key_here", {
			expiresIn: "24h",
		});
		await users_model.findByIdAndUpdate(user._id, {
			token: token,
			verify: true,
		});
		res.send({ token });
	} catch (error) {
		console.error("Failed to send verify code:", error);
		res.status(500).send("Failed to verify code");
	}
}

export default { login, verify_code };
