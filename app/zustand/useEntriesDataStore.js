import { create } from "zustand";

export const useEntriesDataStore = create((set) => ({
   entriesData: false,
   setEntriesDataStore: (data) => set(() => ({
      entriesData: data
   }))
}))