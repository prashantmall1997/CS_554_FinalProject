import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Import all components
import Home from "./components/Home";
import Admin from "./components/Admin";
import CreateSchedule from "./components/CreateSchedule";
import SchedulesPage from "./components/SchedulesPage";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Switch>
            <Route exact path="/">
              {useSelector((state) => state.login)[0].isLoggedIn === true ? (
                <Redirect to="/createschedule" />
              ) : (
                <Home />
              )}
            </Route>

            <Route exact path="/admin">
              {useSelector((state) => state.login)[0].isAdmin === true ? (
                <Admin />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route exact path="/createschedule">
              {useSelector((state) => state.login)[0].isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <CreateSchedule />
              )}
            </Route>

            <Route exact path="/schedules">
              {useSelector((state) => state.login)[0].isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <SchedulesPage />
              )}
            </Route>

            <Route exact path="/userprofile">
              {useSelector((state) => state.login)[0].isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <UserProfile />
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
