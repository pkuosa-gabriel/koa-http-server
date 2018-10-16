const {readFileSync} = require('fs');
const debug = require('debug')('test:index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const {server} = require('../index');
const expect = chai.expect;

chai.use(chaiHttp).use(chaiString);

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
        expect(res).to.be.html;
        expect(res.text).to.containIgnoreSpaces('A simple http server powered by koa.js');
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

  it('should upload a text', (done) => {
    chai.request(server)
      .post('/upload/text')
      .set('content-type', 'application/json')
      .send({'textLayout': 'hello'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).equal('You\'ve sent the text: hello');
        done();
      });
  });

  it('should upload a file', (done) => {
    chai.request(server)
      .post('/upload/file')
      .attach('upload', readFileSync('./test/test.txt'), 'test.txt')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).equal('You\'ve uploaded the file: test.txt');
        done();
      });
  });

  it('should reject a big file', (done) => {
    chai.request(server)
      .post('/upload/file')
      .attach('upload', readFileSync('./test/big.jpg'), 'big.jpg')
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.text).equal('The file is too large');
        done();
      });
  });
});
