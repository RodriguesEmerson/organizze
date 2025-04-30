import { useState } from "react";


export function useCategoreisHandler(){
   const [categories, setCategories] = useState(false);

   const categoriesHandler = {
      getCategories: async function(type){
         const param = type ? `?type=${type}` : '';
         await fetch (`http://localhost/organizze-bk/public/categories.php${param}`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const result = await response.json();
            setCategories(result);
         })
         .catch(error => {
            setCategories(['erro']);
            console.log(error);
         })
      }
   }

   return { categoriesHandler, categories }
}