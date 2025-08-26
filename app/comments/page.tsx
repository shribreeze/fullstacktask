import Link from 'next/link';
import CommentSection from '@/components/CommentSection';

export default function CommentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Nested Comment Section</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Article</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is a article to demonstrate the nested comment system. 
            Users can add comments and reply to existing comments, creating a threaded discussion.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            The comment system supports unlimited nesting levels and renders recursively.
            Try adding a comment or replying to existing ones below.
          </p>
        </div>

        <CommentSection />
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 className="font-medium mb-2">Features:</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li>• Nested replies with unlimited depth</li>
            <li>• Recursive rendering of comment threads</li>
            <li>• In-memory storage (no database required)</li>
            <li>• Real-time updates after posting</li>
            <li>• Visual indentation for reply hierarchy</li>
            <li>• Timestamps for all comments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}