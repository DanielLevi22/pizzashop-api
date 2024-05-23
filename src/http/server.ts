import { Elysia } from 'elysia'
import { registerRestaurant } from './route/register-restaurant'
import { sendAuthLink } from './route/send-auth-link'
import jwt from '@elysiajs/jwt'

const app = new Elysia()
  .use(
    jwt({
      secret: 'my-secret',
    }),
  )
  .use(registerRestaurant)
  .use(sendAuthLink)
app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
