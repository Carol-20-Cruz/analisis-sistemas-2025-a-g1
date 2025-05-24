'use client';

import Layout from '@/modules/layouts/layout';
import React, { useEffect, useState } from 'react';
import { useNutricionStore } from './store/nutricion.store';

export default function NutricionPage() {
  const getNutricion = useNutricionStore(state => state.getNutricion);
  const nutricionList = useNutricionStore(state => state.nutricionList);
  const createNutricion = useNutricionStore(state => state.createNutricion);
  const updateNutricion = useNutricionStore(state => state.updateNutricion);
  const deleteNutricion = useNutricionStore(state => state.deleteNutricion);

  const [name, setName] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getNutricion();
  }, []);

  const handleSubmit = async () => {
    if (!name || calories <= 0 || !date || !userId) return;

    const isoDate = new Date(date).toISOString();

    const data = { name, calories, date: isoDate, userId };

    try {
      if (isEditing && editingId) {
        await updateNutricion(editingId, data);
      } else {
        await createNutricion(data);
      }

      await getNutricion();

      setName('');
      setCalories(0);
      setDate('');
      setUserId('');
      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar nutrición:", error);
    }
  };

  const handleEdit = (id: string) => {
    const nut = nutricionList.find(n => n.id === id);
    if (!nut) return;
    setName(nut.name);
    setCalories(nut.calories);
    setDate(nut.date.split('T')[0]);
    setUserId(nut.userId);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNutricion(id);
      await getNutricion();
    } catch (error) {
      console.error("Error al eliminar registro de nutrición:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Imagen principal */}
        <img
          src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747692996/450_1000_kphl2s.webp"
          alt="Banner Nutrición"
          className="rounded-2xl shadow-md w-full max-h-[250px] object-cover"
        />

        <h2 className="text-3xl font-bold text-center text-white">Gestión de Nutrición</h2>

        {/* Formulario */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Nombre del alimento</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Calorías</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">ID del Usuario</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {isEditing ? 'Actualizar Registro' : 'Guardar Registro'}
          </button>
        </div>

        {/* Lista de registros */}
        <div className="space-y-4">
          {(nutricionList ?? []).length > 0 ? (
            nutricionList.map((nut) => (
              <div key={nut.id} className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{nut.name}</h3>
                  <p className="text-sm text-gray-600">Calorías: <span className="font-semibold">{nut.calories}</span></p>
                  <p className="text-sm text-gray-600">Fecha: <span className="font-semibold">{nut.date.split('T')[0]}</span></p>
                  <p className="text-sm text-gray-600">Usuario: <span className="font-semibold">{nut.userId}</span></p>
                  <p className="text-sm text-gray-600">Activo: <span className={`font-semibold ${nut.isActive ? 'text-green-600' : 'text-red-600'}`}>{nut.isActive ? 'Sí' : 'No'}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(nut.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(nut.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay registros de nutrición.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}