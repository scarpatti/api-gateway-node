require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/', routes);

app.listen(process.env.APP_PORT, () => {
    console.log('Gateway listening on port ' + process.env.APP_PORT);
});
