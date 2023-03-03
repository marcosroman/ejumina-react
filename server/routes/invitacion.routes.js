const Controller = require('../controllers/invitacion.controller');

module.exports = function (app) {
    app.get('/api/invitacion/all', Controller.getAll);
    app.post('/api/invitacion/new', Controller.create);
    app.get('/api/invitacion/evento/:eventoId', Controller.getInvitacionPerEvento);
		app.put('/api/invitacion/use/:id', Controller.useInvitacion);
		// ??mis invitaciones (si soy usuario, cuales invitaciones extendi para un dado evento)
}
