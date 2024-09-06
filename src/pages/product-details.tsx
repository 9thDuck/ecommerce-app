import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/pages/cart/reducer";
import PageContent from "@/components/page-content";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { RootState } from "../store";
import { AlertCircle, ShoppingBag } from "lucide-react";

const ProductNotFound = () => {
  return (
    <PageContent>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <AlertCircle className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold text-primary mb-2">
          Product Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're sorry, but the product you're looking for doesn't seem to exist.
        </p>
        <Button asChild>
          <Link to="/products" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse Our Products
          </Link>
        </Button>
      </motion.div>
    </PageContent>
  );
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((p) => p.id.toString() === id);
  const { items = [] } = useAppSelector((state: RootState) => state.cart);

  if (!product) {
    return <ProductNotFound />;
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      return;
    }
    const newCartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      stock: product.stock,
    };
    dispatch(addToCart(newCartItem));
  };

  const productCountInCart = useMemo(() => {
    return items.find((item) => item.id === product.id)?.quantity || 0;
  }, [items, product.id]);

  return (
    <PageContent>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 py-8"
      >
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            data-testid="product-image"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1
            className="text-3xl font-bold text-primary"
            data-testid="product-title"
          >
            {product.title}
          </h1>
          <p
            className="text-2xl font-semibold text-primary"
            data-testid="product-price"
          >
            ${product.price.toFixed(2)}
          </p>
          <div className="space-y-2">
            <p className="font-semibold">
              Brand:{" "}
              <span className="font-normal" data-testid="product-brand">
                {product.brand}
              </span>
            </p>
            <p className="font-semibold">
              Model:{" "}
              <span className="font-normal" data-testid="product-model">
                {product.model}
              </span>
            </p>
            <p className="font-semibold">
              Color:{" "}
              <span className="font-normal" data-testid="product-color">
                {product.color}
              </span>
            </p>
            <p className="font-semibold">
              Category:{" "}
              <span className="font-normal" data-testid="product-category">
                {product.category}
              </span>
            </p>
          </div>
          <p data-testid="product-description">{product.description}</p>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className={cn("w-full md:w-auto", {
              "hover:bg-gray-500 bg-gray-500 cursor-not-allowed":
                productCountInCart === product.stock,
            })}
            title={
              productCountInCart === product.stock
                ? "You have reached the stock limit"
                : ""
            }
            data-testid="add-to-cart-button"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
          {productCountInCart > 0 ? (
            <p data-testid="cart-count">
              You have {productCountInCart} of this product in your cart
            </p>
          ) : null}
        </div>
      </motion.div>
    </PageContent>
  );
};

export default ProductDetails;
