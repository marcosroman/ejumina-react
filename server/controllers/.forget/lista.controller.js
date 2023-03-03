const Lista = require('../models/lista.model');

//Create
module.exports.create = (req, res) => {
    Lista.create(req.body)
        .then((lista) => {
					console.log("Lista creada", lista);
					res.json(evento);
				})
        .catch((error) => {console.log("Error creando lista", error); res.status(400).json(error)});
}

//Get All
module.exports.getAll = (req, res) => {
    Lista.find({})
        .then((evento) => res.json(evento))
        .catch((error) => console.log("Something went wrong (getAll)", error));
}

/*
//Get one serie
module.exports.getOneEvento = (req, res) => {
    Eventos.findById(req.params.id)
        .then(serie => res.json(serie))
        .catch((error) => console.log("Something went wrong (getOne)", error));
}

//Update serie
module.exports.updateEvento = (req, res) => {
    Eventos.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then(updatedEvento => res.json(updatedEvento))
        .catch((error) => {console.log("Something went wrong (update)", error); res.status(400).json(error)});
}

//Delete serie
module.exports.deleteEvento = (req, res) => {
    Eventos.findByIdAndDelete(req.params.id)
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((error) => console.log("Something went wrong (delete)", error));
}
*/

