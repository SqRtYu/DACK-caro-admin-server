const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("../config/auth.json");

if (!authConfig.domain || !authConfig.audience) {
	throw new Error(
		"Please make sure that auth_config.json is in place and populated"
	);
}
const verifyAPI = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	}),
	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithms: ["RS256"],
});
const HttpError = require("../models/http-error");

const checkAuth = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error("Authentication failed!");
		}
		const decodedToken = jsonwebtoken.verify(token, process.env.JWT_KEY);
		req.userData = {
			userId: decodedToken.userId,
		};
		next();
	} catch (err) {
		const error = new HttpError("Authentication failed!", 403);
		return next(error);
	}
};

module.exports = { verifyAPI, checkAuth };
