// src/modules/informacion/components/RegisterForm.tsx

'use client';

import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setSubmitted(true);
    setFormData({ nombre: '', correo: '', telefono: '' });
  };

  return (
    <div className="bg-white/10 rounded-3xl shadow-lg p-10 text-white max-w-md mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center">Regístrate</h2>

      {submitted ? (
        <p className="text-green-400 text-center text-lg font-semibold">
          ¡Gracias por registrarte! Nos pondremos en contacto contigo pronto.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {['nombre', 'correo', 'telefono'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block mb-3 font-semibold text-lg capitalize">
                {field}
              </label>
              <input
                type={field === 'correo' ? 'email' : field === 'telefono' ? 'tel' : 'text'}
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                required
                placeholder={field === 'correo' ? 'ejemplo@correo.com' : field === 'telefono' ? '+52 123 456 7890' : 'Tu nombre completo'}
                className="w-full rounded-lg p-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition py-4 rounded-xl font-extrabold text-lg"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}
