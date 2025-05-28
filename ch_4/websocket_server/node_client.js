// node node_client.js node websocket_server.js

// why are we creating a new websocket 
// is this so that we dont need index.html? 

// websocket recipe
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3000')

// setup listener on the socket

ws.on('open', ()=>{
    console.log('Connected')
});

ws.on('close', ()=>{
    console.log('Disconnected')
});

ws.on('message', (message)=>{
    console.log('Recieved:', message.toString() );
})

// send hello message to the websocket server 
// every 3 seconds 

setInterval(() =>{
        ws.send('Hello');
    }, 3000
);
