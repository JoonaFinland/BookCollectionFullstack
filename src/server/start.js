const app = require('./index');

const server = app.listen(8080, () => {
    console.log(`Listening on port ${8080}!`);
});