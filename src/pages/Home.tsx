import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/storage';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useLocation } from '../context/LocationContext';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedLocation } = useLocation();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const filteredProducts = selectedLocation === 'All Locations'
          ? allProducts
          : allProducts.filter(product => product.location === selectedLocation);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
        {selectedLocation !== 'All Locations' && (
          <p className="text-gray-600">Showing products in {selectedLocation}</p>
        )}
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available in {selectedLocation}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}