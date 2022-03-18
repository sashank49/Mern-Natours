import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import TourScreen from "./screens/TourScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AccountScreen from "./screens/AccountScreen";
import BookingListScreen from "./screens/BookingListScreen";

import { useSelector } from "react-redux";

function App() {
	const { userInfo } = useSelector((state) => state.user);

	return (
		<div>
			<Router>
				<Routes>
					<Route
						path="/"
						element={userInfo ? <HomeScreen /> : <LoginScreen />}
						exact
					/>
					<Route
						path="/tour/:id"
						element={userInfo ? <TourScreen /> : <LoginScreen />}
					/>

					<Route path="/login" element={<LoginScreen />} />
					<Route path="/register" element={<RegisterScreen />} />
					<Route
						path="/me"
						element={<AccountScreen user={userInfo?.data?.user} />}
					/>
					<Route
						path="/my-tours"
						element={<HomeScreen alert1={true} exact />}
					/>
					<Route path="my-bookings" element={<BookingListScreen />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
