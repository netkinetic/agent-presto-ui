'use client';
import React from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // Log the error if needed
  console.error('Global error boundary caught an error:', error);

  return (
    <html>
      <head>
        <title>Something went wrong</title>
      </head>
      <body className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-red-600">Oops, an error occurred</h1>
        <p className="mt-4 text-lg text-gray-700">
          {error.message || 'An unexpected error has occurred.'}
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
