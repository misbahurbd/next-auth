'use client'

import * as z from 'zod'
import AuthForm from '@/app/(auth)/components/form/auth-form'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username or Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

const initialData = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const res = await signIn('credentials', { ...value, redirect: false })

      if (res?.error) {
        toast({
          variant: 'destructive',
          description: res?.error || 'Something went wrong',
        })
      }
      if (!res?.error && res?.ok) {
        toast({
          description: 'Login successful',
        })
        router.refresh()
        router.push('/')
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error?.response.data || 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <AuthForm
      formSchema={formSchema}
      page="LOGIN"
      initialData={initialData}
      onSubmit={onSubmit}
      disabled={isLoading}
      fields={{ username: true, password: true }}
      btnLabel={'Login'}
    />
  )
}

export default LoginForm
