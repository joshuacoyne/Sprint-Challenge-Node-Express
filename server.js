const express = require('express');

const server = express();

//import routers
const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');

//use built in body-parser
server.use(express.json());

//use routers
server.use('/project', projectRouter);
server.use('/action', actionRouter);

server.get('/', (req, res) => {
    res.json({api:'running'});
});
 
const port = 5000;
server.listen(port, () => console.log('API running on port 5000...'));
