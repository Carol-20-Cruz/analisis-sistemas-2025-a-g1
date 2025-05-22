import { create } from 'zustand'
import axios from 'axios'

export interface Progress {
  id: string
  date: string 
  weight: number
  bodyFat?: number
  notes?: string
  isActive: boolean
  userId: string
}

interface ProgressState {
  progreso: Progress[]
  loading: boolean
  error: string | null
  fetchProgreso: () => Promise<void>
  addProgreso: (data: Omit<Progress, 'id'>) => Promise<void>
  updateProgreso: (id: string, data: Partial<Progress>) => Promise<void>
}

export const useProgreso = create<ProgressState>((set) => ({
  progreso: [],
  loading: false,
  error: null,

  fetchProgreso: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get('/api/progress')
      set({ progreso: res.data, loading: false })
    } catch (err: any) {
      set({ error: 'Error al cargar progreso', loading: false })
    }
  },

  addProgreso: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('/api/progress', data)
      set((state) => ({
        progreso: [...state.progreso, res.data],
        loading: false,
      }))
    } catch (err: any) {
      set({ error: 'Error al agregar progreso', loading: false })
    }
  },

  updateProgreso: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.put(`/api/progress/${id}`, data)
      set((state) => ({
        progreso: state.progreso.map((p) => (p.id === id ? res.data : p)),
        loading: false,
      }))
    } catch (err: any) {
      set({ error: 'Error al actualizar progreso', loading: false })
    }
  },
}))
