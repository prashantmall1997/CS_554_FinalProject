import "./App.css";
import CreateSchedule from "./components/CreateSchedule";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
            <div className="App-body">
                <Route exact path="/createschedule" component={CreateSchedule} />
            </div>
        </div>
    </Router>
  );
}

export default App;