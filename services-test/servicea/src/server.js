const express = require('express');
const axios = require('axios');
const hostConfig = require('./config/host');
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

    let urlGateway = process.env.GATEWAY_HOST + ':' + process.env.GATEWAY_PORT + process.env.GATEWAY_ROUTE_REGISTER;
    urlGateway = urlGateway.replaceAll('"', '');

    console.log(urlGateway);

    axios({
        method: 'POST',
        url: urlGateway,
        headers: { 'Accept': 'application/json'},
        data: {
            apiName: hostConfig.API_NAME,
            host: hostConfig.HOST,
            port: hostConfig.PORT,
            url: hostConfig.HOST + ':' + hostConfig.PORT + '/'
        }
    });
});
