import { getSession } from '@/helpers/get-session'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  if (session?.user && session?.user.email) {
    redirect('/')
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-amber-700 via-orange-300 to-rose-800">
      {children}
    </main>
  )
}

export default AuthLayout
