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
    try {
        console.log('Service started on port ' + process.env.PORT);

        let urlGatewayRegister = process.env.GATEWAY_HOST + ':' + process.env.GATEWAY_PORT + process.env.GATEWAY_ROUTE_REGISTER;
        urlGatewayRegister = urlGatewayRegister.replaceAll('"', '');

        let urlGatewayGetApi = process.env.GATEWAY_HOST + ':' + process.env.GATEWAY_PORT + process.env.GATEWAY_ROUTE_GET_API;
        urlGatewayGetApi = urlGatewayGetApi.replaceAll('"', '');

        axios({
            method: 'GET',
            url: urlGatewayGetApi + '/' + hostConfig.API_NAME,
            headers: { 'Accept': 'application/json'},

        }).then((response) => {

            if(!response.data.api) {
                axios({
                    method: 'POST',
                    url: urlGatewayRegister,
                    headers: { 'Accept': 'application/json'},
                    data: {
                        apiName: hostConfig.API_NAME,
                        host: hostConfig.HOST,
                        port: hostConfig.PORT,
                        url: hostConfig.HOST + ':' + hostConfig.PORT + '/'
                    }
                }).then((response) => {
                    console.log(response.data);

                }).catch((err) => {
                    console.log('Error up' + err);

                });
            }

        }).catch((err) => {
            console.log('Error up' + err);

        });

    } catch(error) {
        console.log('Error up' + error);
    }
});
