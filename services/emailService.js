const nodemailer = require('nodemailer');
const SMTP_USER = process.env.SMTP_USER;

async function sendVerificationEmail(verificationPayload) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 587,
      auth: {
        user: SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_USER,
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

