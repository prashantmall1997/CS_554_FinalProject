import './App.css';
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
            <div className="App-body">
                <Route exact path="/" component={Home} />
            </div>
        </div>
    </Router>
  );
}

export default App;
