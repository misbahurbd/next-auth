'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Match Center',
    href: '/match-center',
  },
]

interface HeaderProps {
  session: any
}

export const Header: React.FC<HeaderProps> = ({ session }) => {
  const pathname = usePathname()

  return (
    <header className="px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 flex items-center h-14 space-x-3">
      <Link href="/">
        <h2 className="text-lg lg:text-xl font-bold">NextAuth</h2>
      </Link>
      <ul className="flex flex-1 gap-5">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              className={cn(
                'text-muted-foreground hover:text-foreground transition',
                pathname === route.href && 'text-foreground'
              )}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
      {session?.user ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <div className="flex gap-2 items-center">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
