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
import { getPopularProducts } from './route/get-popular-products'
import { getDailyReceiptInPeriod } from './route/get-daily-receipt-in-period'
import { cors } from '@elysiajs/cors'
import { updateProfile } from './route/update-profile'
import { updateMenu } from './route/update-menu'

const app = new Elysia()
app.use(cors({
  origin: ["https://pizza-shop-web-rouge.vercel.app", "https://pizza-shop-web-git-main-daniel-levis-projects.vercel.app", "https://pizza-shop-6yc92y6it-daniel-levis-projects.vercel.app"] , 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: '*',
  exposedHeaders: ['*'],
  maxAge: 86400,
  preflight: true
}))

.onRequest(({ request, set }) => {
  if (request.method === 'OPTIONS') {
    set.status = 204
    set.headers['Access-Control-Allow-Origin'] = request.headers.get('origin') || '*'
    set.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    set.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    set.headers['Access-Control-Allow-Credentials'] = 'true'
    return new Response(null)
  }
})

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
  .use(getPopularProducts)
  .use(getDailyReceiptInPeriod)
  .use(updateProfile)
  .use(updateMenu)

  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        console.error('Validation error:', error)
        return error.toResponse()
      }
      case 'NOT_FOUND': {
        console.error('Resource not found:', error)
        return new Response(null, { status: 404 })
      }
      default: {
        console.error('Unhandled error:', error)
        return new Response(null, { status: 500 })
      }
    }
  })


  app.listen( 3333, () => {
    console.log(`🚀 Server is running on port   3333`)
    console.log('CORS configuration:', {
      origin: '*',
      credentials: true,
      preflight: true
    })
  })