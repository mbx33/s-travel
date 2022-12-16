import Link from 'next/link';
import { useState } from 'react';

const Login = ({ supabase, session }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { user, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error);
			setError(error.message);
		} else {
			setLoading(false);
			setMessage('Logged in');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			{message && <p>{message}</p>}
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Login'}
				</button>
			</form>
			<p>
				No Account? <Link href="/signup">Signup</Link>
			</p>

			{error && <p>{error}</p>}
		</div>
	);
};

export default Login;
