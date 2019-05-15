//Require the dev-dependencies
let chai     = require('chai')
let chaiHttp = require('chai-http')
let should   = chai.should()

chai.use(chaiHttp)

module.exports = function (server) {

  const TEST_API = '/api/check'

  describe('API-routes', () => {
  
    describe(`{GET, POST} ${TEST_API}`, () => {
      it('it should GET 200, body - object, inside property - "message"', (done) => {
        chai.request(server)
          .get(TEST_API)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('That is API, Hello from Bully')
            done()
          })
      })

      it('it should POST 200, body - object, inside property - "message"', (done) => {
        chai.request(server)
          .post(TEST_API)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('That is API, Hello from Bully')
            done()
          })
      })
    })
  })

}

