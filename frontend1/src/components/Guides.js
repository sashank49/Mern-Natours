import React from "react";

const Guides = ({ guide }) => {
	return (
		<div className="overview-box__detail">
			<img className="overview-box__img" src={guide.photo} alt="Lead guide" />
			<span className="overview-box__label">{guide.role}</span>
			<span className="overview-box__text">{guide.name}</span>
		</div>
	);
};

export default Guides;
