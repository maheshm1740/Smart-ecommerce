import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductList = ({ products, title }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      oldPrice: PropTypes.number,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default ProductList;