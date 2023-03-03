const mongoose = require('mongoose');
//const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;

//const { User } = require('./user.model');

const InvitadoSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		required: true
	},
	CI: { // this could be the id but... not now
		type: Number,
		required: true,
		unique: true
	},
	isBaneado: {
		type: Boolean,
		required: true,
		default: false
	}
}, {timestamps: true});


module.exports = mongoose.model("Invitado", InvitadoSchema);

// capitalize name? lastname? yes please
