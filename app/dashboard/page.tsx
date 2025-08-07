'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const userRole = (session.user as any)?.role;
    if (!userRole || (userRole !== 'user' && userRole !== 'admin')) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const userRole = (session.user as any)?.role;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Welcome, {session.user?.name}!</h2>
              <p className="text-gray-600 dark:text-gray-300">Email: {session.user?.email}</p>
              <p className="text-gray-600 dark:text-gray-300">Role: {userRole}</p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h3 className="text-lg font-medium mb-3">Available Actions:</h3>
              <div className="space-y-2">
                <p>✅ Access to user dashboard</p>
                {userRole === 'admin' && (
                  <div>
                    <p>✅ Access to admin panel</p>
                    <Link
                      href="/admin"
                      className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      Go to Admin Panel
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}