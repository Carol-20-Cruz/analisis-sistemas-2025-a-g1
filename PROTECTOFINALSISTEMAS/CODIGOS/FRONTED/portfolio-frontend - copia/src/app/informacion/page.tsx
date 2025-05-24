'use client';

import Layout from '@/modules/layouts/layout';
import React, { useEffect, useState } from 'react';
import { useInformacionStore } from './store/informacion.store';

export default function UsuarioPage() {
  const { users, fetchUsers, createUser, deleteUser } = useInformacionStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !password || !age || !phone || !gender) return;

    try {
      await createUser({ name, email, password, isActive, age, phone, gender });
      // Limpiar campos
      setName('');
      setEmail('');
      setPassword('');
      setIsActive(true);
      setAge(0);
      setPhone('');
      setGender('');
      await fetchUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <img
          src="https://res.cloudinary.com/dpnfdcar1/image/upload/v1747692996/450_1000_kphl2s.webp"
          alt="Banner Usuarios"
          className="rounded-2xl shadow-md w-full max-h-[250px] object-cover"
        />

        <h2 className="text-3xl font-bold text-center text-white">Gestión de Usuarios</h2>

        <div className="bg-white p-6 rounded-2xl shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Edad</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Sexo</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="mr-2"
              />
              <label className="text-sm font-semibold text-gray-600">Activo</label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Guardar Usuario
          </button>
        </div>

        <div className="space-y-4">
          {(users ?? []).length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">Correo: <span className="font-semibold">{user.email}</span></p>
                  <p className="text-sm text-gray-600">Teléfono: <span className="font-semibold">{user.phone}</span></p>
                  <p className="text-sm text-gray-600">Edad: <span className="font-semibold">{user.age}</span></p>
                  <p className="text-sm text-gray-600">Sexo: <span className="font-semibold">{user.gender}</span></p>
                  <p className="text-sm text-gray-600">Activo: <span className={`font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>{user.isActive ? 'Sí' : 'No'}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(user.id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay usuarios registrados.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}