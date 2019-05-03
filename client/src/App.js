import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DarkModeToggle from "./darkmode/DarkmodeToggle";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./redux/utils/setAuthToken";
import { loadUser } from "./redux/actions/authAction";

// privateRoute
import PrivateRoute from "./private/PrivateRoute";
// pages
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Account/Dashboard";

// load first time user loads
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect hook
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <DarkModeToggle />
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
