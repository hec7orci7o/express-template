import User from '../api_server/models/user'

beforeEach((done) => {
  User.deleteMany({}, { timeout: 20000 })
    .catch((err) => console.log(err))
  done()
})

afterEach((done) => {
  User.deleteMany({}, { timeout: 20000 })
    .catch((err) => console.log(err))
  done()
})
