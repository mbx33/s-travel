import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

import styles from '../styles/Forms.module.css';

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
		<>
			<Head>
				<title>Student Travel- login</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1>Login</h1>
				{message && <p>{message}</p>}
				{error && <p>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label className={styles.label} htmlFor="email">
							Email
						</label>
						<input
							className={styles.input}
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label} htmlFor="password">
							Password
						</label>
						<input
							className={styles.input}
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className={styles.button} type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Login'}
					</button>
				</form>
				<p style={{ margin: '1.3rem 0' }}>
					No Account?{' '}
					<Link href="/signup" className={styles.link}>
						Signup
					</Link>
				</p>

				{error && <p>{error}</p>}
			</main>
		</>
	);
};

export default Login;
