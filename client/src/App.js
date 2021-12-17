import "./App.css";
import { readAllClasses, readClassesBySchedule } from "./utils/api/apis/classApi";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./Components/FirebaseTest";
import CreateSchedule from "./Components/CreateSchedule";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchedulesPage from "./Components/SchedulesPage";

function App() {
	const [allClasses, setAllClasses] = useState([]);
	useEffect(() => {
		readAllClasses().then((classes) => {
			setAllClasses(classes);
		});
	}, []);
	//console.log(allClasses);
	return (
		<Router>
			<div className="App">
				<div className="App-body">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/createschedule" component={CreateSchedule} />
						<Route exact path="/schedules" component={SchedulesPage} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}
export default App;
