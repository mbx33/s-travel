import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useState } from 'react';

const Login = ({ supabase }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async () => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setLoading(false);
			setError(error.message);
		}
		setLoading(false);
		//redirect to tours page
	};

	return (
		<div>
			<h1>Login</h1>
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
