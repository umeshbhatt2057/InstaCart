const sendEmail = require('./sendEmail');

/**
 * Function to send a password reset email.
 * @param {string} userEmail - The user's email address.
 * @param {string} resetToken - The reset token to be included in the email.
 */
const sendResetEmail = (userEmail, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const subject = 'Reset Your Password';
  const text = `We received a request to reset your password. Please click on the link below to reset your password. 

  ${resetLink}

  Please note, this link will expire in 5 minutes. If you did not request a password reset, you can safely ignore this email.

  If you have any issues, please contact our support team. 
  Mahendranagar, Kanchanpur
  Contact no : 9862485767,9842884827,9866514468,9865896566,9865941673 
  Facebook   : https://facebook.com/umesh.bhatt.731572/`;
  
  const html = `
    <p style="font-size: 18px; font-weight: bold;">We received a request to reset your password. Please click on the link below to reset your password:</p>
    <p><a href="${resetLink}" style="font-size: 18px; color: #1a73e8; text-decoration: none;">Reset your password</a></p>
    <p style="font-size: 16px;">Please note, this link will expire in 5 minutes. If you did not request a password reset, you can safely ignore this email.</p>
    <p style="font-size: 16px;">If you have any issues, please contact our support team.</p>
    <p style="font-size: 14px;">Mahendranagar, Kanchanpur</p>
    <p style="font-size: 14px;">Contact no : 9862485767,9842884827,9866514468,9865896566,9865941673 </p>
    <p style="font-size: 14px;">Facebook: <a href="https://facebook.com/umesh.bhatt.731572/" style="color: #1a73e8; text-decoration: none;">https://facebook.com/umesh.bhatt.731572/</a></p>
  `;

  // Use the general sendEmail function to send the reset password email
  return sendEmail(userEmail, subject, text, html);
};

module.exports = sendResetEmail;
