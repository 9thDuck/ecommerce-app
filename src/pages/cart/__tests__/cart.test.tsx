import cartReducer, {
  addToCart,
  removeFromCart,
  deleteFromCart,
  applyDiscount,
  removeDiscount,
  generateDiscountCoupon,
  clearCart,
} from "../reducer";
import { CartItem } from "@/types";
import { DISCOUNT_IN_PERCENTAGE, Nth_ORDER_FOR_DISCOUNT } from "@/constants";

describe("Cart Reducer", () => {
  const initialState = {
    items: [],
    totalAmount: 0,
    availableDiscountCoupon: false,
    usedDiscountCoupon: false,
  };

  const sampleItem: CartItem = {
    id: 1,
    title: "Sample Product",
    price: 10,
    stock: 5,
    quantity: 1,
  };

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("addToCart", () => {
    it("should add a new item to the cart", () => {
      const newState = cartReducer(initialState, addToCart(sampleItem));
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual(sampleItem);
      expect(newState.totalAmount).toBe(10);
    });

    it("should increase quantity of existing item", () => {
      const stateWithItem = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 10,
      };
      const newState = cartReducer(stateWithItem, addToCart(sampleItem));
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(2);
      expect(newState.totalAmount).toBe(20);
    });

    it("should not add more than stock", () => {
      const itemAtStockLimit = { ...sampleItem, quantity: 5 };
      const stateWithItemAtStockLimit = {
        ...initialState,
        items: [itemAtStockLimit],
        totalAmount: 50,
      };
      const newState = cartReducer(
        stateWithItemAtStockLimit,
        addToCart(sampleItem)
      );
      expect(newState.items[0].quantity).toBe(5);
      expect(newState.totalAmount).toBe(50);
    });
  });

  describe("removeFromCart", () => {
    it("should decrease quantity of an item", () => {
      const stateWithTwoItems = {
        ...initialState,
        items: [{ ...sampleItem, quantity: 2 }],
        totalAmount: 20,
      };
      const newState = cartReducer(stateWithTwoItems, removeFromCart(1));
      expect(newState.items[0].quantity).toBe(1);
      expect(newState.totalAmount).toBe(10);
    });

    it("should remove item when quantity becomes 0", () => {
      const stateWithOneItem = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 10,
      };
      const newState = cartReducer(stateWithOneItem, removeFromCart(1));
      expect(newState.items).toHaveLength(0);
      expect(newState.totalAmount).toBe(0);
    });
  });

  describe("deleteFromCart", () => {
    it("should remove an item completely", () => {
      const stateWithItem = {
        ...initialState,
        items: [{ ...sampleItem, quantity: 3 }],
        totalAmount: 30,
      };
      const newState = cartReducer(stateWithItem, deleteFromCart(1));
      expect(newState.items).toHaveLength(0);
      expect(newState.totalAmount).toBe(0);
    });
  });

  describe("applyDiscount", () => {
    it("should apply discount when coupon is available", () => {
      const stateWithCoupon = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 100,
        availableDiscountCoupon: true,
      };
      const newState = cartReducer(stateWithCoupon, applyDiscount());
      expect(newState.totalAmount).toBe(100 * (1 - 1 / DISCOUNT_IN_PERCENTAGE));
      expect(newState.usedDiscountCoupon).toBe(true);
      expect(newState.availableDiscountCoupon).toBe(false);
    });

    it("should not apply discount when no coupon is available", () => {
      const stateWithoutCoupon = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 100,
      };
      const newState = cartReducer(stateWithoutCoupon, applyDiscount());
      expect(newState).toEqual(stateWithoutCoupon);
    });
  });

  describe("removeDiscount", () => {
    it("should remove applied discount", () => {
      const stateWithAppliedDiscount = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 90,
        usedDiscountCoupon: true,
      };
      const newState = cartReducer(stateWithAppliedDiscount, removeDiscount());
      expect(newState.totalAmount).toBe(100);
      expect(newState.availableDiscountCoupon).toBe(true);
      expect(newState.usedDiscountCoupon).toBe(false);
    });

    it("should not change state when no discount is applied", () => {
      const stateWithoutDiscount = {
        ...initialState,
        items: [sampleItem],
        totalAmount: 100,
      };
      const newState = cartReducer(stateWithoutDiscount, removeDiscount());
      expect(newState).toEqual(stateWithoutDiscount);
    });
  });

  describe("generateDiscountCoupon", () => {
    it("should generate a coupon on Nth order if no coupon is available", () => {
      const orderCount = Nth_ORDER_FOR_DISCOUNT - 1;
      const newState = cartReducer(
        initialState,
        generateDiscountCoupon(orderCount)
      );
      expect(newState.availableDiscountCoupon).toBe(true);
    });

    it("should not generate a coupon if not Nth order", () => {
      const orderCount = 0;
      const newState = cartReducer(
        { ...initialState, availableDiscountCoupon: false },
        generateDiscountCoupon(orderCount)
      );
      expect(newState.availableDiscountCoupon).toBe(false);
    });

    it("should not generate a coupon if one is already available", () => {
      const stateWithCoupon = {
        ...initialState,
        availableDiscountCoupon: true,
      };
      const newState = cartReducer(
        stateWithCoupon,
        generateDiscountCoupon(Nth_ORDER_FOR_DISCOUNT)
      );
      expect(newState.availableDiscountCoupon).toBe(true);
    });
  });

  describe("clearCart", () => {
    it("should clear all items and reset total amount", () => {
      const stateWithItems = {
        ...initialState,
        items: [sampleItem, { ...sampleItem, id: 2 }],
        totalAmount: 20,
      };
      const newState = cartReducer(stateWithItems, clearCart());
      expect(newState.items).toHaveLength(0);
      expect(newState.totalAmount).toBe(0);
    });
  });
});
