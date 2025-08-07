import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Debounced Search</h1>
        <div className="mb-4 text-center text-gray-600 dark:text-gray-300">
          <p>Search will trigger after 1 second of inactivity</p>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}