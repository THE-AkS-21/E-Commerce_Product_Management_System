import React, { useState} from 'react';
import {Header, Loader, ProductCard, StatsCard} from "../../../components";
import { CategoryCount } from "~/components/categoryComponent";
import { AllProducts, ProductCount } from "~/components/ProductComponent";
import { UserCount } from "~/components/userComponent";
import { useAuth } from "~/auth/useAuth";
import { Navigate } from "react-router";


const Dashboard = () => {
    const categoryCount = CategoryCount();
    const productCount = ProductCount();
    const userCount = UserCount();
    const { products, error, isLoading } = AllProducts();
    const { authData } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Calculate products for current page
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (!authData) {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${authData?.username ?? "Guest"} 👋🏼`}
                description="Welcome to the dashboard"
            />
            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Products"
                        total={productCount}
                        img="products"
                        ctaUrl="/all-product"
                    />
                    <StatsCard
                        headerTitle="Total Categories"
                        total={categoryCount}
                        img="categories"
                        ctaUrl="/all-categories"
                    />
                    <StatsCard
                        headerTitle="Total Customers"
                        total={userCount}
                        img="customer1"
                        ctaUrl="/all-users"
                    />
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <section className="container">
                    <h1 className="text-xl font-semibold text-dark-100">PRODUCTS</h1>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                        {paginatedProducts.length ? (
                            paginatedProducts.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
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

export default Dashboard;
