const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const secret_key = process.env.SECRET_KEY;

module.exports = {
	//Get All
	getAll: async (req, res) => {
			User.find({})
					.then((user) => res.json(user))
					.catch((error) => console.log("Something went wrong (getAll)", error));
	},

	// register
	register: async (req, res) => {
		try {
			const newUser = await User.create(req.body);
			const userToken = jwt.sign({ _id: newUser._id }, secret_key);

			res.status(201).cookie('userToken',
				userToken, secret_key, { httpOnly: true })
				.json({ msg: "registered! here, take a cookie", user: newUser })

			console.log("got a token!", userToken);
		}
		catch (error) {
			res.status(400).json(error);
		}
	},

	// login
	login: async (req, res) => {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user === null) {
					res.status(400).json({ message: "invalid login attempt" });
				} else {
					bcrypt.compare(req.body.password, user.password)
						.then(passwordIsValid => {
							if (passwordIsValid) {
								// generate token
								const userToken = jwt.sign({ _id: user._id }, secret_key)

								res.cookie("userToken", userToken, { httpOnly: true })
									.json({ message: "success! Login" });

							} else {
								res.status(400).json({ message: "invalid login attempt" });
							}
						})
						.catch(err => res.status(400)
						.json({ message: "invalid login attempt" }));
				}
			})
			.catch(err => res.status(400).json(err));
	},

	// logout
	logout: (req, res) => {
		res.clearCookie('userToken');
		//	.json({message: 'User logout'});
		//console.log('logging out!');
	},

	getAllActiveRRPPs: async (req, res) => {
		User.find({rol: 'RRPP', isActive:true})
			.then(rrpp => res.json({rrpp}))
			.catch(err => res.json({err}));
	}

}
