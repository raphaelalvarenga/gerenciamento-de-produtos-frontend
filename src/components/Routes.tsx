import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import ListProducts from "../views/ListProducts";
import Login from "../views/Login";

const Routes: FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path = "/" component = {ListProducts} />
            <Route path = "/login" component = {Login} />
        </Switch>
    )
}

export default Routes;