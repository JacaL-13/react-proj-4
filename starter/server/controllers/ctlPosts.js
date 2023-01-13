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
	editPost: async (req, res) => {
		try {
			const postId = req.params.id
			const status = req.body.status

			await Post.update(
				{ privateStatus: status },
				{ where: { postId: +postId } }
			)
			res.sendStatus(200)
		} catch (error) {
			console.log('editPost function error')
			console.log(error)
			res.sendStatus(400)
		}
	},
	deletePost: async (req, res) => {
		try {
			const postId = req.params.id
			await Post.destroy({where: {postId: +postId}})
			res.sendStatus(200)
		} catch (error) {
			console.log('deletePost function error')
			console.log(error)
			res.sendStatus(400)
		}
	}
}
