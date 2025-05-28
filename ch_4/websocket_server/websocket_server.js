// npm init --yet
// npm install ws
// client.js host index.html, and this acts as the reciever? 
// the browser is sending data to the web socket 
const WebSocket = require('ws');
const WebSocketServer = new WebSocket.Server({ port: 3000 }); // allows persistent communincation channels
// over a single TCP connection b/w client (browser )

// listen for connections and messages in the websocketServer instance

WebSocketServer.on('connection', (socket)=>{
    socket.on('message', (msg)=>{
        console.log('Recieved:', msg.toString() );

        if(msg.toString()==='Hello'){
            socket.send('World!');
        }
    })
});