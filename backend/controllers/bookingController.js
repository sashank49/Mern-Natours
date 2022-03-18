const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	// 1) Get the currently booked tour
	console.log("111");
	const tour = await Tour.findById(req.params.tourId);
	console.log(tour);

	// 2) Create checkout session
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			// success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
			//   req.params.tourId
			// }&user=${req.user.id}&price=${tour.price}`,
			success_url: `${req.headers.referer}my-tours`,
			cancel_url: `${req.headers.referer}tour/${tour._id}`,
			customer_email: req.user.email,
			client_reference_id: req.params.tourId,
			line_items: [
				{
					name: `${tour.name} Tour`,
					description: tour.summary,
					images: [`${tour.imageCover}`],
					amount: tour.price * 100,
					currency: "usd",
					quantity: 1,
				},
			],
		});
		console.log(session);
		// 3) Create session as response
		res.status(200).json({
			status: "success",
			session,
		});
	} catch (err) {
		console.log(err);
	}
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
	console.log(req);
	const tour = await Tour.findById(req.params.tourId);
	const user = req.user._id;
	const price = tour.price;
	await Booking.create({ tour, user, price });
});

// exports.webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed')
//     createBookingCheckout(event.data.object);

//   res.status(200).json({ received: true });
// };

exports.getMyTours = catchAsync(async (req, res, next) => {
	// 1) Find all bookings
	const bookings = await Booking.find({ user: req.user.id });

	// 2) Find tours with the returned IDs
	const tourIDs = bookings.map((el) => el.tour);
	const tours = await Tour.find({ _id: { $in: tourIDs } });

	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			data: tours,
		},
	});
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
