const Invitacion = require('../models/invitacion.model');

module.exports = {
	create: async (req, res) => {
		Invitacion.create(req.body)
			.then((invitacion) => {
				console.log("Invitacion creada", invitacion);
				res.json({invitacion});
			})
			.catch((error) => {
				console.log("Error creando invitacion", error);
				res.status(400).json({error});
			});
	},

	getAll: async (req, res) => {
		Invitacion.find({})
			.then((invitaciones) => res.json({invitaciones}))
			.catch((error) => {
				console.log("Something went wrong (getAll)", error)
				res.status(404).json({error});
			});
	},

	getInvitacionPerEvento: async (req, res) => {
		Invitacion.find({evento: req.params.eventoId})
			.populate('rrpp')
			.populate('invitado')
			.then((invitaciones) => res.json({invitaciones}))
			.catch((error) => {
				console.log("Something went wrong (getAll)", error)
				res.status(404).json({error});
			});
	},

	useInvitacion: async (req, res) => {
		await Invitacion.findOneAndUpdate({_id: req.params.id},{isUsada: true}/*,{returnOriginal:false	}*/)
			.then(invitacion => res.json({invitacion}))
			.catch(err => res.status(400).json({err}));
	}
}
