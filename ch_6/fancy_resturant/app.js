import recipesPlugin from './routes/recipes.js'
import ordersPlugin from './routes/orders.js'
import authPlugin from './plugins/auth.js'  
import datasourcePlugin from './plugins/datasource.js'    

const serverOptions={
    logger:true,
    ajv:{
        customOptions:{
            allErrors:true
        }
    }
}

// first plugin interface - what is a plugin interface?
// plugin is an async function that accepts two arguments
// the first is fastify server instance
// second parameter is an options object
async function appPlugin(app, opts){

    // decorators - moved to auth.js
    // app.decorateRequest('isChef', function isChef(){
    //     return this.headers['x-api-key'==='fastify-rocks']
    // })

    // app.decorate('authOnlyChef', async function(request,reply){
    //     if(!request.isChef()){
    //         reply.code(401);
    //         throw new Error('Invalid API key')
    //     }
    // })

    // curl http://localhost:3000/example - automatically
    // fastify will output 404 error
    app.get('/', async function homeHandler(){ 
        return{
            api:'fastify-resturant-api',
            version:1
        };
    })

    app.register(recipesPlugin);
    app.register(ordersPlugin);
    app.register(authPlugin);
    app.register(datasourcePlugin);

}

// app.register(recipesPlugin);

// 
export default appPlugin;
export {serverOptions as options};