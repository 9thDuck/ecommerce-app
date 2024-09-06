import PageContent from "@/components/page-content";
import ProductCard from "@/components/ui/product-card";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);
  return (
    <PageContent>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </PageContent>
  );
};

export default Products;
