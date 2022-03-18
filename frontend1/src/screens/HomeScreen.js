import React, { useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listtours } from "../redux/tourApiCalls";
import Loader from "../components/Loader";
import Errortemplate from "../components/Errortemplate";
import Meta from "../components/Meta";
import { createBooking } from "../redux/stripe";
const HomeScreen = ({ alert1 }) => {
	const toursList = useSelector((state) => state.tourList);
	console.log(toursList);
	const { loading, error, tours } = toursList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listtours());
		if (alert1) {
			createBooking();
			alert(
				"Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later."
			);
		}
	}, [dispatch, alert]);

	return (
		<>
			<Meta />
			<Header />
			{loading ? (
				<Loader />
			) : error ? (
				<Errortemplate msg={error}></Errortemplate>
			) : (
				<>
					<main className="main">
						<div className="card-container">
							{tours &&
								tours?.map((tour) => <Card tour={tour} key={tour._id} />)}
						</div>
					</main>
				</>
			)}
			<Footer />
		</>
	);
};

export default HomeScreen;
