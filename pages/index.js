import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

// component imports
import Signup from '../components/Signup';

// style imports

export default function Home() {
	const session = useSession();
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
			console.log(profiles, 'profiles');
			setUserProfile(profiles[0].username);
		};
		if (user) {
			getUserProfiles();
		}
	}, [supabase, user]);

	if (!user) return <Signup supabase={supabase} session={session} />;

	// const { username } = user.user_metadata;

	return (
		<div className={styles.container}>
			<Head>
				<title>Student Travel</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<p>Thanks for logging in! {userProfile}</p>
		</div>
	);
}
