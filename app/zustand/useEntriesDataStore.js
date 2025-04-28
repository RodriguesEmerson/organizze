import { create } from "zustand";

export const useEntriesDataStore = create((set) => ({
   entriesData: false,
   setEntriesDataStore: (data) => set(() => ({
      entriesData: data
   })),
   updateEntriesDataStore: (updatedData) => set((state) => ({
      entriesData: {...updatedData}
   })),
   
   updateEntriesExpenses: (expenses) => set((state) => ({
      entriesData: {
         ...state.entriesData,
         entries: {
            ...state.entriesData.entries,
            expenses: expenses
         }
      }
   })),
   updateEntriesIncomes: (incomes) => set((state) => ({
      entriesData: {
         ...state.entriesData,
         entries: {
            ...state.entriesData.entries,
            incomes: incomes
         }
      }
   })),
   updateEntriesExpensesSum: (expensesSum, balance) => set((state) => ({
      entriesData: {
         ...state.entriesData,
         sum: {
            ...state.entriesData.sum,
            expenses_sum: expensesSum,
            balance: balance
         }
      }
   })),
   updateEntriesIncomesSum: (incomesSum, balance) => set((state) => ({
      entriesData: {
         ...state.entriesData,
         sum: {
            ...state.entriesData.sum,
            incomes_sum: incomesSum,
            balance: balance
         }
      }
   }))
}))