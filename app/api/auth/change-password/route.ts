import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function PUT(req: Request) {
  try {
    const { token, password } = await req.json()
    if (!token) {
      return new NextResponse('Token is required', { status: 404 })
    }

    const user = await prismadb.user.findFirst({
      where: {
        verificationTokens: {
          some: {
            AND: [
              {
                token: token,
              },
              {
                expires: {
                  gt: new Date(),
                },
              },
              {
                isValid: true,
              },
              {
                type: 'reset',
              },
            ],
          },
        },
      },
    })

    if (!user) {
      return new NextResponse('Invalid reset token', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 20)

    const updatedUser = await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
        verificationTokens: {
          update: {
            where: {
              token: token,
            },
            data: {
              isValid: false,
              activatedAt: new Date(),
            },
          },
        },
      },
    })

    if (!updatedUser) {
      return new NextResponse('unable to change password', { status: 400 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log('[CHANGE_PASSWORD_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
