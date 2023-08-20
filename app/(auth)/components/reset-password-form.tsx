'use client'

const ResetPasswordFormPage = ({ token }: { token?: string }) => {
  if (token) {
    return <p>Password field</p>
  } else {
    return <p>Email field</p>
  }
}

export default ResetPasswordFormPage
