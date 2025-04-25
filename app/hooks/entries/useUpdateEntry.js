import { useEffect, useState } from "react";

export function useUpdateEntry(entry){
   const [status, setStatus] = useState(false);

   useEffect(() => {
      const upDate = async () => {
         if(!entry) return;
         await fetch('', {
            method: 'POST',
            credentials: 'include',
            headers: {'Contente-Type': 'application/json'},
            body: JSON.stringify(entry)
         })
         .then(async response => {
            const result = await response.json();
            setStatus(result);
         })
         .catch(error => {
            console.log(error)
         })
      }
      upDate()
   },[])

   return { status };
}