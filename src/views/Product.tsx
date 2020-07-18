import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import { Button, Input, Spin, Row, Col, Switch, Alert } from "antd";
import { RouteComponentProps } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import "../assets/styles.css";
import RequestInterface from "../interfaces/request-interface";

const Product: FunctionComponent<RouteComponentProps> = (props) => {

    const [product, setProduct] = useState<ProductInterface>({
        idProduct: 0, name: "", description: "", category: "", price: "", status: 0
    })

    const [alert, setAlert] = React.useState<{show: boolean, message: string, type: string}>({show: false, message: "", type: ""})
    const [spin, setSpin] = React.useState<boolean>(false);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {

        setSpin(true);

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
        }

        setSpin(false);
    }

    // This will trigger if user wants to edit a register
    const editProduct = async () => {

        setAlert({show: false, message: "", type: ""});

        const {idProduct, name, description, category, price, status} = product;

        const request: RequestInterface = {
            token: localStorage.getItem("token")!,
            action: "editProduct",
            idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
            params: { idProduct, name, description, category, price, status: status === 1 ? true : false }
        }

        setSpin(true);
        
        const req = await fetch(`${config.url}/edit-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })

        const response: ResponseInterface = await req.json();
        console.log(response);

        response.success ?
            setAlert({show: true, message: "Product updated successfully", type: "success"})
            :
            setAlert({show: true, message: `There was an error: ${response.message}`, type: "error"})

        setSpin(false);
    }

    return (
        <>
            <Toolbar
                makeLogout = {() => props.history.push("/logout")}
                listProducts = {() => props.history.push("/")}
                addProduct = {() => props.history.push("/add-product")}
                addUser = {() => props.history.push("/add-user")}
            />

            {product.idProduct > 0 && (
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
                            <Button type = "primary" onClick = {editProduct}>Save</Button>
                        </Col>
                    </Col>
                </Row>
            )}

            <Row justify = "center">
                <Col style = {{display: spin ? "block" : "none", marginTop: "100px"}}>
                    <Spin size = "large" />
                </Col>
            </Row>

            <Row style = {{maxWidth: "1200px", marginTop: "100px"}} justify = "center">
                {alert.show && alert.type === "error" && <Alert type = "error" message = {alert.message} />}
                {alert.show && alert.type === "success" && <Alert type = "success" message = {alert.message} />}
            </Row>
            
        </>
    )
}

export default Product;