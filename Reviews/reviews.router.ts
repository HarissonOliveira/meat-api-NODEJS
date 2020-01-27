import * as mongoose from 'mongoose';
import { Router } from '../common/router';
import { ModelRouter } from '../common/model-router';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Review } from './reviews.model';
import { response } from 'spdy';

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
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateID, this.findById]);
        application.post('/reviews', this.save);
    }

}

export const reviewsRouter = new ReviewsRouter();