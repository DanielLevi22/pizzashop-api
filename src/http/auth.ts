import { Elysia, t, type Static } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import cookie from '@elysiajs/cookie'

const jwtPayload = t.Object({
  id: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive({ as: 'scoped' }, ({ jwt, cookie }) => ({
    signUser: async (payload: Static<typeof jwtPayload>) => {
      const token = await jwt.sign(payload)

      cookie.auth.value = token
      cookie.auth.httpOnly = true
      cookie.auth.maxAge = 60 * 60 * 24 * 7 // 7 days
      cookie.auth.path = '/'
    },

    signOut: async () => {
      cookie.auth.remove()
    },

    getCurrentUser: async () => {
      const payload = await jwt.verify(cookie.auth.value)
      if (!payload) {
        throw new Error('Unauthorized.')
      }

      return {
        userId: payload.id,
        restaurantId: payload.restaurantId,
      }
    },
  }))
