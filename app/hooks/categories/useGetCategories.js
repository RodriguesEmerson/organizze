import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";
import { useEffect, useState } from "react";


export function useGetCategories(){
   const setCategories = useCategoriesDataStore(state => state.setCategories);
   
   async function getCategories(type){
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

   return { getCategories }
}