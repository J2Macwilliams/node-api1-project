// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

// POST to db -------------------------------------

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

// GET from db----------------------------------------

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

// GET by id from db -----------------------------------

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log('error on GET /api/users/:id', error)
            res
                .end()
                .status(500)
                .json({ error: "The user information could not be retrieved." })
        });
})

// DELETE by id from db----------------------------------------

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(gone => {
            if (gone) {
                res.status(200).json({ message: "The user was deleted", gone })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log('error on DELETE /api/users/:id', error)
            res
                .end()
                .status(500)
                .json({ error: "The user could not be removed." })
        });
})

// PUT by id from db---------------------------------------------

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const dbInfo = req.body;

    db.update(id)
        .then(found => {
            if (found) {
                res.status(200).json(dbInfo)
            } else if (dbInfo !== "name" && "bio") {
                res
                .end()
                .status(400)
                .json({ errorMessage: "Please provide name and bio for the user." })

            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log('error on PUT /api/users/:id', error)
            res
                .end()
                .status(500)
                .json({ error: "The user information could not be modified." })
        });
})


const port = 5000

server.listen(port, () =>
    console.log(`API is running on ${port}`)
);