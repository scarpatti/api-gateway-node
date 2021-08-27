const express = require('express');
const axios = require('axios');
const registry = require('./registry.json');

const router = express.Router();

// router.all('/:apiName/:path?', (req, res) => {
router.all('/:apiName/*', (req, res) => {
    try {
        console.log(req.params.apiName);

        if(registry.services[req.params.apiName]) {
            const params = Object.keys(req.params).length > 1 ? req.params[0] : '';

            const url = registry.services[req.params.apiName].url + params;

            // axios.get(registry.services[req.params.apiName].url + (req.params.path || '')).then((response) => {
            axios({
                method: req.method,
                url: url,
                headers: req.headers,
                data: req.body

            }).then((response) => {
                res.send(response.data);

            }).catch((err) => {
                res.sendStatus(404);

            });

        } else {
            res.send(404).json('API name not exists!');

        }

    } catch(error) {
        res.sendStatus(404);

    }
});

module.exports = router;
