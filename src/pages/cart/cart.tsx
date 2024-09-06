import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  clearCart,
  deleteFromCart,
  removeFromCart,
  removeDiscount,
  generateDiscountCoupon,
  applyDiscount,
} from "./reducer";
import PageContent from "@/components/page-content";
import { CartItem } from "@/types";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateProductStock } from "../products/reducer";
import {
  DISCOUNT_IN_PERCENTAGE,
  Nth_ORDER_FOR_DISCOUNT,
} from "@/constants/cart";
import { useState } from "react";

const Cart = () => {
  const { totalAmount, items, availableDiscountCoupon, usedDiscountCoupon } =
    useAppSelector((state) => state.cart);
  const [alreadyCheckedForDiscountCoupon, setAlreadyCheckedForDiscountCoupon] =
    useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteItem = (id: number) => {
    dispatch(deleteFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(updateProductStock(items));
    dispatch(clearCart());
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
  };

  const handleGenerateDiscountCoupon = () => {
    // Hardcoded for now, in order to check the discount coupon feature.
    // Will become dynamic once the orders page is implemented.
    dispatch(generateDiscountCoupon(4));
    setAlreadyCheckedForDiscountCoupon(true);
  };

  const handleApplyDiscount = () => {
    dispatch(applyDiscount());
  };

  return (
    <PageContent>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleAddToCart(item)}
                      title="Add item"
                      className={cn("", {
                        "hover:bg-gray-500 bg-gray-500 cursor-not-allowed":
                          item.quantity === item.stock,
                      })}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      -
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Delete item"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between items-end ">
              <div className="flex">
                <div className="flex flex-col gap-2 max-w-80">
                  {availableDiscountCoupon ? (
                    <>
                      <p>Congratulations! You have a discount coupon</p>
                      <Button onClick={handleApplyDiscount}>
                        Apply {DISCOUNT_IN_PERCENTAGE}% discount
                      </Button>
                    </>
                  ) : usedDiscountCoupon ? (
                    <>
                      <p>Discount coupon successfully applied</p>
                      <Button onClick={handleRemoveDiscount}>
                        Remove discount coupon
                      </Button>
                    </>
                  ) : !alreadyCheckedForDiscountCoupon ? (
                    <div className="flex flex-col">
                      <Button onClick={handleGenerateDiscountCoupon}>
                        Generate discount coupon
                      </Button>
                    </div>
                  ) : (
                    <p>
                      Sorry, no coupons available at this moment. You will get a
                      discount coupon on every {Nth_ORDER_FOR_DISCOUNT} order
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-end">
                <h2 className="text-2xl font-bold text-right">
                  Total: ${totalAmount.toFixed(2)}
                </h2>
                <div className="flex gap-4">
                  <Button variant="destructive" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                  <Button onClick={handleCheckout}>Checkout</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default Cart;
