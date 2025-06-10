import fp from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function datasourcePlugin(app,opts){
    app.log.info('connecting to mongoDB');

    app.register(fastifyMongo,{
        url:'mongodb://localhost:27017/resturant'
    });

    app.decorate('source',{
        //  used in   app.post('/recipes',async function addToMenu
        async insertRecipe(recipe){
            const {db}= app.mongo; // decorator created by fastify/mongodb
            const _id = new app.mongo.ObjectId();
            recipe._id = _id;
            recipe.id= _id.toString();
            const collection = db.collection('menu');
            const result  = await collection.insertOne(recipe);
            return result.insertedId;
        },

        // this will be used app.post('/recipes')
        async readRecipes(filters,sort={order:1}){
            const collection= app.mongo.db.collection('menu');
            const result = await collection.find(filters).sort(sort).toArray();
            return result;
        },

        async deleteRecipe(recipeId){
            const collection = app.mongo.db.collection('menu')
        },

        // apply serlization to the /orders endpoints
        async insertOrder(order){
            const _id = new app.mongo.ObjectId(); // generate id
            order._id = _id; // use id
            order.id=_id.toString(); // why do we need this as a string? seems wasteful
            const collection  = app.mongo.db.collection('orders'); // what does this do? create a collection, if one does not exists?
            const result = await collection.insertOne(order); //  mongodb basics? 
            return result.insertedId;
        },

        // database access?
        async readOrders(filters,sort={createdAt:-1}){ // read by oldest first
            const collection= app.mongo.db.collection('orders');
            const result= await collection.find(filters).sort(sort).toArray();
            return result;
        },

        async markOrderAsDone(orderId){

        }
    })
}

export default fp(datasourcePlugin);