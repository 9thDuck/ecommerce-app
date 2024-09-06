import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PRODUCTS } from "@/constants";
import ProductDetails from "@/pages/product-details";
import cartReducer from "@/pages/cart/reducer";
import productsReducer from "@/pages/products/reducer";
import { RootState } from "@/store";
import ordersReducer from "@/pages/orders/reducer";
import { Product } from "@/types";

const createTestStore = () =>
  configureStore<RootState>({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      orders: ordersReducer,
    },
    preloadedState: {
      products: { products: PRODUCTS as Product[] },
      cart: {
        items: [],
        totalAmount: 0,
        availableDiscountCoupon: false,
        usedDiscountCoupon: false,
      },
      orders: { orders: [] },
    },
  });

describe("ProductDetails Component", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it("renders the product details page with correct information", () => {
    const testProduct = PRODUCTS[0]; // Using the first product from the PRODUCTS constant

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/products/${testProduct.id}`]}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("product-title")).toHaveTextContent(
      testProduct.title
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      `$${testProduct.price.toFixed(2)}`
    );
    expect(screen.getByTestId("product-description")).toBeInTheDocument();
    expect(screen.getByTestId("product-brand")).toHaveTextContent(
      testProduct.brand
    );
    expect(screen.getByTestId("product-model")).toHaveTextContent(
      testProduct.model
    );
    expect(screen.getByTestId("product-color")).toHaveTextContent(
      testProduct.color || ""
    );
    expect(screen.getByTestId("product-category")).toHaveTextContent(
      testProduct.category
    );

    // Check for the presence of the "Add to Cart" button
    expect(screen.getByTestId("add-to-cart-button")).toBeInTheDocument();

    // Check if the image is present with the correct src
    const productImage = screen.getByTestId(
      "product-image"
    ) as HTMLImageElement;
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toContain(testProduct.image);

    if (testProduct.model)
      expect(screen.getByText(testProduct.model)).toBeInTheDocument();
    if (testProduct.color)
      expect(screen.getByText(testProduct.color)).toBeInTheDocument();
    if (testProduct.category)
      expect(screen.getByText(testProduct.category)).toBeInTheDocument();
  });
});
