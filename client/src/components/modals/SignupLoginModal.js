import React, { useState } from "react";
import "../../App.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function SignupLoginModal(props) {
  const [showModal, setShowModal] = useState(props.isOpen);

  const handleCloseModal = () => {
    setShowModal(true);
    props.handleClose(false);
  };

  const loginForm = async (event) => {
    event.preventDefault()
    // fill with login stuff
  }

  const signupForm = async (event) => {
    event.preventDefault()
    // fill with signup stuff
  }

  let body = null;

  if (props.modal === "login") {
    body = (
        <form className="form" id="login" onSubmit={loginForm}>
          <h2>Log in now to use SIT Scheduler!</h2>
          <div>
            <label htmlFor="email">
              <input name="email" id="email" type="email" placeholder="Enter email" required />
            </label>
          </div>
          <br />
          <div>
            <label htmlFor="password">
              <input name="password" id="password" type="password" placeholder="Enter password" required />
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
              <input name="email" id="email" type="email" placeholder="Enter email" required />
            </label>
          </div>
          <br />
          <div>
            <label htmlFor="password">
              <input name="password" id="password" type="password" placeholder="Enter password" required />
            </label>
          </div>
          <br />
          <div>
            <label htmlFor="password2">
              <input name="password2" id="password2" type="password2" placeholder="Confirm password" required />
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
      <ReactModal closeTimeoutMS={500} 
      name="signupLoginModal" isOpen={showModal} contentLabel="Signup Login Modal" className="home-modal">
        {body}
      </ReactModal>
    </div>
  );
}

export default SignupLoginModal;
