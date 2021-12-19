import "./App.css";
import {
	readAllClasses,
	readClassesBySchedule,
} from "./utils/api/apis/classApi";
import React, { useEffect, useState } from "react";
//import FirebaseTest from "./components/FirebaseTest";
import CreateSchedule from "./components/CreateSchedule";
import Admin from "./components/Admin";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchedulesPage from "./components/SchedulesPage";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
	const loggedIn = useSelector((state) => state.login).isLoggedIn;
	console.log(loggedIn);
	return (
		<Router>
			<div className="App">
				<div className="App-body">
					<Switch>
						<Route exact path="/">
							{useSelector((state) => state.login).isLoggedIn === true ? (
								<Redirect to="/schedules" />
							) : (
								<Home />
							)}
						</Route>

						<Route exact path="/admin">
							{useSelector((state) => state.login).isLoggedIn === false ? (
								<Redirect to="/" />
							) : (
								<Admin />
							)}
						</Route>

						<Route exact path="/createschedule">
							{useSelector((state) => state.login).isLoggedIn === false ? (
								<Redirect to="/" />
							) : (
								<CreateSchedule />
							)}
						</Route>

						{/* <Route exact path="/userProfile">
							{useSelector((state) => state.login).isLoggedIn === false ? (
								<Redirect to="/" />
							) : (
								<UserProfile />
							)}
						</Route> */}

						<Route exact path="/schedules">
							{useSelector((state) => state.login).isLoggedIn === false ? (
								<Redirect to="/" />
							) : (
								<SchedulesPage />
							)}
						</Route>

						{/* <Route exact path="/" component={Home} />
			  <Route exact path="/admin" component={Admin} />
			  <Route exact path="/createschedule" component={CreateSchedule} />
			  <Route exact path="/schedules" component={SchedulesPage} /> */}
					</Switch>
				</div>
			</div>
		</Router>
	);
}
export default App;
