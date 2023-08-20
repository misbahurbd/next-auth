'use client'

import { FaFacebookF } from 'react-icons/fa'
import { BsGoogle } from 'react-icons/bs'
import SocialAuthButton from './social-auth-button'

const socialAction = (provider: string) => {
  try {
    console.log(provider)
  } catch (error) {
    console.log(error)
  }
}

const SocialAuth = () => {
  return (
    <>
      <SocialAuthButton
        label="Facebook"
        icon={FaFacebookF}
        onClick={() => socialAction('facebook')}
        bgColor="fb"
      />
      <SocialAuthButton
        label="Google"
        icon={BsGoogle}
        onClick={() => socialAction('google')}
        bgColor="google"
      />
    </>
  )
}

export default SocialAuth
