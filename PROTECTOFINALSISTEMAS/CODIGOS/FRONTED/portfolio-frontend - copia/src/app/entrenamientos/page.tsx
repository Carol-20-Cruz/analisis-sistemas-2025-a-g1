'use client';

import Layout from '@/modules/layouts/layout';
import React, { useEffect, useState } from 'react';
import { useEntrenamientoStore } from './store/entrenamiento.store';

export default function EntrenamientoPage() {
  const getEntrenamiento = useEntrenamientoStore(state => state.getEntrenamiento);
  const entrenamientoList = useEntrenamientoStore(state => state.EntrenamientoList);
  const createEntrenamiento = useEntrenamientoStore(state => state.createEntrenamiento);
  const updateEntrenamiento = useEntrenamientoStore(state => state.updateEntrenamiento);
  const deleteEntrenamiento = useEntrenamientoStore(state => state.deleteEntrenamiento);

  const [name, setName] = useState('');
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [workoutId, setWorkoutId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getEntrenamiento();
  }, []);

  const handleSubmit = async () => {
    if (!name || !workoutId || sets <= 0 || reps <= 0 || weight <= 0) return;

    const data = { name, sets, reps, weight, workoutId };

    try {
      if (isEditing && editingId) {
        await updateEntrenamiento(editingId, data);
      } else {
        await createEntrenamiento(data);
      }

      await getEntrenamiento();

      setName('');
      setSets(0);
      setReps(0);
      setWeight(0);
      setWorkoutId('');
      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar entrenamiento:", error);
    }
  };

  const handleEdit = (id: string) => {
    const ent = entrenamientoList.find(e => e.id === id);
    if (!ent) return;
    setName(ent.name);
    setSets(ent.sets);
    setReps(ent.reps);
    setWeight(ent.weight);
    setWorkoutId(ent.workoutId);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntrenamiento(id);
      await getEntrenamiento();
    } catch (error) {
      console.error("Error al eliminar entrenamiento:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <img
          src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747693163/que-es-el-entrenamiento-hiit_flc41y.jpg"
          alt="Banner Entrenamiento"
          className="max-w-md mx-auto rounded-xl shadow-lg"
        />

        <h2 className="text-3xl font-bold text-center text-white">Gestión de Entrenamientos</h2>

        <div className="bg-white border border-gray-300 p-6 rounded-2xl shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Nombre del ejercicio</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Series</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Repeticiones</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Peso (kg)</label>
              <input
                type="number"
                value={weight}
                step="0.1"
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800">ID del Workout</label>
              <input
                type="text"
                value={workoutId}
                onChange={(e) => setWorkoutId(e.target.value)}
                className="mt-1 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {isEditing ? 'Actualizar Entrenamiento' : 'Guardar Entrenamiento'}
          </button>
        </div>

        <div className="space-y-4">
          {(entrenamientoList ?? []).length > 0 ? (
            entrenamientoList.map((ent) => (
              <div
                key={ent.id}
                className="p-4 bg-white text-black border border-gray-300 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold">{ent.name}</h3>
                  <p className="text-sm text-gray-700">Series: <span className="font-semibold">{ent.sets}</span></p>
                  <p className="text-sm text-gray-700">Repeticiones: <span className="font-semibold">{ent.reps}</span></p>
                  <p className="text-sm text-gray-700">Peso: <span className="font-semibold">{ent.weight} kg</span></p>
                  <p className="text-sm text-gray-700">Workout ID: <span className="font-semibold">{ent.workoutId}</span></p>
                  <p className="text-sm text-gray-700">Activo: <span className={`font-semibold ${ent.isActive ? 'text-black' : 'text-gray-500'}`}>{ent.isActive ? 'Sí' : 'No'}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(ent.id)}
                    className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(ent.id)}
                    className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay entrenamientos registrados.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
