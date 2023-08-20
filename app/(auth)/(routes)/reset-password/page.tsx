import { Metadata } from 'next'
import AuthPage from '../../components/auth-page'

export const metadata: Metadata = {
  title: 'Reset Password - Next Auth',
  description: 'Reset your password and get your account access back.',
}

const ResetPasswordPage = ({
  searchParams,
}: {
  searchParams: { token: string }
}) => {
  return (
    <AuthPage
      page="RESET"
      token={searchParams.token}
    />
  )
}

export default ResetPasswordPage
