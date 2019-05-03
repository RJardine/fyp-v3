import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./redux/utils/setAuthToken";
import { loadUser } from "./redux/actions/authAction";
// pages
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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
};

export default App;
