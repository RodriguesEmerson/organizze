import { useState } from "react";


export function useCategoreisHandler(){
   const [categories, setCategories] = useState(false);

   const categoriesHander = {
      getCategories: async function(){
         await fetch (`http://localhost/organizze-bk/public/categories.php`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const result = await response.json();
            setCategories(result);
         })
         .catch(error => {
            console.log(error)
         })
      }
   }

   return { categoriesHander, categories}
}