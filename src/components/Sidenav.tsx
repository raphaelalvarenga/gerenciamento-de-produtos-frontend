import React, { FunctionComponent } from "react";
import { Drawer } from "antd";
import { List } from "antd";
import { Link } from "react-router-dom";

const Sidenav: FunctionComponent<any> = (props) => {

    const [isDrawerVisible, setIsDrawerVisible] = React.useState<boolean>(false);
    const routes: {id: number, name: string, route: string}[] = [
        {id: 1, name: "Home", route: "/"},
        {id: 2, name: "Add User", route: "/add-user"}
    ]

    return (
        <Drawer
            title = "Welcome!"
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
                        title={
                            <Link
                                to = {item.route}
                                onClick = {() => setIsDrawerVisible(false)}
                                style = {{display: "block"}}
                            >{item.name}</Link>}
                    />
                    </List.Item>
                )}
            />
        </Drawer>
    )
}

export default Sidenav;