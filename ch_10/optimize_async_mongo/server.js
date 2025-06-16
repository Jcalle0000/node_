
const {MongoClient} = require('mongodb');
const express= require('express');
const URL = 'mongodb://localhost:27017/';
const app= express(); // what does this generate? 

async function handleRootRequest(req,res){
    try{
        const data = await values.find({}).toArray();
        const average = data.reduce(
            (accumulator,value)=>accumulator+value.value,0
        )/data.length;
        res.send(`Average of all values is ${average}`)
    }catch(err){
        res.send(err)
    }
}

async function main (){
    try{
        const client = new MongoClient(URL);
        await client.connect();
        const db = client.db('data');
        const values = db.collection('values');

        // Express.js route handler cannot name an arrow function
        // app.get('/', async(req,res)=>{

        // })

        app.get('/', handleRootRequest);
        app.listen(3000,()=>{
            console.log(`Server is running on port 3000`)
        })

    }

    catch(error){

    }
};

main();