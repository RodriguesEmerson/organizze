import { create } from "zustand";

export const useModalConfirmActionStore = create((set) => ({
   action: false,
   setAction: (action) => set((state) => (
      {
         action: action
      }
   )),
}))