import { useTableStore } from "@/app/zustand/useTablesStore";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";

export function useEntryHandler(){
   const editingEntry = useTableStore((state) => state.editingEntry);
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateDBSAnswer, setUpdateDBSAnswer] = useState({error: false, loading: false});
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const { updateStore } = useUpdateEntriesStore();
   const { convertDateToYMD, convertValueToNumeric, gerarCUID } = useUtils();

   async function updateEntry(entry, type){
      //Formata os dados para o mesmo formato que vem do DB,
      //para depois fazer a comparação.
      const updatedEntry = {};
      console.log(editingEntry)
      for(const key in entry){
         let curr = entry[key];

         if (key === 'date' || key === 'end_date') {
            curr = convertDateToYMD(entry[key]);
         } else if (key === 'fixed') {
            curr = entry[key] ? 1 : 0;
         } else if (key === 'value') {
            curr = convertValueToNumeric(entry[key]);
         }
         
         if (curr !== editingEntry[key]) {
            updatedEntry[key] = curr;
         }
      }
      
      if(Object.keys(updatedEntry).length <= 0) {
         setUpdateDBSAnswer({error: 'Nenhuma informação foi alterada', loading: false})
         return;
      };
      setUpdateDBSAnswer({error: false, loading: true})
      updatedEntry.id = editingEntry.id; //Id da entry
      
      if(updatedEntry.hasOwnProperty('end_date')){
         if(updatedEntry.end_date) updatedEntry.fixed =  1;
      }
      
      await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'PUT',
         credentials: 'include',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(updatedEntry)
      })
      .then(async response => {
         const result = await response.json();
         console.log(result)
         if(response.status == 200){
            setNotifications('Dados atualizados com sucesso.', gerarCUID());
            setUpdateDBSAnswer({error: false, loading: false});
            updateStore(updatedEntry, type);
            
            setTimeout(() => {
               setShowEditModal(false);
            }, 50);
            return;
         }
         if(response.status == 400){
            setUpdateDBSAnswer({error: true, message: 'Erro: Cheque os dados e tente novamente.', loading: false});
         }
      })
      .catch(error => {
         setUpdateDBSAnswer({error: true,  message: error, loading: false})
         console.log(error)
      })
   }
  
   return { updateEntry, updateDBSAnswer };
}

export function useUpdateEntriesStore(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesExpenses = useEntriesDataStore(state => state.updateEntriesExpenses);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomes = useEntriesDataStore(state => state.updateEntriesIncomes);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);

   function updateStore(updatedEntry, type){

      let toUpdatedEntry, toUpdatedValue;
      const editingEntries = [...entriesData.entries[type]];

      editingEntries.forEach((entry, index) => {
         if(entry.id === updatedEntry.id){
            toUpdatedEntry = {...entry};
            for(const key in updatedEntry){
               if(key == 'value') {
                  toUpdatedValue = toUpdatedEntry[key];
               }
               toUpdatedEntry[key] = updatedEntry[key];
            }
            editingEntries[index] = toUpdatedEntry;
         }

         
         if(Object.keys(updatedEntry).indexOf('value') != -1){
            const intactType = type == 'expenses' ? 'incomes' : 'expenses'; //Salva o tipo de entries não editadas
            const intactValue = entriesData.sum[`${intactType}_sum`]; //Guarda o valor que não será alterado
            const updatedValue = entriesData.sum[`${type}_sum`] - toUpdatedValue; //Subtrai o valor antigo
            const newValue = updatedValue + updatedEntry.value; //Adiciona o novo valor inserido

            const newBalance = type == 'expenses'
            ? intactValue - newValue
            : newValue - intactValue;

            type == 'expenses'
               ? updateEntriesExpensesSum(newValue, newBalance)
               : updateEntriesIncomesSum(newValue, newBalance);
               
         }

         type == 'expenses'
            ? updateEntriesExpenses(editingEntries)
            : updateEntriesIncomes(editingEntries)
      })
   }

   return { updateStore }
}

