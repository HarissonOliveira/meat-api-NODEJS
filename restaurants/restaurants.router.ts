import { Router } from '../common/router';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Restaurant } from './restaurants.model';
import { response } from 'spdy';

class RestaurantsRouter extends ModelRouter<Restaurant> {
    constructor() {
        super(Restaurant)
    }

    envelope(document) {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }

    findMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id, "+menu").then(rest => {
            if (!rest) {
                throw new NotFoundError('Restaurant not found');
            } else {
                resp.json(rest.menu);
                return next();
            }
        }).catch(next)
    }

    replaceMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest => {
            if (!rest) {
                throw new NotFoundError('Restaurant not found');
            } else {
                rest.menu = req.body // Array de MenuItem
                return rest.save();
            }
        }).then(rest => {
            resp.json(rest.menu);
            return next();
        }).catch(next)
    }


    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateID, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateID, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateID, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateID, this.delete]);
        application.get(`${this.basePath}/:id/menu`, [this.validateID, this.findMenu]);
        application.put(`${this.basePath}/:id/menu`, [this.validateID, this.replaceMenu]);
    }

}

export const restaurantsRouter = new RestaurantsRouter();