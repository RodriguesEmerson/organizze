import { create } from "zustand";

export const useEntriesDataStore = create((set) => ({
   entriesData: false,
   newEntryType: false,
   yearlyData: false,
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
   updateEntriesSum: (type) => set((state) => ({
      //Apenas seta a soma novamente para atualizar a categoria nos gráficos.
      entriesData: {
         ...state.entriesData,
         sum: {
            ...state.entriesData.sum,
            [type]: state.entriesData.sum[type],
         }
      }
   })),
   setNewEntryType: (type) => set(() => ({
      newEntryType: type
   })),
   setYearlyData: (data) => set(() => ({
      yearlyData: data
   }))

}))