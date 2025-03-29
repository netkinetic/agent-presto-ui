import React from 'react';

interface Props {
  title: string;
  data: Record<string, string>;
}

export default function ReviewCard({ title, data }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 mb-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <ul className="text-sm text-gray-600 space-y-1">
        {Object.entries(data).map(([label, value]) => (
          <li key={label}>
            <span className="font-medium text-gray-800">{label}:</span> {value || '—'}
          </li>
        ))}
      </ul>
    </div>
  );
}
