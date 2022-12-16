import React from 'react';
import Link from 'next/link';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const Navbar = () => {
	const supabase = useSupabaseClient();
	const session = useSession();

	const handleLogout = () => {
		supabase.auth.signOut();
	};

	return (
		<nav className="navbar">
			<div className="navbar__container">
				<ul className="navbar__menu">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li className="navbar__item">
						<Link href="/tours">Tours</Link>
					</li>
					{session && (
						<li onClick={handleLogout} style={{ cursor: 'pointer' }}>
							<button>Logout</button>
						</li>
					)}
					{/* <li className="navbar__item">
						<Link href="/about">
							<a className="navbar__links">About</a>
						</Link>
					</li> */}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
