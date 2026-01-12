import { create } from "zustand";
import { Camper } from "@/types/camper";

interface FavoritesState {
  favorites: Camper[];
  toggleFavorite: (camper: Camper) => void;
  isFavorite: (camperId: string) => boolean;
  hydrate: () => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  toggleFavorite: (camper) =>
    set((state) => {
      const exists = state.favorites.some((c) => c.id === camper.id);

      const newFavorites = exists
        ? state.favorites.filter((c) => c.id !== camper.id)
        : [...state.favorites, camper];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { favorites: newFavorites };
    }),

  isFavorite: (camperId) => {
    return get().favorites.some((c) => c.id === camperId);
  },

  hydrate: () => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        set({ favorites: JSON.parse(stored) });
      }
    } catch (e) {
      console.error("Failed to hydrate favorites", e);
      localStorage.removeItem("favorites");
    }
  },

  clearFavorites: () => {
    localStorage.removeItem("favorites");
    set({ favorites: [] });
  },
}));
