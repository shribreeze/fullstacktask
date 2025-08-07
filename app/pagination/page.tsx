import Link from 'next/link';
import ProductList from '@/components/ProductList';
import { Suspense } from 'react';

export default function PaginationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Product Pagination</h1>
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}