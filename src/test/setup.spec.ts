import { UserModel } from '@/api_server/models/user'

afterEach((done) => {
  UserModel.deleteMany({})
    .then(() => done())
    .catch((err) => {
      console.log(err)
      done()
    })
})
