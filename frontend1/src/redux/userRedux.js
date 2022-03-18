import { createSlice } from "@reduxjs/toolkit";
const userItemsFromStorage = JSON.parse(localStorage.getItem("persist:root"))
	? JSON.parse(localStorage.getItem("persist:root"))?.user
	: {};

const userSlice = createSlice({
	name: "user",
	initialState: userItemsFromStorage,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.userInfo = {};
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	userSlice.actions;
export default userSlice.reducer;
