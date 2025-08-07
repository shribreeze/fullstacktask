import Link from 'next/link';
import RomanConverter from '@/components/RomanConverter';

export default function RomanPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Roman Numerals Converter</h1>
        <RomanConverter />
      </div>
    </div>
  );
}