'use client'

import * as z from 'zod'
import AuthForm from '@/app/(auth)/components/form/auth-form'
import { useState } from 'react'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

const ResetPasswordFormPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mailStatus, setMailStatus] = useState('unsent')

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      await axios.post('/api/auth/reset-password', value)
      setMailStatus('sent')
      toast({
        description: 'Email send successfully',
      })
    } catch (error: any) {
      console.log('[error]', error)
      toast({
        variant: 'destructive',
        description: error?.response.data || 'Something went wrong',
      })
      setMailStatus('unsent')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {mailStatus === 'unsent' ? (
        <AuthForm
          page="RESET"
          formSchema={formSchema}
          onSubmit={onSubmit}
          disabled={isLoading}
          initialData={{ email: '' }}
          btnLabel="Reset"
          fields={{ email: true }}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Password reset link send to your email successfully. Check out your
          email to change your password
        </p>
      )}
    </>
  )
}

export default ResetPasswordFormPage
