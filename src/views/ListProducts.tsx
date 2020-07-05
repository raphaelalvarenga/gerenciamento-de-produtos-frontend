import React, { useEffect, useState } from "react";
import ResponseInterface from "../interfaces/response-interface";
import { ProductInterface } from "../interfaces/product-interface";

const ListProducts = () => {

    const [products, setProducts] = useState<ProductInterface[]>([]);

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const endpoint: string = "https://gerenciamento-de-produtos-back.herokuapp.com/"

        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYTlmYjQxMzBkZmFiMTcwMjllMjE1NThlMmY3ODZiZTgiLCJpYXQiOjE1OTM5OTA1NjMsImV4cCI6MTU5Mzk5NDE2M30.pix_lBDzUIMj4TvwgZf7rlYltrMpu4EIikAHgxI_m6A",
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
    
    return <h1>List of Products</h1>
}

export default ListProducts;