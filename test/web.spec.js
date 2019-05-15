
// Testing web routes

let chai     = require('chai')
let chaiHttp = require('chai-http')
let should   = chai.should()

chai.use(chaiHttp)

module.exports = function (server) {

  const API = (route) => route ? '/'  + route : '/'

  describe('WEB-routes', () => {
  
    describe(`{GET} ${API()}`, () => {
      it('it should GET 200, type - html/document, text > 200', (done) => {
        chai.request(server)
          .get(API())
          .end((err, res) => {
            res.should.have.status(200)
            res.type.should.eql('text/html')
            res.text.should.have.length.greaterThan(200)
            done()
          })
      })
    })

    describe(`{GET, POST} ${API('test')}`, () => {
      it('it should GET 200, type - json, inside - object', (done) => {
        chai.request(server)
          .get(API('test'))
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('Method').eql('GET')
            done()
          })
      })

      it('it should POST 200, type - json, inside - object', (done) => {
        chai.request(server)
          .post(API('test'))
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('Method').eql('POST')
            done()
          })
      })
    })

  
  })

}

