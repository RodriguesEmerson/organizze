import { create } from "zustand";
const tables = {
   2024: ['Novembro', 'Dezembro'],
   2025: ['Janeiro', 'Fevereiro'],
}

export const useTableStore = create((set) =>({
   tables: tables,
   addYearTable: (newYear) => set((state) => ({tables: {...state.tables, newYear}})),
   newoveYearTable: (deletedYear) => 
      set((state) => ({
         tables: 
            Object.fromEntries(
              Object.entries(...state.tables).filter(([key, value]) => value != deletedYear),
            )
      })),
   addMonthTable: (year, newMonth) => set((state) => ({tables: {...state.tables[year], newMonth}})),
   removeMonthTable: (year, deletedMonth) => 
      set((state) => ({
         tables: {
            ...state.tables,
            [year]: state.tables[year].filter(month => month !== deletedMonth),
         }
      }))
}))