import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';
import { response } from 'spdy';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
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

export const usersRouter = new UsersRouter();



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