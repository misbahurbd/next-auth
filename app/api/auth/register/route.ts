import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return new NextResponse('Required information missing', { status: 400 })
    }
    const checkExistedEmail = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    })
    if (checkExistedEmail) {
      return new NextResponse('Email already used', { status: 401 })
    }

    const hashedPassword = await bcrypt.hash(password, 20)

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error, '[REGISTRATION_ERROR]')
    return new NextResponse('Internal server error', { status: 500 })
  }
}
