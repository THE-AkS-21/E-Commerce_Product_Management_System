import React, { useState } from "react";
import { Header } from "../../../components";
import {
    ColumnDirective,
    ColumnsDirective,
    GridComponent,
    Inject,
    Page,
} from "@syncfusion/ej2-react-grids";
import {
    useCategories,
    useDeleteCategory,
    useUpdateCategory,
} from "~/components/categoryComponent";

const AllCategories = () => {
    const { categories, error } = useCategories(); // Fetch categories
    const { updateCategory } = useUpdateCategory();
    const { deleteCategory } = useDeleteCategory();

    const [editingRows, setEditingRows] = useState<
        Record<number, { name: string; description: string }>
    >({});

    const handleEditClick = (category: any) => {
        console.log("Edit button clicked for category:", category); // Log edit action
        setEditingRows((prev) => ({
            ...prev,
            [category.id]: { name: category.name, description: category.description },
        }));
    };

    const handleDeleteClick = async (categoryId: number) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        console.log("Deleting category with ID:", categoryId); // Log delete action
        await deleteCategory(BigInt(categoryId));
        // Add delay before reload to allow for smoother user experience
        setTimeout(() => window.location.reload(), 300); // Reload after 500ms delay
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        categoryId: number
    ) => {
        const { name, value } = e.target;
        setEditingRows((prev) => ({
            ...prev,
            [categoryId]: { ...prev[categoryId], [name]: value },
        }));
    };

    const handleSaveClick = async (categoryId: number) => {
        const data = editingRows[categoryId];
        if (!data) return;

        console.log("Saving category with ID:", categoryId, "New data:", data); // Log save action
        await updateCategory(BigInt(categoryId), {
            id: categoryId,
            name: data.name,
            description: data.description,
        });

        setEditingRows((prev) => {
            const updated = { ...prev };
            delete updated[categoryId];
            return updated;
        });

        // Add delay before reload to allow for smoother user experience
        setTimeout(() => window.location.reload(), 500); // Reload after 500ms delay
    };

    const handleCancelClick = (categoryId: number) => {
        console.log("Cancel edit for category ID:", categoryId); // Log cancel action
        setEditingRows((prev) => {
            const updated = { ...prev };
            delete updated[categoryId];
            return updated;
        });
    };

    const NameTemplate = (props: any) => {
        const isEditing = editingRows.hasOwnProperty(props.id);
        return isEditing ? (
            <input
                type="text"
                name="name"
                value={editingRows[props.id]?.name || ""}
                onChange={(e) => handleInputChange(e, props.id)}
                className="border border-gray-300 p-1 w-full"
            />
        ) : (
            <span>{props.name}</span>
        );
    };

    const DescTemplate = (props: any) => {
        const isEditing = editingRows.hasOwnProperty(props.id);
        return isEditing ? (
            <input
                type="text"
                name="description"
                value={editingRows[props.id]?.description || ""}
                onChange={(e) => handleInputChange(e, props.id)}
                className="border border-gray-300 p-1 w-full"
            />
        ) : (
            <span>{props.description}</span>
        );
    };

    const ActionTemplate = (props: any) => {
        const isEditing = editingRows.hasOwnProperty(props.id);
        return (
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => handleSaveClick(props.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleCancelClick(props.id)}
                            className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => handleEditClick(props)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDeleteClick(props.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <main className="all-users wrapper">
            <Header
                title="ALL Categories"
                description="Check out all Categories"
                createText="CREATE"
                createUrl="/category/create"
            />

            <GridComponent
                dataSource={categories}
                allowPaging={true}
                pageSettings={{ pageSize: 15 }}
            >
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="ID" width="50" textAlign="Left" />
                    <ColumnDirective
                        field="name"
                        headerText="Name"
                        width="120"
                        template={NameTemplate}
                    />
                    <ColumnDirective
                        field="description"
                        headerText="Description"
                        width="220"
                        template={DescTemplate}
                    />
                    <ColumnDirective
                        headerText="Actions"
                        width="180"
                        template={ActionTemplate}
                    />
                </ColumnsDirective>
                <Inject services={[Page]} />
            </GridComponent>
        </main>
    );
};

export default AllCategories;
