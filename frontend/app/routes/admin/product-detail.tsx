import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from "../../../components";
import { useDeleteProduct, useProductById } from "~/components/ProductComponent";
import { ButtonComponent, ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import { formatDate } from "~/lib/utils";
import { updateProductById } from "~/api/products-api";
import { getCategoryNameById } from "~/components/categoryComponent";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { product, error } = useProductById(Number(productId));
    const { deleteProduct, loading: deleteLoading } = useDeleteProduct();

    const [isEditing, setIsEditing] = useState(false);
    const [formProduct, setFormProduct] = useState<Product | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [categoryName, setCategoryName] = useState<string>("");

    useEffect(() => {
        if (product) {
            const fetchCategoryName = async () => {
                try {
                    const name = await getCategoryNameById(BigInt(product.categoryId));
                    setCategoryName(name);
                } catch (err) {
                    console.error("❌ Error fetching category name:", err);
                    setCategoryName("Unknown");
                }
            };
            fetchCategoryName();
        }
    }, [product]);

    console.log("📝 PRODUCT DETAIL PAGE LOADED — CATEGORY:", categoryName);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!product) return <p>Loading product details...</p>;

    const imageUrl = product.imageUrl || "/assets/icons/product.png";

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteProduct(BigInt(productId!));
            alert("🗑️ Product deleted successfully!");
            navigate("/all-product");
        } catch (err) {
            console.error("❌ Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setFormProduct({ ...product });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!formProduct) return;
        setFormProduct({ ...formProduct, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formProduct) return;

        setUpdateLoading(true);
        console.log("🔄 Updating Product:", formProduct);

        try {
            const updatedProduct = {
                ...formProduct,
                price: parseFloat(formProduct.price),
                stock: parseInt(formProduct.stockQuantity),
                categoryId: parseInt(formProduct.categoryId)
            };

            await updateProductById(Number(productId), updatedProduct);
            alert("✅ Product Updated!");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error updating product:", error);
            setUpdateError("Failed to update product.");
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <main className="product-detail wrapper">
            <Header title="PRODUCT DETAIL" description="View and edit product details" />

            <section className="container wrapper-md">
                <header>
                    <h1 className="p-40-semibold text-dark-100">{product.name}</h1>
                </header>

                <section className="gallery h-80 w-80 flex">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full rounded-xl object-cover md:col-span-2 md:row-span-2 h-[330px]"
                    />
                </section>

                <div className="text-sm text-gray-600">Category: {categoryName}</div>

                <section className="flex gap-3 md:gap-5 items-center flex-wrap mt-2">
                    <ChipListComponent id="product-chip">
                        <ChipsDirective>
                            <ChipDirective text={`Stock: ${product.stockQuantity}`} />
                            <ChipDirective text={`Created: ${formatDate(product.createdAt)}`} />
                            <ChipDirective text={`Updated: ${formatDate(product.updatedAt)}`} />
                        </ChipsDirective>
                    </ChipListComponent>
                </section>

                <section className="title mt-4">
                    <h2>Price: ₹{product.price}</h2>
                </section>
                <p className="text-sm md:text-lg font-normal text-dark-400">{product.description}</p>

                <ButtonComponent
                    onClick={handleEditClick}
                    type="button"
                    className="button-class !bg-blue-500/10 !h-11 !w-full md:w-[240px] mt-4"
                >
                    <img src="/assets/icons/refresh.svg" alt="edit" className="size-5" />
                    <span className="p-16-semibold  text-green-500">UPDATE</span>
                </ButtonComponent>

                {isEditing && (
                    <form className="product-form mt-6" onSubmit={handleSubmit}>
                        {["name", "description", "price", "stockQuantity", "categoryId", "imageUrl"].map((field) => (
                            <div key={field}>
                                <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    name={field}
                                    value={(formProduct as any)[field]}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder={field}
                                    disabled={updateLoading}
                                />
                            </div>
                        ))}

                        <ButtonComponent
                            type="submit"
                            className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px] mt-4"
                            disabled={updateLoading}
                        >
                            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
                            <span className="p-16-semibold text-white">
                                {updateLoading ? "Saving..." : "Save Changes"}
                            </span>
                        </ButtonComponent>
                    </form>
                )}

                {updateError && <p className="text-red-500 mt-2">{updateError}</p>}

                <ButtonComponent
                    onClick={handleDelete}
                    type="button"
                    disabled={deleteLoading}
                    className="button-class !bg-blue-500/10 !h-11 !w-full md:w-[240px] mt-4"
                >
                    <img src="/assets/icons/trash.svg" alt="delete" className="size-5" />
                    <span className="p-16-semibold text-red-500">{deleteLoading ? "Deleting..." : "DELETE"}</span>
                </ButtonComponent>
            </section>
        </main>
    );
};

export default ProductDetail;
