// const nodemailer = require("nodemailer");

// const sendEmail = async(mailOptions)=>{

//     let transporter = nodemailer.createTransport({
//         host: process.env.SMTP_SERVER_HOST,
//         port: process.env.SMTP_SERVER_PORT,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: process.env.SMTP_EMAIL, // generated ethereal user
//           pass: process.env.SMTP_PASS, // generated ethereal password
//         }
//       });
    
//     console.log(this);
//     let info = await transporter.sendMail(mailOptions);
//     console.log(info.messageId);

// }

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.SMTP_SERVER_HOST,
        port: process.env.SMTP_SERVER_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS
        }
      });

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);


};

module.exports = sendEmail;