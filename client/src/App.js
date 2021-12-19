import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Import all components
import Home from "./components/Home";
import Admin from "./components/Admin";
import CreateSchedule from "./components/CreateSchedule";
import SchedulesPage from "./components/SchedulesPage";

function App() {
  const loggedIn = useSelector((state) => state.login).isLoggedIn;
  console.log(loggedIn);
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Switch>
            <Route exact path="/">
              {useSelector((state) => state.login).isLoggedIn === true ? (
                <Redirect to="/schedules" />
              ) : (
                <Home />
              )}
            </Route>

            <Route exact path="/admin">
              {useSelector((state) => state.login).isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <Admin />
              )}
            </Route>

            <Route exact path="/createschedule">
              {useSelector((state) => state.login).isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <CreateSchedule />
              )}
            </Route>

            <Route exact path="/schedules">
              {useSelector((state) => state.login).isLoggedIn === false ? (
                <Redirect to="/" />
              ) : (
                <SchedulesPage />
              )}
            </Route>

            {/* <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/createschedule" component={CreateSchedule} />
            <Route exact path="/schedules" component={SchedulesPage} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
