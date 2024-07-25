const nodemailer = require("nodemailer");

const nodeMailer = async ()=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "rayentriki2003@gmail.com",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
      
      
          const message = { from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
              to: "bar@example.com, baz@example.com", // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: "<b>Hello world?</b>", // html body
          }
      
          await transporter.sendMail(message, (err: Error | null, info: any) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
          });
}
  

module.exports = {
    nodeMailer
}

