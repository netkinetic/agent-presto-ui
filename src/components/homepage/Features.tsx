'use client';

import { Sparkles, Globe, Rocket, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-indigo-600" />,
    title: 'Launch Campaigns Fast',
    description: 'From landing pages to email funnels, generate everything with AI in minutes.',
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
    title: 'Multi-Domain Support',
    description: 'Use for business, personal, family, health, or finance — all in one platform.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    title: 'Custom Playbooks',
    description: 'Pick your goal and we’ll generate an actionable playbook tailored just for you.',
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
    title: 'Built For Solopreneurs',
    description: 'A coach, assistant, and strategist in your pocket — no team required.',
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose Agent Presto?</h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          A smarter way to grow your business or personal venture with a step-by-step AI playbook engine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
