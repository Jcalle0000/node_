
// export the function at the bottom
async function ordersPlugin( app, opts){

    async function notImplemented (request, reply){
        throw new Error('Not Implemented-orders');
    }

    const orderJsonSchema={
        type:'object',
        required:['table', 'dishes'],
        properties:{
            table:{type:'number', minimum:1},
            dishes:{
                type:'array', minItems:1, 
                items:{
                    type:'object', 
                    required:['id','quantity'], // each dish holds a recipe id?
                    properties:{
                        // we have to specify "id"
                        id:{type:'string', minLength:24, maxLength:24}, // what is this for?
                        // we have to specify "quantity"
                        quantity:{type:'number', minimum:1}
                    }
                }
            }
        }
    };

    const orderListSchema = {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                items: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                    name: { type: 'string' },
                    order: { type: 'number' },
                    quantity: { type: 'number' }
                    }
                }
                }
            }
        }
    };

// curl -X POST http://localhost:3000/orders -H "Content-Type:application/json" 
// -d '{
//          "table":42,
//          "dishes":[{ // this is an array b/c we could have had different recipe ids with different quantity of plates
//                  "id":"6844ae28a94d0a21d16de79c","quantity":2}] }'

    app.post('/orders',  //{handler:notImplemented}
    {    
        schema:{body:orderJsonSchema},
        
        handler: async function createOrder(request,reply){
            const order={
                status:'pending',
                createdAt:new Date(),
                items:request.body.dishes // we pass the dish information
            };

            const orderId=await this.source.insertOrder(order);
            reply.code(201);
            return {id:orderId}
        }
    });

    // curl http://localhost:3000/orders 
    // {"statusCode":500,"error":"Internal Server Error","message":"Not Implemented-orders"}

    // app.get('/orders', {handler:notImplemented});
    app.route({
        method:'GET',
        url:'/orders',
        handler: async function readOrders(request,reply){
            
            const orders=await this.source.readOrders({
                status:'pending'
            })

            const recipeIds = orders.flatMap(order=>order.items.map(item=>item.id) );

            const recipes = await this.source.readRecipes({
                id:{$in:recipeIds}
            });

            return orders.map(order=>{
                order.items=order.items.map(item=>{
                    const recipe = recipes.find(recipe=>recipe.id===item.id)
                    return recipe?{...recipe,quantity:item.quantity}: undefined
                }).filter(
                    recipe=>recipe!==undefined);
                    return order;
            });
        }
    });
    // app.get('orders/',{
    //     schema:{
    //         response:{
    //             200:orderListSchema
    //         }
    //     }
    // })

    // curl -X PATCH http://localhost:3000/orders/32232
    app.patch('/orders/:orderId', { //{handler:notImplemented}
            // onRequest:app.authOnlyChef, // array of hook functions
            config:{auth:true},
            handler:notImplemented
        }
    );
}

export default ordersPlugin;