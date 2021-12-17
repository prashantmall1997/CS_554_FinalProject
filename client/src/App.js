import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { readAllClasses, readClassesBySchedule } from "./utils/api/apis/classApi";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./components/FirebaseTest";
import CreateSchedule from "./components/CreateSchedule";
import Admin from "./components/Admin";
import Home from "./components/Home";

function App() {
  const [allClasses, setAllClasses] = useState([]);
  useEffect(() => {
    // readAllClasses().then((classes) => {
    //   setAllClasses(classes);
    // });
    readClassesBySchedule("61bbec42c07e3ad153e05946").then((classes) => {
      setAllClasses(classes);
      console.log(classes);
    })
  }, []);
  //console.log(allClasses);
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/createschedule" component={CreateSchedule} />
        </div>
      </div>
    </Router>
  );
}

export default App;
