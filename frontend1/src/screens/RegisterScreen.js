import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Errortemplate from "../components/Errortemplate";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { register } from "../redux/userApiCalls";
const RegisterScreen = () => {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setpasswordConfirm] = useState("");
	const userLogin = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userLogin;
	useEffect(() => {
		if (userInfo) {
			console.log("111");
			history("/");
		}
	}, [history, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(register(name, email, password, passwordConfirm));
	};
	return (
		<>
			<Header />
			<main className="main">
				<div className="login-form">
					<h2 className="heading-secondary ma-bt-lg">Register your account</h2>
					{error && <Errortemplate msg={error}></Errortemplate>}
					{loading && <Loader />}
					{!error && (
						<form className="form form--login" onSubmit={submitHandler}>
							<div className="form__group">
								<label className="form__label" htmlFor="name">
									Name
								</label>
								<input
									className="form__input"
									id="name"
									type="name"
									placeholder="you"
									required="required"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
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
							<div className="form__group ma-bt-md">
								<label className="form__label" htmlFor="password">
									Password Confirm
								</label>
								<input
									className="form__input"
									id="password"
									type="password"
									placeholder="••••••••"
									required="required"
									minLength={8}
									onChange={(e) => setpasswordConfirm(e.target.value)}
								/>
							</div>
							<div className="form__group">
								<button className="btn btn--green">Register</button>
							</div>
							<div className="form__group">
								<Link to={"/login"} className="btn btn--green">
									Login
								</Link>
							</div>
						</form>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default RegisterScreen;
