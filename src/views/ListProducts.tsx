import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import { Button, Input, Pagination, Spin, Row, Col } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link } from "react-router-dom";
import RequestInterface from "../interfaces/request-interface";
import Modal from "antd/lib/modal/Modal";

const ListProducts: FunctionComponent<RouteComponentProps> = (props) => {

    // This state will store all products
    const [products, setProducts] = useState<ProductInterface[]>([]);
    
    // This is used to ask user if he/she really wants to delete a register
    const [modal, setModal] = React.useState<{visible: boolean, product: ProductInterface}>({
        visible: false, product: {
            idProduct: 0, name: "", description: "", category: "", price: "", status: 0
        }});

    // This is for the filter fields
    const [searchFields, setSearchFields] = React.useState<{name: string, description: string, category: string}>({
        name: "", description: "", category: ""
    });

    // This will store the total products
    const [totalProducts, setTotalProducts] = React.useState<number>(1);
    
    // When the page starts, the products must be loaded...
    useEffect(() => {
        getProducts(1)
    }, []);

    // This function gets the products
    const getProducts = async (page: number) => {

        // First let's get rid of any data already stored
        setProducts([]);
        
        const request = await fetch(`${config.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "action": "listProducts",
                "idLogin": localStorage.getItem("idLogin"),
                "params": {
                    "name": searchFields.name,
                    "description": searchFields.description,
                    "category": searchFields.category,
                    "pagination": {
                        "initialNumber": (page - 1) * 10,
                        "finalNumber": 10
                    }
                }
            })
        });

        const response: ResponseInterface = await request.json();

        // If the response is successful, the alert will feedback the user
        if (response.success) {
            const productsWithLabel: ProductInterface[] = (response.params.products as ProductInterface[]).map(
                product => {
                    const {idProduct, name, description, category, price, status} = product;
                    return {
                        idProduct, name, description,
                        category, price, status, nameLabel: name
                    }
                }
            )

            setTotalProducts(response.params.totalProducts);
            setProducts(productsWithLabel);

            return false;
        }
        
        // If the token has expired, redirect to /login page
        if (response.message === "Invalid-token") {
                localStorage.setItem("token", "");
                props.history.push("/login");
                return false;
        }
    }

    // This will trigger if user wants to delete a register
    const deleteProduct = async (product: ProductInterface) => {
        const request: RequestInterface = {
            token: localStorage.getItem("token")!,
            action: "deleteProduct",
            idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
            params: {
                idProduct: product.idProduct
            }
        }

        const req = await fetch(`${config.url}/delete-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const response: ResponseInterface = await req.json();

        if (response.success) {
            getProducts(1);
        }
    }
    
    return (
        <>
            <Row style = {{maxWidth: "1200px", margin: "40px auto 20px auto"}} justify = "center" gutter = {16}>
                <Col flex = "300px">
                    <Input
                        placeholder = "Name"
                        value = {searchFields.name}
                        onChange = {
                            (e) => setSearchFields({
                                ...searchFields,
                                name: e.target.value
                            })
                        }
                        onPressEnter = {() => getProducts(1)}
                    />
                </Col>

                <Col flex = "300px">
                    <Input
                        placeholder = "Description"
                        value = {searchFields.description}
                        onChange = {
                            (e) => setSearchFields({
                                ...searchFields,
                                description: e.target.value
                            })
                        }
                        onPressEnter = {() => getProducts(1)}
                    />
                </Col>

                <Col flex = "300px">
                    <Input
                        placeholder = "Category"
                        value = {searchFields.category}
                        onChange = {
                            (e) => setSearchFields({
                                ...searchFields,
                                category: e.target.value
                            })
                        }
                        onPressEnter = {() => getProducts(1)}
                    />
                </Col>
            </Row>

            <Row justify = "center" style = {{marginBottom: "40px"}} gutter = {16}>
                <Col>
                    <Button type = "primary" icon = {<SearchOutlined />} onClick = {() => getProducts(1)}>Search</Button>
                </Col>

                <Col>
                    <Button
                        icon = {<DeleteOutlined />}
                        onClick = {() => {
                            setSearchFields({name: "", description: "", category: ""});
                            getProducts(1);
                        }}
                        danger
                    >Clean</Button>
                </Col>
            </Row>

            <Row justify = "center" style = {{marginBottom: "50px"}}>
                <Col>
                    <Pagination
                        defaultCurrent = {1}
                        total = {totalProducts}
                        onChange = {(page) => getProducts(page)}
                        showSizeChanger = {false}
                    />
                </Col>
            </Row>

            <div style = {{maxWidth: "1200px", margin: "auto"}}>
            {
                products.length > 0 ? (
                    <>
                        <table style = {{maxWidth: "1200px", width: "100%"}}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((product: ProductInterface, index: number) => (
                                        <tr
                                            style = {{backgroundColor: index % 2 === 0 ? "white" : "rgba(73, 144, 255, 0.1)"}}
                                            key = {product.idProduct}
                                        >
                                            <td><img src = {require("../images/caravatar120x90.png")} alt = "product-avatar" /></td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <Row gutter = {16}>
                                                    <Col>
                                                        <Link to = {`/product/${product.idProduct}`}><Button>Edit</Button></Link>
                                                    </Col>

                                                    <Col>
                                                        <Button
                                                            danger
                                                            icon = {<DeleteOutlined />}
                                                            onClick = {() => setModal({visible: true, product})}
                                                        />
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <Row justify = "center">
                        <Col>
                            <Spin size = "large" />
                        </Col>
                    </Row>
                )
            }
            </div>

            
            <Modal
                title = "Alert"
                visible = {modal.visible}
                onOk = {() => {
                    setModal({...modal, visible: false});
                    deleteProduct(modal.product);
                }}
                onCancel = {() => setModal({...modal, visible: false})}
            >
                <p><b>Are you sure you want to delete this item?</b></p>
                <p>{modal.product.idProduct}</p>
                <p>{modal.product.name}</p>
                <p>{modal.product.description}</p>
                <p>{modal.product.category}</p>
                <p>{modal.product.price}</p>
            </Modal>
        </>
    )
}
export default ListProducts;