import { create } from "zustand";

export const useTableStore = create((set) =>({
   tables: null,
   selectedTable: {year: 2024, month: 'janeiro'},
   newReleaseType: null,
   data: null,
   categories: null,
   changeTable: (year, month) => set((state) => (
      {
         selectedTable: {...state.tables, year: year, month: month}
      }
   )),
   setData: (data) => set((state) => (
      {data: data}
   )),
   setCategories: (categoriesDB) => set((state) =>(
      {
         categories: categoriesDB
      }
   )),
   setNewReleaseType: (type) => set((state) => (
      {
         newReleaseType: type
      }
   )),
   months: [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
   ]




   // addYearTable: (newYear) => set((state) => ({tables: {...state.tables, newYear}})),
   // newoveYearTable: (deletedYear) => 
   //    set((state) => ({
   //       tables: 
   //          Object.fromEntries(
   //            Object.entries(...state.tables).filter(([key, value]) => value != deletedYear),
   //          )
   //    })),
   // addMonthTable: (year, newMonth) => set((state) => ({tables: {...state.tables[year], newMonth}})),
   // removeMonthTable: (year, deletedMonth) => 
   //    set((state) => ({
   //       tables: {
   //          ...state.tables,
   //          [year]: state.tables[year].filter(month => month !== deletedMonth),
   //       }
   //    }))
}))