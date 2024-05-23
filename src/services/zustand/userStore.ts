import { create } from "zustand";

interface UserState {
  DNI: string;
  admin: boolean;
  bono: string;
  date_subscription: string;
  email: string;
  instalments_Qty: number;
  last_paid: string;
  name: string;
  tel: string;
  uid: string;
  up_to_date: boolean;
}

interface State {
  user: UserState | null;
  setUser: (user: UserState) => void;
  logout: () => void;
}

export const useStore = create<State>((set) => ({
  // user: {
  //   DNI: "",
  //   admin: false,
  //   bono: "",
  //   date_subscription: "",
  //   email: "",
  //   instalments_Qty: 0,
  //   last_paid: "",
  //   name: "",
  //   tel: "",
  //   uid: "",
  //   up_to_date: false,
  // },
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
