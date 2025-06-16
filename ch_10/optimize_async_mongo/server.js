
const {MongoClient} = require('mongodb');
const express= require('express');
const URL = 'mongodb://localhost:27017/';
const app= express(); // what does this generate? 
// let values ; // decalring global so that handleRootRequest can use it 

// we want to pass values
// async function handleRootRequest(req,res){
//     try{
//         const data = await values.find({}).toArray(); // values has to be wide scope to use this
//         console.log('data ' , data )
//         const average = data.reduce(
//             (accumulator,value)=>accumulator+value.value,0
//         )/data.length;
//         console.log('Average')
//         res.send(`Average of all values is ${average}`)
//     }catch(err){
//         res.send(err)
//     }
// }

// 
function handleRootRequest2(values) {
  return async function(req, res) {
    try {
      const data = await values.find({}).toArray();
      const average = data.reduce((acc, v) => acc + v.value, 0) / data.length;
      res.send(`Average of all values is ${average}`);
    } catch (err) {
      res.status(500).send(err.message || err);
    }
  };
}

async function printAllValues() {
    const client = new MongoClient(URL);
    try {
        await client.connect();
        const db = client.db('data');
        const values = await db.collection('values').find({}).toArray();
        // values = await db.collection('values').find({}).toArray();

        console.log('All values from MongoDB:');
        values.forEach(doc => {
            console.log(doc.value);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

async function main (){
    try{
        const client = new MongoClient(URL);
        await client.connect();
        const db = client.db('data');
        const values = db.collection('values');
        // values = db.collection('values');

        // await db.collection('values').deleteMany({ value: null });
        // await db.collection('values').deleteMany({});


        // async function handleRootRequest(req,res){
        //     try{
        //         const data = await values.find({}).toArray();
        //         console.log('data ' , data )
        //         const average = data.reduce(
        //             (accumulator,value)=>accumulator+value.value,0
        //         )/data.length;
        //         console.log('Average')
        //         res.send(`Average of all values is ${average}`)
        //     }catch(err){
        //         res.send(err)
        //     }
        // }


        // printAllValues();
        // console.log(values)

        // app.get('/', handleRootRequest);
        app.get('/', handleRootRequest2(values));


        app.get('/all', async (req, res) => {
            try {
                const data = await values.find({}).toArray();
                res.json(data);  // sends back all documents as JSON
            } catch (err) {
                res.status(500).send(err.message || err);
            }
        });

        app.listen(3000,()=>{
            console.log(`Server is running on port 3000`)
        })

    }

    catch(error){
        console.log(error)
    }
};

main();