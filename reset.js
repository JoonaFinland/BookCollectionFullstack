// File used to reset the data.json to help testing

const fs = require('fs');

const filePath = __dirname + "/src/server/data.json"
const encoding = 'utf8'
const fileData =
    [
        {
            "title": "HTTPS Potter and the API",
            "author": "A.P.I Rowling",
            "description": "Follows the adventure of HTTPS Potter. You're an Endpoint, HTTPS!",
            "id": "1"
        },
        
        {
            "title": "Hidden Mystery of the API",
            "author": "Joona Jokivuori",
            "description": "A book related to the mysterious world of API's.",
            "id": "2"
        },
        {
            "title": "Believing the API",
            "author": "Put Post",
            "description": "How could an ordinary man be helpful at all in this situation. No turning back now though.",
            "id": "3"
        },
        {
            "title": "Stranger of the API",
            "author": "John Smith",
            "description": "The laid-back life of a teenage boy will be changed completely as a strange boy enters his life.",
            "id": "4"
        }
    ]

fs.writeFile(filePath, JSON.stringify(fileData, null, 2), encoding, err => {
    if (err) {
        throw err;
    }
});