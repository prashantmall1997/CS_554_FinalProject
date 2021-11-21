import "./App.css";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
            <div className="App-body">
                <Route exact path="/admin" component={Admin} />
            </div>
        </div>
    </Router>
  );
}

export default App;