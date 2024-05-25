import { Elysia } from 'elysia'
import { registerRestaurant } from './route/register-restaurant'
import { sendAuthLink } from './route/send-auth-link'
import { authenticateFromLink } from './route/authenticate-from-link'
import { signOut } from './route/sign-out'
import { getProfile } from './route/get-profile'
import { getManagedRestaurante } from './route/get-menaged-restaurant'
import { getOrderDetails } from './route/get-order-details'
import { approveOrder } from './route/approve-order'
import { deliverOrder } from './route/deliver-order'
import { dispatchOrder } from './route/dispatch-order'
import { cancelOrder } from './route/cancel-order'
import { getOrders } from './route/get-orders'
import { getMonthReceipt } from './route/get-month-receipt'
import { getDayOrdersAmount } from './route/get-days-orders-amount'
import { getMonthOrdersAmount } from './route/get-month-orders-amount'
import { getMonthCanceledOrdersAmount } from './route/get-canceled-month-orders-amount'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurante)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(cancelOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)

  .onError(({ code, set, error }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
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
