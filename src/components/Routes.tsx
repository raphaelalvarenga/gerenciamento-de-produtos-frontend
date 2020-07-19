import React, { FunctionComponent, useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import ListProducts from "../views/ListProducts";
import Login from "../views/Login";
import AddUser from "../views/AddUser";
import auth from "../routines/auth";
import Logout from "../views/Logout";
import AddProduct from "../views/AddProduct";
import Product from "../views/Product";
import { PageHeader, Row, Col, Button, Drawer, List } from "antd";
import { MenuOutlined, PoweroffOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { pageHeaderToggle } from "../actions/PageHeaderAction";
import "../assets/styles.css";

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
const Routes: FunctionComponent = (props: any) => {

    const [sidenav, setSidenav] = useState<boolean>(false);

    useEffect(() => {
        if (!auth()) {
            props.pageHeaderToggle(true)
        }
    }, [])
    
    return (
        <>
            <PageHeader
                className = "site-page-header"
                style = {{display: props.isPageHeaderVisible ? "block" : "none"}}
                title = {
                    <Row gutter = {16}>
                        <Col>
                            <Button icon = {<MenuOutlined />} type = "text" onClick = {() => setSidenav(true)} />
                        </Col>
                    </Row>
                }
                extra = {[
                    <Link to = "/logout" key = "1">

                        <Button
                            type = "text"
                            size = "large"
                            danger
                            icon = {<PoweroffOutlined />}
                        />
                    </Link>
                ]}
            />

            <Drawer
                title = "Welcome!"
                placement = "left"
                closable
                visible = {sidenav}
                key = "left"
                onClose = {() => setSidenav(false)}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={[
                        {id: 1, name: "Home", route: "/"},
                        {id: 2, name: "Add Product", route: "/add-product"},
                        {id: 3, name: "Add User", route: "/add-user"}
                    ]}
                    renderItem={item => (
                        <List.Item>
                        <List.Item.Meta
                            title={
                                <Link
                                    to = {item.route}
                                    style = {{display: "block"}}
                                    onClick = {() => setSidenav(false)}
                                >{item.name}</Link>
                            }
                        />
                        </List.Item>
                    )}
                />
            </Drawer>
            
            <Switch>
                <Route path = "/login" component = {Login} />
                <PrivateRoute exact path = "/" component = {ListProducts} />
                <PrivateRoute exact path = "/product/:id" component = {Product} />
                <PrivateRoute path = "/add-product" component = {AddProduct} />
                <PrivateRoute path = "/add-user" component = {AddUser} />
                <Route path = "/logout" component = {Logout} />
            </Switch>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        isPageHeaderVisible: state.pageHeader.visible
    }
}

export default connect(mapStateToProps, { pageHeaderToggle })(Routes);