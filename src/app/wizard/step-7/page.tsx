'use client';
import { useWizardStore } from '@/store/wizardState';

export default function StepSeven() {
  const { playbook } = useWizardStore();

  if (!playbook) {
    return <p className="text-center text-gray-600">No playbook data available.</p>;
  }

  const formatLabel = (label: string) =>
    label.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const renderSection = (title: string, data: Record<string, string>) => (
    <section className="space-y-2">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <ul className="list-disc pl-6 space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{formatLabel(key)}:</strong> {value}
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      {renderSection('🎯 Landing Page', playbook.landing_page)}
      {renderSection('📝 Blog Posts', playbook.blog_post)}
      {renderSection('📧 Email Campaigns', playbook.emails)}
      {renderSection('📅 Timeline', playbook.timeline)}
    </div>
  );
}
