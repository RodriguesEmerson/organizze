import { useEffect, useState } from "react";


export function useGetCategories(type){
   const [categories, setCategories] = useState(false);
   const param = type ? `?type=${type}` : '';

   useEffect(() => {
      const getCategories = async function(){
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
      getCategories()

   }, [])

   return { categories }
}