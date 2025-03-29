'use client';
import { ReactNode } from 'react';

export default function WizardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="w-full bg-white border-b shadow-xl p-6">
        <h2 className="text-3xl font-bold text-blue-600 tracking-tight">
          Agent Presto 🚀
        </h2>
        <p className="text-sm text-gray-500 mt-1">Your AI Growth Wizard</p>
      </header>

      {/* Main Content */}
      <main className="p-10">{children}</main>
    </div>
  );
}
