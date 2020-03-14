import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import './App.css';
import Index from "./components/index";
import Login from "./components/login/login.";
import SignUp from "./components/signUp/signUp";

function App() {
    return (
        <Router>
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