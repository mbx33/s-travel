import React from 'react';
import Link from 'next/link';

const Activities = () => {
	return (
		<>
			<section style={{ paddingTop: '10rem' }}>
				<h1>Activities in Paris or in Stockholm</h1>
				<Link href="/activities/paris_activities">Activities in Paris</Link>
			</section>
		</>
	);
};

export default Activities;
