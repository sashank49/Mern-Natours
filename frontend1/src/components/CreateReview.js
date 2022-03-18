import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

import { createTourReview } from "../redux/tourApiCalls";
import { tourReviewCreateReset } from "../redux/tourReview";

const CreateReview = () => {
	const params = useParams();
	const dispatch = useDispatch();
	console.log(params.id);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const tourReviewCreate = useSelector((state) => state.tourReviewCreate);
	const {
		success: successtourReview,
		loading: loadingtourReview,
		error: errortourReview,
	} = tourReviewCreate;
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		if (successtourReview) {
			setRating(0);
			setComment("");
			dispatch(tourReviewCreateReset());
			window.location.reload();
		}
	}, [dispatch, params, successtourReview]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createTourReview(params.id, {
				rating,
				review: comment,
			})
		);
	};
	return (
		<Row>
			<Col>
				<ListGroup.Item>
					<h2 className="heading-secondary ma-bt-md">
						Write a Customer Review
					</h2>

					{loadingtourReview && <Loader />}
					{errortourReview && alert(errortourReview)}
					{userInfo ? (
						<Form onSubmit={submitHandler} className="form form-user-data">
							<Form.Group controlId="rating" className="form__group">
								<Form.Label className="form__label">Rating</Form.Label>
								<Form.Control
									as="select"
									value={rating}
									onChange={(e) => setRating(e.target.value)}
									className="form__input"
								>
									<option value="">Select...</option>
									<option value="1">1 - Poor</option>
									<option value="2">2 - Fair</option>
									<option value="3">3 - Good</option>
									<option value="4">4 - Very Good</option>
									<option value="5">5 - Excellent</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="comment" className="form__group ma-bt-md">
								<Form.Label className="form__label">Comment</Form.Label>
								<Form.Control
									as="textarea"
									row="3"
									value={comment}
									className="form__input"
									onChange={(e) => setComment(e.target.value)}
								></Form.Control>
							</Form.Group>
							{successtourReview && (
								<p className="form__label">Review Submitted successfully</p>
							)}
							<Button
								disabled={loadingtourReview}
								type="submit"
								variant="primary"
								className="btn btn--green span-all-rows"
							>
								Submit
							</Button>
						</Form>
					) : (
						alert("Login to create review")
					)}
				</ListGroup.Item>
			</Col>
		</Row>
	);
};

export default CreateReview;
