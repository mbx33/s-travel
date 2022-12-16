import { useState } from 'react';
import Link from 'next/link';

const Signup = ({ supabase }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [alert, setAlert] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const resetForm = () => {
		setEmail('');
		setUsername('');
		setPassword('');
		setPasswordConfirm('');
		setAlert('');
		setLoading(false);
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		if (password !== passwordConfirm) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		});

		if (error) {
			console.log(error);
			setError(error.message);
		} else {
			resetForm();
			setAlert('Check your email for the confirmation link');
		}
	};

	return (
		<div>
			<h1>Signup</h1>
			{alert && <p>{alert}</p>}
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="passwordConfirm">Confirm Password</label>
				<input
					type="password"
					id="passwordConfirm"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>

				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Signup'}
				</button>
			</form>
			<p>
				Already have an account? <Link href="/login">Login</Link>
			</p>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Signup;
