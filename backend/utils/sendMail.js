const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.APP_PASSWORD,
    user: "shubhgupta0737@gmail.com",
    pass: "qeedwrgsnuehabxs",
  },
});

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
