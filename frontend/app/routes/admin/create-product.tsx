import React, { useState } from 'react'
import { Header } from "../../../components";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { createProduct } from "~/api/products-api";
import {useCategories} from "~/components/categoryComponent";
import {useNavigate} from "react-router";

const CreateProduct = () => {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        categoryId: 0,
        image: ''
    });
    const { categories } = useCategories();
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files) {
            // For file inputs, just save the file name or handle upload logic here
            setProduct({ ...product, [name]: files[0].name });
        } else {
            // Convert number fields to Number, keep strings as-is
            setProduct({ ...product, [name]: type === 'number' ? Number(value) : value });
        }
    };

    // Utility: simulate a delay (for demo purposes)
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("📝 Submitting product:", product);

        // Validation check before proceeding
        if (!product.name || !product.description || product.price <= 0 || product.stockQuantity < 0 || product.categoryId <= 0) {
            alert("⚠️ Please fill out all fields correctly.");
            console.warn("🚨 Validation failed:", product);
            return;
        }

        try {
            // Prepare formatted product for API
            const formattedProduct = {
                ...product,
                price: parseFloat(product.price.toString()),    // ✅ to double
                stock: parseInt(product.stockQuantity.toString(), 10),  // ✅ to int
                categoryId: parseInt(product.categoryId.toString(), 10) // ✅ to int
            };

            console.log(" Formatted product payload:", formattedProduct);

            // Simulate processing delay (like a loading state)
            await delay(1000);

            // API call
            const response = await createProduct(formattedProduct);

            alert("✅ Product Created!");
            console.log("✅ Product Created:", response);
            
            // Reset form state
            setProduct({
                name: '',
                description: '',
                price: 0,
                stockQuantity: 0,
                categoryId: 0,
                image: ''
            });
            navigate("/all-product");

        } catch (error) {
            console.error("❌ Error creating product:", error);
        }
    };

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a New Product" description="CREATE A PRODUCT" />
            <section className="mt-2.5 wrapper-md">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div>
                        {/* Product Name */}
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="form-input placeholder:text-gray-100"
                        />

                        {/* Description */}
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="form-input placeholder:text-gray-100"
                        />

                        {/* Price */}
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="form-input placeholder:text-gray-100"
                        />

                        {/* Stock */}
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="text"
                            name="stockQuantity"
                            id="stockQuantity"
                            value={product.stockQuantity}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="form-input placeholder:text-gray-100"
                        />

                        {/*/!* Category Id *!/*/}
                        <label htmlFor="categoryId">Category Id</label>
                        <select
                            value={product.categoryId !== 0 ? product.categoryId.toString() : ""}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    categoryId: e.target.value ? BigInt(e.target.value) : 0
                                })
                            }
                            className="form-input placeholder:text-gray-100"
                        >
                            <option value="">Category</option>
                            {categories.map((cat: Category) => (
                                <option key={cat.id.toString()} value={cat.id.toString()}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/*/!* Category Id *!/*/}
                        {/*<label htmlFor="categoryId">Category Id</label>*/}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    name="categoryId"*/}
                        {/*    id="categoryId"*/}
                        {/*    value={product.categoryId}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    placeholder="Category"*/}
                        {/*    className="form-input placeholder:text-gray-100"*/}
                        {/*/>*/}

                        {/* Image */}
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={product.image}
                            onChange={handleChange}
                            placeholder="Image"
                            className="form-input placeholder:text-gray-100"
                        />

                        {/* Submit Button */}
                        <ButtonComponent type="submit" className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px]">
                            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
                            <span className="p-16-semibold text-white">SUBMIT</span>
                        </ButtonComponent>
                    </div>
                </form>
            </section>
        </main>
    )
}
export default CreateProduct
