import React from "react";

const ReviewCard = ({ review }) => {
	const array = [1, 2, 3, 4, 5];

	return (
		<div className="reviews__card">
			<div className="reviews__avatar">
				<img
					src={`${review.user.photo}`}
					alt={`${review.user.name}`}
					className="reviews__avatar-img"
				/>
				<h6 className="reviews__user">{review.user.name}</h6>
			</div>
			<p className="reviews__text">{review.review}</p>
			<div className="reviews__rating">
				{array.map((star) => (
					<svg
						className={`reviews__star reviews__star--${
							review.rating >= star ? "active" : "inactive"
						}`}
					>
						<use xlinkHref="/img/icons.svg#icon-star" />
					</svg>
				))}
			</div>
		</div>
	);
};

export default ReviewCard;
