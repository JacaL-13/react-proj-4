//import middleware from node_modules and secret from env file
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

		//if there is no token send an UNAUTHORIZED error
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

		//Check token against secret
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

		//If token verified is false send UNAUTHORIZED
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

		//Procede with http request
        next()
    }
}