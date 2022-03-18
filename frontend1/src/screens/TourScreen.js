import React, { useState, useEffect } from "react";
import Guides from "../components/Guides";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapBox1 from "../components/MapBox1";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listTourDetails } from "../redux/tourApiCalls";
import Loader from "../components/Loader";
import Errortemplate from "../components/Errortemplate";
import Meta from "../components/Meta";
import { bookTour } from "../redux/stripe";
import CreateReview from "../components/CreateReview";

const TourScreen = () => {
	const params = useParams();
	const tourDetails = useSelector((state) => state.tourDetails);
	const { loading, error, tour } = tourDetails;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listTourDetails(params.id));
	}, [params.id, dispatch]);
	const date1 = tour.startDates?.map((date) =>
		date.toLocaleString("en-us", {
			month: "long",
			year: "numeric",
		})
	);
	let date2 = null;
	if (date1) {
		date2 = date1[0];
	}
	const parapraphs = tour.description?.split("\n");
	return (
		<>
			<Meta title={tour.name} />
			<Header />
			{loading ? (
				<Loader />
			) : error ? (
				<Errortemplate msg={error}></Errortemplate>
			) : (
				<>
					<div>
						<section className="section-header">
							<div className="header__hero">
								<div className="header__hero-overlay">&nbsp;</div>
								<img
									className="header__hero-img"
									src={tour.imageCover}
									alt="Tour 5"
								/>
							</div>
							<div className="heading-box">
								<h1 className="heading-primary">
									<span>{tour.name}</span>
								</h1>
								<div className="heading-box__group">
									<div className="heading-box__detail">
										<svg className="heading-box__icon">
											<use xlinkHref="/img/icons.svg#icon-clock" />
										</svg>
										<span className="heading-box__text">
											{tour.duration} days
										</span>
									</div>
									<div className="heading-box__detail">
										<svg className="heading-box__icon">
											<use xlinkHref="/img/icons.svg#icon-map-pin" />
										</svg>
										<span className="heading-box__text">
											{tour.startLocation?.description}
										</span>
									</div>
								</div>
							</div>
						</section>
						<section className="section-description">
							<div className="overview-box">
								<div>
									<div className="overview-box__group">
										<h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
										<div className="overview-box__detail">
											<svg className="overview-box__icon">
												<use xlinkHref="/img/icons.svg#icon-calendar" />
											</svg>
											<span className="overview-box__label">Next date</span>
											<span className="overview-box__text">{date2}</span>
										</div>
										<div className="overview-box__detail">
											<svg className="overview-box__icon">
												<use xlinkHref="/img/icons.svg#icon-trending-up" />
											</svg>
											<span className="overview-box__label">Difficulty</span>
											<span className="overview-box__text">
												{tour.difficulty}
											</span>
										</div>
										<div className="overview-box__detail">
											<svg className="overview-box__icon">
												<use xlinkHref="/img/icons.svg#icon-user" />
											</svg>
											<span className="overview-box__label">Participants</span>
											<span className="overview-box__text">{`${tour.maxGroupSize} people`}</span>
										</div>
										<div className="overview-box__detail">
											<svg className="overview-box__icon">
												<use xlinkHref="/img/icons.svg#icon-star" />
											</svg>
											<span className="overview-box__label">Rating</span>
											<span className="overview-box__text">{`${tour.ratingsAverage} / 5`}</span>
										</div>
									</div>
									<div className="overview-box__group">
										<h2 className="heading-secondary ma-bt-lg">
											Your tour guides
										</h2>
										{tour.guides?.map((guide) => (
											<Guides guide={guide} key={guide._id} />
										))}
									</div>
								</div>
							</div>
							<div className="description-box">
								<h2 className="heading-secondary ma-bt-lg">
									{`About ${tour?.name} tour`}
								</h2>
								{parapraphs?.map((p1) => (
									<p className="description__text">{p1}</p>
								))}
							</div>
						</section>
						<section className="section-pictures">
							<div className="picture-box">
								<img
									className="picture-box__img picture-box__img--1"
									src={tour.images ? tour.images[0] : ""}
									alt="The Park Camper Tour 1"
								/>
							</div>
							<div className="picture-box">
								<img
									className="picture-box__img picture-box__img--2"
									src={tour.images ? tour.images[1] : ""}
									alt="The Park Camper Tour 1"
								/>
							</div>
							<div className="picture-box">
								<img
									className="picture-box__img picture-box__img--3"
									src={tour.images ? tour.images[2] : ""}
									alt="The Park Camper Tour 1"
								/>
							</div>
						</section>
						<section className="section-map">
							<div id="map">
								<MapBox1 locations={tour.locations} />
							</div>
						</section>
						<section className="section-reviews">
							<div className="reviews">
								{tour.reviews?.map((review) => (
									<ReviewCard review={review} key={review._id} />
								))}
							</div>
						</section>
						<section className="section-cta">
							<div className="cta">
								<CreateReview />
							</div>
						</section>
						<section className="section-cta">
							<div className="cta">
								<div className="cta__img cta__img--logo">
									<img src="/img/logo-white.png" alt="Natours logo" />
								</div>
								<img
									className="cta__img cta__img--1"
									src={tour.images ? tour.images[0] : ""}
									alt=""
								/>
								<img
									className="cta__img cta__img--2"
									src={tour.images ? tour.images[1] : ""}
									alt=""
								/>
								<div className="cta__content">
									<h2 className="heading-secondary">
										What are you waiting for?
									</h2>
									<p className="cta__text">
										{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
									</p>
									<button
										className="btn btn--green span-all-rows"
										onClick={bookTour(tour._id)}
									>
										Book tour now!
									</button>
								</div>
							</div>
						</section>
					</div>
				</>
			)}
			<Footer />
		</>
	);
};

export default TourScreen;
