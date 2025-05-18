import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { deleteEntryService } from "@/app/services/entries/deleteEntryService";

/**
 * Hook para deletar uma entry e gerenciar estados relacionados.
 * 
 * @returns {{ deleteEntry: Function, loading: boolean }}
 */
export function useDeleteEntry() {
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const setAuth = useAuthStatus(state => state.setAuth);
   const [loading, setLoading] = useState(false);
   const { updateStore } = useUpdateEntriesStore();
   const { gerarCUID } = useUtils();

   async function deleteEntry(entry, type) {
      const entryId = entry.id;
      setLoading(true);

      try {
         const response = await deleteEntryService(entryId);

         if (response.status === 200) {
            setNotifications(`${type === 'expenses' ? 'Despesa' : 'Receita'} excluída.`, 'success', gerarCUID());
            updateStore(entry, type);
            setTimeout(() => {
               setShowEditModal(false);
            }, 50);
         } else if (response.status === 400) {
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
         } else if (response.status === 401) {
            setAuth(false);
            window.location.href = 'http://localhost:3000/signin';
         } else {
            setNotifications('Erro ao tentar excluir.', 'error', gerarCUID());
         }
      } catch (error) {
         console.error(error);
         setNotifications(`Erro ao tentar excluir a ${type === 'expenses' ? 'Despesa' : 'Receita'}, tente novamente`, 'error', gerarCUID());
      } finally {
         setLoading(false);
      }
   }

   return { deleteEntry, loading };
}


/**
 * Hook para atualizar os dados do store após exclusão.
 * 
 * @returns {{ updateStore: Function }}
 */
function useUpdateEntriesStore() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);
   
   function updateStore(deletingEntry, type) {
      const intactType = type === 'expense' ? 'incomes' : 'expenses';
      const intactValue = entriesData.sum[`${intactType}_sum`];
      const newValue = Number(entriesData.sum[`${type}s_sum`]) - Number(deletingEntry.value);
      
      const newBalance = type === 'expense'
      ? intactValue - newValue
      : newValue - intactValue;
      
      console.log(intactValue, newValue, newBalance)
      if (type === 'expense') {
         updateEntriesExpensesSum(newValue, newBalance);
      } else {
         updateEntriesIncomesSum(newValue, newBalance);
      }
      
      const entriesWithoutDeletedEntry = entriesData.entries.all.filter(entry => entry.id !== deletingEntry.id);
      const sortedEntries = entriesWithoutDeletedEntry.sort((a, b) => new Date(b.date) - new Date(a.date));

      updateEntriesDataStore(sortedEntries, type);
   }

   return { updateStore };
}
