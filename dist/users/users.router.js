"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
            // delete document.password
        });
    }
    applyRoutes(application) {
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
exports.usersRouter = new UsersRouter();
