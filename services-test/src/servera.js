const express = require('express');

const app = express();

app.use(express.json());

// app.get('/' + process.env.API_NAME, (req, res) => {
app.get('/', (req, res, next) => {
    res.send('Hello API ' + process.env.API_NAME);
});

app.get('/a/users', (req, res, next) => {
    res.send('Users A');
});

app.post('/a/register/users', (req, res, next) => {
    res.send('POST A');
});

app.listen(8081, () => {
    console.log('Service started on port ' + process.env.PORT);
});
