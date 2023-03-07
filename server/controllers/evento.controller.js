const Evento = require('../models/evento.model');

module.exports = {
	create: async (req, res) => {
		Evento.create(req.body)
			.then((evento) => {
				console.log("Evento creado", evento);
				res.json({evento});
			})
			.catch((error) => {
				console.log("Error creando evento", error);
				res.status(400).json({error})});
	},

	getAll: async (req, res) => {
		Evento.find({})
			.then((eventos) => res.json({eventos}))
			.catch((error) => {
				console.log("Something went wrong (getAll)", error)
				res.status(404).json({error});
			});
	},

	getById: async (req, res) => {
		await Evento.findById(req.params.id)
		.then(evento => res.json({evento}))
		.catch(err => res.status(404).json({err}));
	},

	getOngoing: async (req, res) => {
		await Evento.find({estado:"Ongoing"})
			.then((eventos) => {
				console.log({eventos});
				res.json({eventos});
			})
			.catch((error) => {
				console.log("Something went wrong (getOngoing)", error);
				res.status(404).json({error});
			});
	},

	getUpcoming: async (req, res) => {
		await Evento.find({estado:"Upcoming"})
			.then((eventos) => {
				console.log({eventos});
				res.json({eventos});
			})
			.catch((error) => {
				console.log("Something went wrong (getUpcoming)", error)
				res.status(404).json({error})
			});
	},

	setFreePasses: async (req, res) => {
		await Evento.findById(req.body.eventoId)
			.then(evento => {
				//console.log(req.body);
				req.body.freePasses.map(fp => {
					evento.freePasses.push(fp);
				});
				evento.save()
					.then(freePasses => {
						//console.log("ok?");
						res.json({freePasses});
					})
					.catch(err => {
						//console.log("not ok?", err);
						res.status(400).json({err});
					});
			})
			.catch(err => res.status(400).json({err}));
	},
	
	edit: async (req, res) => {
		await Evento.findByIdAndUpdate(req.body.id, {...req.body})
			.then(evento => res.json({evento}))
			.catch(err => res.status(400).json({err}));
	}
}
