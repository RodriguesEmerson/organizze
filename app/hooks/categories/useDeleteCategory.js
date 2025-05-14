import { useState } from "react";
import { useUtils } from "../useUtils";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useGetCategories } from "./useGetCategories";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function useDeleteCategory(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const { gerarCUID } = useUtils();
   const { getCategories } = useGetCategories();
   const [deleting, setDeleting] = useState(false);
   
   const deleteCategoryHandler = {
      delete: async function(category){
         
         setDeleting(true);
         if(!this.validateCategory(category)) return;

         await fetch('http://localhost/organizze-bk/public/categories.php', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
         })
         .then(async response => {
            if(response.status == 200){
               setDeleting(false);
               setNotifications('Categoria excluída.', 'success', gerarCUID());
               getCategories();

               setTimeout(() => {
                  setDeleting(false);
               }, 50);
               return;
            }

            setDeleting(false);
            setNotifications('Algo deu errado.', 'warn', gerarCUID())
         })
         .catch(error => {
            setDeleting(false);
            setNotifications('Não foi possível excluir a categoria, tente novamente.', 'error', gerarCUID())
            return;
         })
      },
      
      validateCategory: (category) => {
         if(!category.id){
            setDeleting(false)
            setNotifications('Dados essenciais estão faltando, atualize a página e tente novamente.', 'warn', gerarCUID())
            return false;
         };

         return true;
      }
   }
   return { deleteCategoryHandler, deleting }
}