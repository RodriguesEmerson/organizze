import { create } from "zustand";
const tables = {
   2024: ['Novembro', 'Dezembro'],
}

export const useTableStore = create((set) =>({
   tables: tables,
   selectedTable: {year: 2024, month: 'Janeiro'},
   data: null,
   changeTable: (year, month) => set((state) => (
      {
         selectedTable: {...state.tables, year: year, month: month}
      }
   )),
   setData: (data) => set((state) => (
      {data: data}
   )),
   categories: [
      {categ: "Casa", icon: "house"},
      {categ: "Transporte", icon: "transport"},
      {categ: "Alimentação", icon: "food"},
      {categ: "Saúde", icon: "health"},
      {categ: "Educação", icon: "education"},
      {categ: "Pessoal", icon: "self"},
      {categ: "Lazer", icon: "leisure"},
      {categ: "Pets", icon: "pets"},
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