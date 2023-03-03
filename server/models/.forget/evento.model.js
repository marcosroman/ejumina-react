const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;


const EventoSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	estado: {
		type: String,
		enum: ["Upcoming", "Ongoing", "Finished", "Cancelled"]
	},
	fecha: {
		type: Date,
	},
	admin: {
		type: ObjectId,
		ref: "User",
		required: true
		// faltaria verificar (con mongoose) que el usuario es realmente un admin!!!!
	}
}, {timestamps: true});

module.exports = mongoose.model("Evento", EventoSchema);

// capitalize name? lastname? yes please
//
