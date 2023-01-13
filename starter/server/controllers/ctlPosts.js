const { Post } = require('../models/mdlPosts')
const { User } = require('../models/mdlUsers')

module.exports = {
	getAllPosts: (req, res) => {
		console.log('getAllPosts function')
		res.sendStatus(200)
	},
	getCurrentUserPosts: (req, res) => {
		console.log('getCurrentUserPosts function')
		res.sendStatus(200)
	},
	addPost: async (req, res) => {
		try {
			const {title, content, status, userId} = req.body
			await Post.create({title: title, content: content, privateStatus: status, userId: userId})
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
