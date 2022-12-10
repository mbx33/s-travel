import React from 'react';
import Link from 'next/link';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { redirect } from 'next/dist/server/api-utils';

const Navbar = (res, req) => {
	const supabase = useSupabaseClient();
	const session = useSession();

	const handleLogout = () => {
		supabase.auth.signOut();
		res.redirect('/');
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
							Logout
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
