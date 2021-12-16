import React, { useState } from "react";
import "../../App.css";
import ReactModal from "react-modal";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./../../config/firebase-config";
import axios from "axios";

ReactModal.setAppElement("#root");

function SignupLoginModal(props) {
  const [showModal, setShowModal] = useState(props.isOpen);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userLoginToken, setUserLoginToken] = useState(null);
  const [user, setUser] = useState({});
  const [data, setData] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (userLoginToken) {
      fetchData(userLoginToken);
    }
  }, [userLoginToken]);

  const fetchData = async (userToken) => {
    const res = await axios.get("http://localhost:4000/firebaseTest", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    setData(res.data.data);
  };

  const handleCloseModal = () => {
    setShowModal(true);
    props.handleClose(false);
  };

  const loginForm = async (event) => {
    event.preventDefault();
    // fill with login stuff
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUserLoginToken(user.user.accessToken);
      console.log("User Logged In? " + JSON.stringify(user));
    } catch (error) {
      console.log(error.message);
    }
  };

  const signupForm = async (event) => {
    event.preventDefault();
    // fill with signup stuff
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  let body = null;

  if (props.modal === "login") {
    body = (
      <form className="form" id="login" onSubmit={loginForm}>
        <h2>Log in now to use SIT Scheduler!</h2>
        <div>
          <label htmlFor="email">
            <input
              name="email"
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
        <button className="modal-button" onClick={handleCloseModal}>
          Cancel
        </button>
      </form>
    );
  } else if (props.modal === "signup") {
    body = (
      <form className="form" id="signup" onSubmit={signupForm}>
        <h2>Register now to use SIT Scheduler!</h2>
        <div>
          <label htmlFor="email">
            <input
              name="email"
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
          <label htmlFor="password">
            <input
              name="password"
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
