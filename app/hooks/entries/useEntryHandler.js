import { useTableStore } from "@/app/zustand/useTablesStore";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useUtils } from "../useUtils";

export function useEntryHandler(){
   const editingEntry = useTableStore((state) => state.editingEntry);
   const { convertDateToYMD, convertValueToNumeric, gerarCUID } = useUtils();
   const setNotifications = useToastNotifications(state => state.setNotifications);

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
      
      if(Object.keys(updatedData).length <= 0) return;
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
         console.log(result)
         if(response.status == 200){
            setNotifications('Dados atualizados com sucesso.', gerarCUID())
         }
      })
      .catch(error => {
         console.log(error)
      })
   }

   return { updateEntry };
}