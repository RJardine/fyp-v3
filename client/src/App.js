import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
// pages
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alert />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
