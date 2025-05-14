import { useTableStore } from "@/app/zustand/useTablesStore";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";

export function useEntryHandler(){
   const editingEntry = useTableStore((state) => state.editingEntry);
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateDBSAnswer, setUpdateDBSAnswer] = useState({error: false, loading: false});
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const setAuth = useAuthStatus((state) => state.setAuth);
   const setToAnimateEntry = useTableStore((state) => state.setToAnimateEntry);
   const { updateStore } = useUpdateEntriesStore();
   const { convertDateToYMD, convertValueToNumeric, gerarCUID, getMonthName, toUpperFirstLeter } = useUtils();
   
   async function updateEntry(entry, type){
      //Formata os dados para o mesmo formato que vem do DB,
      //para depois fazer a comparação.
      const updatedEntry = {};
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

      if(updatedEntry.hasOwnProperty('date')){
         if(getMonthName(editingEntry.date) != getMonthName(updatedEntry.date)){
            setNotifications(`Selecione uma data no mês de ${toUpperFirstLeter(getMonthName(editingEntry.date))} para continuar.`, 'error', gerarCUID());
            setUpdateDBSAnswer({loading: false})
            return;
         }
      }
      
      if(Object.keys(updatedEntry).length <= 0) {
         setNotifications('Nenhuma informação foi alterada.', 'info', gerarCUID());
         setUpdateDBSAnswer({loading: false})
         return;
      };
      setUpdateDBSAnswer({loading: true})
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
         if(response.status == 200){
            setNotifications('Dados atualizados com sucesso.', 'success', gerarCUID());
            setUpdateDBSAnswer({error: false, loading: false});
            updateStore(updatedEntry, type);
            
            setTimeout(() => {
               setShowEditModal(false);
               setToAnimateEntry(entry.id)
            }, 50);
            return;
         }
         if(response.status == 400){
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
            setUpdateDBSAnswer({loading: false});
            return;
         }
         if(response.status == 401){
            setAuth(false);
            window.location.href ='http://localhost:3000/signin';
            return;
         }

         setNotifications('Algo deu errado. Atualize a página e tente novamente.', 'error', gerarCUID());
         setUpdateDBSAnswer({loading: false});
      })
      .catch(error => {
         console.log(error)
         setNotifications('Erro ao atualizar os dados, tente novamente', 'warn', gerarCUID());
         setUpdateDBSAnswer({loading: false});
         return;
      })
   }
  
   return { updateEntry, updateDBSAnswer };
}

export function useUpdateEntriesStore(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);
   const updateEntriesSum = useEntriesDataStore(state => state.updateEntriesSum);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);

   function updateStore(updatedEntry, type){

      let toUpdatedEntry, toUpdatedValue;
      const editingEntries = [...entriesData.entries.all];

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
            const intactType = type == 'expense' ? 'income' : 'expense'; //Salva o tipo de entries não editadas
            const intactValue = entriesData.sum[`${intactType}_sum`]; //Guarda o valor que não será alterado
            const updatedValue = entriesData.sum[`${type}_sum`] - toUpdatedValue; //Subtrai o valor antigo
            const newValue = updatedValue + updatedEntry.value; //Adiciona o novo valor inserido

            const newBalance = type == 'expense'
            ? intactValue - newValue
            : newValue - intactValue;

            type == 'expense'
               ? updateEntriesExpensesSum(newValue, newBalance)
               : updateEntriesIncomesSum(newValue, newBalance);
         }

         if(Object.keys(updatedEntry).indexOf('category') != -1){
            updateEntriesSum(`${type}s_sum`);
         }
      });


      //Retira a versção antiga da entry editada
      const entriesWITHOUTUpdatedEntry = editingEntries.filter(entry => entry.id != updatedEntry.id);
      //Adiciona a entry já editada
      const entriesWITHUpdatedEntry = [...entriesWITHOUTUpdatedEntry, toUpdatedEntry];
      //Organiza por data descendente.
      const sortedEntries = entriesWITHUpdatedEntry.sort((curr, prev) => { 
         return new Date(prev.date).getTime() - new Date(curr.date).getTime();
      });

      updateEntriesDataStore(sortedEntries, 'all');
   }

   return { updateStore }
}

