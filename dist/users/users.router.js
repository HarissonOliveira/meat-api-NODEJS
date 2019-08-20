"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
// Exemplos de endpoints ::
/*

this.application.get('/info', [
    (req, response, next) => {
        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
            // response.status(400);
            // response.json({ message: 'Please, update your browser' });
            let error: any = new Error();
            error.statusCode = 400;
            error.message = 'Please, update your browser';
            return next(error);
        }
        return next();
    }, (req, response, next) => {
        response.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path: req.path(),
            query: req.query
        });
        return next();
    }]);

this.application.get('/hello', (req, response, next) => {
    // response.contentType = 'application/json';
    // response.status(400);
    // response.setHeader('Content-Type', 'application/json');
    // response.send({ message: 'hello' });
    response.json({ message: 'Hello World' });
    return next();
});

*/ 
