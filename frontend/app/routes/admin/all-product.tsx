import React, { useEffect, useState } from "react";
import { Header,ProductCard } from "../../../components";
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import { formatDate } from "~/lib/utils";
import { Page, Inject } from "@syncfusion/ej2-react-grids";
import { useGetProductByName, useGetProductsByCategoryId, AllProducts } from "~/components/ProductComponent";
import { useCategories } from "~/components/categoryComponent";
import { getAllProducts } from "~/api/products-api";

const AllProduct = () => {
    const [searchName, setSearchName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<bigint | null>(null);
    const [data, setData] = useState<Product[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "cards">("grid"); // Toggle state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { categories } = useCategories();
    const { product } = useGetProductByName(searchName);
    const { products: categoryProducts } = useGetProductsByCategoryId(selectedCategory);
    const { products: allProducts, error } = AllProducts();

    const CreatedAtTemplate = (props: any) => <span>{formatDate(props.createdAt)}</span>;
    const UpdatedAtTemplate = (props: any) => <span>{formatDate(props.updatedAt)}</span>;

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
        <main className="all-users wrapper">
            <Header
                title="ALL PRODUCTS"
                description="Check out all Products"
                createText="CREATE"
                createUrl="/product/create"
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

                {/* Toggle View Button */}
                <button
                    onClick={() => {
                        console.log(`Switching view mode to: ${viewMode === "grid" ? "cards" : "grid"}`);
                        setViewMode(viewMode === "grid" ? "cards" : "grid");
                    }}
                    className="ml-auto !bg-primary-100 !h-10 !w-30 md:w-[240px] text-white rounded px-4 py-2"
                >
                    {viewMode === "grid" ? "Card View" : "Grid View"}
                </button>
            </div>

            {/* View Mode Conditional Rendering */}
            {viewMode === "grid" ? (
                // GridComponent View
                <GridComponent
                    dataSource={data}
                    allowPaging={true}
                    pageSettings={{ pageSize: 10 }}
                >
                    <ColumnsDirective>
                        <ColumnDirective field="id" headerText="ID" width="50" textAlign="Left" />
                        <ColumnDirective field="name" headerText="Name" width="100" textAlign="Left" />
                        <ColumnDirective field="description" headerText="Description" width="200" textAlign="Left" />
                        <ColumnDirective field="price" headerText="Price" width="70" textAlign="Center" />
                        <ColumnDirective field="stockQuantity" headerText="Stock" width="70" textAlign="Center" />
                        <ColumnDirective field="categoryId" headerText="Category ID" width="100" textAlign="Center" />
                        <ColumnDirective
                            field="createdAt"
                            headerText="Created On"
                            width="100"
                            textAlign="Center"
                            template={CreatedAtTemplate}
                        />
                        <ColumnDirective
                            field="updatedAt"
                            headerText="Updated On"
                            width="100"
                            textAlign="Center"
                            template={UpdatedAtTemplate}
                        />
                    </ColumnsDirective>
                    <Inject services={[Page]} />
                </GridComponent>
            ) : (
                // Card View
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
            )}
        </main>
    );
};
export default AllProduct;
