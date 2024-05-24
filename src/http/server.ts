import { Elysia } from 'elysia'
import { registerRestaurant } from './route/register-restaurant'
import { sendAuthLink } from './route/send-auth-link'
import { authenticateFromLink } from './route/authenticate-from-link'
import { signOut } from './route/sign-out'
import { getProfile } from './route/get-profile'
import { getManagedRestaurante } from './route/get-menaged-restaurant'
import { getOrderDetails } from './route/get-order-details'
import { approveOrder } from './route/approve-order'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurante)
  .use(getOrderDetails)
  .use(approveOrder)
  .onError(({ code, set, error }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      default: {
        set.status = 500
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })
app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
