import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const total = item.productPrice * item.quantity;

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
      {/* Product Info */}
      <div className="flex items-center space-x-4">
        <img
          src={item.productImage || "https://via.placeholder.com/80"}
          alt={item.productName}
          className="object-cover w-20 h-20 rounded-lg"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {item.productName}
          </h4>
          <p className="text-gray-500">
            ₹{item.productPrice.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            × {item.quantity}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          className="px-2 py-1 bg-gray-100 border rounded-lg hover:bg-gray-200"
        >
          -
        </button>
        <span className="px-3 text-lg font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          className="px-2 py-1 bg-gray-100 border rounded-lg hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="font-medium text-gray-900">
        ₹{total.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemoveItem(item.productId)}
        className="font-medium text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    productName: PropTypes.string.isRequired,
    productImage: PropTypes.string,
    productPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default CartItem;
