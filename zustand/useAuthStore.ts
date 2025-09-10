import { create } from "zustand";

type inputType = "password" | "email";

interface User {
  $id: string;
  name?: string;
  email?: string;
}

interface AuthState {
  signData: {
    email: string;
    password: string;
  };
  error: string;
  user: User | null;
  setError: (value: string) => void;
  handleInputs: (value: string, variant: inputType) => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  error: "",
  setError: (value) => set(() => ({ error: value })),
  signData: { email: "", password: "" },
  handleInputs: (value: string, variant: inputType) => {
    if (variant === "email") {
      set((state) => ({ signData: { ...state.signData, email: value } }));
    } else if (variant === "password") {
      set((state) => ({ signData: { ...state.signData, password: value } }));
    }
  },
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useAuthStore;
