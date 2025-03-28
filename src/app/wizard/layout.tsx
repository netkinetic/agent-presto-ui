'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ReactNode } from 'react';

const steps = [
  { step: 1, label: 'Industry', path: '/wizard/step-1' },
  { step: 2, label: 'Business Type', path: '/wizard/step-2' },
  { step: 3, label: 'Goal', path: '/wizard/step-3' },
  { step: 4, label: 'Playbook Preview', path: '/wizard/step-4' },
];

export default function WizardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-xl p-6 space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 tracking-tight">Agent Presto 🚀</h2>
          <p className="text-sm text-gray-500 mt-1">Your AI Growth Wizard</p>
        </div>
        <nav className="space-y-4">
          {steps.map(({ step, label, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={step}
                href={path}
                className={clsx(
                  'block px-4 py-3 rounded-xl border transition-all duration-300 font-medium shadow-sm',
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-lg animate-pulse'
                    : 'text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                )}
              >
                Step {step}: {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
