import { Router } from '../common/router';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { User } from './users.model';
import { response } from 'spdy';

class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User);
        this.on('beforeRender', document => {
            document.password = undefined
            // delete document.password
        });
    }

    applyRoutes(application: restify.Server) {

        /*application.get('/users', (req, resp, next) => {
            User.find().then(this.render(resp, next))
                .catch(next);
        });*/

        /*application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(this.render(resp, next))
                .catch(next);
        });*/

        /*application.post('/users', (req, resp, next) => {
            let user = new User(req.body);
            user.save().then(this.render(resp, next))
                .catch(next);
        });*/

        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateID, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateID, this.replace]);
        application.patch('/users/:id', [this.validateID, this.update]);
        application.del('/users/:id', [this.validateID, this.delete]);

    }
}

export const usersRouter = new UsersRouter();