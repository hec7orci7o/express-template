import { UserModel } from '@/api_server/models/user'

afterEach(async () => {
  try {
    await UserModel.deleteMany({})
  } catch (err) {
    console.error(err)
  }
})
