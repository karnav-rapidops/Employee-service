module.exports = function makeSendEmail({
    nodemailer,
}){
  return async function sendEmail({ name, toEmail, verificationToken })
  {

    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false, 
      auth: {
        user: 'karnavgamit@gmail.com', 
        pass: 'chcvpetsrwfpqszp', // app password of mail
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'karnavgamit@gmail.com', 
      to: toEmail, 
      subject: "Verify Your Email", // Subject line
      text: `Hello ${name}!\nPlease click the following link to verify your account: http://localhost:3001/employee/verify/${verificationToken}`, 
    });
  }  
}    
