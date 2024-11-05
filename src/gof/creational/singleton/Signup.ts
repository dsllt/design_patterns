import User from './User'
import UserRepository, { UserRepositoryMemory } from './UserRepository'

export default class Signup {
  userRepository: UserRepository

  constructor() {
    this.userRepository = UserRepositoryMemory.getInstance()
  }

  async execute(input: SignupInput): Promise<void> {
    const user = User.create(input.name, input.email, input.password)
    await this.userRepository.saveUser(user)
  }
}

type SignupInput = {
  name: string
  email: string
  password: string
}
