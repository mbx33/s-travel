import React from 'react';

const ParisTours = ({ tours }) => {
	return (
		<div>
			<h1>Paris Tours</h1>
			{tours &&
				tours.map((tour) => {
					const { name, base_price: price } = tour;
					return (
						<div key={tour.id}>
							<h3>
								{name} <span> ${price}</span>
							</h3>
						</div>
					);
				})}
		</div>
	);
};

export default ParisTours;
