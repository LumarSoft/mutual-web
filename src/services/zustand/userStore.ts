import { create } from 'zustand';

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
  user: UserState;
  setUser: (user: UserState) => void;
}

export const useStore = create<State>((set) => ({
  user: {
    DNI: "",
    admin: false,
    bono: "",
    date_subscription: "",
    email: "",
    instalments_Qty: 0,
    last_paid: "",
    name: "",
    tel: "",
    uid: "",
    up_to_date: false,
  },
  setUser: (user) => set({ user }),
}));