import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import SocialAuth from '@/app/(auth)/components/social-auth'

import RegistrationForm from '@/app/(auth)/components/pages/registration-page'
import LoginForm from '@/app/(auth)/components/pages/login-page'
import ResetPasswordFormPage from './pages/reset-password-page'
import ChangePasswordFormPage from './pages/change-password-page'

interface AuthPageProps {
  page: 'LOGIN' | 'REGISTER' | 'RESET'
  searchParams?: {
    token: string
  }
}

const AuthPage: React.FC<AuthPageProps> = async ({ page, searchParams }) => {
  const images = [
    'cricket-ai-bg.jpg',
    'cricket-illustration.jpeg',
    'cricket-ai-2.jpeg',
    'cricket-ai-1.jpeg',
    'cricket-ai-3.jpeg',
  ]

  if (page === 'RESET') {
    const token = searchParams?.token
    return (
      <section className="w-full sm:max-w-md py-8">
        <Card className="rounded-none sm:rounded-xl p-3">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              {token ? 'Change your password' : 'Reset your password'}
            </CardTitle>
            <CardDescription>
              {token
                ? 'Create new password to access your account'
                : 'Please enter your email address to find your account.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {token ? (
              <ChangePasswordFormPage token={searchParams.token} />
            ) : (
              <ResetPasswordFormPage />
            )}
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="w-full sm:max-w-md lg:max-w-4xl xl:max-w-5xl flex flex-col py-8">
      <Card
        className={cn(
          'rounded-none sm:rounded-md flex lg:rounded-xl items-stretch p-3 gap-3 bg-background/95 backdrop-blur-sm',
          page === 'LOGIN' || 'flex-row-reverse'
        )}
      >
        <div className="w-full lg:w-1/2 px-1 py-3 lg:px-10 lg:py-16">
          <CardHeader className="mb-2">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              {page === 'REGISTER' ? 'Create an account' : 'Login your account'}
            </CardTitle>
            <CardDescription>
              {page === 'REGISTER'
                ? "Let's get started by filling out information below"
                : 'Login with your username or email'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {page === 'REGISTER' ? <RegistrationForm /> : <LoginForm />}
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <div className="w-full relative flex items-center">
              <Separator className="flex-1" />
              <span className="px-2 bg-background/85  text-muted-foreground">
                or continue with
              </span>
              <Separator className="flex-1" />
            </div>
            <div className="flex gap-3 w-full">
              <SocialAuth />
            </div>
            <div className="text-sm text-muted-foreground flex gap-2">
              <span>
                {page === 'REGISTER'
                  ? 'Already an account?'
                  : "Don't have an account?"}
              </span>
              <span>
                <Link
                  className="underline hover:text-primary/90 transition"
                  href={page === 'REGISTER' ? '/login' : '/register'}
                >
                  {page === 'REGISTER' ? 'Login' : 'Register'}
                </Link>
              </span>
            </div>
          </CardFooter>
        </div>
        <div className="hidden lg:flex lg:w-1/2">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              fill
              src={`/img/${images[Math.floor(Math.random() * images.length)]}`}
              alt="Cricket Illustration"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </Card>
    </section>
  )
}

export default AuthPage
