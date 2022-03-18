import { createSlice } from "@reduxjs/toolkit";
const userItemsFromStorage = JSON.parse(localStorage.getItem("persist:root"))
	? JSON.parse(localStorage.getItem("persist:root"))?.userRegister
	: {};
console.log(userItemsFromStorage);
const userRegisterSlice = createSlice({
	name: "user",
	initialState: userItemsFromStorage,
	reducers: {
		registerStart: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
		},
		registerFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { registerStart, registerSuccess, registerFailure } =
	userRegisterSlice.actions;
export default userRegisterSlice.reducer;
