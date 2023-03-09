const Controller = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config')

module.exports = function(app){
    app.get('/api/user/all' , Controller.getAll);
    app.post('/api/user/register' , Controller.register);
    app.post('/api/user/login' , Controller.login);
    app.get('/api/user/logout' , Controller.logout);
    app.get('/api/user/rrpp/active/all' ,authenticate, Controller.getAllActiveRRPPs);
		app.get('/api/user/token/:token', Controller.getTokenInfo);
		app.post('/api/user/token/new/token', Controller.newToken);
		app.get('/api/user/usetoken/:token', Controller.getTokenInfo);
}

