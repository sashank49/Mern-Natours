import { createSlice } from "@reduxjs/toolkit";

const tourListReducer = createSlice({
	name: "tourList",
	initialState: {
		tours: [],
		loading: false,
		error: false,
	},
	reducers: {
		tourListRequest: (state) => {
			state.loading = true;
		},
		tourListSuccess: (state, action) => {
			state.loading = false;
			state.tours = action.payload;
			state.error = false;
		},
		tourListFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { tourListRequest, tourListSuccess, tourListFailure } =
	tourListReducer.actions;
export default tourListReducer.reducer;
