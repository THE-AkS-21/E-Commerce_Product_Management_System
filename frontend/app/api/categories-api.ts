import axios from 'axios';
import { delay, log } from '~/lib/utils';
import axiosInstance from "~/lib/axiosAuthInterceptor";

const API_URL = import.meta.env.VITE_API_URL + '/api/Category';

/**
 * Fetches all categories from the API
 * @returns Array of categories
 */
export const getAllCategories = async () => {
    log('getAllCategories', 'Fetching all categories');

    try {
        const response = await axios.get(`${API_URL}/Get`);
        log('getAllCategories → Response', response.data);

        await delay(300); // Optional delay for smoother UX
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * Fetches the total count of categories
 * @returns Number of categories
 */
export const getCategoriesCount = async () => {
    log('getCategoriesCount', 'Fetching category count');

    try {
        const response = await axios.get(`${API_URL}/Get/count`);
        log('getCategoriesCount → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching category count:', error);
        throw error;
    }
};

/**
 * Fetches category name by its ID
 * @param categoryId Category ID (bigint)
 * @returns Category name as string
 */
export const getCategoryName = async (categoryId: bigint) => {
    log('getCategoryName', `Fetching category name for ID: ${categoryId}`);

    try {
        const response = await axios.get(`${API_URL}/${categoryId}/name`);
        log('getCategoryName → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching category name:', error);
        throw error;
    }
};

/**
 * Adds a new category
 * @param categoryData Category object
 * @returns Response data from the API
 */
export const addCategory = async (categoryData: Category) => {
    log('addCategory', categoryData);

    try {
        const response = await axiosInstance.post(`${API_URL}/Add`, categoryData);
        log('addCategory → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

/**
 * Updates an existing category by ID
 * @param categoryId Category ID (bigint)
 * @param categoryData Updated category object
 * @returns Response data from the API
 */
export const updateCategoryById = async (categoryId: bigint, categoryData: Category) => {
    log('updateCategoryById', { categoryId, categoryData });

    try {
        const response = await axiosInstance.put(`${API_URL}/Update-by-ID/${categoryId}`, categoryData);
        log('updateCategoryById → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

/**
 * Deletes a category by its ID
 * @param categoryId Category ID (bigint)
 * @returns Response data from the API
 */
export const deleteCategoryById = async (categoryId: bigint) => {
    log('deleteCategoryById', `Deleting category with ID: ${categoryId}`);

    try {
        const response = await axiosInstance.delete(`${API_URL}/Delete-by-ID/${categoryId}`);
        log('deleteCategoryById → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
