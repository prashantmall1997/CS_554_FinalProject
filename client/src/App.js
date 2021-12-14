
import Home from "./components/Home";


import "./App.css";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { readAllClasses } from "./utils/api/apis/classApi";


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
            <div className="App-body">
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Admin} />
            </div>
        </div>
    </Router>
  );
}

export default App;