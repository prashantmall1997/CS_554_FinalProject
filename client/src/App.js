import logo from "./logo.svg";
import "./App.css";
import { readAllClasses } from "./utils/api";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./Components/FirebaseTest";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchedulesPage from "./Components/SchedulesPage";

function App() {
	const [allClasses, setAllClasses] = useState([]);
	useEffect(() => {
		readAllClasses().then((classes) => {
			setAllClasses(classes);
		});
	}, []);
	console.log(allClasses);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					{allClasses.map((theClass) => {
						return (
							<>
								<p>ID: {theClass._id}</p>
								<p>courseTime: {theClass.courseTime}</p>
								<p>you get the point</p>
							</>
						);
					})}
					{/* <p>ID: {allClasses[0]._id}</p> */}
					{/* <p>courseTime: {allClasses[0].courseTime}</p> */}
					<p>you get the point</p>
				</div>
			</header>
			<FirebaseTest />
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/schedulespage" component={SchedulesPage} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
