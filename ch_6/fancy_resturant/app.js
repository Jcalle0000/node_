import recipesPlugin from './routes/recipes.js'
import ordersPlugin from './routes/orders.js'

const serverOptions={
    logger:true
}

// first plugin interface - what is a plugin interface?
// plugin is an async function that accepts two arguments
// the first is fastify server instance
// second parameter is an options object
async function appPlugin(app, opts){

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

}

// app.register(recipesPlugin);


export default appPlugin;
export {serverOptions as options};