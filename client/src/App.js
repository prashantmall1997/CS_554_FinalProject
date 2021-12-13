import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { readAllClasses } from "./utils/api";
import React, { useEffect, useState } from "react";
import FirebaseTest from "./Components/FirebaseTest";
import CreateSchedule from "./components/CreateSchedule";

function App() {
  const [allClasses, setAllClasses] = useState([]);
  useEffect(() => {
    readAllClasses().then((classes) => {
      setAllClasses(classes);
    });
  }, []);
  console.log(allClasses);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {allClasses.map((theClass) => {
              return (
                <>
                  <p>ID: {theClass._id}</p>
                  <p>courseTime: {theClass.courseTime}</p>
                  <p>you get the point</p>
                </>
              );
            })}
            {/* <p>ID: {allClasses[0]._id}</p> */}
            {/* <p>courseTime: {allClasses[0].courseTime}</p> */}
            <p>you get the point</p>
          </div>
        </header>
        <FirebaseTest />
            <div className="App-body">
                <Route exact path="/createschedule" component={CreateSchedule} />
            </div>
      </div>
    </Router>
  );
}

export default App;