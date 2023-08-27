import { UserModel } from '@/api_server/models/user'

beforeEach((done) => {
  UserModel.deleteMany({}).catch((err) => console.log(err))
  done()
})

afterEach((done) => {
  UserModel.deleteMany({}).catch((err) => console.log(err))
  done()
})
