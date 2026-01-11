import { create } from "zustand";
import { Camper } from "@/types/camper";

interface FavoritesState {
  favorites: Camper[];
  toggleFavorite: (camper: Camper) => void;
  isFavorite: (camperId: string) => boolean;
  hydrate: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  toggleFavorite: (camper) => {
    const favorites = get().favorites;
    const exists = favorites.find((c) => c.id === camper.id);

    let newFavorites: Camper[];
    if (exists) {
      newFavorites = favorites.filter((c) => c.id !== camper.id);
    } else {
      newFavorites = [...favorites, camper];
    }

    set({ favorites: newFavorites });
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  },

  isFavorite: (camperId) => {
    return get().favorites.some((c) => c.id === camperId);
  },

  hydrate: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        set({ favorites: JSON.parse(stored) });
      }
    }
  },
}));
