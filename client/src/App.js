import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchedulesPage from "./components/SchedulesPage";
import React from "react";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/schedulespage" component={SchedulesPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
