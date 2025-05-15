import { useEffect, useState } from "react";
import {
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductsByCategoryId,
    getTotalProductsCount,
    getProductByName,
} from "~/api/products-api";
import { delay } from "~/lib/utils";


export const ProductCount = () => {
    const [productCount, setCount] = useState<number>(0);

    useEffect(() => {
        const fetchCount = async () => {
            const count = await getTotalProductsCount();
            console.log("Fetched total product count:", count);
            setCount(count);
        };
        fetchCount();
    }, []);

    return productCount;
};


export const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                console.log("Fetched all products:", data);
                await delay(300); // optional UI-friendly delay
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
                setError("Failed to load products");
            }
        };
        fetchProducts();
    }, []);

    return { products, error };
};


export const useProductById = (productId: number) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(productId);
                console.log(`Fetched product ${productId}:`, data);
                setProduct(data);
            } catch (err) {
                console.error("Failed to load product", err);
                setError("Failed to load product");
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return { product, error };
};

/**
 *  Hook: Delete product by ID.
 */
export const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const deleteProduct = async (id: bigint) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProductById(id);
            console.log(`Deleted product ${id}`);
            await delay(300);
            setSuccess(true);
        } catch (err) {
            console.error("Failed to delete product", err);
            setError("Failed to delete product.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error, success };
};

/**
 *  Hook: Fetch product by name.
 */
export const useGetProductByName = (name: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await getProductByName(name);
            console.log("Fetched product by name:", data);
            await delay(300);
            setProduct(data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch product by name", err);
            setError("Failed to fetch product.");
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (name) fetchProduct();
    }, [name]);

    return { product, loading, error, refetch: fetchProduct };
};

/**
 *  Hook: Fetch products by category ID.
 */
export const useGetProductsByCategoryId = (categoryId: bigint | null) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        if (categoryId === null) return;
        setLoading(true);
        try {
            const data = await getProductsByCategoryId(categoryId);
            console.log(`Fetched products for category ${categoryId}:`, data);
            await delay(300);
            setProducts(data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch products by category ID", err);
            setError("Failed to fetch products.");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    return { products, loading, error, refetch: fetchProducts };
};
