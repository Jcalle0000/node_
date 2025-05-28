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

    app.get('/orders', {handler:notImplemented});
    // app.get('orders/',{
    //     schema:{
    //         response:{
    //             200:orderListSchema
    //         }
    //     }
    // })

    app.patch('/orderes/:orderId', {handler:notImplemented});
}

export default ordersPlugin;