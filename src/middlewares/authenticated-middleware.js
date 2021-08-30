const axios = require('axios');
const authConfig = require('../config/auth-config');

module.exports = (req, res, next) => {
    try {
        const parts = req.headers.authorization.split(' ');

        if(!parts.length === 2)
             return res.status(401).json({ error: 'Token error' });

        [ scheme, token ] = parts;

        const url = authConfig.AUTH_HOST + ':' + authConfig.AUTH_PORT + '/' + authConfig.AUTH_ROUTE;

        axios({
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                token: token
            }

        }).then((response) => {
            console.log(response.data);

            if(response.data.active && response.data.token_type === 'access_token')
                next();
            else
                res.sendStatus(401);

        }).catch((err) => {
            console.log('Error up' + err);
            res.sendStatus(401);

        });

    } catch (err) {
        res.sendStatus(401);

    }
}
