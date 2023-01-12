const {sequelize} = require('./util/database')
const {Post} = require('./models/posts')
const {User} = require('./models/users')

const express = require('express')
const cors = require('cors')

require('dotenv').config()
const { PORT } = process.env

const app = express()
app.use(express.json())
app.use(cors())

const {
	getAllPosts,
	getCurrentUserPosts,
	addPost,
	editPost,
	deletePost
} = require('./controllers/posts')
const { login, register } = require('./controllers/auth')
const { isAuthenticated } = require('./middleware/isAuthenticated')

User.hasMany(Post, { foreignKey: 'userId'})
Post.belongsTo(User, { foreignKey: 'userId'})

app.post('/register', register)
app.post('/login', login)
app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('posts/:id', isAuthenticated, deletePost)

sequelize.sync(/*{ force: true }*/).then(() => {
	app.listen(PORT, () => console.log(`server running on port ${PORT}`))
}).catch(err => console.log(err))