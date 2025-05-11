import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function useDeleteEntry(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const setAuth = useAuthStatus((state) => state.setAuth);
   const [loading, setLoading] = useState(false);
   const { updateStore } = useUpdateEntriesStore();
   const { gerarCUID } = useUtils();

   async function deleteEntry(entry, type){
      const entryId = entry.id;

      setLoading(true);
      await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'DELETE',
         credentials: 'include',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({id: entryId})
      })
      .then(async response => {
         if(response.status == 200){
            setNotifications(`${type == 'expenses' ? 'Despesa' : 'Receita'} excluída.`, 'success', gerarCUID());
            setLoading(false);
            updateStore(entry, `${type}`);

             setTimeout(() => {
               setShowEditModal(false);
            }, 50);
            return;
         }
         if(response.status == 400){
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
            setLoading(false);
            return;
         }
         if(response.status == 401){
            setAuth(false);
            window.location.href ='http://localhost:3000/signin';
            return;
         }
      })
      .catch(error => {
         console.log(error)
         setNotifications(`Erro tentar excluir a ${type == 'expense' ? 'Despesa' : 'Receita'}, tente novamente`, 'error', gerarCUID());
         setLoading(false);
         return;
      })
   }
  
   return { deleteEntry, loading };
}

export function useUpdateEntriesStore(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);

   function updateStore(deletingEntry, type){

      const intactType = type == 'expenses' ? 'incomes' : 'expenses'; //Salva o tipo de entries não editadas
      const intactValue = entriesData.sum[`${intactType}_sum`]; //Guarda o valor que não será alterado
      const newValue = Number(entriesData.sum[`${type}_sum`]) - Number(deletingEntry.value);
      
      const newBalance = type == 'expenses'
      ? intactValue - newValue
      : newValue - intactValue;
      
      type == 'expenses'
      ? updateEntriesExpensesSum(newValue, newBalance)
      : updateEntriesIncomesSum(newValue, newBalance);
      
      //Adiciona a nova entry
      const entriesWITHOUTDeletedEntry = entriesData.entries[type].filter(entry => entry.id != deletingEntry.id);
      //Organiza por data descendente.
      const sortedEntries = entriesWITHOUTDeletedEntry.sort((curr, prev) => { 
         return new Date(prev.date).getTime() - new Date(curr.date).getTime();
      });
      updateEntriesDataStore(sortedEntries, type);
   }

   return { updateStore }
}

