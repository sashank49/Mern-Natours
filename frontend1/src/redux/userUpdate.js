import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		UpdateStart: (state) => {
			state.loading = true;
		},
		UpdateSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = null;
			state.success = true;
		},
		UpdateFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		userUpdateProfileReset: (state) => {
			return {};
		},
	},
});

export const {
	UpdateStart,
	UpdateSuccess,
	UpdateFailure,
	userUpdateProfileReset,
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
