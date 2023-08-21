import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'
import nodemailer from 'nodemailer'

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string
  emailType: 'reset' | 'verify'
  userId: string
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 20)

    await prismadb.verificationToken.updateMany({
      where: {
        userId,
      },
      data: {
        isValid: false,
      },
    })

    await prismadb.verificationToken.create({
      data: {
        userId,
        token: hashedToken,
        type: emailType,
        expires: new Date(Date.now() + 18000000),
      },
    })

    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_PROVIDER,
      auth: {
        user: process.env.MAILER_USER_ID,
        pass: process.env.MAILER_PASS,
      },
    })

    const mailOptions = {
      from: process.env.MAILER_USER_ID,
      to: email,
      subject:
        emailType === 'verify' ? 'Verify your email' : 'Reset your password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="text-align: center; margin-bottom: 20px; padding: 0 15px">
            <h1>NextAuth</h1>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
            <p>Hello,</p>
            <p>We received a request to ${
              emailType === 'verify'
                ? 'verify your email'
                : 'reset your password'
            }. If you didn't make this request, you can ignore this email.</p>
            <p>Click the button below to ${
              emailType === 'verify'
                ? 'verify your email'
                : 'reset your password'
            }:</p>
            <a href="${
              emailType === 'verify'
                ? `${process.env.NEXTAUTH_URL}/verify-email?token=${hashedToken}`
                : `${process.env.NEXTAUTH_URL}/reset-password?token=${hashedToken}`
            }" style="display: inline-block; padding: 10px 20px; background-color: #222222; color: #ffffff; border-radius: 5px; text-decoration: none; margin-top: 20px;">${
        emailType === 'verify' ? 'Verify Email' : 'Reset Password'
      }</a>
          </div>
          <div style="margin-top: 20px; text-align: center; color: #888888;">
            <p>If you have any questions, please contact us at support@yourapp.com</p>
          </div>
        </div>
      `,
    }

    const mailResponse = await transporter.sendMail(mailOptions)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
