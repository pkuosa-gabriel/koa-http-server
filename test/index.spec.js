const chai = require('chai');
const chaiHttp = require('chai-http');
const debug = require('debug')('test:index');
const {server} = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Basic routes', () => {
  after(() => {
    server.close();
    debug('Server has been closed.');
  });

  it('should get HOME', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).equal('Hello World');
        done();
      });
  });

  it('should get ABOUT', (done) => {
    chai.request(server)
      .get('/about')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).equal('This is a simple http-server powered by koa.js');
        done();
      });
  });

  it('should redirect /github to GITHUB', (done) => {
    chai.request(server)
      .get('/github').redirects(0)
      .end((err, res) => {
        expect(res).to.have.status(302);
        expect(res).to.redirectTo('https://github.com/pkuosa-gabriel/koa-http-server');
        done();
      });
  });

  it('should handle NOT FOUND', (done) => {
    chai.request(server)
      .get('/random-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).equal('Maybe you have entered a wrong path');
        done();
      });
  });
});
