import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Detail from "../routes/Detail";
import "./reset.css";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/:id" component={Detail}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default App;
