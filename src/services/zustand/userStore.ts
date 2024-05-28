import { User } from "@/shared/types/users";
import { create } from "zustand";

interface State {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
