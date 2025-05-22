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
      // Reset form
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
      <div className="p-6 space-y-6 bg-white rounded shadow">
        {/* Imagen al inicio */}
        <img
          src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747693163/que-es-el-entrenamiento-hiit_flc41y.jpg"
          alt="Banner Entrenamiento"
          className="rounded-lg w-full max-h-[250px] object-cover mx-auto"
        />

        <h2 className="text-2xl font-bold">Gestión de Entrenamientos</h2>

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nombre del entrenamiento</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Series (sets)</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Repeticiones (reps)</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">ID del Workout</label>
            <input
              type="text"
              value={workoutId}
              onChange={(e) => setWorkoutId(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            {isEditing ? 'Actualizar Entrenamiento' : 'Guardar Entrenamiento'}
          </button>
        </div>

        {/* Lista de entrenamientos */}
        <div className="space-y-4 mt-6">
          {(entrenamientoList ?? []).length > 0 ? (
            entrenamientoList.map((ent) => (
              <div key={ent.id} className="border p-4 rounded bg-neutral-50 space-y-1">
                <h3 className="text-xl font-semibold">{ent.name}</h3>
                <p><strong>Sets:</strong> {ent.sets}</p>
                <p><strong>Reps:</strong> {ent.reps}</p>
                <p><strong>Peso:</strong> {ent.weight} kg</p>
                <p><strong>Workout ID:</strong> {ent.workoutId}</p>
                <p><strong>Activo:</strong> {ent.isActive ? 'Sí' : 'No'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(ent.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(ent.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay entrenamientos registrados.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
