const Invitacion = require('../models/invitacion.model');
const Evento = require('../models/evento.model');
const { ObjectId } = require('mongoose').Types;


module.exports = {
	getRemainingFreePassesPerEvento: async (req, res) => {
		// primero tomo todas las invitaciones para un dado evento
		// luego filtro las que son free y sumo, agrupando por rrpp
		// (de ahi tengo una collecion con 2 columnas: rrpp y suma de entradas free entregadas)
		// 
		// por otro lado tomo la info del evento, que puedo poblar, para que aparezca ahi la lista de rrpp y lista asignadas
		// una resta simple y tengo lo que quiero
		// si hay un numero negativo ahi, feroz error es
		

		// el primer paso es concentrarme solo en las invitaciones extendidas:
		//const $eventoId = () => req.params.eventoId;
		console.log(req.params.eventoId);
		const eventoId = req.params.eventoId;
		Invitacion
			.aggregate([
				{
					$match: {evento: ObjectId(eventoId), isFreePass: true},
				},

				{$group: { _id: "$rrpp", count: {$count: {} }}},

					/*
					$group: { _id: "$rrpp",
										//freePassesUsed: { $count: {} }
									}
									*/
				//}

					//$match: {evento: ObjectId("63ff8cee078ba7885359dd34")} //{$where: "63ff8cee078ba7885359dd34"}
					//$match: {evento: {$where: ObjectId(req.params.eventoId)}}
				//isFreePass: true}
				//}
			])
			.then(freePasses => res.json({freePasses}))
			.catch(err => res.json({err}));
	}
}



		/*
				{ $group: { _id: "$rrpp",
										freePassesUsed: {
											$count: {}
										}
									},
				}])*/

	/*
	getRemainingFreePassesForUserPerEvento : async (req, res) => {
		Evento


	}
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
			.catch((error) => console.log("Something went wrong (getAll)", error));
	},

	findByCI: async (req, res) => {
		Invitado.findOne({CI: req.params.ci})
			.then((invitado) => res.json({invitado}))
			.catch((error) => console.log("error looking for CI!", error));
	}
	*/
