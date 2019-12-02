// implement your API here
const express = require('express');

const server = express();

server.use(express.json());








const port = 5000

server.listen(port, () => 
    console.log(`API is running on ${port}`)
);