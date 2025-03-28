'use client';

import Hero from '@/components/homepage/Hero';
import Features from '@/components/homepage/Features';

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Hero />
      <Features />
    </main>
  );
}
