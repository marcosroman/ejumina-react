const Controller = require('../controllers/invitado.controller');

module.exports = function (app) {
	app.get('/api/invitado/all', Controller.getAll);
	app.post('/api/invitado/new', Controller.create);
	app.get('/api/invitado/ci/:ci', Controller.findByCI);
}
