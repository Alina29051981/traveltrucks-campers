import { create } from "zustand";
import { Camper, CamperFilters } from "@/types/camper";
import { fetchCampers, clearCampersCache } from "@/services/campersApi";

const initialFilters: CamperFilters = {
  location: "",
  form: undefined,
  AC: false,
  kitchen: false,
  bathroom: false,
  TV: false,
};

interface CampersState {
  campers: Camper[];
  selectedCamper: Camper | null;

  filters: CamperFilters;
  page: number;
  limit: number;
  hasMore: boolean;

  isLoading: boolean;
  error: string | null;

  setFilters: (filters: CamperFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  fetchCamperById: (id: string) => Promise<void>;
  resetCatalog: () => void;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  selectedCamper: null,

  filters: initialFilters,
  page: 1,
  limit: 4,
  hasMore: true,

  isLoading: false,
  error: null,

  setFilters: async (filters) => {
    set({ isLoading: true, error: null });
    clearCampersCache();

    try {
      const campers = await fetchCampers(filters, 1, get().limit);
      set({
        filters,
        campers,
        page: 1,
        hasMore: campers.length === get().limit,
      });
    } catch {
      set({ error: "Failed to load campers" });
    } finally {
      set({ isLoading: false });
    }
  },

  loadMore: async () => {
    const { page, filters, campers, limit, isLoading, hasMore } = get();
    if (isLoading || !hasMore) return;

    set({ isLoading: true });

    try {
      const nextPage = page + 1;
      const newCampers = await fetchCampers(filters, nextPage, limit);

      set({
        campers: [...campers, ...newCampers],
        page: nextPage,
        hasMore: newCampers.length === limit,
      });
    } catch {
      set({ error: "Failed to load more campers" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCamperById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCamper: null });

    try {
      const res = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      set({ selectedCamper: data });
    } catch {
      set({ error: "Failed to load camper" });
    } finally {
      set({ isLoading: false });
    }
  },

  resetCatalog: () => {
    clearCampersCache();
    set({
      campers: [],
      filters: initialFilters,
      page: 1,
      hasMore: true,
      error: null,
    });
  },
}));
