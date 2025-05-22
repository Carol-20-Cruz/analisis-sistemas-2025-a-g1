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

    const isoDate = new Date(date).toISOString(); // ✅ conversión correcta

    const data = {
      name,
      calories,
      date: isoDate,
      userId,
    };

    try {
      if (isEditing && editingId) {
        await updateNutricion(editingId, data);
      } else {
        await createNutricion(data);
      }

      await getNutricion();

      // Reset form
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
    setDate(nut.date.split('T')[0]); // ✅ muestra solo yyyy-mm-dd
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
      <div className="p-6 space-y-6 bg-white rounded shadow">
        {/* Imagen al inicio */}
        <img
          src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747692996/450_1000_kphl2s.webp"
          alt="Banner Nutrición"
          className="rounded-lg w-full max-h-[250px] object-cover mx-auto"
        />

        <h2 className="text-2xl font-bold">Gestión de Nutrición</h2>

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nombre del alimento</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Calorías</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">ID del Usuario</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {isEditing ? 'Actualizar Registro' : 'Guardar Registro'}
          </button>
        </div>

        {/* Lista de registros */}
        <div className="space-y-4 mt-6">
          {(nutricionList ?? []).length > 0 ? (
            nutricionList.map((nut) => (
              <div key={nut.id} className="border p-4 rounded bg-neutral-50 space-y-1">
                <h3 className="text-xl font-semibold">{nut.name}</h3>
                <p><strong>Calorías:</strong> {nut.calories}</p>
                <p><strong>Fecha:</strong> {nut.date.split('T')[0]}</p>
                <p><strong>ID Usuario:</strong> {nut.userId}</p>
                <p><strong>Activo:</strong> {nut.isActive ? 'Sí' : 'No'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(nut.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(nut.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay registros de nutrición.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

