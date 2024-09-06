import PageContent from "@/components/page-content";
import { useAppSelector } from "@/store";
import CustomAccordion from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "@/types";

const OrderItemCard = ({ item }: { item: CartItem }) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 mb-2 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <span className="font-semibold flex-grow max-w-[60%]">
          {item.title}
        </span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
          <span>${item.price.toFixed(2)}</span>
          <span>Qty: {item.quantity}</span>
          <span className="font-medium">
            Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const { orders } = useAppSelector((state) => state.orders);

  return (
    <PageContent>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <p className="text-xl text-muted-foreground">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <CustomAccordion
                key={order.id}
                title={
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">Order #{order.id}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                }
              >
                <div className="py-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <OrderItemCard key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center border-t pt-2">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-lg font-bold text-primary">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CustomAccordion>
            ))}
          </div>
        )}
      </motion.div>
    </PageContent>
  );
};

export default Orders;
