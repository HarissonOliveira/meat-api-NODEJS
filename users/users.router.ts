import { Router } from '../common/router';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { User } from './users.model';
import { response } from 'spdy';
import { authenticate } from '../security/auth.handler';
import { authorize } from '../security/authz.handler';

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
                .then(user => user ? [user] : [])
                .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, [authorize('admin'), this.findByEmail, this.findAll]); // Exemplo de versionamento de rotas
        application.get({ path: `${this.basePath}`, version: '1.0.0' }, [authorize('admin'), this.findAll]); // Exemplo de versionamento de rotas
        application.get(`${this.basePath}/:id`, [authorize('admin'), this.validateID, this.findById]);
        application.post(`${this.basePath}`, [authorize('admin'), this.save]);
        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateID, this.replace]);
        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validateID, this.update]);
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateID, this.delete]);
        application.post(`${this.basePath}/authenticate`, authenticate);
    }
}

export const usersRouter = new UsersRouter();