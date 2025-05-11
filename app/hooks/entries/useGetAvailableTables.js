import { useEffect, useState } from "react";

export function useGetAvailablesTables(){

   const [availableTables, setData] = useState();

      useEffect(() => {
         const getData = async () => {
            await fetch('http://localhost/organizze-bk/public/entries.php?reportType=availableTables', {
               method: 'GET',
               credentials: 'include',
            })
            .then(async response => {
               const result = await response.json();
               const availableTables = {};
               
               if(result){
                  result.forEach(date => {
                     const currDate = `${date.y_m}-01`
                     const year = new Date(`${currDate}` + 'T00:00:00').toLocaleDateString('pt-BR', {year: 'numeric'});
                     
                     availableTables[year] = [];
                  });
                  result.forEach(date => {
                     const currDate = `${date.y_m}-01`
                     
                     const monthName = new Date(`${currDate}` + 'T00:00:00').toLocaleDateString('pt-BR', {month: 'long'});
                     const year = new Date(`${currDate}` + 'T00:00:00').toLocaleDateString('pt-BR', {year: 'numeric'});
                     
                     availableTables[year].push(monthName);
                  });
                  setData(availableTables);
               }
            })
            .catch(error => {
               console.log(error)
            })
         }
         getData();
      },[])
      
   return { availableTables };
}