import { Elysia, t, type Static } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import cookie from '@elysiajs/cookie'
import { UnauthorizedError } from './errors/anauthorized-error'
import { NotAManagerError } from './errors/not-a-manager-error'

const jwtPayload = t.Object({
  id: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ code, error, set }) => {
    console.error(`Error Code: ${code}, Message: ${error.message}`)
    console.error(`Stack Trace: ${error.stack}`)

    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
      case 'NOT_A_MANAGER':
        set.status = 403
        return { code, message: error.message }
      default:
        set.status = 500
        return {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An internal server error occurred.',
        }
    }
  })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive({ as: 'scoped' }, ({ jwt, cookie: { auth }, set }) => ({
    signUser: async (payload: Static<typeof jwtPayload>) => {
      const token = await jwt.sign(payload)
      auth.remove()
      auth.value = token
      auth.httpOnly = true
      auth.maxAge = 60 * 60 * 24 * 7 // 7 days
      auth.path = '/'
      auth.secure = env.NODE_ENV === 'production'
      auth.sameSite = 'none'
    },

    signOutAuth: async () => {
      auth.remove()
    },

    getCurrentUser: async () => {
      try {
        const payload = await jwt.verify(auth.value)
        console.log(payload)
        if (!payload) {
          throw new UnauthorizedError()
        }

        return {
          userId: payload.id,
          restaurantId: payload.restaurantId,
        }
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          set.status = 401
          throw error
        }

        set.status = 500
        throw new Error('Internal Server Error')
      }
    },
  }))
