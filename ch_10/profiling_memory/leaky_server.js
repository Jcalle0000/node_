
const http=require('node:http')
const server = http.createServer( (req,res)=>{
        server.on('connection', ()=>{});
        res.end('Hello World\n');
    }
)

server.listen(3000, () =>{
    console.log(`Server listening on port 3000`);
})