import { getSession } from '@/helpers/get-session'
import prismadb from '@/lib/prismadb'

export const getCurrentUser = async () => {
  const session = await getSession()
  if (!session || !session?.user) {
    return null
  }
  const user = await prismadb.user.findFirst({
    where: {
      email: session.user.email,
    },
  })
  return user
}
