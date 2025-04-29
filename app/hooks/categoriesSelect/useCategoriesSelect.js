import { useEffect, useState } from "react";


export function useCategoriesSelect(type){
   const [categories, setCategories] = useState(false);
 
   useEffect(() => {
      const getCategories = async () => {
         await fetch (`http://localhost/organizze-bk/public/categories.php?type=${type}`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const result = await response.json();
            if(response.status == 200){
               setCategories(result);
               return
            }
            setCategories(false);
         })
         .catch(error => {
            setCategories(false);
         })
      }
      getCategories();
   },[type])

   return { categories }
} 