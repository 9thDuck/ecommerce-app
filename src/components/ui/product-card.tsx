import { Product } from "@/types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-muted-foreground mb-2 text-sm line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-primary font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.brand && (
                <span className="text-sm text-muted-foreground capitalize">
                  {product.brand}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
