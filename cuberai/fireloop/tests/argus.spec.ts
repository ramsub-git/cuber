var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('argus unit tests:', () => {
    it('Should create a argus instance', (done: Function) => {
        api.post('/argus').send({}).expect(200, done);
    });
});
