import React, { FunctionComponent } from "react";
import { PageHeader, Button, Row, Col } from "antd";
import { PoweroffOutlined, CarOutlined, UserOutlined, OrderedListOutlined } from "@ant-design/icons";

const Toolbar: FunctionComponent<any> = (props) => {
    return <PageHeader
                className = "site-page-header"
                style = {{maxWidth: "1200px", margin: "auto"}}
                title = {
                    <Row gutter = {16}>
                        <Col>
                            <Button
                                type = "primary"
                                icon = {<OrderedListOutlined />}
                                onClick = {() => props.listProducts()}
                            >List Products</Button>
                        </Col>

                        <Col>
                            <Button
                                type = "primary"
                                icon = {<CarOutlined />}
                                onClick = {() => props.addProduct()}
                            >Add Product</Button>
                        </Col>

                        <Col>
                            <Button
                                type = "primary"
                                icon = {<UserOutlined />}
                                onClick = {() => props.addUser()}
                            >Add User</Button>
                        </Col>
                    </Row>
                }
                extra = {[
                    <Button
                        key = "1"
                        type = "text"
                        size = "large"
                        danger
                        icon = {<PoweroffOutlined />}
                        onClick = {() => props.makeLogout()} 
                    />
                ]}
            />
}

export default Toolbar;