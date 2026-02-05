import type { Product } from "../InlineEditing";
import { sampleEditProducts } from "./sampleEditingData";


const data = [...sampleEditProducts];

export const generateId = (data: Product[]) => data.reduce((acc: number, current: Product) => Math.max(acc, current.ProductID), 0) + 1;

export const insertItem = (item: any) => {
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
};

export const updateItem = (item: any) => {
    const index = data.findIndex((record) => record.ProductID === item.ProductID);
    data[index] = item;
    return data;
};

export const deleteItem = (item: Product) => {
    const index = data.findIndex((record) => record.ProductID === item.ProductID);
    data.splice(index, 1);
    return data;
};
