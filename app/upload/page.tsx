import Link from 'next/link';
import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">File Upload with Preview</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Upload Image File</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Select an image file to upload. You'll see a preview before uploading.
            Maximum file size: 5MB.
          </p>
          
          <UploadForm />
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h3 className="font-medium mb-2">Features:</h3>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
              <li>• Live image preview before upload</li>
              <li>• File validation (type and size)</li>
              <li>• Upload progress indication</li>
              <li>• Success/error feedback</li>
              <li>• File details display</li>
              <li>• API integration with Next.js route</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}