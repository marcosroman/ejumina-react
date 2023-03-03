const mongoose = require('mongoose');
//const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;

//const { User } = require('./user.model');

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

/*
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
		type: ObjectIds,
		ref: "User",
		required: true
	}
}, {timestamps: true});

const AsignacionSchema = new Schema({
	evento: {
		type: ObjectId,
		ref: "Evento",
		required: true
	},
	rrpp: {
		type: ObjectId,
		ref: "Usuario",
		required: true
	},
	freePasses: {
		type: Number,
		min: 0,
		required: true
	},
	listasAsignadas: {
		type: ObjectIds,
		ref: "Lista",
	}
}, {timestamps: true});

const InvitadoSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		required: true
	},
	CI: {
		type: Number,
		required: true
	},
	baneado: {
		type: Boolean,
		required: true,
		default: false
	}
}, {timestamps: true});
*/

module.exports = mongoose.model("Evento", EventoSchema);

// capitalize name? lastname? yes please
//
