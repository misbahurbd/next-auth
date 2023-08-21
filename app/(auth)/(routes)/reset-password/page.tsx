import { Metadata } from 'next'
import AuthPage from '../../components/auth-page'

export function generateMetadata({
  searchParams,
}: {
  searchParams: {
    token?: string
  }
}) {
  return {
    title: searchParams.token ? 'Change your password' : 'Reset your password',
  }
}

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams?: {
    token: string
  }
}) => {
  return (
    <AuthPage
      page="RESET"
      searchParams={searchParams}
    />
  )
}

export default ResetPasswordPage
