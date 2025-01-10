const { error } = require('console');
const nodemailer = require('nodemailer');
const USER = process.env.USER;

async function sendVerificationEmail(verificationPayload) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SERVER,
      port: 587,
      // secure: false,
      auth: {
        user: '80de56001@smtp-brevo.com',
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: '80de56001@smtp-brevo.com',
      to: verificationPayload.email,
      subject: verificationPayload.subject,
      text: verificationPayload.text
      };
      
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    if(!info) {
      console.log("ERROR", info);
      return { status: 400, message: "Unable to send email", error: info };
    }
    return { status: 200, message: `Verification email sent successfully, check your email for the verification code and link`, data: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
module.exports = sendVerificationEmail;

