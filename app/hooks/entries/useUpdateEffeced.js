import { updateEntryEffectedStatusService } from "@/app/services/entries/updateEntryEffectedStatusService";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useState } from "react";
import { useUtils } from "../useUtils";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";

/**
 * Hook responsável por atualizar o status de effected de uma entrada.
 *
 * @returns {{ updateEffected: (entry: Object, effected: boolean) => Promise<void>, updateStatus: { error: boolean, loading: boolean } }}
 */
export function useUpdateEffected() {
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateStatus, setUpdateStatus] = useState({ error: false, loading: false });
   const setAuth = useAuthStatus(state => state.setAuth);
   const { updateStore } = useUpdateEntriesStore();
   const { gerarCUID } = useUtils();

   /**
    * Atualiza o campo effected de uma entry no backend e na store.
    *
    * @param {Object} entry - Objeto da entrada.
    * @param {boolean} effected - Novo valor para o campo effected.
    * @returns {Promise<void>}
    */
   async function updateEffected(entry, effected) {
      if (!entry.id || typeof effected !== 'boolean') {
         setNotifications('Algo deu errado. Atualize a página e tente novamente.', 'error', gerarCUID());
         return;
      }

      const data = { id: entry.id, effected };
      setUpdateStatus({ loading: true });

      try {
         const response = await updateEntryEffectedStatusService(data);
         const result = await response.json();
         console.log(result);

         if (response.status === 200) {
            setNotifications('Dados atualizados com sucesso.', 'success', gerarCUID());
            setUpdateStatus({ error: false, loading: false });
            updateStore(entry, effected);
            return;
         }
         if (response.status === 400) {
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
            setUpdateStatus({ loading: false });
            return;
         }
         if (response.status === 401) {
            setAuth(false);
            window.location.href = 'http://localhost:3000/signin';
            return;
         }

         setNotifications('Algo deu errado. Atualize a página e tente novamente.', 'error', gerarCUID());
         setUpdateStatus({ loading: false });
      } catch (error) {
         console.log(error);
         setNotifications('Erro ao atualizar os dados, tente novamente', 'warn', gerarCUID());
         setUpdateStatus({ loading: false });
      }
   }

   return { updateEffected, updateStatus };
}

/**
 * Hook que atualiza a store com base na alteração do campo effected.
 *
 * @returns {{ updateStore: (updatedEntry: Object, effected: boolean) => void }}
 */
function useUpdateEntriesStore() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);

   /**
    * Atualiza os dados da store com base na alteração do campo effected.
    *
    * @param {Object} updatedEntry - Entrada que teve o campo effected alterado.
    * @param {boolean} effected - Novo valor do campo effected.
    */
   function updateStore(updatedEntry, effected) {
      const editingEntries = [...entriesData.entries.all];

      editingEntries.forEach((entry) => {
         if (entry.id === updatedEntry.id) {
            entry.effected = effected;
         }
      });

      const updateValue = {
         income: function () {
            const intactValue = entriesData.sum.expenses_sum;
            const newValue = this.calculateNewValue(entriesData.sum.incomes_sum, updatedEntry.value);
            const newBalance = newValue - intactValue;
            updateEntriesIncomesSum(newValue, newBalance);
         },
         expense: function () {
            const intactValue = entriesData.sum.incomes_sum;
            const newValue = this.calculateNewValue(entriesData.sum.expenses_sum, updatedEntry.value);
            const newBalance = intactValue - newValue;
            updateEntriesExpensesSum(newValue, newBalance);
         },
         calculateNewValue(entriesDataSumValue, entryValue) {
            return effected
               ? entriesDataSumValue + entryValue
               : entriesDataSumValue - entryValue;
         }
      };

      updateValue[updatedEntry.type]();
      updateEntriesDataStore(editingEntries, 'all');
   }

   return { updateStore };
}
