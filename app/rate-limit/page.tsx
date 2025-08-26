'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ApiResponse {
  message?: string;
  error?: string;
  timestamp?: string;
  ip?: string;
}

export default function RateLimitPage() {
  const [responses, setResponses] = useState<(ApiResponse & { status: number; headers: Record<string, string> })[]>([]);
  const [loading, setLoading] = useState(false);

  const makeRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rate-limit-test');
      const data = await response.json();
      
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        if (key.startsWith('x-ratelimit') || key === 'retry-after') {
          headers[key] = value;
        }
      });

      setResponses(prev => [{
        ...data,
        status: response.status,
        headers
      }, ...prev].slice(0, 20));
    } catch (error) {
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const makeMultipleRequests = async () => {
    for (let i = 0; i < 15; i++) {
      await makeRequest();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">API Rate Limiting Demo</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Rate Limit: 10 requests per minute</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Test the rate limiting by making API requests. After 10 requests, you&apos;ll receive a 429 error.
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={makeRequest}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              {loading ? 'Loading...' : 'Make Single Request'}
            </button>
            
            <button
              onClick={makeMultipleRequests}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-300"
            >
              Make 15 Requests (Trigger Rate Limit)
            </button>
            
            <button
              onClick={() => setResponses([])}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">API Responses ({responses.length})</h3>
          
          {responses.length === 0 ? (
            <p className="text-gray-500">No requests made yet</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border ${
                    response.status === 429
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-semibold ${
                      response.status === 429 ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'
                    }`}>
                      Status: {response.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {response.timestamp && new Date(response.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-2">
                    <strong>Message:</strong> {response.message || response.error}
                  </p>
                  
                  {Object.keys(response.headers).length > 0 && (
                    <div className="text-xs">
                      <strong>Headers:</strong>
                      <ul className="ml-4 mt-1">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <li key={key}>
                            <code>{key}: {value}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}