const { Post } = require('../models/mdlPosts')
const { User } = require('../models/mdlUsers')

module.exports = {
	getAllPosts: async (req, res) => {
		try {
			const posts = await Post.findAll({
				where: { privateStatus: false },
				include: [
					{ model: User, required: true, attributes: [`username`] }
				]
			})
			res.status(200).send(posts)
		} catch (error) {
			console.log('ERROR IN getAllPosts')
			console.log(error)
			res.sendStatus(400)
		}
	},
	getCurrentUserPosts: async (req, res) => {
		try {
			const posts = await Post.findAll({
				where: { userId: req.params.userId },
				include: [
					{ model: User, required: true, attributes: [`username`] }
				]
			})
			res.status(200).send(posts)
		} catch (error) {
			console.log('getCurrentUserPosts function error')
			console.log(error)
			res.sendStatus(400)
		}
	},
	addPost: async (req, res) => {
		console.log(req.body)
		
		try {
			const { title, content, status, userId } = req.body
			await Post.create({
				title: title,
				content: content,
				privateStatus: status,
				userId: userId
			})
			res.sendStatus(200)
		} catch (error) {
			console.log('getCurrentUserPosts function error')
			console.log(error)
			res.sendStatus(400)
		}
	},
	editPost: (req, res) => {
		console.log('editPost function')
		res.sendStatus(200)
	},
	deletePost: (req, res) => {
		console.log('deletePost function')
		res.sendStatus(200)
	}
}
