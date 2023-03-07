const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
	rol: {
		type: String,
		enum: ["Admin","RRPP","Bouncer"],
		required: true
	},
	isUsed: {
		type: Boolean,
		required: true,
		default: false
	}
}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);

