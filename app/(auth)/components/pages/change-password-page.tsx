'use client'

import * as z from 'zod'
import AuthForm from '@/app/(auth)/components/form/auth-form'
import { useState } from 'react'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password need to at least 8 character' })
    .regex(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm,
      {
        message:
          'Password should be 8 characters or more and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      }
    ),
  confirmPassword: z.string().min(1, { message: 'Confirm your password' }),
})

const initialData = {
  password: '',
  confirmPassword: '',
}

interface ChangePasswordFormPageProps {
  token: string
}

const ChangePasswordFormPage: React.FC<ChangePasswordFormPageProps> = ({
  token,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      await axios.put('/api/auth/change-password', { token, ...value })
      toast({
        description: 'Password changed successfully',
      })
      router.refresh()
      router.push('/login')
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.response.data || 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthForm
      btnLabel="Change password"
      fields={{ password: true, confirmPassword: true }}
      formSchema={formSchema}
      initialData={initialData}
      disabled={isLoading}
      onSubmit={onSubmit}
      page="RESET"
    />
  )
}

export default ChangePasswordFormPage
