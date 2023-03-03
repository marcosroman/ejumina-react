const jwt = require("jsonwebtoken");

// secretkey is stored in .env file
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
	jwt.verify(req.cookies.userToken, secret, (err, payload) => {
		if (err) {
			res.status(401).json({ verified: false });
		} else {
			console.log('authenticated');
			next();
		}
	});
}

