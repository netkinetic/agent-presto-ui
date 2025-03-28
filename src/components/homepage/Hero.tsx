'use client';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="text-center py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">Agent Presto</h1>
        <p className="text-xl mb-6">Your AI Growth Engine for Business, Personal, and Life Goals</p>
        <button
          onClick={() => router.push('/wizard')}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          🚀 Get Started
        </button>
      </div>
    </section>
  );
}

