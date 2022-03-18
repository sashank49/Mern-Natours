import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout1 } from "../redux/userApiCalls";
const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const logoutHandler = () => {
		dispatch(logout1());
	};
	console.log(user);
	console.log(user.userInfo === null ? "yes" : "no");
	return (
		<header className="header">
			<nav className="nav nav--tours">
				<Link to="/" className="nav__el">
					All tours
				</Link>
				<form className="nav__search">
					<button className="nav__search-btn">
						<svg>
							<use xlinkHref="img/icons.svg#icon-search" />
						</svg>
					</button>
					<input
						type="text"
						placeholder="Search tours"
						className="nav__search-input"
					/>
				</form>
			</nav>
			<div className="header__logo">
				<img src="../../img/logo-white.png" alt="Natours logo" />
			</div>
			<nav className="nav nav--user">
				{user?.userInfo ? (
					<>
						<Link to="/" className="nav__el" onClick={logoutHandler}>
							Logout
						</Link>
						<Link to="/me" className="nav__el">
							<img
								src={user?.userInfo?.data?.user?.photo}
								alt="User photo"
								className="nav__user-img"
							/>
							<span>{user?.userInfo?.data?.user?.name}</span>
						</Link>
					</>
				) : (
					<>
						<Link to="/login" className="nav__el">
							Log in
						</Link>
						<Link to="/register" className="nav__el nav__el--cta">
							Sign up
						</Link>
					</>
				)}

				{/*  */}
			</nav>
		</header>
	);
};

export default Header;
