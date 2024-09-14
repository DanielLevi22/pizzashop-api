import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import nodemailer from 'nodemailer'
import { authLinks } from '../../db/schema'
import { createId } from '@paralleldrive/cuid2'
import { env } from '../../env'
import { mail } from '../../lib/mail'
import { Resend } from 'resend'
import { EmailTemplate } from '../../resend/email-template.tsx'
export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new Error('User not found')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    const resend = new Resend(env.RESEND_API_KEY)

    console.log(authLink.toString())
    const authLinkString = authLink.toString()
    const { data, error } = await resend.emails.send({
      from: 'Pizza Shop <piza@danieldev.tech>', // Formato correto com nome e e-mail
      to: [email],
      subject: 'Authenticate to Pizza Shop',
      react: EmailTemplate({ authLinkString }), // Supondo que você tem o nome do usuário
    })

    console.log('Resend - data', data, error)
    const info = await mail.sendMail({
      from: {
        name: 'Pizza Shop',
        address: 'piza@pizzashop.com',
      },
      to: email,
      subject: 'Authenticate to pizza shop',
      text: `Click the link to authenticate on Pizza Shop: ${authLink.toString()}`,
    })
    console.log(nodemailer.getTestMessageUrl(info))
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
