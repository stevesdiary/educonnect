const { error } = require('console');
const nodemailer = require('nodemailer');
const USER = process.env.USER;

async function sendVerificationEmail(email, verificationCode) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SERVER,
      port: 587,
      // secure: false,
      auth: {
        user: USER,
        pass: process.env.API_KEY,
      },
    });

    const domain = process.env.DOMAIN
    const mailOptions = {
      from: process.env.SENDER,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode} 
      Please click on the link below to verify your email: ' ${domain}?email=${email}&code=${verificationCode} '
      Note that this code will expire in 10 minutes`,
      };
      
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { status: 200, message: `Verification email sent successfully, check your email for the verification code and link`, data: info.messageId };
    if(!info) {
      console.log("ERROR", info);
      return { status: 400, message: "Unable to send email", error: info };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
module.exports = sendVerificationEmail;

