import { Header } from '@/components/header'
import { getSession } from '@/helpers/get-session'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()

  return (
    <main className="min-h-screen">
      <Header session={session} />
      {children}
    </main>
  )
}

export default RootLayout
