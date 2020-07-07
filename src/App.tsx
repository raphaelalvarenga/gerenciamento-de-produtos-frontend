import React, { FunctionComponent } from "react";
import './assets/styles.css';
import Routes from "./components/Routes";
import { BrowserRouter, Link } from "react-router-dom";
import { Drawer, List } from "antd";

const App: FunctionComponent = () => {

    const [isDrawerVisible, setIsDrawerVisible] = React.useState<boolean>(false);
    const routes: {id: number, name: string, route: string}[] = [
        {id: 1, name: "Home", route: "/"},
        {id: 2, name: "Add User", route: "/add-user"}
    ]

    return (
        <BrowserRouter>
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