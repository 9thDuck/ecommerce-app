import { DISCOUNT_IN_PERCENTAGE, Nth_ORDER_FOR_DISCOUNT } from "@/constants";
import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  totalAmount: number;
  orderCount: number;
  availableDiscountCoupon: string;
  usedDiscountCoupon: string;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  orderCount: 0,
  availableDiscountCoupon: "",
  usedDiscountCoupon: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds to cart, if the item is already in the cart, it will add the quantity to the
    // existing cart item. Otherwise, it will add the item to the cart.
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      // If a discount coupon is used, the discounted price for the item will be added to the total amount.
      const price = !state.usedDiscountCoupon
        ? action.payload.price
        : action.payload.price * (1 - 1 / DISCOUNT_IN_PERCENTAGE);
      if (existingItem?.quantity) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
          state.totalAmount += price;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalAmount += price;
      }
    },
    // Removes from cart, if the item is already in the cart, it will remove the quantity
    //from the existing cart item. Otherwise, it will remove the item from the cart.
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          existingItem.quantity =
            existingItem.quantity && existingItem.quantity - 1 !== 0
              ? existingItem.quantity - 1
              : 0;
        }
        state.totalAmount -= existingItem.price;
      }
    },
    // Deletes from cart, it will completely remove the item from the state.items array.
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalAmount -= existingItem.price * (existingItem.quantity || 0);
      }
    },
    // Applies discount to the total amount, if the discount coupon exists.
    applyDiscount: (state) => {
      if (state.availableDiscountCoupon) {
        state.totalAmount *= 1 - 1 / DISCOUNT_IN_PERCENTAGE;
        state.usedDiscountCoupon = state.availableDiscountCoupon;
        state.availableDiscountCoupon = "";
      }
    },
    // Removes discount from the total amount, if there is a discount coupon used.
    removeDiscount: (state) => {
      if (!state.usedDiscountCoupon) {
        return;
      }
      state.totalAmount =
        (state.totalAmount / (100 - DISCOUNT_IN_PERCENTAGE)) * 100;
      state.availableDiscountCoupon = state.usedDiscountCoupon;
      state.usedDiscountCoupon = "";
    },
    // Generates a discount coupon, if the order the user is placing is Nth_ORDER_FOR_DISCOUNT,
    // and there is no available discount coupon. If a discount coupon is already available,
    // user will not be able to generate a new discount coupon through UI.
    generateDiscountCoupon: (state, action: PayloadAction<number>) => {
      if (
        (action.payload + 1) % Nth_ORDER_FOR_DISCOUNT === 0 &&
        state.availableDiscountCoupon === ""
      ) {
        const newCoupon = `DISCOUNT${Math.random()
          .toString(36)
          .substr(2, 8)
          .toUpperCase()}`;
        state.availableDiscountCoupon = newCoupon;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    // action for checkout doesn't exist here. Because checkout is emulated by updating the stock
    // of the products, and simply clearing the cart.
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  applyDiscount,
  generateDiscountCoupon,
  clearCart,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
