var nodemailer = require("nodemailer");

const sendEmail = async (data) => {
   var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "xsudiptaster@gmail.com",
         pass: "aisxkjkrzociyjsw",
      },
   });
   var mailOptions = {
      from: data.email,
      to: "xsudiptaster@gmail.com",
      subject: "NCONSOLE ERROR",
      text: "From :" + data.email + " ISSUE: " + data.body,
   };
   let response = await transporter.sendMail(mailOptions);
   return response;
};

module.exports = sendEmail;
