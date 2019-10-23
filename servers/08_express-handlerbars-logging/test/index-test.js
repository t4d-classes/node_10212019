const request = require('supertest');
const cheerio = require('cheerio');
const proxyquire =  require('proxyquire');
const { expect } = require('chai');

describe('app', () => {

  it('GET / responds with home', () => {

    const createAppServer = proxyquire('../app', {
      './colors': class ColorsMock {
        allColors() {
          return [ 'orange' ];
        }
      }
    });

    return request(createAppServer())
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .then(res => {
        const $ = cheerio.load(res.text);
        expect($('li').toArray().length).to.equal(1);
      });
  });

  it('POST /append-color responds with redirect', () => {

    const createAppServer = proxyquire('../app', {
      './colors': class ColorsMock {
        appendColor(color) {
          expect(color).to.be.string('yellow');
        }
      }
    });

    return request(createAppServer())
      .post('/append-color')
      .send('color=yellow')
      .expect('Location', '/')
      .expect(302);
  });
});