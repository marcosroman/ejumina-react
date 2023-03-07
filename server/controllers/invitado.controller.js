const Invitado = require('../models/invitado.model');

module.exports = {
	create: async (req, res) => {
		Invitado.create(req.body)
			.then((invitado) => {
				console.log("Invitado creado", invitado);
				res.json({invitado});
			})
			.catch((error) => {
				console.log("Error creando invitado", error);
				res.status(400).json({error});
			});
	},

	getAll: async (req, res) => {
		Invitado.find({})
			.then((invitados) => res.json({invitados}))
			.catch((error) => {
				console.log("Something went wrong (getAll)", error);
				res.status(404).json({error});
			});
	},

	findByCI: async (req, res) => {
		Invitado.findOne({CI: req.params.ci})
			.then((invitado) => res.json({invitado}))
			.catch((error) => {
				console.log("error looking for CI!", error)
				res.status(404).json({error});
			});
	}
}
