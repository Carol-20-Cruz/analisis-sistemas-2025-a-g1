// src/modules/informacion/components/BenefitsSection.tsx

import React from 'react';
import BenefitCard from './BenefitCard';
import { FaGift, FaStar, FaBrain } from 'react-icons/fa';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <FaGift />,
      title: 'Beneficios',
      description: 'Descuentos de membresía exclusivos y entrada a eventos especiales.',
    },
    {
      icon: <FaStar />,
      title: 'Ventajas',
      description: 'Contenido premium, soporte prioritario y beneficios personalizados.',
    },
    {
      icon: <FaBrain />,
      title: 'Habilidades Mentales',
      description: 'Mejora tu concentración, memoria y agilidad mental con nuestros programas.',
    },
  ];

  return (
    <section className="py-50 px-6 bg-black text-white text-center">
      <h2 className="text-4xl font-extrabold mb-6">Únete a Nuestra Comunidad</h2>
      <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
        Descubre los beneficios y habilidades que ofrecemos y regístrate para comenzar.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {benefits.map((item, index) => (
          <BenefitCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
