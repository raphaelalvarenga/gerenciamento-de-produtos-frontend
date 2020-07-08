import React, { FunctionComponent } from "react";
import './assets/styles.css';
import Routes from "./components/Routes";
import { BrowserRouter, Link } from "react-router-dom";

const App: FunctionComponent = () => {

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

export default App;