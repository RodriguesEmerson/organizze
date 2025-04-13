import { create } from "zustand";

export const useAuthStatus = create((set) => ({
   isAuthenticated: false,
   setAuth: (auth) => set(() => ({
      isAuthenticated: auth
   }))
}))