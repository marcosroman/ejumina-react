const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

const PassSchema = new Schema({
	rrpp: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	invitado: {
		type: ObjectId,
		ref: 'Invitado',
		required: true
	},
	evento: {
		type: ObjectId,
		ref: 'Evento',
		required: true
	},
	isFreePass: {
		type: Boolean,
		required: true,
		default: false
	},
	isUsada: {
		type: Boolean,
		required: true,
		default: false
	}
}, {timestamps: true});

module.exports = mongoose.model("Pass", PassSchema);
