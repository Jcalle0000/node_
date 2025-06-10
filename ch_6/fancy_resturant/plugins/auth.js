// move decorators from app.js to here

import fp from 'fastify-plugin'

async function authPlugin(app,opts){
    
    app.decorateRequest('isChef', function(){
        return this.headers['x-api-key']==='fastify-rocks';
    });

    app.decorate('authOnlyChef', async function(request,reply){
        if(!request.isChef() ){
            reply.code(401);
            throw new Error('Invalid API key')     
        }
    });

    // onRoute is the type of hook, others types are onRoute, onRegister, onReady, onListen, preClose, onClose
    app.addHook('onRoute', function hook(routeOptions){

        if(routeOptions.config?.auth===true){
            routeOptions.onRequest = [app.authOnlyChef].concat(routeOptions.onRequest || [] );
        }
    });

    // should we implement onReady, onClose
}

// export default authPlugin;
export default fp(authPlugin)