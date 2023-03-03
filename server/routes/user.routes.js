const Controller = require('../controllers/user.controller');

module.exports = function(app){
    app.get('/api/user/all' , Controller.getAll);
    app.post('/api/user/register' , Controller.register);
    app.post('/api/user/login' , Controller.login);
    app.get('/api/user/logout' , Controller.logout);
    app.get('/api/user/rrpp/active/all' , Controller.getAllActiveRRPPs);
}

