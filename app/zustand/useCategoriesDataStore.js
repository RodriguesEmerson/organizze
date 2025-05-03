import { create } from "zustand";

export const useCategoriesDataStore = create((set) => ({
   categories: false,
   setCategories: (categories) => set((state) => ({
      categories: categories
   })),
   addCategory: (category) => set((state) => ({
      categories: {
         ...state.categories,
         category
      }
   }))
}))