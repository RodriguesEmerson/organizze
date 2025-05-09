import { create } from "zustand";

export const useTableStore = create((set) =>({
   tables: null,
   selectedTable: {year: 2024, month: 'janeiro'},
   newReleaseType: null,
   data: null,
   categories: null,
   editingEntry: null,
   toAnimateEntry: false,
   changeTable: (year, month) => set(() => (
      {
         selectedTable: {year: year, month: month}
      }
   )),
   setSelectedMonth: (year, month) => set(() => (
      {
         selectedTable: {year: year, month: month}
      }
   )),
   setData: (data) => set(() => (
      {data: data}
   )),
   setCategories: (categoriesDB) => set(() =>(
      {
         categories: categoriesDB
      }
   )),
   setNewReleaseType: (type) => set(() => (
      {
         newReleaseType: type
      }
   )),
   setEditingEntry: (entry) => set(() => (
      {
         editingEntry: entry
      }
   )),
   setToAnimateEntry:(id) => set(() => ({
      toAnimateEntry: id,
   })),
   months: [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
   ]
}))