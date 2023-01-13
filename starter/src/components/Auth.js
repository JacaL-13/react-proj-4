import { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

const baseURL = 'http://localhost:4501'

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [register, setRegister] = useState(true)
	
	const authCtx = useContext(AuthContext)

	const submitHandler = (eve) => {
		eve.preventDefault()

        const body = {username, password}

		console.log(baseURL + '/register')
		
		axios
			.post(register ? baseURL + '/register' : baseURL + '/login', body)
			.then(({ data }) => {
				authCtx.login(data.token, data.exp, data.userId)
			})
			.catch((err) => {
				console.log(err)
                setPassword('')
                setUsername('')
			})

		console.log('submitHandler called')
	}

	return (
		<main>
			<h1>Welcome!</h1>
			<form className="form auth-form" onSubmit={submitHandler}>
				<input
					className="form-input"
					placeholder="username"
					value={username}
					onChange={(eve) => {
						setUsername(eve.target.value)
					}}
				/>
				<input
					type="password"
					className="form-input"
					placeholder="password"
					value={password}
					onChange={(eve) => {
						setPassword(eve.target.value)
					}}
				/>
				<button className="form-btn">
					{register ? 'Sign Up' : 'Login'}
				</button>
			</form>
			<button
				className="form-btn"
				onClick={(eve) => {
					setRegister(prev => !prev)
				}}
			>
				Need to {register ? 'Login' : 'Sign Up'}?
			</button>
		</main>
	)
}

export default Auth
