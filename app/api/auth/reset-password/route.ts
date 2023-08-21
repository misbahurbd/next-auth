import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { sendEmail } from '@/helpers/mailer'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return new NextResponse('Email address missing', { status: 400 })
    }
    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    })
    if (!user) {
      return new NextResponse('Account does not exist', { status: 404 })
    }

    const res = await sendEmail({ email, emailType: 'reset', userId: user.id })

    if (res.accepted.length === 0) {
      return new NextResponse('Email send failed', { status: 400 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
