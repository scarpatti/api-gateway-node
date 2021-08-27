const express = require('express');

const app = express();

app.use(express.json());

// app.get('/' + process.env.API_NAME, (req, res) => {
app.get('/', (req, res, next) => {
    res.send('Hello API ' + process.env.API_NAME);
});

app.get('/b/users', (req, res, next) => {
    res.send('Users B');
});

app.listen(8082, () => {
    console.log('Service started on port ' + process.env.PORT);
});
