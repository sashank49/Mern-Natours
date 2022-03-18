import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
	"pk_test_51KcCDdSJ1hk93im0lXM68gdSefzaTTQMbCkT87trstHsqYgvwZxP2n7ybxe7y2gLnACr4UTklSP3FKpOmIgynJ6l00Vn90BMRu"
);
export const bookTour = (tourId) => async (dispatch) => {
	try {
		const stripe = await stripePromise;
		const token = localStorage.getItem("token-natours");
		localStorage.setItem("tourId", tourId);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		// 1) Get checkout session from API
		const session = await axios.get(
			`http://127.0.0.1:5000/api/v1/bookings/checkout-session/${tourId}`,
			config
		);
		console.log(session);
		// 2) Create checkout form + chanre credit card
		await stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});
		localStorage.setItem("session", session);
		console.log(session);
	} catch (err) {
		console.log(err);
	}
};

export const createBooking = async () => {
	const token = localStorage.getItem("token-natours");
	const tourId = localStorage.getItem("tourId");
	const user = {};
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(tourId);
	await axios.post(
		`http://127.0.0.1:5000/api/v1/bookings/create-booking/${tourId}`,
		user,
		config
	);
};
