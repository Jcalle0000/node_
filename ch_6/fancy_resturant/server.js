// node server.js

import {fastify} from 'fastify';
import appPlugin, {options} from './app.js'; // 
// we import the app.js file and use the options object to
// instantiate the root application

const app=fastify(options);
// 

app.register(appPlugin); 
// attaching to the fastify server
// ensuring they are loaded sequentially 

// port var in order to select where the server listens for http requests
const port=process.env.PORT||3000;

// start the server by calling the listen method
await app.listen({host:'0.0.0.0', port});