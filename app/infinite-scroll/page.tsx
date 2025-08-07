'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export default function InfiniteScrollPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const limit = 10;

  const fetchProducts = useCallback(async (currentSkip: number) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}`);
      const data = await response.json();
      
      if (currentSkip === 0) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.products.length === limit);
      setSkip(currentSkip + limit);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchProducts(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(skip);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchProducts, hasMore, loading, skip]);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Infinite Scroll Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading more products...</p>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No more products to load
          </div>
        )}

        <div ref={observerRef} className="h-4" />
      </div>
    </div>
  );
}