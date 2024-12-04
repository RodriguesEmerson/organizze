import { create } from "zustand";

export const useYearlyPageStore = create((set) => ({
   expenses:{
      labels: [],
      monthsData: {},
      total: false
   },
   incomes: {
      labels: [],
      monthsData: {},
      total: false
   },
   setExpenses: (datas) => set((state) => ({
      expenses: datas
   })),
   setIncomes: (datas) => set((state) => ({
      incomes: datas
   }))
}))