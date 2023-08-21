import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username or Email',
          placeholder: 'Username or Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid information')
        }

        const user = await prismadb.user.findFirst({
          where: {
            OR: [
              {
                email: credentials.username,
              },
              {
                username: credentials.username,
              },
            ],
          },
        })

        if (!user?.email || !user?.hashedPassword) {
          throw new Error('Account does not exist')
        }

        const checkPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!checkPass) {
          throw new Error('Incorrect password')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          // @ts-ignore
          emailVerified: user.emailVerified,
          // @ts-ignore
          username: user.username,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          emailVerified: token.emailVerified,
          username: token.username,
        },
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
