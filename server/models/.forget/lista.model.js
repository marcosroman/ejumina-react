const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;

const ListaSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	evento: {
		type: ObjectId,
		ref: "Evento",
		required: true,
	},
	rrpps: {
		type: [ObjectId],
		ref: "User",
		required: true
	}
}, {timestamps: true});

module.exports = mongoose.model("Lista", ListaSchema);

