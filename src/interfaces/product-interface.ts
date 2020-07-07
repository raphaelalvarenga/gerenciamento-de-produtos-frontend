import Pagination from "./pagination-interface";

export interface ProductInterface {
    idProduct: number;
    name: string;
    nameLabel?: string;
    description: string;
    category: string;
    price: string;
    status: number;
}

export interface ProductRequestParamsList {
    name: string;
    description: string;
    category: string;
    pagination: Pagination;
}

export interface ProductRequestParamsAdd {
    name: string;
    description: string;
    category: string;
    price: string;
}

export interface ProductRequestParamsEdit {
    idProduct: number;
    name: string;
    description: string;
    category: string;
    price: string;
}