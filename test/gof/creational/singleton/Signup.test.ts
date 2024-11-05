import Login from '../../../../src/gof/creational/singleton/Login'
import Signup from '../../../../src/gof/creational/singleton/Signup'

test('deve criar uma conta de usuário', async () => {
  const signup = new Signup()
  const login = new Login()

  const inputSignup = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: '123',
  }

  await signup.execute(inputSignup)

  const inputLogin = {
    email: 'john.doe@email.com',
    password: '123',
  }

  const loginOutput = await login.execute(inputLogin)

  expect(loginOutput.success).toBe(true)
})
