import { create } from "zustand";

export const useCategoriesDataStore = create((set) => ({
   categories: false,
   editingCategory: false,
   icons: [
      'c-icon-0.png', 'c-icon-1.png', 'c-icon-2.png', 'c-icon-3.png', 'c-icon-4.png', 
      'c-icon-5.png', 'c-icon-6.png', 'c-icon-7.png', 'c-icon-8.png', 'c-icon-9.png', 'c-icon-10.png', 'c-icon-11.png'
   ],
   setCategories: (categories) => set((state) => ({
      categories: categories
   })),
   setEditingCategory: (category) => set(() => ({
      editingCategory: category
   })),
   addCategory: (category) => set((state) => ({
      categories: {
         ...state.categories,
         category
      }
   }))
}))