require('dotenv').config();

module.exports = {
    AUTH_HOST: process.env.AUTH_HOST || '',
    AUTH_PORT: process.env.AUTH_PORT || '',
    AUTH_ROUTE: process.env.AUTH_ROUTE || ''
}
