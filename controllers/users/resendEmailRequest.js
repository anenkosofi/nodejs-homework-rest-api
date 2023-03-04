const nanoid = require('nanoid');
const { BadRequest } = require('http-errors');

const { User } = require('../../models');

const resendEmailRequest = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (user.verificationToken) {
    throw new BadRequest('Verification has already been passed');
  }
  const verificationToken = nanoid();
  await User.findByIdAndUpdate(user._id, {
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'E-mail verification',
    html: `<a href="http://localhost:8080/api/users/verify/${verificationToken}" target="_blank">Click to verify your e-mail address</a>`,
  };
  await sendEmail(mail);
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = resendEmailRequest;
