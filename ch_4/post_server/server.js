// this is looking at data submitted through html?

// import node js core modules
const http=require('node:http');
const fs = require('node:fs')
const path = require('node:path')

const form= fs.readFileSync(path.join(__dirname,'public', 'form.html') );

// create get function to return the form

http.createServer( (req,res)=>{


    if(req.method==='GET'){
        get(res);
        return;
    }

    if (req.method === 'POST') {
      post(req, res);
      return;
    }

    error(405,res);
}).listen(3000, ()=>console.log('Server running on http://localhost:3000/')  );

// 
function get(res){

    // sends a 200 ok response with the html form content
    res.writeHead(200, {
        'Content-Type':'text/html'
    });

    res.end(form); // end the connection
}

// checks the content type is the default for the html form submissoins?
// collects the submitted data
// sends simple 200 ok response 
function post(req,res){
    if( req.headers['content-type'] !=='application/x-www-form-urlencoded' ){
        error(415, res);
        return;
    }

    let input='';
    req.on('data',(chunk)=>{
        input+=chunk.toString();
    });

    req.on('end',()=>{
        console.log(input);
        res.end(http.STATUS_CODES[200]) // end the connection
    })
}

function error(code,res){
    res.statusCode=code;
    res.end(http.STATUS_CODES[code]  ); // end the connection
}