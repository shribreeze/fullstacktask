'use client';

import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';

export default function ToastDemoPage() {
  const { addToast } = useToast();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Toast Notification Demo</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Try Different Toast Types</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Click the buttons below to see different types of toast notifications. 
            They will auto-dismiss after 3 seconds or you can close them manually.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToast('Success! Operation completed successfully.', 'success')}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Show Success Toast
              </button>
              
              <button
                onClick={() => addToast('Error! Something went wrong.', 'error')}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Show Error Toast
              </button>
              
              <button
                onClick={() => addToast('Info: Here is some useful information.', 'info')}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Show Info Toast
              </button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h3 className="text-lg font-medium mb-2">Multiple Toasts</h3>
              <button
                onClick={() => {
                  addToast('First toast message', 'info');
                  setTimeout(() => addToast('Second toast message', 'success'), 500);
                  setTimeout(() => addToast('Third toast message', 'error'), 1000);
                }}
                className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors"
              >
                Show Multiple Toasts
              </button>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h3 className="font-medium mb-2">Toast Features:</h3>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
              <li>• Auto-dismiss after 3 seconds</li>
              <li>• Manual close button (×)</li>
              <li>• Support for success, error, and info types</li>
              <li>• Stacked display for multiple toasts</li>
              <li>• Smooth animations</li>
              <li>• Global context for use across components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}