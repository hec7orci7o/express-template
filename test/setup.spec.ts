import { UserModel } from '@/api_server/models/user'

afterEach((done) => {
  UserModel.deleteMany({}).catch((err) => console.log(err))
  done()
})
