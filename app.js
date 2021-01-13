const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const adminsRoutes = require("./routes/admins-routes");
const usersRoutes = require("./routes/users-routes");
const gamesRoutes = require("./routes/games-routes");
const { verifyAPI } = require("./middleware/check-auth");

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(verifyAPI);

app.use("/api/admins", adminsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9hjdt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
	)
	.then(() => {
		app.listen(process.env.PORT || 5001);
	})
	.catch((err) => {
		console.log(err);
	});
