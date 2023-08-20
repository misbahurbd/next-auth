'use client'

import * as z from 'zod'
import AuthForm from './AuthForm'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim(),
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value)
  }

  return (
    <AuthForm
      page="REGISTER"
      formSchema={formSchema}
      initialData={initialData}
      onSubmit={onSubmit}
      disabled={isLoading}
    />
  )
}

export default RegistrationForm
