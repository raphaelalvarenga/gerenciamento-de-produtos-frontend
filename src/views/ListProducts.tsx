import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";
import auth from "../routines/auth";
import { PageHeader, Button, Space, Input, Collapse } from "antd";
import { MenuOutlined, PoweroffOutlined, SearchOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import RequestInterface from "../interfaces/request-interface";
import Modal from "antd/lib/modal/Modal";

const { Panel } = Collapse;

const ListProducts: FunctionComponent<RouteComponentProps> = (props) => {

    const [products, setProducts] = useState<ProductInterface[]>([
        {
            "idProduct": 1,
            "name": "Frontier",
            "description": "2008",
            "category": "Nissan",
            "price": "$288486.27",
            "status": 1
        },
        {
            "idProduct": 2,
            "name": "Ranger",
            "description": "1995",
            "category": "Ford",
            "price": "$463152.42",
            "status": 1
        },
        {
            "idProduct": 3,
            "name": "Grand Prix",
            "description": "1999",
            "category": "Pontiac",
            "price": "$49478.41",
            "status": 1
        },
        {
            "idProduct": 4,
            "name": "Aerostar",
            "description": "1992",
            "category": "Ford",
            "price": "$256064.23",
            "status": 1
        },
        {
            "idProduct": 5,
            "name": "Eurovan",
            "description": "2001",
            "category": "Volkswagen",
            "price": "$136835.56",
            "status": 1
        },
        {
            "idProduct": 6,
            "name": "Lanos",
            "description": "1999",
            "category": "Daewoo",
            "price": "$637850.13",
            "status": 1
        },
        {
            "idProduct": 7,
            "name": "Outback",
            "description": "2009",
            "category": "Subaru",
            "price": "$701557.02",
            "status": 1
        },
        {
            "idProduct": 8,
            "name": "Aurora",
            "description": "2001",
            "category": "Oldsmobile",
            "price": "$29620.86",
            "status": 1
        },
        {
            "idProduct": 9,
            "name": "Continental",
            "description": "2010",
            "category": "Bentley",
            "price": "$695516.77",
            "status": 1
        },
        {
            "idProduct": 10,
            "name": "Reatta",
            "description": "1990",
            "category": "Buick",
            "price": "$832108.56",
            "status": 1
        },
        {
            "idProduct": 11,
            "name": "Tundra",
            "description": "2009",
            "category": "Mitsubishi",
            "price": "$984629.10",
            "status": 1
        },
        {
            "idProduct": 12,
            "name": "Suburban 2500",
            "description": "1996",
            "category": "Chevrolet",
            "price": "$357960.94",
            "status": 1
        },
        {
            "idProduct": 13,
            "name": "Mazda3",
            "description": "2011",
            "category": "Mazda",
            "price": "$124051.30",
            "status": 1
        },
        {
            "idProduct": 14,
            "name": "Monte Carlo",
            "description": "2004",
            "category": "Chevrolet",
            "price": "$253250.38",
            "status": 1
        },
        {
            "idProduct": 15,
            "name": "929",
            "description": "1995",
            "category": "Mazda",
            "price": "$946244.70",
            "status": 1
        },
        {
            "idProduct": 16,
            "name": "Avalon",
            "description": "2007",
            "category": "Toyota",
            "price": "$208023.10",
            "status": 1
        },
        {
            "idProduct": 17,
            "name": "A4",
            "description": "1997",
            "category": "Audi",
            "price": "$553787.96",
            "status": 1
        },
        {
            "idProduct": 18,
            "name": "Grand Marquis",
            "description": "1993",
            "category": "Mercury",
            "price": "$354244.52",
            "status": 1
        },
        {
            "idProduct": 19,
            "name": "1500",
            "description": "1998",
            "category": "Chevrolet",
            "price": "$59619.59",
            "status": 1
        },
        {
            "idProduct": 20,
            "name": "Ram 1500",
            "description": "2009",
            "category": "Dodge",
            "price": "$262897.58",
            "status": 1
        },
        {
            "idProduct": 21,
            "name": "RDX",
            "description": "2010",
            "category": "Acura",
            "price": "$586308.21",
            "status": 1
        },
        {
            "idProduct": 22,
            "name": "Outback",
            "description": "2002",
            "category": "Subaru",
            "price": "$207736.33",
            "status": 1
        },
        {
            "idProduct": 23,
            "name": "900",
            "description": "1995",
            "category": "Saab",
            "price": "$481460.50",
            "status": 1
        },
        {
            "idProduct": 24,
            "name": "F150",
            "description": "1993",
            "category": "Ford",
            "price": "$772956.39",
            "status": 1
        },
        {
            "idProduct": 25,
            "name": "FSeries",
            "description": "1990",
            "category": "Ford",
            "price": "$940121.07",
            "status": 1
        },
        {
            "idProduct": 26,
            "name": "Pathfinder",
            "description": "1997",
            "category": "Nissan",
            "price": "$920561.21",
            "status": 1
        },
        {
            "idProduct": 27,
            "name": "626",
            "description": "2001",
            "category": "Mazda",
            "price": "$232629.12",
            "status": 1
        },
        {
            "idProduct": 28,
            "name": "Silverado 2500",
            "description": "2010",
            "category": "Chevrolet",
            "price": "$401676.33",
            "status": 1
        },
        {
            "idProduct": 29,
            "name": "Mystique",
            "description": "1998",
            "category": "Mercury",
            "price": "$699181.58",
            "status": 1
        },
        {
            "idProduct": 30,
            "name": "Grand Cherokee",
            "description": "2011",
            "category": "Jeep",
            "price": "$772844.18",
            "status": 1
        }
    ]);
    
    const [modal, setModal] = React.useState<{visible: boolean, product: ProductInterface}>({
        visible: false, product: {
            idProduct: 0, name: "", description: "", category: "", price: "", status: 0
        }});

    const [searchFields, setSearchFields] = React.useState<{name: string, description: string, category: string}>({
        name: "", description: "", category: ""
    });
        
    useEffect(() => {
        // getProducts()
    }, []);

    const getProducts = async () => {

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
                        "initialNumber": 0,
                        "finalNumber": 30
                    }
                }
            })
        });

        const response: ResponseInterface = await request.json();
        if (response.success) {
            const productsWithLabel: ProductInterface[] = (response.params as ProductInterface[]).map(
                product => {
                    const {idProduct, name, description, category, price, status} = product;
                    return {
                        idProduct, name, description,
                        category, price, status, nameLabel: name
                    }
                }
            )

            setProducts(productsWithLabel);
        }
    }

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
                    />
                </Col>
            </Row>

            <Row justify = "center" style = {{marginBottom: "40px"}} gutter = {16}>
                <Col>
                    <Button type = "primary" icon = {<SearchOutlined />} onClick = {() => getProducts()}>Search</Button>
                </Col>

                <Col>
                    <Button
                        icon = {<DeleteOutlined />}
                        onClick = {() => {
                            setSearchFields({name: "", description: "", category: ""});
                            getProducts();
                        }}
                        danger
                    >Clean</Button>
                </Col>
            </Row>

            <div style = {{maxWidth: "1200px", margin: "auto"}}>
                <Row>
                    <Col span = {4}></Col>
                    <Col span = {4}>Name</Col>
                    <Col span = {4}>Description</Col>
                    <Col span = {4}>Category</Col>
                    <Col span = {4}>Price</Col>
                    <Col span = {4}>Action</Col>
                </Row>
                <Collapse defaultActiveKey = {["1"]}>
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
                                            <img src = {require("../images/caravatar120x90.png")} />
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