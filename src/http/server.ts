import { Elysia } from 'elysia'
import { registerRestaurant } from './route/register-restaurant'
import { sendAuthLink } from './route/send-auth-link'
import { authenticateFromLink } from './route/authenticate-from-link'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
