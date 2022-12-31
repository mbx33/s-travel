import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import styles from '../../styles/components/Cards.module.css';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';

const ParisActivities = ({ activities, addFavorite, user, favorites }) => {
	const [liked, setLiked] = useState(false);
	const supabase = useSupabaseClient();
	const [userFavorites, setUserFavorites] = useState([]);

	useEffect(() => {
		async function loadFavorites() {
			const { data: favorites, error } = await supabase
				.from('favorites')
				.select(
					`activity_id, liked, france_activities (
      				id, name, description, images, price 
    				)
  				`
				)
				.eq('user_id', user.id);

			if (error) {
				console.log(error);
			}

			// console.log('favorites', favorites);
			setUserFavorites(favorites);
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
							<div className={styles.cardActions}>
								{userFavorites &&
								userFavorites.find(
									(favorite) => favorite.activity_id === activity.id
								) ? (
									<FcLike
										size={25}
										onClick={() => {
											console.log('clicked');
										}}
									/>
								) : (
									<FcLikePlaceholder
										size={25}
										onClick={() => {
											console.log('clicked');
											addFavorite(activity, user);
										}}
									/>
								)}
							</div>
						)}
					</div>
				))}
		</>
	);
};

export default ParisActivities;
