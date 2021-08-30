const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const registry = require('./registry.json');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authenticated-middleware');

const router = express.Router();

router.get('/getApi/:apiName', (req, res) => {
    try {
        const apiName = req.params.apiName;

        const api = registry.services[apiName];

        if(api)
            res.send({ api: api });
        else
            res.send({ api: false });

    } catch (err) {
        res.send({ api: false });

    }
});

// router.all('/:apiName/:path?', (req, res) => {
router.all('/:apiName/*', authMiddleware, (req, res) => {
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
            res.status(404).json('API name not exists!');

        }

    } catch(error) {
        res.status(404);

    }
});

router.post('/register',
    body('apiName').exists(),
    body('host').exists(),
    body('port').exists(),
    body('url').exists(),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const info = req.body;

        registry.services[info.apiName] = { ...info };

        fs.writeFile(path.join(__dirname, 'registry.json'), JSON.stringify(registry), (error) => {
            if(error)
                res.status(400).json('Could not register ' + info.apiName + '\n' + error );
            else
                res.status(200).json('Successfully registered ' + info.apiName);

        })
    }
);

module.exports = router;
