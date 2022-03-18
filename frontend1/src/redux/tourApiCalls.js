import axios from "axios";
import { tourListSuccess } from "./tour";
import { tourListRequest } from "./tour";
import { tourListFailure } from "./tour";
import { tourDetailsSuccess } from "./tourDetails";
import { tourDetailsRequest } from "./tourDetails";
import { tourDetailsFailure } from "./tourDetails";
import { bookingListMyFailure } from "./getMyBookings";
import { bookingListMySuccess } from "./getMyBookings";
import { bookingListMyRequest } from "./getMyBookings";
import { tourReviewCreateSuccess } from "./tourReview";
import { tourReviewCreateRequest } from "./tourReview";
import { tourReviewCreateFailure } from "./tourReview";

import { logout1 } from "./userApiCalls";

export const listtours =
	(keyword = "", pageNumber = "") =>
	async (dispatch) => {
		dispatch(tourListRequest());
		try {
			console.log("1111");
			const tours1 = await axios.get("http://127.0.0.1:5000/api/v1/tours");

			dispatch(tourListSuccess(tours1.data.data.data));
		} catch (err) {
			dispatch(
				tourListFailure(
					err.response && err.response.data.message
						? err.response.data.message
						: err.message
				)
			);
		}
	};

export const listTourDetails = (id) => async (dispatch) => {
	try {
		dispatch(tourDetailsRequest());
		const tours1 = await axios.get(`http://127.0.0.1:5000/api/v1/tours/${id}`);
		dispatch(tourDetailsSuccess(tours1.data.data.data));
	} catch (error) {
		dispatch(
			tourDetailsFailure(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export const listMyBookings = () => async (dispatch, getState) => {
	try {
		dispatch(bookingListMyRequest());

		const token = localStorage.getItem("token-natours");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(
			`http://127.0.0.1:5000/api/v1/bookings/my-bookings`,
			config
		);
		console.log(data);
		dispatch(bookingListMySuccess(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			localStorage.removeItem("persist:root");
			dispatch(logout1());
		}
		dispatch(bookingListMyFailure(message));
	}
};

export const createTourReview =
	(tourId, review) => async (dispatch, getState) => {
		try {
			dispatch(tourReviewCreateRequest());

			const token = localStorage.getItem("token-natours");
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			await axios.post(`http://127.0.0.1:5000/api/v1/reviews/${tourId}`, review, config);

			dispatch(tourReviewCreateSuccess());
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === "Not authorized, token failed") {
				localStorage.removeItem("persist:root");
				dispatch(logout1());
			}
			dispatch(tourReviewCreateFailure());
		}
	};
