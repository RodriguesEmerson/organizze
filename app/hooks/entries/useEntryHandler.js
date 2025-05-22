import { useTableStore } from "@/app/zustand/useTablesStore";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { updateEntryService } from "@/app/services/entries/updateEntryService";

/**
 * Hook que gerencia a edição e atualização de uma entrada (entry) de receita ou despesa.
 * Inclui validações, tratamento de estado de carregamento/erro e comunicação com o backend.
 *
 * @returns {{
 *   updateEntry: (entry: Object, type: "income" | "expense") => Promise<void>,
 *   updateDBSAnswer: { error: boolean, loading: boolean }
 * }}
 */
export function useEntryHandler() {
   const editingEntry = useTableStore((state) => state.editingEntry);
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateDBSAnswer, setUpdateDBSAnswer] = useState({ error: false, loading: false });
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const setAuth = useAuthStatus((state) => state.setAuth);
   const setToAnimateEntry = useTableStore((state) => state.setToAnimateEntry);
   const { updateStore } = useUpdateEntriesStore();
   const { convertDateToYMD, convertValueToNumeric, gerarCUID, getMonthName, toUpperFirstLeter } = useUtils();

   /**
    * Atualiza uma entrada se houver alterações válidas, e sincroniza o estado global.
    *
    * @async
    * @param {Object} entry - Objeto contendo os dados editados da entrada.
    * @param {"income" | "expense"} type - Tipo da entrada (receita ou despesa).
    * @returns {Promise<void>}
    */
   async function updateEntry(entry, type) {
      const updatedEntry = {};

      for (const key in entry) {
         let curr = entry[key];
         
         if (key === 'date' || key === 'end_date') {
            curr = convertDateToYMD(entry[key]);
         } else if (key === 'fixed') {
            curr = entry[key] ? 1 : 0;
         } else if (key === 'value') {
            curr = convertValueToNumeric(entry[key]);
         }

         if(key != 'change_recurrence'){
            if (curr !== editingEntry[key]) {
               updatedEntry[key] = curr;
            }
         }
      }

      if (updatedEntry.hasOwnProperty('date')) {
         if (getMonthName(editingEntry.date) !== getMonthName(updatedEntry.date)) {
            setNotifications(`Selecione uma data no mês de ${toUpperFirstLeter(getMonthName(editingEntry.date))} para continuar.`, 'error', gerarCUID());
            setUpdateDBSAnswer({ loading: false });
            return;
         }
      }

      if (Object.keys(updatedEntry).length <= 0) {
         setNotifications('Nenhuma informação foi alterada.', 'info', gerarCUID());
         setUpdateDBSAnswer({ loading: false });
         return;
      }

      
      setUpdateDBSAnswer({ loading: true });
      updatedEntry.id = editingEntry.id;
      //Readiciona essa informação, pois foi tirada ao checar os dados.
      updatedEntry.change_recurrence = entry.change_recurrence; 
      if(entry.change_recurrence === true){
         //Mesmo que a se a data não for editada, ela será enviada 
         //para que o backend altere alpenas lançamentos com a data igual o maior a ela;
         updatedEntry.date = convertDateToYMD(entry.date);
         updatedEntry.recurrence_id = entry.recurrence_id;
      }

      if (updatedEntry.hasOwnProperty('end_date')) {
         if (updatedEntry.end_date) updatedEntry.fixed = 1;
      }

      try {
         const { status, result } = await updateEntryService(updatedEntry);
         console.log(result)

         if (status === 200) {
            setNotifications('Dados atualizados com sucesso.', 'success', gerarCUID());
            setUpdateDBSAnswer({ error: false, loading: false });
            updateStore(updatedEntry, type);

            setTimeout(() => {
               setShowEditModal(false);
               setToAnimateEntry(entry.id);
            }, 50);
         } else if (status === 400) {
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
            setUpdateDBSAnswer({ loading: false });
         } else if (status === 401) {
            setAuth(false);
            window.location.href = 'http://localhost:3000/signin';
         } else {
            throw new Error();
         }
      } catch (error) {
         console.error(error);
         setNotifications('Erro ao atualizar os dados, tente novamente', 'warn', gerarCUID());
         setUpdateDBSAnswer({ loading: false });
      }
   }

   return { updateEntry, updateDBSAnswer };
}


/**
 * Hook auxiliar responsável por atualizar o estado global das entradas (entries)
 * após uma edição, incluindo cálculo de novos totais e ordenação por data.
 *
 * @returns {{
 *   updateStore: (updatedEntry: Object, type: "income" | "expense") => void
 * }}
 */
export function useUpdateEntriesStore() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);
   const updateEntriesSum = useEntriesDataStore(state => state.updateEntriesSum);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);

   /**
    * Atualiza os dados da store com a entrada modificada, ajusta os totais e reordena as entradas.
    *
    * @param {Object} updatedEntry - A entrada que foi atualizada.
    * @param {"income" | "expense"} type - Tipo da entrada (receita ou despesa).
    */
   function updateStore(updatedEntry, type) {
      let toUpdateEntry, entryOldValue;
      const editingEntries = [...entriesData.entries.all];

      editingEntries.forEach((entry, index) => {
         if (entry.id === updatedEntry.id) {
            toUpdateEntry = { ...entry };
            for (const key in updatedEntry) {
               if (key === 'value') {
                  entryOldValue = toUpdateEntry[key];
               }
               toUpdateEntry[key] = updatedEntry[key];
            }
            editingEntries[index] = toUpdateEntry;
         }
      });

      const updateValue = {
         income: function () {
            const intactValue = entriesData.sum.expenses_sum;
            const newValue = (entriesData.sum.incomes_sum - entryOldValue) + updatedEntry.value;
            const newBalance = newValue - intactValue;
            updateEntriesIncomesSum(newValue, newBalance);
         },
         expense: function () {
            const intactValue = entriesData.sum.incomes_sum;
            const newValue = (entriesData.sum.expenses_sum - entryOldValue) + updatedEntry.value;
            const newBalance = intactValue - newValue;
            updateEntriesExpensesSum(newValue, newBalance);
         },
      };

      if ('value' in updatedEntry) {
         updateValue[type]();
      }

      if ('category' in updatedEntry) {
         updateEntriesSum(`${type}s_sum`);
      }

      const entriesWITHOUTUpdatedEntry = editingEntries.filter(entry => entry.id !== updatedEntry.id);
      const entriesWITHUpdatedEntry = [...entriesWITHOUTUpdatedEntry, toUpdateEntry];

      const sortedEntries = entriesWITHUpdatedEntry.sort((curr, prev) => {
         return new Date(prev.date).getTime() - new Date(curr.date).getTime();
      });

      updateEntriesDataStore(sortedEntries, 'all');
   }

   return { updateStore };
}
