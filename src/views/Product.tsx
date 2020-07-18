import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import { Button, Input, Spin, Row, Col, Switch } from "antd";
import { RouteComponentProps } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import "../assets/styles.css";

const Product: FunctionComponent<RouteComponentProps> = (props) => {

    const [product, setProduct] = useState<ProductInterface>({
        idProduct: 0, name: "", description: "", category: "", price: "", status: 0
    })

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {

        const request = await fetch(`${config.url}/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "action": "listProducts",
                "idLogin": localStorage.getItem("idLogin"),
                "params": {
                    "idProduct": (props.match.params as {id: number}).id
                }
            })
        });

        const response: ResponseInterface = await request.json();

        // If the response is successful, the alert will feedback the user
        if (response.success) {
            setProduct(response.params);

            return false;
        }
    }

    return (
        <>
            <Toolbar
                makeLogout = {() => props.history.push("/logout")}
                listProducts = {() => props.history.push("/")}
                addProduct = {() => props.history.push("/add-product")}
                addUser = {() => props.history.push("/add-user")}
            />

            {product.idProduct > 0 ? (
                <Row style = {{maxWidth: "1200px", margin: "40px auto 20px auto"}} gutter = {16}>
                    <Col>
                        <img src = {require("../images/caravatar.png")} style = {{maxWidth: "400px"}} alt = "product-profile" />
                    </Col>

                    <Col flex = "auto">
                        <Col>
                            <h2>ID: {product.idProduct}</h2>
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Row gutter = {16}>
                                <Col>Status:</Col>
                                <Col>
                                    <Switch
                                        checked = {product.status === 1 ? true : false}
                                        onChange = {() => setProduct({...product, status: product.status === 1 ? 0 : 1})}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Input
                                placeholder = "Insert the product name"
                                value = {product.name}
                                onChange = {(e) => setProduct({...product, name: e.target.value})}
                            />
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Input
                                placeholder = "Insert the product description"
                                value = {product.description}
                            />
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Input
                                placeholder = "Insert the product category"
                                value = {product.category}
                            />
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Input
                                placeholder = "Insert the product price"
                                value = {product.price}
                            />
                        </Col>

                        <Col className = "col-margin-bottom-10">
                            <Button type = "primary">Save</Button>
                        </Col>
                    </Col>
                </Row>
            ) : (
                <Row justify = "center" style = {{marginTop: "100px"}}>
                    <Col>
                        <Spin size = "large" />
                    </Col>
                </Row>
            )}
            
        </>
    )
}

export default Product;