import * as mongoose from 'mongoose';
import { Router } from '../common/router';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { Review } from './reviews.model';
import { NotFoundError } from 'restify-errors';

class ReviewsRouter extends ModelRouter<Review> {
    constructor() {
        super(Review)
    }

    /*findById = (req, resp, next) => {
        this.model.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant', 'name')
            .then(this.render(resp, next))
            .catch(next)
    };*/

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
        return query.populate('user', 'name')
                    .populate('restaurant', 'name')
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateID, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }

}

export const reviewsRouter = new ReviewsRouter();