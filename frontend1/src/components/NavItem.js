import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ link, text, icon, active }) => {
	return (
		<li className={`${active ? "side-nav--active" : ""}`}>
			<Link to={`${link}`}>
				<svg>
					<use xlinkHref={`../../img/icons.svg#icon-${icon}`} />
				</svg>
				{text}
			</Link>
		</li>
	);
};

export default NavItem;
