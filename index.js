// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

server.post('/api/users', (req, res) => {
    const dbInfo = req.body;

    db.insert(dbInfo)
        .then(info => {
            res.status(201).json(info)
        })
        .catch(error => {
            console.log('error on the POST /api/users', error)
            if (dbInfo !== "name" && "bio") {
                res
                    .end()
                    .status(400)
                    .json({ error: "Please provide name and bio for the user." })
            } else {
                res
                    .end()
                    .status(500)
                    .json({ error: "There was an error while saving the user to the database" })
            }
        });
})

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