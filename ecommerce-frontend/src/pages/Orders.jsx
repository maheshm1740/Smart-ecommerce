"use client";

import { useEffect, useState } from "react";
import { Package, CheckCircle } from "lucide-react";
import { getUserOrders} from "../api/orderApi";
import { useAuth } from "../contexts/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const { auth } = useAuth();

  // Set userId from auth context
  useEffect(() => {
    if (auth.user?.id) {
      setUserId(auth.user.id);
    }
  }, [auth.user]);

  // Fetch orders when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-white shadow-md rounded-2xl"
            >
              {/* Order Info */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order No:{" "}
                    <span className="font-medium">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    User: {order.userEmail}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  <span className="font-medium">Placed</span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {order.orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-3 text-sm"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between mt-4 font-semibold">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
