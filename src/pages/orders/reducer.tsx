import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types";

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Adds the items that were checked out. To be shown
    // in the orders page
    addOrder: (
      state,
      action: PayloadAction<Omit<Order, "id" | "createdAt">>
    ) => {
      const newOrder: Order = {
        id: state.orders.length + 1,
        createdAt: new Date().getTime(),
        ...action.payload,
      };
      state.orders.push(newOrder);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
