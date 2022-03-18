import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/userApiCalls";
import Errortemplate from "../components/Errortemplate";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const LoginScreen = () => {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userLogin = useSelector((state) => state.user);
	const { loading, error, userInfo } = userLogin;
	console.log(userInfo);
	useEffect(() => {
		if (userInfo) {
			console.log("111");
			history("/");
		}
	}, [history, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<>
			<Header />
			<main className="main">
				<div className="login-form">
					{error && <Errortemplate msg={error}></Errortemplate>}
					{loading && <Loader />}

					<>
						<h2 className="heading-secondary ma-bt-lg">
							Log into your account
						</h2>
						<form className="form form--login" onSubmit={submitHandler}>
							<div className="form__group">
								<label className="form__label" htmlFor="email">
									Email address
								</label>
								<input
									className="form__input"
									id="email"
									type="email"
									placeholder="you@example.com"
									required="required"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form__group ma-bt-md">
								<label className="form__label" htmlFor="password">
									Password
								</label>
								<input
									className="form__input"
									id="password"
									type="password"
									placeholder="••••••••"
									required="required"
									minLength={8}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="form__group">
								<button className="btn btn--green">Login</button>
							</div>
							<div className="form__group">
								<Link to={"/register"} className="btn btn--green">
									Register
								</Link>
							</div>
							
						</form>
					</>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default LoginScreen;
