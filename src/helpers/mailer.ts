import User from '@/models/usermodel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // TODO: configure mail for usage

        if (emailType === "VERIFY") {

            const updatedUser = await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000 // expiry 1 hour from now
                    }
                }
            )

        } else if (emailType === "RESET") {

            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000 // expiry 1 hour from now
                    }
                })

        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9bcfac67635a18",
                pass: "a52ef65e231725"
            }
        });


        const mailOptions = {
            from: 'm.hussain7006@gmail.com',
            to: email,
            subject: emailType === "VERYFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
                        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                        or copy and paste the link below in your browser.
                        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`,
        }


        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}