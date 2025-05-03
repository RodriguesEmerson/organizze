import { useState } from "react";
import { useUtils } from "../useUtils";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useGetCategories } from "./useGetCategories";


export function useCategoriesHandler(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const { gerarCUID } = useUtils();
   const { getCategories } = useGetCategories();
   const [insertCategoryStatus, setInsertCategoryStatus] = useState(
      {success: false, loading: false}
   );

   const categoriesHandler = {
      insertCategory: async function(category, categories){

         setInsertCategoryStatus({success: false, loading: true});

         if(!this.validateCategory(category, categories)) return;
         category.id = gerarCUID();

         await fetch('http://localhost/organizze-bk/public/categories.php', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
         })
         .then(async response => {
            
            if(response.status == 201){
               setInsertCategoryStatus(
                  {success: true, loading: false}
               );
               setNotifications('Nova categoria adicionada.', 'success', gerarCUID());
               getCategories();
               return;
            }

            setInsertCategoryStatus(
               {success: false, loading: false}
            );
            setNotifications('Algo deu errado.', 'warn', gerarCUID())
         })
         .catch(error => {
            setInsertCategoryStatus(
               {success: false, loading: false}
            );
            setNotifications('Não foi possível adicionar a nova categoria, tente novamente.', 'error', gerarCUID())
            return;
         })
      },
      validateCategory: (category, categories) => {
         if(!category.name || !category.type || !category.icon){
            setInsertCategoryStatus(
               {success: false, loading: false}
            )
            setNotifications('Todos os campos são obrigatórios.', 'warn', gerarCUID())
            return false;
         };

         const isRepeated = categories.map(item => {
            if(item.icon == category.icon){
               return true;
            }
            return false;
         })[0];

         if(isRepeated){
            setInsertCategoryStatus(
               {success: false, loading: false}
            );
            setNotifications('O ícone selecionado já esta associado a outra categoria.', 'warn', gerarCUID());
            return false;
         }

         return true;
      }
   }
   return { categoriesHandler, insertCategoryStatus }
}