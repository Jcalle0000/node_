
// node post_server.js
// autocannon --connections 100 --method POST --headers 'content-type=application/json' --body '{"hello":"world"}' http://localhost:3000/
// post requests with payload data?

// define an endpoint on an express.js server that will handle an http post request

const express = require('express')
const app = express();
const bodyParser=require('body-parser')

app.use(bodyParser.json() )

app.use( bodyParser.urlencoded({extended:false}) )

app.post('/',(req,res)=>{
    res.send(req.body)
})

app.listen(3000, ()=>{
    console.log(`Server listening on port 3000`)
})