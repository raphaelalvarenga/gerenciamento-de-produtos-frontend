import React, { useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import auth from "../routines/auth";
import { Button, Space, Input, Alert } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import RequestInterface from "../interfaces/request-interface";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

const AddProduct: FunctionComponent<RouteComponentProps> = (props) => {

    const [newProduct, setNewProduct] = useState<ProductInterface>({
        idProduct: 0, name: "", description: "", category: "", price: "", status: 0
    });

    const [alert, setAlert] = React.useState<{message: string, visible: boolean, type: string}>({
        message: "", visible: false, type: ""
    })

    const addProduct = async () => {
        const conditionals: boolean[] = [
            newProduct.name === "",
            newProduct.description === "",
            newProduct.category === "",
            newProduct.price === ""
        ];

        if (conditionals.includes(true)) {
            setAlert({message: "Please, fill up the form!", visible: true, type: "error"});
            return false;
        }

        const request: RequestInterface = {
            token: localStorage.getItem("token")!,
            action: "addProduct",
            idLogin: parseInt(localStorage.getItem("idLogin")!),
            params: newProduct
        }

        const req = await fetch(`${config.url}/add-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const response: ResponseInterface = await req.json();

        if (response.success) {
            setAlert({message: "Product has been saved successfully!", visible: true, type: "success"});
            setNewProduct({...newProduct, name: "", description: "", category: "", price: ""})
        } else {
            setAlert({message: "Something went wrong... contact the IT team.", visible: true, type: "error"});
        }
    }
    
    return (
        <>
            <Row style = {{maxWidth: "1200px", margin: "40px auto 20px auto"}} justify = "center" gutter = {16}>
                <Col flex = "300px">
                    <Input
                        placeholder = "Name"
                        value = {newProduct.name}
                        onChange = {
                            (e) => setNewProduct({
                                ...newProduct,
                                name: e.target.value
                            })
                        }
                    />
                </Col>

                <Col flex = "300px">
                    <Input
                        placeholder = "Description"
                        value = {newProduct.description}
                        onChange = {
                            (e) => setNewProduct({
                                ...newProduct,
                                description: e.target.value
                            })
                        }
                    />
                </Col>

                <Col flex = "300px">
                    <Input
                        placeholder = "Category"
                        value = {newProduct.category}
                        onChange = {
                            (e) => setNewProduct({
                                ...newProduct,
                                category: e.target.value
                            })
                        }
                    />
                </Col>

                <Col flex = "300px">
                    <Input
                        placeholder = "Price"
                        value = {newProduct.price}
                        onChange = {
                            (e) => setNewProduct({
                                ...newProduct,
                                price: e.target.value
                            })
                        }
                    />
                </Col>
            </Row>

            <Row justify = "center" gutter = {16}>
                <Col>
                    <Button
                        icon = {<SaveOutlined />}
                        type = "primary"
                        onClick = {addProduct}
                    >Save</Button>
                </Col>

                <Col>
                    <Button
                        icon = {<DeleteOutlined />}
                        danger
                        onClick = {() => setNewProduct({
                            ...newProduct,
                            name: "",
                            description: "",
                            category: "",
                            price: ""
                        })}
                    >Clean</Button>
                </Col>
            </Row>

            <Row style = {{maxWidth: "1200px", margin: "40px auto 20px auto"}} justify = "center" gutter = {16}>
                {alert.visible && alert.type === "success" && <Alert message = {alert.message} type = "success" />}
                {alert.visible && alert.type === "error" && <Alert message = {alert.message} type = "error" />}
            </Row>
        </>
    )
}

export default AddProduct;