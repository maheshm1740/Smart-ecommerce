import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, updateItem, removeItem, clearCart, loading, error } = useCart();

  // Just pass context functions
  const handleUpdateQuantity = (productId, quantity) => {
    updateItem(productId, quantity); // handles 0 quantity internally
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const calculateTotal = () => {
    return (cart.items || []).reduce(
      (sum, item) => sum + (item.productPrice || 0) * (item.quantity || 0),
      0
    );
  };

  if (loading) return <p className="mt-8 text-center">Loading cart...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {(!cart.items || cart.items.length === 0) ? (
        <div className="p-8 text-center bg-white rounded-lg shadow-md">
          <p className="mb-6 text-xl text-gray-600">Your cart is empty</p>
          <Link 
            to="/home" 
            className="inline-block px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-xl font-semibold text-gray-900">
                ₹{calculateTotal().toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                to="/home"
                className="inline-block px-6 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="inline-block px-6 py-3 font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
