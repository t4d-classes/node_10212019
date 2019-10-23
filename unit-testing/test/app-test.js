const request = require('supertest');
const { app } = require('../app');

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200, done);
  });
});