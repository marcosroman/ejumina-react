const mongoose = require('mongoose');
//const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;

//const { User } = require('./user.model');

const InvitadoSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "Ingrese el nombre"]
	},
	apellido: {
		type: String,
		required: [true, "Ingrese el apellido"]
	},
	CI: { // this could be the id but... not now
		type: Number,
		required: [true, "Necesitamos el CI...!"],
		min: [2000000, "Muy vieji para la joda kp, no hay enfermerx en el evento"],
		unique: [true, "Ese CI ya esta registrado"]
	},
	isBaneado: {
		type: Boolean,
		required: true,
		default: false
	}
}, {timestamps: true});


module.exports = mongoose.model("Invitado", InvitadoSchema);

// capitalize name? lastname? yes please
