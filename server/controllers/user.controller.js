const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const secret_key = process.env.SECRET_KEY;

const Token = require('../models/token.model');

module.exports = {
	//Get All
	getAll: async (req, res) => {
			User.find({})
					.then((user) => res.json(user))
					.catch((error) => {
						console.log("Something went wrong (getAll)", error)
						res.status(404).json({error});
					});
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
		User.findOne({ CI: req.body.CI })
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
									.json({
										message: "logged in",
										rol: user.rol,
										CI: user.CI,
										_id: user._id,
										nombre: user.nombre + " " + user.apellido
									});
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

	getAllActiveRRPPs: async (req, res) => {
		User.find({rol: 'RRPP', isActive:true})
			.then(rrpp => res.json({rrpp}))
			.catch(err => res.status(404).json({err}));
	},

	getTokenInfo: async (req, res) => {
		Token.findById(req.params.token)
			.then(token => res.json({token}))
			.catch(err => res.status(404).json({err}));
	},
	
	newToken: async (req, res) => {
		Token.create({rol: req.body.rol})
			.then(token => res.json({token}))
			.catch(err => res.status(404).json({err}));
	},

	useToken: async (req, res) => {
		Token.findByIdAndUpdate(req.params.token,{isUsed: true})
			.then(token => res.json({token}))
			.catch(err => res.status(404).json({err}));
	},


	//check if user is logged in
	checkUser: async (req, res, next) => {
    let currentUser;
		if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, secret_key);
        currentUser = await User.findById(decoded._id);
    } else {
        currentUser = null;
    }
    res.status(200).send({ currentUser });
	},

	//log user out
	logout: async (req, res) => {
		//console.log(res);
		/*
    res.cookie('userToken', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
		*/

		//res.clearCookie('userToken');
		//res.status(200).send('logged out');

		res.clearCookie('userToken');//.end();
		res.status(200).send('logged out');
		res.end();
	}

	/*
	// logout
	logout: (req, res) => {
		res.clearCookie('userToken');
		//	.json({message: 'User logout'});
		//console.log('logging out!');
	},
	*/

}

