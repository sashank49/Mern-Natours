import axios from "axios";
import { loginSuccess } from "./userRedux";
import { loginStart } from "./userRedux";
import { loginFailure } from "./userRedux";
import { registerStart } from "./userRegister";
import { registerFailure } from "./userRegister";
import { registerSuccess } from "./userRegister";
import { logout } from "./userRedux";
import { UpdateStart } from "./userUpdate";
import { UpdateSuccess } from "./userUpdate";
import { UpdateFailure } from "./userUpdate";
import { userUpdateProfileReset } from "./userUpdate";
import { bookingListMyReset } from "./getMyBookings";
import { tourReviewCreateReset } from "./tourReview";
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch(loginStart());

		const config = {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "true",
			},
		};
		const { data } = await axios.post(
			"http://127.0.0.1:5000/api/v1/users/login",
			{ email, password },
			config
		);
		localStorage.setItem("token-natours", data.token);
		console.log(data);
		dispatch(loginSuccess(data));
	} catch (error) {
		dispatch(
			loginFailure(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export const register =
	(name, email, password, passwordConfirm) => async (dispatch) => {
		try {
			dispatch(registerStart());

			const config = {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "true",
				},
			};
			const { data } = await axios.post(
				"/api/v1/users/signup",
				{ name, email, password, passwordConfirm },
				config
			);
			console.log(data);
			dispatch(registerSuccess(data));
		} catch (error) {
			dispatch(
				registerFailure(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
				)
			);
		}
	};

export const logout1 = () => (dispatch) => {
	dispatch(logout());
	dispatch(userUpdateProfileReset());
	dispatch(bookingListMyReset());
	dispatch(tourReviewCreateReset());
	localStorage.removeItem("persist:root");
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch(UpdateStart());

		const {
			user: { userInfo },
		} = getState();
		console.log(getState());
		const token = localStorage.getItem("token-natours");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.patch(
			`http://127.0.0.1:5000/api/v1/users/updateMe`,
			user,
			config
		);
		console.log(data);
		dispatch(UpdateSuccess(data));
		dispatch(loginSuccess(data));
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			localStorage.removeItem("persist:root");
			dispatch(logout());
		}
		dispatch(UpdateFailure(message));
	}
};

export const updatePassword = (user) => async (dispatch) => {
	const token = localStorage.getItem("token-natours");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.patch(
		`http://127.0.0.1:5000/api/v1/users/updateMyPassword`,
		user,
		config
	);
	console.log(data);
};
