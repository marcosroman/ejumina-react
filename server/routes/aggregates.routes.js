const Controller = require('../controllers/aggregates.controller');

module.exports = function (app) {
	app.get('/api/evento/remainingfreepasses/:eventoId', Controller.getRemainingFreePassesPerEvento);
}
