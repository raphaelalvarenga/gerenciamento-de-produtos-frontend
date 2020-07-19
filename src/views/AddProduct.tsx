import React, { useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import { Button, Input, Alert, Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import RequestInterface from "../interfaces/request-interface";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

const AddProduct: FunctionComponent<RouteComponentProps> = (props) => {

    // This state will store newProduct's data, filled up in the form
    const [newProduct, setNewProduct] = useState<ProductInterface>({
        idProduct: 0, name: "", description: "", category: "", price: "", status: 0
    });

    // This state will handle the success/error messages
    const [alert, setAlert] = React.useState<{message: string, visible: boolean, type: string}>({
        message: "", visible: false, type: ""
    })

    // This will appear when a request is made
    const [spin, setSpin] = React.useState<boolean>(false);

    // This is triggered when use clicks on Save
    const addProduct = async () => {
        const conditionals: boolean[] = [
            newProduct.name === "",
            newProduct.description === "",
            newProduct.category === "",
            newProduct.price === ""
        ];

        // If one of the conditions above is true...
        if (conditionals.includes(true)) {
            setAlert({message: "Please, fill up the form!", visible: true, type: "error"});
            return false;
        }

        // If everything is right, the request will be made and spin will appear
        setSpin(true);

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

        // If the response is successful, the alert will feedback the user
        if (response.success) {
            setAlert({message: "Product has been saved successfully!", visible: true, type: "success"});
            setNewProduct({...newProduct, name: "", description: "", category: "", price: ""})
            setSpin(false);
            return false;
        }

        // If the token has expired, redirect to /login page
        if (response.message === "Invalid-token") {
            localStorage.setItem("token", "");
            props.history.push("/login");
            setSpin(false);
            return false;
        }
        
        // Any other error, a message will appear
        setAlert({message: "Something went wrong... contact the IT team.", visible: true, type: "error"});
        setSpin(false);
    }
    
    return (
        <>
            <Row style = {{maxWidth: "1200px", marginBottom: "20px", marginTop: "20px"}} justify = "center">
                <Col xs = {12}>
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
            </Row>

            <Row style = {{maxWidth: "1200px", marginBottom: "20px", marginTop: "20px"}} justify = "center">
                <Col xs = {12}>
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

            </Row>

            <Row style = {{maxWidth: "1200px", marginBottom: "20px", marginTop: "20px"}} justify = "center">

                <Col xs = {12}>
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

            </Row>

            <Row style = {{maxWidth: "1200px", marginBottom: "20px", marginTop: "20px"}} justify = "center">

                <Col xs = {12}>
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

            <Row style = {{maxWidth: "1200px", marginBottom: "20px"}} justify = "center" gutter = {16}>
                <Col xs = {12}>
                    <Row gutter = {16}>
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
                </Col>
            </Row>

            <Row style = {{maxWidth: "1200px", margin: "40px auto 20px auto"}} justify = "center" gutter = {16}>
                {alert.visible && alert.type === "success" && <Alert message = {alert.message} type = "success" />}
                {alert.visible && alert.type === "error" && <Alert message = {alert.message} type = "error" />}
            </Row>

            {
                spin && <Row justify = "center">
                    <Col>
                        <Spin size = "large" />
                    </Col>
                </Row>
            }
        </>
    )
}

export default AddProduct;