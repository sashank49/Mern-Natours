import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import userRegisterRedux from "./userRegister";
import tourListReducer from "./tour";
import tourDetailsReducer from "./tourDetails";
import getMyBookingsReducer from "./getMyBookings";
import tourReviewReducer from "./tourReview";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	userRegister: userRegisterRedux,
	tourList: tourListReducer,
	tourDetails: tourDetailsReducer,
	getMyBookings: getMyBookingsReducer,
	tourReviewCreate:tourReviewReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store);
