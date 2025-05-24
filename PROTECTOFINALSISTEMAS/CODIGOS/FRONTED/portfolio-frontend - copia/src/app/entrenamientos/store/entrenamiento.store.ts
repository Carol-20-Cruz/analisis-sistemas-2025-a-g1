import axios from 'axios'; //LIBRERIAS DE HTTP 
import { create } from 'zustand';

// Interfaz del modelo Entrenamiento
export interface Entrenamiento {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  isActive: boolean;
  workoutId: string;
}

// Interfaz del store
interface EntrenamientoStore {
  EntrenamientoList: Entrenamiento[];
  getEntrenamiento: () => Promise<void>; //TRAE LOS ENTRENAMIENTOS DESDE EL BACKEND 
  createEntrenamiento: (data: Omit<Entrenamiento, 'id' | 'isActive'>) => Promise<void>;//OPCION DE CREAR UN NUEVO ENTRENAMIENTO
  updateEntrenamiento: (id: string, data: Omit<Entrenamiento, 'id' | 'isActive'>) => Promise<void>; //ACTUALIZACIÓN
  deleteEntrenamiento: (id: string) => Promise<void>; //ELIMINA ENTRENAMIENTO
}

//RUTA DEL BACKEND 
const API_URL = 'http://localhost:4000/api/v1/exercise';

//SE UTILIZAN LOS AXIOOS PARA CONECTARSE A LOS API 
export const useEntrenamientoStore = create<EntrenamientoStore>((set) => ({
  EntrenamientoList: [],

  //LLAMA  LOS DATOS DE ENTRENAMIENTO 
  getEntrenamiento: async () => {
    try {
      const response = await axios.get<Entrenamiento[]>(API_URL);
      set({ EntrenamientoList: response.data });
    } catch (error) {
      console.error('Error al obtener entrenamientos:', error);
    }
  },
  //CREA UN NUEVO ENTRENAMIENTO 
  createEntrenamiento: async (data) => {
    try {
      await axios.post(API_URL, data);
      const response = await axios.get<Entrenamiento[]>(API_URL);
      set({ EntrenamientoList: response.data });
    } catch (error) {
      console.error('Error al crear entrenamiento:', error);
    }
  },

  //ACTUALIZA ENTRENAMIENTO POR ID
  updateEntrenamiento: async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      const response = await axios.get<Entrenamiento[]>(API_URL);
      set({ EntrenamientoList: response.data });
    } catch (error) {
      console.error('Error al actualizar entrenamiento:', error);
    }
  },
   //PARA ELIMINAR 
  deleteEntrenamiento: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const response = await axios.get<Entrenamiento[]>(API_URL);
      set({ EntrenamientoList: response.data });
    } catch (error) {
      console.error('Error al eliminar entrenamiento:', error);
    }
  },
}));