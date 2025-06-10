
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

    const jsonSchemaBody = {
        type:'object', // could this be other types?
        required : ['name', 'country', 'order', 'price' ],
        properties:{
            name:{type:'string', minLength:3, maxLength:50},
            country:{type:'string', enum: ['ITA','IND']},
            description:{type:'string'},
            order:{type:'number', minimum:0, maximum:100},
            price:{type:'number', minimum:0, maximum:50 }
        },
    };

    //  curl -X POST http://localhost:3000/recipes -H "Content-Type: application/json" -H "x-api-key: fastify-rocks" -d '{"name":"Lasagna","country":"ITA","price":12,"order":1}'

    app.post('/recipes',
        // can we just pass parameters? 
    {
        config:{ auth:true },
        schema:{
            body:jsonSchemaBody // used to validate request.body
        },
        handler:async function addToMenu(request,reply){

            console.log('hello')
            // reply.send(new Error('Not implemented'))
            const {name, country, description, order, price} = request.body;

            const newPlateId=await app.source.insertRecipe({ // defined in datasource.js
                name,
                country,
                description,
                order,
                price,
                createdAt:new Date()
            });

            // console.log(newPlateId)
            console.log('inserted recipe id:', newPlateId);

            reply.code(201)
            return { id: newPlateId }
        }
    });

    //  curl -H "x-api-key:fastify-rocks" -X DELETE http://localhost:3000/recipes/6844ae28a94d0a21d16de79c
    // we see a status code of 204 but the id still remain 
    app.delete('/recipes/:id',{
        config:{auth:true},

        schema:{
            params:{
                type:'object',
                properties:{
                    id:{type:'string', minLength:24, maxLength:24}
                }
            }
        },

        handler: async function removeFromMenu(request,reply){ // this is declared async to use await within the function
            // reply.send(new Error('not implemented') );
            const {id} = request.params;
            const [recipe]=await app.source.readRecipes({id});
            if(!recipe){
                reply.code(404);
                throw new Error('recipe not found')
            }
            await app.source.deleteRecipe(id);
            console.log('deleted', id)
            reply.code(204);
        }
    });

    // is this to have authentication on every page?
    // app.register(async function protectRoutesPlugin(plugin,opts){
    //     plugin.addHook('onRequest', plugin.authOnlyChef);
        
    //     plugin.post('/recipes', async function addToMenu(request,reply){
    //         throw new Error('Not Implemented plugin');
    //     });


    //     //  curl -X DELETE http://localhost:3000/recipes/32232
    //     // {"statusCode":401,"error":"Unauthorized","message":"Invalid API key"}%
        
    //     plugin.delete('/recipes/:id', function removeFromMenu(request,reply){
    //         reply.send(new Error('Not Implemented'));
    //     });

    //     next();
    // });

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
    // this.log.info('Logging GET /menu from this'); // this is equivalent to the app variable,
    // //  granting acces to all the servers resource
    // request.log.info('Logging GET /menu from request');
    // throw new Error('Not implemented-recipes');

    const recipes = await this.source.readRecipes();
    return recipes; 
}

// what does it mean to export as a default?
export default recipesPlugin;