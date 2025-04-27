import { useTableStore } from "@/app/zustand/useTablesStore";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";
import { useState } from "react";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function useEntryHandler(){
   const editingEntry = useTableStore((state) => state.editingEntry);
   const { convertDateToYMD, convertValueToNumeric, gerarCUID } = useUtils();
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updateDBSAnswer, setUpdateDBSAnswer] = useState({error: false, loading: false});
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);

   async function updateEntry(entry){
      //Formata os dados para o mesmo formato que vem do DB,
      //para depois fazer a comparação.
      const updatedData = {};
      for(const key in entry){
         let newValue = entry[key];

         if (key === 'date' || key === 'end_date') {
            newValue = convertDateToYMD(entry[key]);
         } else if (key === 'fixed') {
            newValue = entry[key] ? 1 : 0;
         } else if (key === 'value') {
            newValue = convertValueToNumeric(entry[key]);
         }

         if (newValue !== editingEntry[key]) {
            updatedData[key] = newValue;
         }
      }
      
      if(Object.keys(updatedData).length <= 0) {
         setUpdateDBSAnswer({error: 'Nenhuma informação foi alterada', loading: false})
         return;
      };
      setUpdateDBSAnswer({error: false, loading: true})
      updatedData.id = editingEntry.id; //Id da entry

      if(!updatedData.hasOwnProperty('fixed')){
         updatedData.fixed = editingEntry.fixed
      }

      await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'PUT',
         credentials: 'include',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(updatedData)
      })
      .then(async response => {
         const result = await response.json();
         if(response.status == 200){
            setNotifications('Dados atualizados com sucesso.', gerarCUID());
            setUpdateDBSAnswer({error: false, loading: false});
            setTimeout(() => {
               setShowEditModal(false)
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