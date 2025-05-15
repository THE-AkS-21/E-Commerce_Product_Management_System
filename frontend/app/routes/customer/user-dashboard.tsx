import React, {useEffect, useState} from 'react';
import { Header, ProductCard } from "../../../components";
import {AllProducts, useGetProductByName, useGetProductsByCategoryId} from "~/components/ProductComponent";
import { useAuth } from "~/auth/useAuth";
import { Navigate } from "react-router";
import {getAllProducts} from "~/api/products-api";
import {useCategories} from "~/components/categoryComponent";

const UserDashboard = () => {

    const [searchName, setSearchName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<bigint | null>(null);
    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { products: allProducts, error } = AllProducts();
    const { authData } = useAuth();


    const { categories } = useCategories();
    const { product } = useGetProductByName(searchName);
    const { products: categoryProducts } = useGetProductsByCategoryId(selectedCategory);

    // If the user is not authenticated, redirect to the login page
    if (!authData) {
        return <Navigate to="/log-in" />;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching all products from API...");
                const response = await getAllProducts();
                setTimeout(() => {
                    setData(response);
                    console.log("Products successfully fetched.");
                }, 300);
            } catch (error) {
                console.error("Failed to load products", error);
            }
        };

        fetchProducts();
    }, []);

    const handleFilter = () => {
        console.log("Filter button clicked.");

        // No filters — show all
        if (!searchName && selectedCategory === null) {
            console.log("No filters applied. Showing all products.");
            setData(allProducts);
            return;
        }

        // If only category selected, use categoryProducts
        if (!searchName && selectedCategory !== null) {
            console.log(`Filtering by category ID using hook: ${selectedCategory}`);
            setData(categoryProducts);
            return;
        }

        // If only searchName is present, or both filters applied
        let filtered = allProducts;

        if (searchName) {
            console.log(`Filtering by name: '${searchName}'`);
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (selectedCategory !== null) {
            console.log(`Further filtering by category ID: ${selectedCategory}`);
            filtered = filtered.filter(p => p.categoryId === selectedCategory);
        }

        console.log("Final filtered data:", filtered);
        setData(filtered);
    };


    const handleReset = () => {
        console.log("Reset button clicked.");
        setSearchName("");
        setSelectedCategory(null);
        setData(allProducts);
    };

    // Paginated products for card view
    const paginatedProducts = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <main className="dashboard wrapper">
            {/* Header with personalized greeting */}
            <Header
                title={`Welcome ${authData?.username ?? "Guest"} 👋🏼`}
                description="Welcome to your dashboard"
            />

            {/* Filters Section */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />

                <select
                    value={selectedCategory !== null ? selectedCategory.toString() : ""}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value ? BigInt(e.target.value) : null)
                    }
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Filter by Category</option>
                    {categories.map((cat: Category) => (
                        <option key={cat.id.toString()} value={cat.id.toString()}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white rounded px-4 py-2"
                >
                    Filter
                </button>

                <button
                    onClick={handleReset}
                    className="bg-gray-400 text-white rounded px-4 py-2"
                >
                    Reset
                </button>

            </div>

            {/* Products section */}
            <section className="flex flex-col gap-6">
                <section className="container">
                    <h1 className="text-xl font-semibold text-dark-100">PRODUCTS</h1>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                        {paginatedProducts.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default UserDashboard;
