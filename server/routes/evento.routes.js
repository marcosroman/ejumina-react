const Controller = require('../controllers/evento.controller');

module.exports = function (app) {
	app.get('/api/evento/all', Controller.getAll);
	app.post('/api/evento/new', Controller.create);
	app.get('/api/evento/id/:id', Controller.getById);
	app.get('/api/evento/ongoing', Controller.getOngoing);
	app.get('/api/evento/upcoming', Controller.getUpcoming);
	app.post('/api/evento/setfreepasses', Controller.setFreePasses);
	app.post('/api/evento/edit', Controller.edit);
}
