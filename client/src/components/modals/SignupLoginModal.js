import React, { useState } from "react";
import "../../App.css";
import ReactModal from "react-modal";
import { useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "./../../config/firebase-config";
import { createUser } from "./../../utils/api/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "./../../actions";
import { useHistory } from "react-router-dom";
import { readUserByEmail } from "../../utils/api/apis/userApi";

const provider = new GoogleAuthProvider();

ReactModal.setAppElement("#root");

function SignupLoginModal(props) {
	const dispatch = useDispatch();
	const isUserLoggedIn = useSelector((state) => state.login);
	const history = useHistory();
	const [whichModal, setWhichModal] = useState(props.modal);
	const [showModal, setShowModal] = useState(props.isOpen);
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerCwid, setRegisterCwid] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [userLoginToken, setUserLoginToken] = useState(null);
	const [user, setUser] = useState({});
	const [data, setData] = useState("");

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const handleCloseModal = () => {
		setShowModal(true);
		props.handleClose(false);
	};

	// const loginForm = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const user = await signInWithEmailAndPassword(
	// 			auth,
	// 			loginEmail,
	// 			loginPassword
	// 		);
	// 		setUserLoginToken(user.user.accessToken);
	// 		console.log("User Logged In? " + JSON.stringify(user));
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };
	const loginForm = async (event) => {
		event.preventDefault();
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			setUserLoginToken(user.user.accessToken);
			console.log("User Logged In? " + JSON.stringify(user));
			if (user) {
				const getUserFromDb = await readUserByEmail(loginEmail);
				console.log(getUserFromDb);
				dispatch(
					actions.loginUser(
						// user.user.accessToken,
						getUserFromDb.admin,
						getUserFromDb.username,
						getUserFromDb.email,
						getUserFromDb.CWID
					)
				);
				history.push("/schedules");
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const signupForm = async (event) => {
		event.preventDefault();
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			console.log(user);
			if (user) {
				const addToDb = await createUser(
					registerEmail.split("@")[0],
					registerEmail,
					registerCwid
				);
				console.log(addToDb.admin);
				dispatch(
					actions.loginUser(
						addToDb.admin,
						registerEmail.split("@")[0],
						registerEmail,
						registerCwid
					)
				);
				history.push("/schedules");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const forgotPassword = async (event) => {
		event.preventDefault();
		try {
			await sendPasswordResetEmail(auth, loginEmail);
		} catch (error) {
			console.log(error.message);
		}
	};

	const googleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await signInWithPopup(auth, provider)
				.then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					// The signed-in user info.
					const user = result.user;
					console.log(user);
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
					// ...
				});
		} catch (error) {
			console.log(error.message);
		}
	};

	let body = null;

	if (whichModal === "login") {
		body = (
			<form className="form" id="login" onSubmit={loginForm}>
				<h2>Log in now to use SIT Scheduler!</h2>
				<div>
					<label htmlFor="email">
						<input
							name="email"
							className="auth"
							id="email"
							type="email"
							placeholder="Enter email"
							required
							onChange={(event) => {
								setLoginEmail(event.target.value);
							}}
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="password">
						<input
							name="password"
							className="auth"
							id="password"
							type="password"
							placeholder="Enter password"
							required
							onChange={(event) => {
								setLoginPassword(event.target.value);
							}}
						/>
					</label>
				</div>
				<br />
				<br />
				<button className="modal-button modal-confirm-button" type="submit">
					Log in
				</button>
				<button
					className="modal-button modal-confirm-button"
					onClick={googleLogin}
				>
					Log in with Google
				</button>
				<button className="modal-button" onClick={handleCloseModal}>
					Cancel
				</button>
				<button className="modal-button" onClick={forgotPassword}>
					Forgot Password
				</button>
			</form>
		);
	} else if (whichModal === "signup") {
		body = (
			<form className="form" id="signup" onSubmit={signupForm}>
				<h2>Register now to use SIT Scheduler!</h2>
				<div>
					<label htmlFor="email">
						<input
							name="email"
							className="auth"
							id="email"
							type="email"
							placeholder="Enter email"
							required
							onChange={(event) => {
								setRegisterEmail(event.target.value);
							}}
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="CWID">
						<input
							name="CWID"
							id="CWID"
							type="number"
							placeholder="Enter CWID"
							required
							onChange={(event) => {
								setRegisterCwid(event.target.value);
							}}
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="password">
						<input
							name="password"
							className="auth"
							id="password"
							type="password"
							placeholder="Enter password"
							required
						/>
					</label>
				</div>
				<br />
				<div>
					<label htmlFor="password2">
						<input
							name="password2"
							className="auth"
							id="password2"
							type="password"
							placeholder="Confirm password"
							required
							onChange={(event) => {
								setRegisterPassword(event.target.value);
							}}
						/>
					</label>
				</div>
				<br />
				<br />
				<button className="modal-button modal-confirm-button" type="submit">
					Sign up
				</button>
				<button className="modal-button" onClick={handleCloseModal}>
					Cancel
				</button>
			</form>
		);
	}
	return (
		<div>
			<ReactModal
				closeTimeoutMS={500}
				name="signupLoginModal"
				isOpen={showModal}
				contentLabel="Signup Login Modal"
				className="home-modal"
			>
				{body}
			</ReactModal>
		</div>
	);
}

export default SignupLoginModal;
