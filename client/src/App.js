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
import CreateProfile from "./components/Account/profile-form/CreateProfile";
import EditProfile from "./components/Account/profile-form/EditProfile";

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
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
