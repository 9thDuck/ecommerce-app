import PageContent from "@/components/page-content";
import ProductCard from "@/components/ui/product-card";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomPagination from "@/components/ui/pagination";
import CustomSelect from "@/components/ui/select";
import { PRODUCTS_ITEMS_PER_PAGE_OPTIONS } from "@/constants/PRODUCTS";
import { getItemsPerPage } from "@/lib/utils";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    PRODUCTS_ITEMS_PER_PAGE_OPTIONS[0]
  );

  const indexOfLastItem = currentPage * parseInt(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - parseInt(itemsPerPage);
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / parseInt(itemsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <PageContent>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <CustomSelect
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          options={getItemsPerPage(PRODUCTS_ITEMS_PER_PAGE_OPTIONS)}
          placeholder="Items per page"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageContent>
  );
};

export default Products;
