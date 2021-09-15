
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './containers/layout/Navbar.js';
import LoginPage from './containers/auth/LoginPage.js';
import SignUpPage from './containers/auth/SignUpPage.js';


import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import "./App.css";
import WeekViewPage from './containers/calendar/WeekViewPage.js';
import PrivateRoute from './utils/PrivateRoute.js';

import axios from 'axios'

axios.defaults.baseURL = "http://34.211.173.231:5000/"



if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Navbar  />
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/calendar" component={WeekViewPage} />
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
