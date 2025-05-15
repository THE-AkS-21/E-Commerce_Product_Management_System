import React, { useState } from 'react';
import { Header } from "../../../components";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useAddCategory } from "~/components/categoryComponent";
import {useNavigate} from "react-router";

const CreateCategory = () => {
    console.log(" CREATE CATEGORY COMPONENT RENDERED");

    const [category, setCategory] = useState({
        name: '',
        description: ''
    });

    const { addNewCategory, loading } = useAddCategory();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedCategory = { ...category, [name]: value };
        setCategory(updatedCategory);
        console.log("📝 Form State Updated:", updatedCategory);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🚀 Submitting New Category:", category);
        try {
            const response = await addNewCategory(category);
            alert("✅ Category Created!");
            console.log("✅ Category Created Successfully:", response);

            // Reset form after successful creation
            setCategory({
                name: '',
                description: ''
            });
            navigate("/all-categories");

        } catch (error) {
            console.error("❌ Error while creating category:", error);
        }
    };

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a New Category" description="CREATE A CATEGORY" />
            <section className="mt-2.5 wrapper-md">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={category.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="form-input placeholder:text-gray-100"
                            disabled={loading}
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={category.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="form-input placeholder:text-gray-100"
                            disabled={loading}
                        />

                        <ButtonComponent
                            type="submit"
                            className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px] mt-4"
                            disabled={loading}
                        >
                            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
                            <span className="p-16-semibold text-white">
                                {loading ? 'CREATING...' : 'SUBMIT'}
                            </span>
                        </ButtonComponent>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CreateCategory;
