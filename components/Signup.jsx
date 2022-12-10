import { useState } from 'react';
import Link from 'next/link';

const Signup = ({ supabase }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (password !== passwordConfirm) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,

			// Optional fields
			data: {
				username,
			},
		});

		if (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<div>
			<h1>Signup</h1>
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
