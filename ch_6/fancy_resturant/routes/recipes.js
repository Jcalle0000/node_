
// export the function at the bottom
function recipesPlugin(app,opts,next){

    // addHook? - what is this?
    // isChef will run whenever a new HTTP request comes into the server
    // this hook is to verify the property of request.headers
    // app.addHook('onRequest', async function isChef (request,reply){
    //     if(request.headers['x-api-key']!=='fastify-rocks'){
    //         reply.code(401);
    //         throw new Error('invalid api key2')
    //     }
    // } )
    // accpetable parameters: fastify.dev/docs/latest/Reference/Routes/#route-options
    
    // what is the difference between route and get?
    app.route({
        method:'GET',
        url:'/menu',
        handler:menuHandler
    });

    // app.get('/menu', {handler:menuHandler})// duplicate
    // curl http://localhost:3000/recipes   
    app.get('/recipes',{handler:menuHandler});

    //  curl -X DELETE http://localhost:3000/recipes/32232
    // app.delete('/recipes/:id',{handler:menuHandler});

    // is this to have authentication on every page?
    app.register(async function protectRoutesPlugin(plugin,opts){
        plugin.addHook('onRequest', plugin.authOnlyChef);
        
        plugin.post('/recipes', async function addToMenu(request,reply){
            throw new Error('Not Implemented plugin');
        });


        //  curl -X DELETE http://localhost:3000/recipes/32232
        // {"statusCode":401,"error":"Unauthorized","message":"Invalid API key"}%
        
        plugin.delete('/recipes/:id', function removeFromMenu(request,reply){
            reply.send(new Error('Not Implemented'));
        });

        next();
    });

//  curl -X POST http://localhost:3000/recipes
    // moved into protected routes
    // app.post('/recipes', async function addToMenu (request,reply){
    //     throw new Error('Not implemented');
    // });


    //  curl -X DELETE http://localhost:3000/recipes/32232
                                                        // request.params is a JOSN object that contains
                                                        // all the path parameters
 
    // moved into protected routes
    // app.delete('/recipes/id', function removeFromMenu (request, reply){
    //     // must use this for sync functions
    //     reply.send(new Error('Not implemented'));// responsible for transmitting the response payload to the client
    // })

    next();
}



// define a named function
async function menuHandler(request,reply){
    this.log.info('Logging GET /menu from this'); // this is equivalent to the app variable,
    //  granting acces to all the servers resource
    request.log.info('Logging GET /menu from request');
    throw new Error('Not implemented-recipes');
}

// what does it mean to export as a default?
export default recipesPlugin;