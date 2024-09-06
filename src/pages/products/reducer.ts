import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCTS } from "@/constants";
import { CartItem, Product } from "@/types";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: PRODUCTS as Product[],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // This action is triggered when user clicks the checkout button.
    // It decreases the stock of the products depending upon the quantity
    // of the items that were checked out.
    updateProductStock: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach((item) => {
        const product = state.products.find((p) => p.id === item.id);
        if (product) {
          product.stock = Math.max(0, product.stock - item.quantity!);
        }
      });
    },
  },
});

export const { updateProductStock } = productSlice.actions;

export default productSlice.reducer;
