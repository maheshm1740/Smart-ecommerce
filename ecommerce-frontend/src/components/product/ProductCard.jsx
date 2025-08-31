import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, loading: cartLoading } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation from Link
    e.stopPropagation();
    
    addItem(product.id)
      .then(success => {
        if (success) {
          setAddedToCart(true);
          
          // Reset success message after 2 seconds
          setTimeout(() => {
            setAddedToCart(false);
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };

  return (
    <div className="relative flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="group flex-grow">
        <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
          {product.oldPrice && (
            <p className="text-sm text-gray-500 line-through">₹{product.oldPrice}</p>
          )}
        </div>
      </Link>
      
      <button
        onClick={handleAddToCart}
        disabled={cartLoading}
        className={`mt-3 w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${addedToCart
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {cartLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : addedToCart ? (
          <span className="flex items-center">
            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center">
            <ShoppingCartIcon className="-ml-1 mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;