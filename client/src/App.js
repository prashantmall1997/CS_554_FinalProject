import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import userProfile from './components/userProfile';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/userProfile" component = { userProfile } />
      </Router>
    </div>
  );
}

export default App;
