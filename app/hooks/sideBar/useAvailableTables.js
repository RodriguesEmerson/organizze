import { useEffect, useState } from "react";

export function useAvailablesTables(){

   const [availableTables, setData] = useState({});

      useEffect(() => {
         const getData = async () => {
            await fetch('http://localhost/organizze-bk/public/availables-tables.php', {
               method: 'GET',
               credentials: 'include',
            })
            .then(async response => {
               const result = await response.json();
               const availableTables = {};
               
               result.forEach(date => {
                  const currDate = `${date.y_m}-01`
                  const year = new Date(`${currDate}`).toLocaleDateString('pt-BR', {year: 'numeric'});
      
                  availableTables[year] = [];
               });
               result.forEach(date => {
                  const monthDate = Number(date.y_m.split('-')[1]) ;
                  const yearDate = date.y_m.split('-')[0];
                  const currDate = `${yearDate}-${monthDate}-01`
      
                  const monthName = new Date(`${currDate}`).toLocaleDateString('pt-BR', {month: 'long'});
                  const year = new Date(`${currDate}`).toLocaleDateString('pt-BR', {year: 'numeric'});
      
                  availableTables[year].push(monthName);
               });

               setData(availableTables);
            })
            .catch(error => {
               console.log(error)
            })
         }
         getData();
      },[])
      
   return {availableTables};
}