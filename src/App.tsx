import React, {Component} from 'react';
import {
    Router,
    Route,
} from "react-router-dom";
import './App.css';
import Index from "./components/index";
import Login from "./components/login/login.";
import SignUp from "./components/signUp/signUp";
import history from "./config/history";

function App() {
    return (
        <Router history={history}>
            <Route path="/" exact={true} component={Index}>
            </Route>
            <Route path="/login" component={Login}>
            </Route>
            <Route path="/signup" component={SignUp}>
            </Route>
        </Router>
    );
}

export default App;