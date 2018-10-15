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

  it('GET /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).equal('Hello World');
        done();
      });
  });
});
