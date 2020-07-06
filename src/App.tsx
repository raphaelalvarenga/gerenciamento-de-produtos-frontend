import React, { FunctionComponent } from "react";
import './assets/styles.css';
import Routes from "./components/Routes";
import { BrowserRouter, Link } from "react-router-dom";

const App: FunctionComponent = () => (
    <BrowserRouter>
        <div><Link to = "/">List Products</Link></div>
        <div><Link to = "/login">Login</Link></div>
        <Routes />
    </BrowserRouter>
)

export default App;