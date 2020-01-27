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

    findByEmail = (req, resp, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
                .then(user => {
                    if (user) {
                        return [user]
                    } else {
                        return []
                    }
                })
                .then(this.renderAll(resp, next))
                .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {
        application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll]); // Exemplo de versionamento de rotas
        application.get({ path: '/users', version: '1.0.0' }, this.findAll);                     // Exemplo de versionamento de rotas

        application.get('/users/:id', [this.validateID, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateID, this.replace]);
        application.patch('/users/:id', [this.validateID, this.update]);
        application.del('/users/:id', [this.validateID, this.delete]);
    }
}

export const usersRouter = new UsersRouter();