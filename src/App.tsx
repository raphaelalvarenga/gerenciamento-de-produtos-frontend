import React, { FunctionComponent } from "react";
import './assets/styles.css';
import Routes from "./components/Routes";
import { BrowserRouter, Link } from "react-router-dom";
import { Drawer, List, PageHeader, Button } from "antd";
import { MenuOutlined, PoweroffOutlined } from "@ant-design/icons";
import auth from "./routines/auth";

const App: FunctionComponent = () => {

    const [isDrawerVisible, setIsDrawerVisible] = React.useState<boolean>(false);
    const routes: {id: number, name: string, route: string}[] = [
        {id: 1, name: "Home", route: "/"},
        {id: 2, name: "Add User", route: "/add-user"}
    ]

    return (
        <BrowserRouter>
            {!auth() && <PageHeader
                className = "site-page-header"
                title = {
                    <Button
                        type = "text"
                        shape = "circle"
                        icon = {<MenuOutlined />}
                        size = "large"
                        onClick = {() => setIsDrawerVisible(true)}
                    />}
                extra = {[
                    <Link key = "1" to = "/logout"><Button danger icon = {<PoweroffOutlined />}>Logout</Button></Link>
                ]}
            />}
            <Drawer
                title = "Hello, 'User'!"
                placement = "left"
                closable
                onClose = {() => setIsDrawerVisible(false)}
                visible = {isDrawerVisible}
                key = "left"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={routes}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={<Link to = {item.route} onClick = {() => setIsDrawerVisible(false)} style = {{display: "block"}}>{item.name}</Link>}
                        />
                      </List.Item>
                    )}
                />
            </Drawer>

            <Routes />
        </BrowserRouter>
    )
}

export default App;