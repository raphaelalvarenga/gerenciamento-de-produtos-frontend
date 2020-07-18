import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import { Button, Space, Input, Collapse, Pagination, Spin, Row, Col } from "antd";
import { SearchOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import RequestInterface from "../interfaces/request-interface";
import Modal from "antd/lib/modal/Modal";
import Toolbar from "../components/Toolbar";

const { Panel } = Collapse;

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
        getProducts(0)
    }, []);

    // This function gets the products
    const getProducts = async (page: number) => {

        // First let's get rid of any data already stored
        setProducts([]);
        
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
                    "name": searchFields.name,
                    "description": searchFields.description,
                    "category": searchFields.category,
                    "pagination": {
                        "initialNumber": page,
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

    // This will trigger if user wants to edit a register
    const editProduct = async (product: ProductInterface) => {
        const {idProduct, name, description, category, price} = product;

        const request: RequestInterface = {
            token: localStorage.getItem("token")!,
            action: "editProduct",
            idLogin: parseInt(JSON.stringify(localStorage.getItem("idLogin"))),
            params: { idProduct, name, description, category, price}
        }

        const req = await fetch(`${config.url}/edit-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })

        const response: ResponseInterface = await req.json();

        if (response.success) {
            setProducts(
                products.map(
                    productLoop => product === productLoop ? {...product, nameLabel: product.name} : productLoop
                )
            );
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
            setProducts(products.map(productLoop => product === productLoop ? {...productLoop, status: 0} : productLoop));
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
                        onPressEnter = {() => getProducts(0)}
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
                        onPressEnter = {() => getProducts(0)}
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
                        onPressEnter = {() => getProducts(0)}
                    />
                </Col>
            </Row>

            <Row justify = "center" style = {{marginBottom: "40px"}} gutter = {16}>
                <Col>
                    <Button type = "primary" icon = {<SearchOutlined />} onClick = {() => getProducts(0)}>Search</Button>
                </Col>

                <Col>
                    <Button
                        icon = {<DeleteOutlined />}
                        onClick = {() => {
                            setSearchFields({name: "", description: "", category: ""});
                            getProducts(0);
                        }}
                        danger
                    >Clean</Button>
                </Col>
            </Row>

            <div style = {{maxWidth: "1200px", margin: "auto"}}>
            {
                products.length > 0 ? (
                    <>
                    <Row justify = "center">
                        <Col>
                            <Pagination
                                defaultCurrent = {1}
                                total = {totalProducts}
                                onChange = {(page) => getProducts(page)}
                                showSizeChanger = {false}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span = {4}></Col>
                        <Col span = {4}>Name</Col>
                        <Col span = {4}>Description</Col>
                        <Col span = {4}>Category</Col>
                        <Col span = {4}>Price</Col>
                        <Col span = {4}>Action</Col>
                    </Row>
                    <Collapse>
                        {
                            products.map((product: ProductInterface, index: number) => (
                                <Panel header = {(
                                    <>
                                        {product.status === 1 &&
                                            <Row
                                            
                                            align = "middle"
                                            style = {{
                                                backgroundColor: index % 2 === 0 ? "rgb(240, 240, 240)" : "white"
                                            }}>
                                                <Col span = {4}>
                                                    <img src = {require("../images/caravatar120x90.png")} alt = "car-profile" />
                                                </Col>
                                                <Col span = {4}>{product.nameLabel}</Col>
                                                <Col span = {4}>{product.description}</Col>
                                                <Col span = {4}>{product.category}</Col>
                                                <Col span = {4}>{product.price}</Col>
                                                <Col span = {4}>
                                                    <Space>
                                                        <Button danger onClick = {() => setModal({visible: true, product})}>Delete</Button>
                                                    </Space>
                                                </Col>
                                            </Row>
                                            }
                                        </>
                                    )} key = {product.idProduct}>
                                        <Row justify = "center" gutter = {16}>
                                            <Col flex = "300px">
                                                <Input
                                                    placeholder = "Name"
                                                    value = {product.name}
                                                    onChange = {
                                                        (e) => setProducts(products.map(
                                                            productLoop => productLoop.idProduct === product.idProduct?
                                                                {...product, name: e.target.value} : productLoop
                                                        ))
                                                    }
                                                />
                                            </Col>

                                            <Col flex = "300px">
                                                <Input
                                                    placeholder = "Description"
                                                    value = {product.description}
                                                    onChange = {
                                                        (e) => setProducts(products.map(
                                                            productLoop => productLoop.idProduct === product.idProduct?
                                                                {...product, description: e.target.value} : productLoop
                                                        ))
                                                    }
                                                />
                                            </Col>

                                            <Col flex = "300px">
                                                <Input
                                                    placeholder = "Category"
                                                    value = {product.category}
                                                    onChange = {
                                                        (e) => setProducts(products.map(
                                                            productLoop => productLoop.idProduct === product.idProduct?
                                                                {...product, category: e.target.value} : productLoop
                                                        ))
                                                    }
                                                />
                                            </Col>

                                            <Col flex = "300px">
                                                <Input
                                                    placeholder = "Price"
                                                    value = {product.price}
                                                    onChange = {
                                                        (e) => setProducts(products.map(
                                                            productLoop => productLoop.idProduct === product.idProduct?
                                                                {...product, price: e.target.value} : productLoop
                                                        ))
                                                    }
                                                />
                                            </Col>
                                        </Row>

                                        <Row justify = "center" gutter = {16}>
                                            <Col>
                                                <Button
                                                    icon = {<SaveOutlined />}
                                                    type = "primary"
                                                    onClick = {() => editProduct(product)}
                                                >Save</Button>
                                            </Col>
                                        </Row>
                                    </Panel>
                                ))
                            }
                        </Collapse>
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