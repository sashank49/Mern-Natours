import { createSlice } from "@reduxjs/toolkit";

const tourReviewCreateReducer = createSlice({
	name: "tourReviewCreate",
	initialState: {},
	reducers: {
		tourReviewCreateRequest: (state) => {
			return { loading: true };
		},
		tourReviewCreateSuccess: (state, action) => {
			return { loading: false, success: true };
		},
		tourReviewCreateFailure: (state, action) => {
			return { loading: false, error: action.payload };
		},
		tourReviewCreateReset: (state) => {
			return {};
		},
	},
});

export const {
	tourReviewCreateRequest,
	tourReviewCreateSuccess,
	tourReviewCreateFailure,
	tourReviewCreateReset,
} = tourReviewCreateReducer.actions;
export default tourReviewCreateReducer.reducer;
