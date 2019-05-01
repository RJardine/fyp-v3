import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// pages
import Navbar from "./components/layout/Navbar";
import "./App.css";

const App = () => (
  <Fragment>
    <Router>
      <Navbar />
    </Router>
  </Fragment>
);

export default App;
