function recipesPlugin(app,opts,next){

    // addHook? - what is this?
    // isChef will run whenever a new HTTP request comes into the server
    // this hook is to verify the property of request.headers
    app.addHook('onRequest', async function isChef (request,reply){
        if(request.headers['x-api-key']!=='fastify-rocks'){
            reply.code(401);
            throw new Error('invalid api key2')
        }
    } )
    // accpetable parameters: fastify.dev/docs/latest/Reference/Routes/#route-options
    app.route({
        method:'GET',
        url:'/menu',
        handler:menuHandler
    });

    // app.get('/menu', {handler:menuHandler})// duplicate
    app.get('/recipes',{handler:menuHandler});

    app.delete('/recipes/:id',{handler:menuHandler});


    app.post('/recipes', async function addToMenu (request,reply){
        throw new Error('Not implemented');
    });

    app.delete('/recipes/id', function removeFromMenu (request, reply){
        reply.send(new Error('Not implemented'));
    })

    next();
}



// define a named function
async function menuHandler(request,reply){
    this.log.info('Logging GET /menu from this'); // this is equivalent to the app variable,
    //  granting acces to all the servers resource
    request.log.info('Logging GET /menu from request');
    throw new Error('Not implemented-recipes');
}

export default recipesPlugin;