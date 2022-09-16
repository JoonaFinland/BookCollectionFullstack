const server = require('./index.js')
const supertest = require('supertest')
const reqtest = supertest(server);

describe('Book endpoints', () => {
    
    it('GET /books should show all books', async () => {
        const res = await reqtest.get('/books');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.length).toEqual(4);
    });

    it('GET /book/:id should return book', async () => {
        const expectedBook = {
            "title": "Believing the API",
            "author": "Put Post",
            "id": "3",
            "description": "How could an ordinary man be helpful at all in this situation. No turning back now though."
        }
        const res = await reqtest.get('/book/3');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual(expectedBook);
    });

    it('POST /book should return 200', async () => {
        const newBook = {
            "title": "New book",
            "author": "New author",
            "description": "New description"
        }
        const res = await reqtest
            .post('/book')
            .send(newBook);
        expect(res.statusCode).toEqual(200);
    });

    it('PUT /book should return 200', async () => {
        const newBook = {
            "title": "Renamed book",
            "author": "Renamed author",
            "description": "Renamed description"
        }
        const res = await reqtest
            .put('/book/5')
            .send(newBook);
        expect(res.statusCode).toEqual(200);
    });

    it('DELETE /book/:id return 200', async () => {
        const res = await reqtest
            .delete('/book/5');
        expect(res.statusCode).toEqual(200);
    });

    /* Basic testing above to shaow understanding of tests
        Real tests require more cases and error checking.
        For a 'homework task', it is overkill to do them :)
        so I have left them out.
    */

})