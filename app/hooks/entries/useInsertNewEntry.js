import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useTableStore } from "@/app/zustand/useTablesStore";
import { insertEntryService } from "@/app/services/entries/insertEntryService";

/**
 * Hook responsável por inserir uma nova entrada (despesa ou receita).
 *
 * @returns {{
 *   insertEntry: (entry: Object, type: string, tableMonth: string) => Promise<void>,
 *   loading: boolean,
 *   success: boolean
 * }} 
 */
export function useInsertNewEntry() {
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setAuth = useAuthStatus(state => state.setAuth);
   const setToAnimateEntry = useTableStore(state => state.setToAnimateEntry);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const { updateStore } = useUpdateEntriesStore();
   const { convertDateToYMD, convertValueToNumeric, gerarCUID, getMonthName, toUpperFirstLeter } = useUtils();

   /**
    * Processa e insere uma nova entrada no sistema.
    *
    * @param {Object} entry - Objeto com os dados preenchidos pelo usuário.
    * @param {string} type - Tipo da entrada: "expense" ou "income".
    * @param {string} tableMonth - Nome do mês atualmente selecionado.
    * @returns {Promise<void>}
    */
   async function insertEntry(entry, type, tableMonth) {
      const insertingEntry = {};
      let hasEmptyField = false;

      
      // console.table(entry);return;
      for (const key in entry) {
         let curr = entry[key];

         //Checa se algum dos campos enviados estão vazios.
         if (!['end_date', 'id', 'fixed', 'recurrence_id'].includes(key)) {
            if (!curr) hasEmptyField = true;
         }

         //Formata os dados enviados para serem aceitos no backend
         switch (key) {
            case 'date':
               curr = convertDateToYMD(curr);
               break;
            case 'end_date':
               curr = convertDateToYMD(curr);
               if (entry.fixed && !curr) hasEmptyField = true;
               break;
            case 'value':
               curr = convertValueToNumeric(curr);
               break;
            // case 'fixed':
            //    curr = entry[key] ? 1 : 0;
            //    break;
         }

         insertingEntry[key] = curr;
      }

      if (hasEmptyField) {
         setNotifications('Todos os campos são obrigatórios.', 'warn', gerarCUID());
         return;
      }
      if (tableMonth !== getMonthName(insertingEntry.date)) {
         setNotifications(`Selecione uma data no mês de ${toUpperFirstLeter(tableMonth)} para continuar.`, 'error', gerarCUID());
         return;
      }
      //Gera um id único para a entry;
      insertingEntry.id = gerarCUID(); 

      //Caso seja uma entry fixa, cria um id para identificar todos os lançamentos derivados dele.
      if(entry.fixed){insertingEntry.recurrence_id = gerarCUID()}


      setLoading(true);
      setSuccess(false);   
      try {
         const response = await insertEntryService(insertingEntry);
         const result = await response.json();
         console.log(result)
         if (response.status === 201) {
            setNotifications(`Nova ${type === 'expense' ? 'Despesa' : 'Receita'} adicionada.`, 'success', gerarCUID());
            updateStore(insertingEntry, `${type}`);
            setToAnimateEntry(insertingEntry.id);
            setSuccess(true);
         } else if (response.status === 400) {
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
         } else if (response.status === 401) {
            setAuth(false);
            window.location.href = 'http://localhost:3000/signin';
         }
      } catch (error) {
         console.error(error);
         setNotifications(`Erro ao tentar adicionar nova ${type === 'expense' ? 'Despesa' : 'Receita'}, tente novamente.`, 'error', gerarCUID());
      } finally {
         setLoading(false);
      }
   }

   return { insertEntry, loading, success };
}

/**
 * Hook que atualiza o estado da store com uma nova entrada.
 *
 * @returns {{ updateStore: (insertingEntry: Object, type: string) => void }}
 */
export function useUpdateEntriesStore() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);

   /**
    * Atualiza a store após inserir nova entrada e recalcula os valores totais.
    *
    * @param {Object} insertingEntry - Objeto da nova entrada.
    * @param {string} type - Tipo do lançamento: "expense" ou "income".
    */
   function updateStore(insertingEntry, type) {
      const intactType = type === 'expense' ? 'incomes' : 'expenses';
      const intactValue = entriesData.sum[`${intactType}_sum`];
      const newValue = Number(entriesData.sum[`${type}s_sum`]) + Number(insertingEntry.value);

      const newBalance = type === 'expense'
         ? intactValue - newValue
         : newValue - intactValue;

      if (type === 'expense') {
         updateEntriesExpensesSum(newValue, newBalance);
      } else {
         updateEntriesIncomesSum(newValue, newBalance);
      }

      const entriesWithNewEntry = [...entriesData.entries.all, insertingEntry];
      const sortedEntries = entriesWithNewEntry.sort((curr, prev) => {
         return new Date(prev.date).getTime() - new Date(curr.date).getTime();
      });

      updateEntriesDataStore(sortedEntries, 'all');
   }

   return { updateStore };
}
