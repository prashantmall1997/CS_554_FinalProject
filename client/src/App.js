
import Home from "./components/Home";


import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { readAllClasses } from "./utils/api";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./components/FirebaseTest";
import CreateSchedule from "./components/CreateSchedule";

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
            </div>
        </div>
    </Router>
  );
}

export default App;