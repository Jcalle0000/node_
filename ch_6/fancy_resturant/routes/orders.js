
// export the function at the bottom
async function ordersPlugin( app, opts){

    async function notImplemented (request, reply){
        throw new Error('Not Implemented-orders');
    }

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

    app.post('/orders', {handler:notImplemented});

    // curl http://localhost:3000/orders 
    // {"statusCode":500,"error":"Internal Server Error","message":"Not Implemented-orders"}

    app.get('/orders', {handler:notImplemented});
    // app.get('orders/',{
    //     schema:{
    //         response:{
    //             200:orderListSchema
    //         }
    //     }
    // })

    // curl -X PATCH http://localhost:3000/orders/32232
    app.patch('/orders/:orderId', { //{handler:notImplemented}
            onRequest:app.authOnlyChef, // array of hook functions
            handler:notImplemented
        }
    );
}

export default ordersPlugin;