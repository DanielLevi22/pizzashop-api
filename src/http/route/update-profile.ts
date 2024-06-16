import Elysia, { t } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'
import { restaurants } from '../../db/schema'
import { eq } from 'drizzle-orm'

const updateProfileSchema = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
})

export const updateProfile = new Elysia().use(auth).put(
  '/profile',
  async ({ getCurrentUser, set, body }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      set.status = 400
      return { error: 'Restaurant not found.' }
    }
    const { name, description } = body

    await db
      .update(restaurants)
      .set({
        name,
        description,
      })
      .where(eq(restaurants.id, restaurantId))

    set.status = 204
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  },
)
