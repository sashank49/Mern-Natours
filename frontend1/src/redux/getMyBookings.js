import { createSlice } from "@reduxjs/toolkit";

const bookingListMyReducer = createSlice({
	name: "bookingListMy",
	initialState: {
		bookings: [],
	},
	reducers: {
		bookingListMyRequest: (state) => {
			return {
				loading: true,
			};
		},
		bookingListMySuccess: (state, action) => {
			return {
				loading: false,
				bookings: action.payload,
			};
		},
		bookingListMyFailure: (state, action) => {
			return {
				loading: false,
				error: action.payload,
			};
		},
		bookingListMyReset: (state) => {
			return { bookings: [] };
		},
	},
});

export const {
	bookingListMyRequest,
	bookingListMySuccess,
	bookingListMyFailure,
	bookingListMyReset,
} = bookingListMyReducer.actions;
export default bookingListMyReducer.reducer;
