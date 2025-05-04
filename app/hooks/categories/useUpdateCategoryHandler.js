import { useState } from "react";
import { useUtils } from "../useUtils";
import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useGetCategories } from "./useGetCategories";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function useUpdateCategoriesHandler(){
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setShowEditCategoryModal = useModalsHiddenStore(state => state.setShowEditCategoryModal);
   const { gerarCUID } = useUtils();
   const { getCategories } = useGetCategories();
   const [loading, setLoading] = useState(false);
   
   const updateCategoryHandler = {
      update: async function(category, editingCategory){
         
         setLoading(true);
         if(!this.validateCategory(category, editingCategory)) return;

         await fetch('http://localhost/organizze-bk/public/categories.php', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
         })
         .then(async response => {
            
            if(response.status == 200){
               setLoading(false);
               setNotifications('Categoria atualizada.', 'success', gerarCUID());
               getCategories();

               setTimeout(() => {
                  setShowEditCategoryModal(false);
               }, 50);
               return;
            }

            setLoading(false);
            setNotifications('Algo deu errado.', 'warn', gerarCUID())
         })
         .catch(error => {
            setLoading(false);
            setNotifications('Não foi possível completar a atualização, tente novamente.', 'error', gerarCUID())
            return;
         })
      },
      
      validateCategory: (category, editingCategory) => {
         if(!category.name || !category.type || !category.icon){
            setLoading(false)
            setNotifications('Todos os campos são obrigatórios.', 'warn', gerarCUID())
            return false;
         };

         let hasSomethingUpdated;
         for(const key in category){
            if(category[key] != editingCategory[key]){
               hasSomethingUpdated = true;
               break;
            }
         }

         if(!hasSomethingUpdated){
            setLoading(false);
            setNotifications('Nenhuma alteração foi feita para que seja atualizada.', 'info', gerarCUID());
            return false;
         }

         return true;
      }
   }
   return { updateCategoryHandler, loading }
}