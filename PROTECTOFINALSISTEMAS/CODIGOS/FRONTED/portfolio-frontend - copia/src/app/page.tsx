"use client";

import Activity from "@/modules/activity/components/activity.component";
import Layout from "@/modules/layouts/layout";
import SoftSkill from "@/modules/soft-skill/components/soft-skill.component";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    peso: "",
    altura: "",
    edad: "",
    telefono: "",
    genero: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    alert("Registro enviado con éxito");
  };

  return (
    <Layout>
      {/* PRESENTACIÓN */}
      <section className="text-white">
        <h1 className="text-cyan-400 font-bold text-6xl">FITCONTROL</h1>
        <h4 className="text-cyan-300 font-semibold text-3xl mt-2">
          SISTEMA DE GESTIÓN PARA GIMNASIOS
        </h4>
        <p className="mt-4 max-w-xl text-gray-300">
          Bienvenido a FITCONTROL, tu aliado para organizar y mejorar
          la experiencia en tu gimnasio. Aquí podrás gestionar entrenamientos,
          rutinas y habilidades blandas para alcanzar tus objetivos de forma eficiente.
        </p>
      </section>

      {/* ACTIVIDADES */}
      <section className="mt-10">
        <h2 className="text-white font-semibold text-3xl mb-4">¿Qué estás esperando?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Activity 
            title="Entrenamiento de fuerza" 
            description="Mejora tu fuerza muscular con rutinas personalizadas." 
          />
          <Activity 
            title="Cardio intenso" 
            description="Quema calorías y mejora tu resistencia cardiovascular." 
          />
          <Activity 
            title="Entrenamiento funcional" 
            description="Potencia tu movilidad y equilibrio con ejercicios dinámicos." 
          />
          <Activity 
            title="Yoga y relajación" 
            description="Equilibra cuerpo y mente con sesiones de yoga y meditación." 
          />
        </div>
      </section>

      {/* HABILIDADES BLANDAS */}
      <section className="mt-12">
        <h2 className="text-white font-semibold text-3xl mb-6">Habilidades Blandas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SoftSkill />
        </div>
      </section>

      {/* REGISTRO DE PERSONAS */}
      <section className="mt-16 p-6 bg-gray-800 rounded-md max-w-xl mx-auto text-white">
        <h2 className="text-2xl font-semibold mb-4">Registro de Personas</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="peso"
            placeholder="Peso (kg)"
            value={formData.peso}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="altura"
            placeholder="Altura (cm)"
            value={formData.altura}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Número de teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Selecciona género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded"
          >
            Registrar
          </button>
        </form>
      </section>
    </Layout>
  );
}