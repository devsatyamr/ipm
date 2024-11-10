import React from 'react';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useCart();
  
  const cartItem = cart.find(item => item.productId === product.id);

  const handleAddToCart = () => {
    if (!cartItem) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {product.location}
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Sold by: {product.seller}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
          
          {!cartItem ? (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                product.stock === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 border"
              >
                -
              </button>
              <span className="w-8 text-center">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 border"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;