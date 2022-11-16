const nodemailer = require("nodemailer");
const { createInvoice } = require("../middlewear/createInvoice")


exports.sendMail = async (req, res, next) => {
try {

  const email = req.body.email
  console.log(email)
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"SuperBeerBros" <beermaster@example.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Invoice", // Subject line
    text: "Hello! We have received your order and here is your invoice as an attachment . Drink responsibly :j", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
      {
        filename: 'invoice.pdf',
        path: './invoice.pdf',
      }
    ]
    
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return res.status(200).send({
    msg: "Invoice created and mail sent"
})
} catch (error) {
console.log(error.message)
return res.status(401).send({
    msg: "Mail not sent, error",
    error: error.message
})
}

}