const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const Schema = mongoose.Schema;

const FreePassSchema = new Schema({
	rrpp: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	cantidad: {
		type: Number,
		required: true,
		min: 1
	}
});

const EventoSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	estado: {
		type: String,
		enum: ["Upcoming", "Ongoing", "Finished", "Cancelled"]
	},
	admin : {
		type: ObjectId,
		ref: 'User',
		required: false // for testing only
	},
	bouncer: {
		type: ObjectId,
		ref: 'User',
		required: false
	},
	freePasses: [FreePassSchema]
}, {timestamps: true});

module.exports = mongoose.model("Evento", EventoSchema);



