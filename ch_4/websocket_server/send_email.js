// node send_email.js with node smtp_server.js

const nodemailer =require('nodemailer');

// setup the transport object
// configure the transporter object 
// to connect to the SMTP server

const transporter = nodemailer.createTransport({
    host:'localhost',
    port:4321
})

transporter.sendMail(

    // object
{
    from:'beth@example.com',
    to: 'laddie@example.com',
    subject:'Hello',
    text:'Hello World!'
},
// callback executed after mail is sent 
    (err,info)=>{
        if(err){
            console.log(err);
        }
        console.log('Message Sent: ', info)
    }
)