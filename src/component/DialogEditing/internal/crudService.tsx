
import type { Product } from "../../editing/Editing";
import { sampleEditProducts } from "../../editing/internal/sampleEditingData";

const data = [...sampleEditProducts];

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
