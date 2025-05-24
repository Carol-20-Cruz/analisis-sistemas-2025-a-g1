// src/modules/informacion/components/BenefitCard.tsx

import React from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-neutral-900 p-6 rounded-2xl shadow-lg text-white w-full sm:w-64 hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-4 text-5xl text-blue-400">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-2 text-center">{title}</h4>
      <p className="text-sm text-gray-300 text-center">{description}</p>
    </div>
  );
}
