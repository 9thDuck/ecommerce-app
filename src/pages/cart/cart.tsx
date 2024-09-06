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
  cartCheckout,
} from "./reducer";
import PageContent from "@/components/page-content";
import { CartItem } from "@/types";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateProductStock } from "../products/reducer";
import { DISCOUNT_IN_PERCENTAGE, Nth_ORDER_FOR_DISCOUNT } from "@/constants";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addOrder } from "../orders/reducer";

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Button asChild>
        <Link to="/products">Start Shopping</Link>
      </Button>
    </div>
  );
};

const Cart = () => {
  const { totalAmount, items, availableDiscountCoupon, usedDiscountCoupon } =
    useAppSelector((state) => state.cart);
  const { orders } = useAppSelector((state) => state.orders);
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
    dispatch(addOrder({ items, totalAmount }));
    dispatch(cartCheckout());
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
  };

  const handleGenerateDiscountCoupon = () => {
    dispatch(generateDiscountCoupon(orders.length));
    setAlreadyCheckedForDiscountCoupon(true);
  };

  const handleApplyDiscount = () => {
    dispatch(applyDiscount());
  };

  return (
    <PageContent>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between p-4 border rounded-lg shadow-sm items-start"
                >
                  <div className="flex flex-col gap-2 mb-4 md:mb-0">
                    <h2 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h2>
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
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="flex flex-col w-full md:w-auto mb-4 md:mb-0">
                <div className="flex flex-col gap-2 max-w-full md:max-w-80">
                  {availableDiscountCoupon ? (
                    <>
                      <p>Congratulations! You have a discount coupon</p>
                      <Button
                        onClick={handleApplyDiscount}
                        className="w-full md:w-auto"
                      >
                        Apply {DISCOUNT_IN_PERCENTAGE}% discount
                      </Button>
                    </>
                  ) : usedDiscountCoupon ? (
                    <>
                      <p>Discount coupon successfully applied</p>
                      <Button
                        onClick={handleRemoveDiscount}
                        className="w-full md:w-auto"
                      >
                        Remove discount coupon
                      </Button>
                    </>
                  ) : !alreadyCheckedForDiscountCoupon ? (
                    <div className="flex flex-col">
                      <Button
                        onClick={handleGenerateDiscountCoupon}
                        className="w-full md:w-auto"
                      >
                        Generate discount coupon
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm">
                      Sorry, no coupons available at this moment. You will get a
                      discount coupon on every {Nth_ORDER_FOR_DISCOUNT} order
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-end w-full md:w-auto">
                <h2 className="text-xl md:text-2xl font-bold text-right">
                  Total: ${totalAmount.toFixed(2)}
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant="destructive"
                    onClick={handleClearCart}
                    className="w-full md:w-auto"
                  >
                    Clear Cart
                  </Button>
                  <Button onClick={handleCheckout} className="w-full md:w-auto">
                    Checkout
                  </Button>
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
