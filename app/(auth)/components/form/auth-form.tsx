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
import { cn } from '@/lib/utils'

import { BarLoader as Spinner } from 'react-spinners'

interface AuthFormProps {
  formSchema: z.Schema
  page: 'LOGIN' | 'REGISTER' | 'RESET'
  onSubmit: (value: any) => void
  disabled: boolean
  btnLabel: string
  fields: {
    username?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    confirmPassword?: boolean
  }
  initialData: {
    username?: string
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }
}

const AuthForm: React.FC<AuthFormProps> = ({
  formSchema,
  initialData,
  onSubmit,
  disabled,
  page,
  btnLabel,
  fields,
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
        {fields.name && (
          <AuthInput
            control={form.control}
            placeholder="Name"
            name="name"
            icon={FiUser}
            disabled={disabled}
          />
        )}
        {fields.email && (
          <AuthInput
            control={form.control}
            placeholder="Email"
            name="email"
            type="email"
            icon={MdAlternateEmail}
            disabled={disabled}
          />
        )}
        {fields.username && (
          <AuthInput
            control={form.control}
            placeholder={page === 'LOGIN' ? 'Email or Username' : 'Username'}
            name="username"
            icon={FiUser}
            disabled={disabled}
          />
        )}
        {fields.password && (
          <AuthInput
            control={form.control}
            placeholder="Password"
            name="password"
            type={showPass ? 'text' : 'password'}
            icon={showPass ? TbFingerprintOff : TbFingerprint}
            iconClick={() => setShowPass((current) => !current)}
            disabled={disabled}
          />
        )}
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
        {fields.confirmPassword && (
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
          className="mt-6 w-full relative"
          type="submit"
        >
          {disabled && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Spinner
                className=""
                color="white"
              />
            </span>
          )}
          <span className={cn('transition', disabled && 'opacity-0 relative')}>
            {btnLabel}
          </span>
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
