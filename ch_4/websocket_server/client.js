// run node client.js and node websocket_server.js

const fs= require('node:fs');
const http=require('node:http');

// this is hosting the index page 
const index=fs.readFileSync('public/index.html');
const server=http.createServer( (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.end(index);
} );

server.listen(8080); // this creates server on 8080? 

