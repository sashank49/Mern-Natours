import React, { useState } from "react";
import NavItem from "../components/NavItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { updateUserProfile } from "../redux/userApiCalls";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/userApiCalls";

const AccountScreen = ({ user }) => {
	const dispatch = useDispatch();
	const [file, setFile] = useState(null);
	console.log(user);
	const [name, Setname] = useState(user?.name);
	const [email, Setemail] = useState(user?.email);
	const [password, Setpassword] = useState("••••••••");
	const [confirmPassword, SetconfirmPassword] = useState("••••••••");
	const [currentPassword, SetcurrentPassword] = useState("••••••••");
	const handleClick = (e) => {
		e.preventDefault();
		const fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const photo = downloadURL;
					console.log(photo);
					dispatch(updateUserProfile({ name, email, photo }));
				});
			}
		);
	};
	const updatePassword1 = () => {
		dispatch(
			updatePassword({
				passwordCurrent: currentPassword,
				password: password,
				passwordConfirm: confirmPassword,
			})
		);
	};
	return (
		<>
			<Header />
			<main className="main">
				<div className="user-view">
					<nav className="user-view__menu">
						<ul className="side-nav">
							<NavItem link="#" text="Settings" icon="settings" active={true} />
							<NavItem
								link="/my-bookings"
								text="My bookings"
								icon="briefcase"
							/>
							<NavItem link="#" text="My reviews" icon="star" />
							<NavItem link="#" text="Billing" icon="credit-card" />
						</ul>
					</nav>
					<div className="user-view__content">
						<div className="user-view__form-container">
							<h2 className="heading-secondary ma-bt-md">
								Your account settings
							</h2>
							<form className="form form-user-data">
								<div className="form__group">
									<label htmlFor="Name" className="form__label">
										Name
									</label>
									<input
										className="form__input"
										id="name"
										type="text"
										required="required"
										name="name"
										value={name}
										onChange={(e) => Setname(e.target.value)}
									/>
								</div>
								<div className="form__group ma-bt-md">
									<label class="form__label" htmlFor="email">
										Email address
									</label>
									<input
										className="form__input"
										id="email"
										type="email"
										required="required"
										name="email"
										value={email}
										onChange={(e) => Setemail(e.target.value)}
									/>
								</div>
								<div className="form__group form__photo-upload">
									<img src={user?.photo} alt="" className="form__user-photo" />
									<input
										className="form__upload"
										type="file"
										accept="image/*"
										id="photo"
										name="photo"
										onChange={(e) => setFile(e.target.files[0])}
									/>
									<label for="photo">Choose new photo</label>
								</div>
								<div className="form__group right" onClick={handleClick}>
									<button className="btn btn--small btn--green">
										Save settings
									</button>
								</div>
							</form>
						</div>
						<div className="line"> &nbsp; </div>
						<div className="user-view__form-container">
							<h2 className="heading-secondary ma-bt-md">Password change</h2>
							<form action="" className="form form-user-password">
								<div className="form__group">
									<label htmlFor="password-current" className="form__label">
										Current password
									</label>
									<input
										type="password"
										id="password-current"
										placeholder="••••••••"
										className="form__input"
										required
										minlength="8"
										value={currentPassword}
										onChange={(e) => SetcurrentPassword(e.target.value)}
									/>
								</div>
								<div className="form__group">
									<label htmlFor="password" className="form__label">
										New password
									</label>
									<input
										type="password"
										id="password"
										placeholder="••••••••"
										className="form__input"
										required
										minlength="8"
										value={password}
										onChange={(e) => Setpassword(e.target.value)}
									/>
								</div>
								<div className="form__group ma-bt-lg">
									<label htmlFor="password-confirm" className="form__label">
										Confirm password
									</label>
									<input
										type="password"
										placeholder="••••••••"
										className="form__input"
										required
										minlength="8"
										value={confirmPassword}
										onChange={(e) => SetconfirmPassword(e.target.value)}
									/>
								</div>
								<div className="form__group right">
									<button
										className="btn btn--small btn--green btn--save-password"
										onClick={updatePassword1}
									>
										Save password
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default AccountScreen;
