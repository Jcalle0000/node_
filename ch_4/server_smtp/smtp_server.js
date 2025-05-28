const { SMTPServer } = require('smtp-server');

const SMTTPServer=require('smtp-server').SMTPServer;

// port of the SMTP server
const PORT=4321;

// SMTP server object
const server = new SMTPServer({ 
    disabledCommands: ['STARTTLS', 'AUTH'], // disables transport layer security 
    logger: true 
});

server.on('error',(err)=>{
    console.error(err);
})

server.listen(PORT)