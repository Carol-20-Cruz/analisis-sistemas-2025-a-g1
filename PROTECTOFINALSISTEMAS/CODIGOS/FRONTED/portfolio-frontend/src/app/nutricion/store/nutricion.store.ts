import axios from 'axios';
import { create } from 'zustand';

// Interfaz del modelo Nutricion
export interface Nutricion {
  id: string;
  name: string;
  calories: number;
  date: string;
  isActive: boolean;
  userId: string;
}

// Interfaz del store
interface NutricionStore {
  nutricionList: Nutricion[];
  getNutricion: () => Promise<void>;
  createNutricion: (data: Omit<Nutricion, 'id' | 'isActive'>) => Promise<void>;
  updateNutricion: (id: string, data: Omit<Nutricion, 'id' | 'isActive'>) => Promise<void>;
  deleteNutricion: (id: string) => Promise<void>;
}

const API_URL = 'http://localhost:4000/api/v1/meal';

export const useNutricionStore = create<NutricionStore>((set) => ({
  nutricionList: [],

  getNutricion: async () => {
    try {
      const response = await axios.get<Nutricion[]>(API_URL);
      set({ nutricionList: response.data });
    } catch (error) {
      console.error('Error al obtener nutrición:', error);
    }
  },

  createNutricion: async (data) => {
    try {
      await axios.post(API_URL, data);
      const response = await axios.get<Nutricion[]>(API_URL);
      set({ nutricionList: response.data });
    } catch (error) {
      console.error('Error al crear nutrición:', error);
    }
  },

  updateNutricion: async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      const response = await axios.get<Nutricion[]>(API_URL);
      set({ nutricionList: response.data });
    } catch (error) {
      console.error('Error al actualizar nutrición:', error);
    }
  },

  deleteNutricion: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const response = await axios.get<Nutricion[]>(API_URL);
      set({ nutricionList: response.data });
    } catch (error) {
      console.error('Error al eliminar nutrición:', error);
    }
  },
}));
