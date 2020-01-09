
// test/app.integration.spec.js
const request = require('supertest');
const app = require('../app');

describe('Test routes', () => {
  it('GET / sends "Hello World" as json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Hello World!'};
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
