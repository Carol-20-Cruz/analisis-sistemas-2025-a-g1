import axios from 'axios';
import { create } from 'zustand';

// Interfaz del usuario extendida
export interface Usuario {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  age: number;
  phone: string;
  gender: string;
}

interface InformacionStore {
  users: Usuario[];
  fetchUsers: () => Promise<void>;
  createUser: (data: Omit<Usuario, 'id'>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const API_URL = 'http://localhost:4000/api/v1/user'; // Asegúrate de que este endpoint coincida con tu backend

export const useInformacionStore = create<InformacionStore>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const response = await axios.get<Usuario[]>(API_URL);
      set({ users: response.data });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  },

  createUser: async (data) => {
    try {
      await axios.post(API_URL, data);
      const response = await axios.get<Usuario[]>(API_URL);
      set({ users: response.data });
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const response = await axios.get<Usuario[]>(API_URL);
      set({ users: response.data });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  },
}));