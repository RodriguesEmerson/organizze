import { create } from "zustand";

export const useEntriesDataStore = create((set) => ({
   entriesData: false,
   newEntryType: false,
   setEntriesDataStore: (data) => set(() => ({
      entriesData: data
   })),
   updateEntriesDataStore: (entries, type) => set((state) => ({
      entriesData: {
         ...state.entriesData,
         entries: {
            ...state.entriesData.entries,
            [type]: entries
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
   })),
   setNewEntryType: (type) => set(() => ({
      newEntryType: type
   }))
}))