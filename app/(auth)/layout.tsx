import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-amber-700 via-orange-300 to-rose-800">
      {children}
    </main>
  )
}

export default AuthLayout
