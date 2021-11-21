import React, { useState } from "react";
import "../App.css";

export function Admin() {
    const [file, setFile] = useState("");

    function handleUpload(event) {
        setFile(event.target.files[0]);
        // send to backend
    }

    const handleSignout = () => {
        // signout code
    };

    let username = "admin";

    return (
        <div>
            <div className="topbar">
                SIT Scheduler 2.0
            </div>
            <div className="sidebar">
                <div className="sidebar-text">Welcome, {username}</div>
                <br />
                <a href="/admin" className="sidebar-button sidebar-button-active">Admin</a>
                <a href="/schedulespage" className="sidebar-button">Scheduler</a>
                <div className="sidebar-button" onClick={handleSignout}>Sign out</div>
            </div>
            <div className="main-content">
                <h1>Upload Latest Schedules</h1>
                <br />
                <input type="file" accept=".csv" onChange={handleUpload} />
            </div>
        </div>
    );
}

export default Admin;