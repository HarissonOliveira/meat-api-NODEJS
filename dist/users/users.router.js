"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => {
                    if (user) {
                        return [user];
                    }
                    else {
                        return [];
                    }
                })
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
            // delete document.password
        });
    }
    applyRoutes(application) {
        application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll]); // Exemplo de versionamento de rotas
        application.get({ path: '/users', version: '1.0.0' }, this.findAll); // Exemplo de versionamento de rotas
        application.get('/users/:id', [this.validateID, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateID, this.replace]);
        application.patch('/users/:id', [this.validateID, this.update]);
        application.del('/users/:id', [this.validateID, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
