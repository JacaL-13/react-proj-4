require('dotenv').config()
const { User } = require('../models/mdlUsers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env

function createToken(username, id) {
	return jwt.sign({ username: id }, SECRET, { expiresIn: '2 days' })
}

module.exports = {
	register: async (req, res) => {
		console.log('registering')
		try {
			const { username, password } = req.body

			const foundUser = await User.findOne({
				where: { username: username }
			})

			if (foundUser) {
				res.status(400).send('Username already exists.')
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

				const newUser = await User.create({
					username: username,
					hashedPass: hash
				})
				const token = createToken(
					newUser.dataValues.username,
					newUser.dataValues.id
				)

				const exp = Date.now() + 172800000
				res.status(200).send({
					username: newUser.dataValues.username,
					userId: newUser.dataValues.userId,
					token,
					exp
				})
			}
		} catch (error) {
			console.log('new user registeration error')
			console.log(error)
			res.sendStatus(400)
		}
	},
	login: async (req, res) => {
		try {
			const { username, password } = req.body

			const foundUser = await User.findOne({
				where: { username: username }
			})

			if (foundUser) {
				const isAuthenticated = bcrypt.compareSync(
					password,
					foundUser.hashedPass
				)
				if (isAuthenticated) {
					const token = createToken(
						foundUser.dataValues.username,
						foundUser.dataValues.id
					)
					const exp = Date.now() + 172800000
					console.log(foundUser.dataValues)
					res.status(200).send({
						username: foundUser.dataValues.username,
						userId: foundUser.dataValues.userId,
						token,
						exp
					})
				} else {
					res.status(400).send('Invalid username or password.')
				}
			} else {
				res.status(400).send('Invalid username or password.')
			}
		} catch (error) {
			console.log(error)
		}
	},
	logout: (req, res) => {
		console.log('logout function')
		res.sendStatus(200)
	}
}
