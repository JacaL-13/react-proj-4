module.exports = {
	getAllPosts: (req, res) => {
		console.log('getAllPosts function')
		res.sendStatus(200)
	},
	getCurrentUserPosts: (req, res) => {
		console.log('getCurrentUserPosts function')
		res.sendStatus(200)
	},
	addPost: (req, res) => {
		console.log('addPost function')
		res.sendStatus(200)
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
