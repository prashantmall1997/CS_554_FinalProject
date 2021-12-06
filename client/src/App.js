import './App.css';
import { readAllClasses } from "./utils/api";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import userProfile from './components/userProfile';


function App() {
  const [allClasses, setAllClasses] = useState([]);
  useEffect(() => {
    readAllClasses().then((classes) => {
      setAllClasses(classes);
    });
  }, []);
  console.log(allClasses);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {allClasses.map((theClass) => {
            return(
              <>
                <p>ID: {theClass._id}</p>
                <p>courseTime: {theClass.courseTime}</p>
                <p>you get the point</p>
              </>
            );
          })}
          {/* <p>ID: {allClasses[0]._id}</p>
          <p>courseTime: {allClasses[0].courseTime}</p>
          <p>you get the point</p> */}
        </div>
      </header>
      <Router>
          <Route exact path="/userProfile" component = { userProfile } />
      </Router>
    </div>
  );
}

export default App;
