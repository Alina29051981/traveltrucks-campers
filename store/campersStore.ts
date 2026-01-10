import { create } from "zustand";
import { Camper } from "@/types/camper";
import { api } from "@/services/api";

interface CampersState {
  campers: Camper[];
  selectedCamper: Camper | null;
  isLoading: boolean;
  error: string | null;

  setCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;   
  setError: (error: string | null) => void; 

  fetchCampers: () => Promise<void>;
  fetchCamperById: (id: string) => Promise<void>;
}

export const useCampersStore = create<CampersState>((set) => ({
  campers: [],
  selectedCamper: null,
  isLoading: false,
  error: null,

  setCampers: (campers) => set({ campers }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  fetchCampers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Camper[]>("/campers");
      set({ campers: response.data });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to load campers", campers: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCamperById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<Camper>(`/campers/${id}`);
      set({ selectedCamper: data });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to load camper", selectedCamper: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
