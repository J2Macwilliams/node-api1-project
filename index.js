// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log('error on GET /api/users', error)
            res
                .end()
                .status(500)
                .json({ error: "The users information could not be retrieved." })
        });
});






const port = 5000

server.listen(port, () =>
    console.log(`API is running on ${port}`)
);