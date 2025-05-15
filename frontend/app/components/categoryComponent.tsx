import { useEffect, useState } from "react";
import axios from "axios";
import {
    getAllCategories,
    getCategoriesCount,
    updateCategoryById,
    deleteCategoryById,
    addCategory,
    getCategoryName,
} from "~/api/categories-api";
import { delay } from "~/lib/utils";

const API_URL = import.meta.env.VITE_API_URL + "/api/Category";

/**
 * Custom hook to fetch total category count from the server.
 */
export const CategoryCount = () => {
    const [categoryCount, setCount] = useState<number>(0);

    useEffect(() => {
        const fetchCount = async () => {
            const Count = await getCategoriesCount();
            setCount(Count.totalCategories);
        };
        fetchCount();
    }, []);

    console.log("Current category count:", categoryCount);
    return categoryCount;
};

/**
 * Fetch category name by ID (simple direct function).
 */
export const getCategoryNameById = async (categoryId: bigint) => {
    try {
        const response = await axios.get(`${API_URL}/${categoryId}/name`);
        console.log("API RESPONSE:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching category name by ID:", error);
        throw error;
    }
};

/**
 * Custom hook to fetch a category name by its ID.
 */
export const useCategoryName = (categoryId: bigint) => {
    const [categoryName, setCategoryName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategoryName(categoryId);
                console.log("Fetched category name:", response);
                await delay(300); // smooth delay for UI transition
                setCategoryName(response); // if API returns { name: "X" }
            } catch (err) {
                console.error("Error fetching category name:", err);
                setError("Failed to load category");
            }
        };

        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);

    return { categoryName, error };
};

/**
 * Custom hook to fetch and manage all categories.
 */
export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                console.log("Fetched categories:", data);
                await delay(300); // optional UI delay
                setCategories(data);
            } catch (err: any) {
                console.error("Error loading categories:", err);
                setError("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    return { categories, error };
};

/**
 * Custom hook to update a category by ID.
 */
export const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);

    const updateCategory = async (categoryId: bigint, categoryData: Category) => {
        setLoading(true);
        try {
            const result = await updateCategoryById(categoryId, categoryData);
            console.log(`Updated category ${categoryId}:`, result);
            await delay(300);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { updateCategory, loading };
};

/**
 * Custom hook to delete a category by ID.
 */
export const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async (categoryId: bigint) => {
        setLoading(true);
        try {
            const result = await deleteCategoryById(categoryId);
            console.log(`Deleted category ${categoryId}:`, result);
            await delay(300);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategory, loading };
};

/**
 * Custom hook to add a new category.
 */
export const useAddCategory = () => {
    const [loading, setLoading] = useState(false);

    const addNewCategory = async (categoryData: Category) => {
        setLoading(true);
        try {
            const result = await addCategory(categoryData);
            console.log("Added new category:", result);
            await delay(300);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { addNewCategory, loading };
};
