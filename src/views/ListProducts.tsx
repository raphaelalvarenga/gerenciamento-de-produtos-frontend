import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import auth from "../routines/auth";
import { PageHeader, Button } from "antd";
import { MenuOutlined, PoweroffOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { Table, Space } from "antd";

const ListProducts: FunctionComponent<RouteComponentProps> = (props) => {

    const [products, setProducts] = useState<ProductInterface[]>([]);

    useEffect(() => {
        getProducts()
    }, []);

    const columns = [
        {title: "ID", dataIndex: "idProduct", key: "id"},
        {title: "Name", dataIndex: "name", key: "name"},
        {title: "Description", dataIndex: "description", key: "description"},
        {title: "Category", dataIndex: "category", key: "category"},
        {title: "Price", dataIndex: "price", key: "price"},
        {title: "Actions", key: "action", render: () => (
            <Space>
                <Button >Edit</Button>
                <Button danger>Delete</Button>
            </Space>
        )}
    ]

    const getProducts = async () => {
        const endpoint: string = config.url;

        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "action": "listProducts",
                "idLogin": localStorage.getItem("idLogin"),
                "params": {
                    "name": "",
                    "description": "",
                    "category": "",
                    "pagination": {
                        "initialNumber": 0,
                        "finalNumber": 30
                    }
                }
            })
        });

        const response: ResponseInterface = await request.json();
        setProducts(response.params);
    }
    
    return (
        <>
            {auth() && <PageHeader
                className = "site-page-header"
                title = {
                    <Button
                        type = "text"
                        shape = "circle"
                        icon = {<MenuOutlined />}
                        size = "large"
                    />}
                extra = {[
                    <Button
                        key = "1"
                        type = "text"
                        shape = "circle"
                        danger
                        icon = {<PoweroffOutlined />}
                        size = "large"
                        onClick = {() => props.history.push("/logout")}
                    />
                ]}
            />}
            <Table columns = {columns} dataSource = {products} />
        </>
    )
}

export default ListProducts;