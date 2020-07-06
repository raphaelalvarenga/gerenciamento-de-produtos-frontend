import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import ListProducts from "../views/ListProducts";
import Login from "../views/Login";
import AddUser from "../views/AddUser";

const Routes: FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path = "/" component = {ListProducts} />
            <Route path = "/login" component = {Login} />
            <Route path = "/add-user" component = {AddUser} />
        </Switch>
    )
}

export default Routes;