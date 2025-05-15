import axios from 'axios';
import { delay, log } from '~/lib/utils';
import axiosInstance from "~/lib/axiosAuthInterceptor";

const API_URL = import.meta.env.VITE_API_URL + '/api/Product';

/**
 * Fetches all products from the API
 * @returns Array of products
 */
export const getAllProducts = async () => {
    log('getAllProducts', 'Fetching all products');

    const response = await axios.get(`${API_URL}/Get`);
    log('getAllProducts → Response', response.data);

    await delay(300);
    return response.data;
};

/**
 * Fetches total number of products in the database
 * @returns Number of products
 */
export const getTotalProductsCount = async () => {
    log('getTotalProductsCount', 'Fetching total product count');

    const response = await axios.get(`${API_URL}/Get/count`);
    log('getTotalProductsCount → Response', response.data);

    await delay(300);
    return response.data.totalProducts;
};

/**
 * Fetches a product by its name
 * @param name Product name (string)
 * @returns Product object
 */
export const getProductByName = async (name: string) => {
    log('getProductByName', `Fetching product by name: ${name}`);

    try {
        const response = await axios.get(`${API_URL}/by-name/${name}`);
        log('getProductByName → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by name:', error);
        throw error;
    }
};

/**
 * Fetches a product by its ID
 * @param productId Product ID (number)
 * @returns Product object
 */
export const getProductById = async (productId: Number) => {
    log('getProductById', `Fetching product by ID: ${productId}`);

    try {
        const response = await axios.get(`${API_URL}/by-Id/${productId}`);
        log('getProductById → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by Id:', error);
        throw error;
    }
};

/**
 * Fetches products belonging to a specific category ID
 * @param categoryId Category ID (bigint)
 * @returns Array of products
 */
export const getProductsByCategoryId = async (categoryId: bigint) => {
    log('getProductsByCategoryId', `Fetching products for category ID: ${categoryId}`);

    try {
        const response = await axios.get(`${API_URL}/by-category/${categoryId}`);
        log('getProductsByCategoryId → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category ID:', error);
        throw error;
    }
};

/**
 * Adds a new product to the database
 * @param product Product object
 * @returns Response data from API
 */
export const createProduct = async (product: Product) => {
    log('createProduct', product);

    const response = await axiosInstance.post(`${API_URL}/Add`, product);
    log('createProduct → Response', response.data);

    await delay(300);
    return response.data;
};

/**
 * Updates an existing product by its ID
 * @param productId Product ID (number)
 * @param product Updated product object
 * @returns Response data from API
 */
export const updateProductById = async (productId: Number, product: Product) => {
    log('updateProductById', { productId, product });

    try {
        const response = await axiosInstance.put(`${API_URL}/Update-by-ID/${productId}`, product);
        log('updateProductById → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

/**
 * Deletes a product by its ID
 * @param id Product ID (bigint)
 * @returns Response data from API
 */
export const deleteProductById = async (id: bigint) => {
    log('deleteProductById', `Deleting product with ID: ${id}`);

    try {
        const response = await axiosInstance.delete(`${API_URL}/Delete-by-ID/${id}`);
        log('deleteProductById → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
