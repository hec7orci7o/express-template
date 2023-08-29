import * as chai from 'chai'
import request from 'supertest'
import app from '@/app'

const client = {
  email: 'johndoe@example.com',
  username: 'Jonh Doe',
  password: 'qwerty123'
}

describe('GET /v1/health/ping', () => {
  it('The server makes pong', async () => {
    const response = await request(app)
      .get('/v1/health/ping')
      .expect('Content-Type', /json/)
      .expect(200)

    chai.expect(response).to.be.an('object')
    chai.expect(response).to.have.property('status')
    chai.expect(response.body.status).to.be.an('object')
    chai.expect(response.body.status).to.have.property('timestamp')
    chai.expect(response.body.status).to.have.property('error_code')
    chai.expect(response.body.status).to.have.property('error_message')
    chai.expect(response.body.status).to.have.property('elapsed')
    chai.expect(response.body.status.error_message).to.be.equal('pong')
  })
})

describe('GET /v1/health/secure-ping', () => {
  it('The server makes pong', async () => {
    await request(app).post('/v1/auth/sign-up').send(client).expect(201)
    const token = await request(app)
      .post('/v1/auth/sign-in')
      .send(client)
      .expect(200)
      .then((res) => {
        const { token } = res.body.data
        return token
      })

    await request(app)
      .get('/v1/health/secure-ping')
      .set('x-api-key', token)
      .expect(200)
  })

  it('User does not have permission', async () => {
    await request(app).get('/v1/health/secure-ping').expect(401)
  })
})
