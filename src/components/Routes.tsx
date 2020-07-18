import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ListProducts from "../views/ListProducts";
import Login from "../views/Login";
import AddUser from "../views/AddUser";
import auth from "../routines/auth";
import Logout from "../views/Logout";
import AddProduct from "../views/AddProduct";
import Product from "../views/Product";

// This component represents those routes that user must be logged in to navigate through
const PrivateRoute = ({ component: Component, ...rest}: any) => (
    <Route
        {...rest}
        render = {props => !auth() ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: "/login", state: {from: props.location}}} />
        )}
    />
)

// These are the routes!
const Routes: FunctionComponent = () => {
    return (
        <Switch>
            <Route path = "/login" component = {Login} />
            <PrivateRoute exact path = "/" component = {ListProducts} />
            <PrivateRoute exact path = "/product/:id" component = {Product} />
            <PrivateRoute path = "/add-product" component = {AddProduct} />
            <PrivateRoute path = "/add-user" component = {AddUser} />
            <Route path = "/logout" component = {Logout} />
        </Switch>
    )
}

export default Routes;