'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== 'admin') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-4">
            <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
            <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-red-600">Admin Panel</h1>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2 text-red-800 dark:text-red-200">
                🔐 Admin Access Only
              </h2>
              <p className="text-red-700 dark:text-red-300">
                This page is restricted to admin users only.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Admin Information:</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Role:</strong> {(session.user as any)?.role}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h3 className="text-lg font-medium mb-3">Admin Capabilities:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="font-medium mb-2">User Management</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Manage user accounts and permissions
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="font-medium mb-2">System Settings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Configure application settings
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    View system analytics and reports
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Content Management</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Manage application content
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}