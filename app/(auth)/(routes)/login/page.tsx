import { Metadata } from 'next'
import AuthPage from '../../components/auth-page'

export const metadata: Metadata = {
  title: 'Login - Next Auth',
  description: 'Get start by filling registration form.',
}

const LoginPage = () => {
  return <AuthPage page="LOGIN" />
}

export default LoginPage
