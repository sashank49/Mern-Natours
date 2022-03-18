import { createSlice } from "@reduxjs/toolkit";

const tourDetailsReducer = createSlice({
	name: "tourDetails",
	initialState: {
		tour: { reviews: [] },
		loading: false,
		error: false,
	},
	reducers: {
		tourDetailsRequest: (state) => {
			state.loading = true;
		},
		tourDetailsSuccess: (state, action) => {
			state.loading = false;
			state.tour = action.payload;
			state.error = false;
		},
		tourDetailsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	tourDetailsRequest,
	tourDetailsSuccess,
	tourDetailsFailure,
} = tourDetailsReducer.actions;
export default tourDetailsReducer.reducer;
