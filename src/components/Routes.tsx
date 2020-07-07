import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ListProducts from "../views/ListProducts";
import Login from "../views/Login";
import AddUser from "../views/AddUser";
import auth from "../routines/auth";
import Logout from "../views/Logout";
import AddProduct from "../views/AddProduct";

const PrivateRoute = ({ component: Component, ...rest}: any) => (
    <Route
        {...rest}
        render = {props => auth() ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: "/login", state: {from: props.location}}} />
        )}
    />
)

const Routes: FunctionComponent = () => {
    return (
        <Switch>
            <Route path = "/login" component = {Login} />
            <PrivateRoute exact path = "/" component = {ListProducts} />
            <PrivateRoute path = "/add-product" component = {AddProduct} />
            <PrivateRoute path = "/add-user" component = {AddUser} />
            <Route path = "/logout" component = {Logout} />
        </Switch>
    )
}

export default Routes;