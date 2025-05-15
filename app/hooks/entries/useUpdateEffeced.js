import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";

export function useUpdateEffected(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateStatus, setUpdateStatus] = useState({error: false, loading: false});
   const setAuth = useAuthStatus((state) => state.setAuth);
   const { updateStore } = useUpdateEntriesStore();
   const { gerarCUID } = useUtils();
   
   async function updateEffected(entry, effected){

      if(!entry.id || typeof(effected) != 'boolean'){
         setNotifications('Algo deu errado. Atualize a página e tente novamente.', 'error', gerarCUID());
         return;
      }
      const data = {id: entry.id, effected: effected}
      
      setUpdateStatus({loading: true})
      await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'PUT',
         credentials: 'include',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)
      })
      .then(async response => {
         const result = await response.json();
         console.log(result);
         if(response.status == 200){
            setNotifications('Dados atualizados com sucesso.', 'success', gerarCUID());
            setUpdateStatus({error: false, loading: false});
            updateStore(entry, effected) ///ATUALIZAR STORE
            return;
         }
         if(response.status == 400){
            setNotifications('Cheque os dados e tente novamente.', 'warn', gerarCUID());
            setUpdateStatus({loading: false});
            return;
         }
         if(response.status == 401){
            setAuth(false);
            window.location.href ='http://localhost:3000/signin';
            return;
         }

         setNotifications('Algo deu errado. Atualize a página e tente novamente.', 'error', gerarCUID());
         setUpdateStatus({loading: false});
      })
      .catch(error => {
         console.log(error)
         setNotifications('Erro ao atualizar os dados, tente novamente', 'warn', gerarCUID());
         setUpdateStatus({loading: false});
         return;
      })
   }
  
   return { updateEffected, updateStatus };
}

export function useUpdateEntriesStore(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);
   const updateEntriesSum = useEntriesDataStore(state => state.updateEntriesSum);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);

   function updateStore(updatedEntry, effected){

      const editingEntries = [...entriesData.entries.all];
      editingEntries.forEach((entry) => {
         if(entry.id === updatedEntry.id){
            entry.effected = effected;
         }
      });

      const updateValue = {
         income: function(){
            const intactValue = entriesData.sum.expenses_sum //Guarda o valor que não será alterado
            const newValue = this.calculateNewValue(entriesData.sum.incomes_sum, updatedEntry.value); //Calcula o novo valor

            const newBalance = newValue - intactValue;
            updateEntriesIncomesSum(newValue, newBalance);
         },
         expense: function(){
            const intactValue = entriesData.sum.incomes_sum //Guarda o valor que não será alterado
            const newValue = this.calculateNewValue(entriesData.sum.expenses_sum, updatedEntry.value); //Calcula o novo valor
            
            const newBalance = intactValue - newValue;
            updateEntriesExpensesSum(newValue, newBalance);
         },
         calculateNewValue(entriesDataSumValue, entryValue){
            if(effected){
               return entriesDataSumValue + entryValue;
            }
            return entriesDataSumValue - entryValue;
         }
      }

      updateValue[`${updatedEntry.type}`]();

      updateEntriesDataStore(editingEntries, 'all');
   }

   return { updateStore }
}

