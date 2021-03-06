import 'jest';
import * as request from 'supertest';
import { Server } from '../server/server';
import { environment } from '../common/environment';
import { usersRouter } from './users.router';
import { User } from './users.model';

const address: string = (<any>global).address;
const auth: string = (<any>global).auth;

test('get /users', () => {
    return request(address)
        .get('/users')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('post /users', () => {
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            "name": "Vision",
	        "email": "vision@marvel.com",
	        "password": "vision",
	        "gender": "Male",
	        "cpf": "854.612.670-41"
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('Vision')
            expect(response.body.email).toBe('vision@marvel.com')
            expect(response.body.cpf).toBe('854.612.670-41')
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
})

test('get /users/aaaaa - not found', () => {
    return request(address)
        .get('/users/aaaaa')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('patch /users/:id', () => {
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            "name": "usuario2",
	        "email": "usuario2@email.com",
	        "password": "usuario2",
	        "gender": "Male",
	        "cpf": "962.116.531-82"
        })
        .then(response => request(address)
            .patch(`/users/${response.body._id}`)
            .set('Authorization', auth)
            .send({
                name: 'usuario2 - patch'
            }))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('usuario2 - patch')
            expect(response.body.email).toBe('usuario2@email.com')
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})