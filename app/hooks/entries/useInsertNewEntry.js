import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useTableStore } from "@/app/zustand/useTablesStore";

export function useInsertNewEntry(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setAuth = useAuthStatus((state) => state.setAuth);
   const setToAnimateEntry = useTableStore((state) => state.setToAnimateEntry);
   const [loading, setLoading] = useState(false);
   const { updateStore } = useUpdateEntriesStore();
   const { convertDateToYMD, convertValueToNumeric, gerarCUID } = useUtils();

   async function insertEntry(entry, type){

      //Formata os dados para o mesmo formato que vem do DB,
      //para depois fazer a comparação.
      const insertingEntry = {};
      let hasEmptyField = false;
      for(const key in entry){
         let curr = entry[key];
         if((key != 'end_date') && (key != 'id') && (key != 'fixed') ){
            if(!curr){ hasEmptyField = true; }
         }
         switch(key){
            case 'date':
               curr = convertDateToYMD(entry[key]);
               break;
               case 'end_date':
                  curr = convertDateToYMD(entry[key]);
                  if(entry.fixed && !curr){
                     hasEmptyField = true;
                     break;
                  }
            break;
            case 'value':
               curr = convertValueToNumeric(entry[key]);
            break;
            case 'fixed':
               curr = entry[key] ? 1 : 0;
            break;
         }
         insertingEntry[key] = curr;
      }
      
      if(hasEmptyField) {
         setNotifications('Todos os campos são obrigatórios.', 'warn', gerarCUID());
         setLoading(false)
         return;
      };
      
      insertingEntry.id = gerarCUID();
      insertingEntry.type = type;
      setLoading(true);
      await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'POST',
         credentials: 'include',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(insertingEntry)
      })
      .then(async response => {
         if(response.status == 201){
            setNotifications(`Nova ${type == 'expense' ? 'Despesa' : 'Receita'} adiconada.`, 'success', gerarCUID());
            setLoading(false);
            updateStore(insertingEntry, `${type}s`);
            setToAnimateEntry(insertingEntry.id)
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
         setNotifications(`Erro tentar adicionar nova ${type == 'expense' ? 'Despesa' : 'Receita'} , tente novamente`, 'error', gerarCUID());
         setLoading(false);
         return;
      })
   }
  
   return { insertEntry, loading };
}

export function useUpdateEntriesStore(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const updateEntriesDataStore = useEntriesDataStore(state => state.updateEntriesDataStore);
   const updateEntriesExpensesSum = useEntriesDataStore(state => state.updateEntriesExpensesSum);
   const updateEntriesIncomesSum = useEntriesDataStore(state => state.updateEntriesIncomesSum);

   function updateStore(insertingEntry, type){
      
      const intactType = type == 'expenses' ? 'incomes' : 'expenses'; //Salva o tipo de entries não editadas
      const intactValue = entriesData.sum[`${intactType}_sum`]; //Guarda o valor que não será alterado
      const newValue = Number(entriesData.sum[`${type}_sum`]) + Number(insertingEntry.value);
      
      const newBalance = type == 'expenses'
      ? intactValue - newValue
      : newValue - intactValue;
      
      type == 'expenses'
      ? updateEntriesExpensesSum(newValue, newBalance)
      : updateEntriesIncomesSum(newValue, newBalance);
      
      //Adiciona a nova entry
      const entriesWithNewEntry = [...entriesData.entries[type], insertingEntry];
      //Organiza por data descendente.
      const sortedEntries = entriesWithNewEntry.sort((curr, prev) => { 
         return new Date(prev.date).getTime() - new Date(curr.date).getTime();
      });
      updateEntriesDataStore(sortedEntries, type);
   }

   return { updateStore }
}

