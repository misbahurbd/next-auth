'use client'

import * as z from 'zod'
import AuthForm from './AuthForm'
import { useState } from 'react'

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username or Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

const initialData = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value)
  }
  return (
    <AuthForm
      formSchema={formSchema}
      page="LOGIN"
      initialData={initialData}
      onSubmit={onSubmit}
      disabled={isLoading}
    />
  )
}

export default LoginForm
