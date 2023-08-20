import { Metadata } from 'next'
import AuthPage from '../../components/auth-page'

export const metadata: Metadata = {
  title: 'Registration - Next Auth',
  description: 'Get start by filling registration form.',
}

const RegisterPage = () => {
  return <AuthPage page="REGISTER" />
}

export default RegisterPage
