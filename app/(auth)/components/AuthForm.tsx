import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthInput from './auth-input'
import { Button } from '@/components/ui/button'

import { FiUser } from 'react-icons/fi'
import { MdAlternateEmail } from 'react-icons/md'
import { TbFingerprint, TbFingerprintOff } from 'react-icons/tb'
import { useState } from 'react'
import Link from 'next/link'

interface AuthFormProps {
  formSchema: z.Schema
  initialData: {
    username?: string
    name?: string
    email?: string
    password: string
    confirmPassword?: string
  }
  page: 'LOGIN' | 'REGISTER'
  onSubmit: (value: any) => void
  disabled: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({
  formSchema,
  initialData,
  onSubmit,
  disabled,
  page,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setConfirmShowPass] = useState(false)

  const validatePassword = () => {
    const password = form.watch('password')
    const confirmPassword = form.watch('confirmPassword')
    if (password && password !== confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match',
      })
    } else {
      form.clearErrors('confirmPassword')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        {page === 'REGISTER' && (
          <>
            <AuthInput
              control={form.control}
              placeholder="Name"
              name="name"
              icon={FiUser}
              disabled={disabled}
            />

            <AuthInput
              control={form.control}
              placeholder="Email"
              name="email"
              type="email"
              icon={MdAlternateEmail}
              disabled={disabled}
            />
          </>
        )}
        {page === 'LOGIN' && (
          <AuthInput
            control={form.control}
            placeholder="Email or Username"
            name="username"
            icon={FiUser}
            disabled={disabled}
          />
        )}
        <AuthInput
          control={form.control}
          placeholder="Password"
          name="password"
          type={showPass ? 'text' : 'password'}
          icon={showPass ? TbFingerprintOff : TbFingerprint}
          iconClick={() => setShowPass((current) => !current)}
          disabled={disabled}
        />
        {page === 'LOGIN' && (
          <div className="flex justify-end">
            <Link
              href="/reset-password"
              className="text-muted-foreground text-xs underline"
            >
              forget password?
            </Link>
          </div>
        )}
        {page === 'REGISTER' && (
          <AuthInput
            control={form.control}
            placeholder="Confirm Password"
            name="confirmPassword"
            type={showConfirmPass ? 'text' : 'password'}
            onBlur={() => validatePassword()}
            icon={showConfirmPass ? TbFingerprintOff : TbFingerprint}
            iconClick={() => setConfirmShowPass((current) => !current)}
            disabled={disabled}
          />
        )}
        <Button
          disabled={disabled}
          className="mt-6 w-full"
          type="submit"
        >
          {page === 'REGISTER' ? 'Register' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
