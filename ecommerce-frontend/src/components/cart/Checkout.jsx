"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import AddressModal from "../AddressModal";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (auth.user?.id) {
      setUserId(auth.user.id);
    }
  }, [auth.user]);

  const calculateTotal = () => {
    return (cart.items || []).reduce(
      (sum, item) => sum + (item.productPrice || 0) * (item.quantity || 0),
      0
    );
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to proceed.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Checkout</h1>

      {message && (
        <div className="p-4 mb-4 text-center text-white bg-green-500 rounded">
          {message}
        </div>
      )}

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between p-4"
            >
              <img
                src={item.productImage || "https://via.placeholder.com/80"}
                alt={item.productName}
                className="object-cover w-20 h-20 mr-4 rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{item.productPrice.toLocaleString("en-IN")}
                </p>
                <p className="text-gray-500">
                  ₹{(item.productPrice * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-bold">
            ₹{calculateTotal().toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={() => setShowModal(true)} // ✅ Open modal on click
            className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>

      {showModal && (
        <AddressModal
          userId={userId}
          onClose={() => setShowModal(false)}
          onOrderPlaced={() => {
            setMessage("Order placed successfully!");
            clearCart();
            setShowModal(false);
            setTimeout(() => setMessage(""), 3000);
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
