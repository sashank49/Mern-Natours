import React, { useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listMyBookings } from "../redux/tourApiCalls";
import Loader from "../components/Loader";
import Errortemplate from "../components/Errortemplate";
import Meta from "../components/Meta";

const BookingListScreen = () => {
	const getMyBookings = useSelector((state) => state.getMyBookings);
	console.log(getMyBookings);
	const { loading, error, bookings } = getMyBookings;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listMyBookings());
	}, [dispatch]);
	console.log(bookings?.data);
	return (
		<>
			<Meta title="Your Bookings" />
			<Header />
			{loading ? (
				<Loader />
			) : error ? (
				<Errortemplate msg={error}></Errortemplate>
			) : (
				<>
					<main className="main">
						<div className="card-container">
							{bookings.results>0 &&
								bookings.data.data.map((tour) => <Card tour={tour} key={tour._id} />)}
						</div>
					</main>
				</>
			)}
			<Footer />
		</>
	);
};

export default BookingListScreen;
