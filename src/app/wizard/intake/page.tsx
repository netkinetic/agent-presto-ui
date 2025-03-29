// src/app/wizard/intake/page.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import IntakeForm from '@/components/wizard/IntakeForm';

export default function IntakePage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Welcome to Agent Presto</h1>
      <p className="text-gray-600 mb-6 text-center">Let's get to know you before we begin...</p>
      <IntakeForm onNext={() => router.push('/wizard/step-1')} />
    </div>
  );
}
