import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import styles from '../../styles/components/Cards.module.css';

//create a like button with a heart icon
//create a comment button with a comment icon
//create a share button with a share icon

const likeBtn = (
	<button className={styles.likeBtn}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-heart"
			viewBox="0 0 16 16"
		>
			<path d="M8 1.314C3.82 1.314 1.5 4.134 1.5 7.5 1.5 11.642 8 16 8 16s6.5-4.358 6.5-8.5C14.5 4.134 12.18 1.314 8 1.314z" />
		</svg>
	</button>
);

const ParisActivities = ({ activities, addFavorite, user, favorites }) => {
	const [liked, setLiked] = useState(false);
	const supabase = useSupabaseClient();
	const [userFavorites, setUserFavorites] = useState([]);

	useEffect(() => {
		async function loadFavorites() {
			const { data: userFavorites, error: error2 } = await supabase
				.from('favorites')
				.select('*')
				.eq('user_id', user.id);

			//get france_activites data only if its in the user favorites
			const filteredActivities = activities.filter((activity) => {
				return userFavorites.some(
					(favorite) => favorite.activity_id === activity.id
				);
			});

			console.log('userFavorites', filteredActivities);
			setUserFavorites(filteredActivities);
		}

		if (user) {
			loadFavorites();
		}
	}, [user, supabase, activities, favorites]);

	return (
		<>
			{activities &&
				activities.map((activity) => (
					<div key={activity.id} className={styles.card}>
						{activity.images && activity.images.length > 0 && (
							<Image
								className={styles.cardImage}
								src={activity.images[0]}
								alt={activity.name}
								width={250}
								height={250}
							/>
						)}
						<h3 className={styles.cardTitle}>
							{activity.name}
							<span> ${activity.price}</span>
						</h3>
						<p className={styles.cardDescription}>{activity.description}</p>
						{user && (
							<div
								onClick={() => {
									console.log('clicked');
									addFavorite(activity, user);
								}}
								className={styles.cardActions}
							>
								{likeBtn}
							</div>
						)}
					</div>
				))}
			<h2>Favorites</h2>
			{userFavorites &&
				userFavorites.map((activity) => (
					<div key={activity.id} className={styles.card}>
						{activity.images && activity.images.length > 0 && (
							<Image
								className={styles.cardImage}
								src={activity.images[0]}
								alt={activity.name}
								width={250}
								height={250}
							/>
						)}
						<h3 className={styles.cardTitle}>
							{activity.name}
							<span> ${activity.price}</span>
						</h3>
						<p className={styles.cardDescription}>{activity.description}</p>
					</div>
				))}
		</>
	);
};

export default ParisActivities;
