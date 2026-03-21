import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Section } from "@/data/schema";

interface AppStore {
  seenCards: string[];
  favorites: string[];
  lastSection: Section | null;
  streak: number;

  markSeen: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setLastSection: (section: Section) => void;
  incrementStreak: () => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      seenCards: [],
      favorites: [],
      lastSection: null,
      streak: 0,

      markSeen: (id) =>
        set((state) => ({
          seenCards: state.seenCards.includes(id)
            ? state.seenCards
            : [...state.seenCards, id],
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fid) => fid !== id)
            : [...state.favorites, id],
        })),

      isFavorite: (id) => get().favorites.includes(id),

      setLastSection: (section) => set({ lastSection: section }),

      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),

      resetProgress: () =>
        set({ seenCards: [], favorites: [], lastSection: null, streak: 0 }),
    }),
    {
      name: "felingo-app",
    },
  ),
);
