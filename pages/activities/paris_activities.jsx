import { useState, useEffect } from 'react';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';

// styles
import styles from '../../styles/Activities.module.css';

// component imports
import ParisActivities from '../../components/activities/ParisActivities';

const ParisActivitiesPage = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const user = useUser();
	const [activities, setActivities] = useState([]);
	const [favorites, setFavorites] = useState([]);

	async function createFavorite(activity, user) {
		const { data: favorite, error } = await supabase
			.from('favorites')
			.insert({ activity_id: activity.id, user_id: user.id });

		if (error) {
			console.log(error);
		}

		setFavorites([...favorites, favorite]);
	}

	useEffect(() => {
		async function loadData() {
			let { data: activities, error } = await supabase
				.from('france_activities')
				.select('*');

			setActivities(activities);
		}

		loadData();
	}, [supabase, user]);

	return (
		<>
			<Head>
				<title>Paris Activities</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<p style={{ paddingTop: '5rem', textAlign: 'center', fontSize: '2rem' }}>
				activities in Paris:
			</p>
			<div className={styles.gridContainer}>
				<ParisActivities
					activities={activities}
					addFavorite={createFavorite}
					user={user}
					favorites={favorites}
				/>
			</div>
		</>
	);
};

export default ParisActivitiesPage;