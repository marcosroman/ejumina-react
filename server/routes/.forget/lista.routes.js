const Controller = require('../controllers/lista.controller');
// Para que no se pueda acceder a las rutas si no esta autenticado
//const { authenticate } = require('../config/jwt.config')

module.exports = function (app) {
    //app.get('/api/evento/all', authenticate, EventoController.getAllEventos);
    app.get('/api/lista/all', Controller.getAll);
    //app.post('/api/createserie', authenticate, SeriesController.createSerie);
    app.post('/api/lista/new', Controller.create);

	/*
    app.post('/api/createserie', authenticate, SeriesController.createSerie);
    app.get('/api/serie/:id', authenticate, SeriesController.getOneSerie);
    app.put('/api/editserie/:id', authenticate, SeriesController.updateSerie);
    app.delete('/api/deleteserie/:id', authenticate, SeriesController.deleteSerie);
		*/
}
