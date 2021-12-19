
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./components/FirebaseTest";
import CreateSchedule from "./components/CreateSchedule";
import Admin from "./components/Admin";
import Home from "./components/Home";
import { readAllClasses } from "./utils/api";
import UserProfile from './components/UserProfile';
import { readClassesBySchedule } from "./utils/api/apis/classApi";
//import FirebaseTest from "./components/FirebaseTest";


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
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/createschedule" component={CreateSchedule} />
          <Route exact path="/userProfile" component={UserProfile} />
        </div>
      </div>
    </Router>
  );

}

export default App;
