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

function App() {
	return (
		<Router>
			<div className="App">
				<div className="App-body">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/createschedule" component={CreateSchedule} />
						<Route exact path="/schedules/:email" component={SchedulesPage} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}
export default App;
