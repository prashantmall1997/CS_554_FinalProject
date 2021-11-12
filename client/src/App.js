import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SchedulesPage from "./components/SchedulesPage";
import Error from "./components/Error";
import React from "react";
import "./App.css";
import ProfilePage from "./components/ProfilePage";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/schedulespage" component={SchedulesPage} />
					<Route exact path="/profilepage" component={ProfilePage} />
					<Route exact path="*" component={Error} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
