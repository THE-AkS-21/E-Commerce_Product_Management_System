import React from 'react'
import { Link } from "react-router";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import { formatDate } from "~/lib/utils";
import { useCategoryName } from "~/components/categoryComponent";

interface ProductCardProps {
    product: Product;
}

/**
 * ProductCard component.
 * Renders a clickable card displaying product details, category, and meta info.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    // Custom hook to fetch the category name based on product's categoryId
    const { categoryName } = useCategoryName(product.categoryId);
    return (
        // Product card container wrapped with a Link to the product's details page
        <Link to={`/product/${product.id}`} className="product-card ">

            {/* Product image */}
            <img
                src={product.imageUrl || "/assets/images/cardProduct.png"}
                alt={product.imageUrl || "Product image"}
            />

            {/* Product info */}
            <article>
                <h2>{product.name}</h2>
                <figure>
                    <figcaption>{product.description}</figcaption>
                </figure>

                {/* Category name (fetched using hook) */}
                <div className="text-sm text-gray-600">
                    Category: {categoryName || 'N/A'}
                </div>
            </article>

            {/* Chips for product metadata */}
            <div className="flex mt-5 pl-[-18px] pr-3.5 pb-5">
                <ChipListComponent id="product-chip">
                    <ChipsDirective>
                        <ChipDirective text={`Created On: ${formatDate(product.createdAt)}`} />
                        <ChipDirective text={`Updated On: ${formatDate(product.updatedAt)}`} />
                        <ChipDirective text={`Stock: ${product.stockQuantity}`} />
                    </ChipsDirective>
                </ChipListComponent>
            </div>

            {/* Product price pill */}
            <article className="productCard-pill">{product.price}</article>
        </Link>
    );
};

export default ProductCard;
