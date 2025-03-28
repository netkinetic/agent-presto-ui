'use client';

import React from 'react';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function Modal({ title, content, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

        {/* Content */}
        <div className="prose prose-sm max-h-[60vh] overflow-y-auto text-gray-700 whitespace-pre-wrap">
          {content}
        </div>

        {/* Close button footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

