import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

import styles from '../../styles/components/Hero.module.css';

const ParisHero = () => {
	const user = useUser();
	const supabase = useSupabaseClient();
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		const getUserProfiles = async () => {
			const { data: profiles, error } = await supabase
				.from('profiles')
				.select('username')
				.eq('id', user.id);

			if (error) {
				console.error(error);
			}
			setUserProfile(profiles[0].username);
		};
		if (user) {
			getUserProfiles();
		}
	}, [supabase, user]);

	return (
		<section className={styles.container}>
			{!user && (
				<div className={styles.hero}>
					<p>Welcome to Student Travel!</p>
				</div>
			)}
			{user && (
				<div className={styles.hero}>
					<p>{userProfile}, Welcome to student Travel</p>
				</div>
			)}
		</section>
	);
};

export default ParisHero;
