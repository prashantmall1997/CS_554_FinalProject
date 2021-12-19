import React, { useState } from "react";
import "../App.css";
import SignupLoginModal from "./modals/SignupLoginModal";

export function Home() {
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
    };

    const handleOpenSignupModal = () => {
        setShowSignupModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    return (
        <div className="home"> 
            <div className="home-content centered">
                <h1 className="home-title">Welcome to Stevens Scheduler 2.0!</h1>
                <br />
                <button className="signup-button" onClick={() => {handleOpenSignupModal();}}>
                    Sign up
                </button>
                <button className="login-button" onClick={() => {handleOpenLoginModal();}}>
                    Log in
                </button>
            </div>
            <div>
                {showSignupModal && (
                    <SignupLoginModal
                    closeTimeoutMS={500} 
                        isOpen={showSignupModal}
                        handleClose={handleCloseSignupModal}
                        modal="signup" />
                )}
            </div>
            <div>
                {showLoginModal && (
                    <SignupLoginModal
                        closeTimeoutMS={500} 
                        isOpen={showLoginModal}
                        handleClose={handleCloseLoginModal}
                        modal="login" />
                )}
            </div>
        </div>
    )
}

export default Home;