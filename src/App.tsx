import React, { FunctionComponent } from "react";
import './assets/styles.css';
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers/Reducers";

let store = createStore(Reducers);

const App: FunctionComponent = () => {

    return (
        <Provider store = {store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}

export default App;