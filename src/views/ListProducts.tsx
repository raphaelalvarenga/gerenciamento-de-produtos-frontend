import React, { useEffect, useState, FunctionComponent } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";
import config from "../routines/config";

const ListProducts: FunctionComponent = () => {

    const [products, setProducts] = useState<ProductInterface[]>([]);

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const endpoint: string = config.url;

        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMjY3ZmU5NGNmNWU0YTk0YmRmZGE3ZmNhZDUzZGNiNTMiLCJpYXQiOjE1OTM5OTM3NzksImV4cCI6MTU5Mzk5NzM3OX0.QFBK3W4vQXyjB3V70ZfXk8Dfd7FQj0bjc2WKJjFvpNw",
                "action": "listProducts",
                "idLogin": 1,
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
    
    return <h1>Products List Screen</h1>
}

export default ListProducts;