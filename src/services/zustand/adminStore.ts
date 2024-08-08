import { Admins } from "../../shared/types/admins";
import { create } from "zustand";

interface AdminState {
  admin: Admins | null;
  setAdmin: (admin: Admins) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  logout: () => set({ admin: null }),
}));
