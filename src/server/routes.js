const fs = require('fs');
const express = require('express');
const app = express.Router()
const dataBase = __dirname + '/data.json';

// Database Mock - Can be 'easily' replaced with a PSQL or MongoDB
const readFile = (
    callback,
    returnJson = false,
    filePath = dataBase,
    encoding = 'utf8'
) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (
    fileData,
    callback,
    filePath = dataBase,
    encoding = 'utf8'
) => {
    fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
            throw err;
        }

        callback();
    });
};

// UUID Mock (easier to use api with integer than UUID)
const getId = (data => {
    // Get the highest ID + 1 for new incremented Id
    let maxId = 0;
    data.forEach(obj => {
        let id = obj.id;
        let idParsed = parseInt(id,10)
        if (idParsed > maxId) {
            maxId = idParsed;
        }
    })
    return String(maxId + 1);
});

// GET /books
app.get('/books', (req, res) => {
    readFile(data => {
        res.send(data);
    }, true);
});

// GET /book/:id
app.get('/book/:id', (req, res) => {
    readFile(data => {
        const bookId = req.params['id'];
        res.send(data[bookId-1]);
    }, true);
});

// POST /book 
app.post('/book', (req, res) => {
    readFile(data => {
        // Using simple incrementing integer ID instead of UUI for simplicity
        const newBookId = getId(data);
        req.body.id = newBookId;
        data.push(req.body);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`New book added with id:${newBookId}`);
        })
    }, true);
});

// PUT instead of PATCH: easier to handle, sending all data from frontend anyway.
// PUT /book/:id
app.put('/book/:id', (req, res) => {
    readFile(data => {
        const bookId = req.params['id'];
        data = data.filter(item => item.id !== bookId);
        req.body.id = bookId;
        data.push(req.body);
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${bookId} updated`);
        })
    }, true);
});

// DELETE /book/:id
app.delete('/book/:id', (req, res) => {
    readFile(data => {
        const bookId = req.params['id'];
        data = data.filter(item => item.id !== bookId);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${bookId} deleted`);
        })
    }, true);
});

module.exports = app;