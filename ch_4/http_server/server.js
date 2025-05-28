/*
$ curl http://localhost:3000/ {"name": "todo-server"}% 
$ curl http://localhost:3000/todo [{"task_id": 1, "description": "walk the dog"}]}% 
$ curl -X DELETE http://localhost:3000/ {"error": "Method Not Allowed"}% 
$ curl http://localhost:3000/not-an-endpoint {"error": "Not Found"}% We’ve built a barebones “To Do” 
*/
const http = require('http');

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 3000; // process.env.port is useful to instruct the server to listen to a random free port

const server = http.createServer((req, res) => {

  if (req.method !== 'GET') return error(res, 405);

  if (req.url === '/todo') return todo(res);

  if (req.url === '/') return index(res);
  error(res, 404);
});

function error (res, code) {
  res.statusCode = code;
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

function todo (res) {
  res.end('[{"task_id": 1, "description": "walk the dog"}]}');
}

function index (res) {
  res.end('{"name": "todo-server"}');
}

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${server.address().port}`);
});