import React from 'react';
import Link from 'next/link';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
	const supabase = useSupabaseClient();
	const session = useSession();

	const handleLogout = () => {
		supabase.auth.signOut();
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>
				<p>Logo</p>
			</div>
			<ul className={styles.menu}>
				<li>
					<Link className={styles.link} href="/">
						Home
					</Link>
				</li>
				<li className="navbar__item">
					<Link className={styles.link} href="/tours">
						Tours
					</Link>
				</li>
				<li className="navbar__item">
					<Link className={styles.link} href="/activities">
						Activities
					</Link>
				</li>
				{session ? (
					<li onClick={handleLogout} style={{ cursor: 'pointer' }}>
						<button>Logout</button>
					</li>
				) : (
					<li>
						<Link className={styles.link} href="/login">
							Login
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
