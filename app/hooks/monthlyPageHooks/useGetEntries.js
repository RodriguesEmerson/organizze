import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";


export function useGetEntries(year, month){

   const [entriesData, setEntriesData] = useState(null);
   const setEntriesDataStore = useEntriesDataStore(state => state.setEntriesDataStore)
   
   useEffect(() => {
      const getEntries = async () => {
         await fetch(`http://localhost/organizze-bk/public/entries.php?year=${year}&month=${getMonthNumber(month)}`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const data = await response.json();

            if(data){
               const incomes = [];
               const expenses = [];
               
               data.entries.forEach(entry => {
                  if(entry.type == 'income'){
                     incomes.push(entry);
                  }else{
                     expenses.push(entry);
                  }
               });

               setEntriesData({
                  entries: {
                     incomes: incomes,
                     expenses: expenses
                  },
                  sum: {...data.sum[0], balance: data.sum[0].incomes_sum - data.sum[0].expenses_sum},
               }); 

               setEntriesDataStore({
                  entries: {
                     incomes: incomes,
                     expenses: expenses
                  },
                  sum: {...data.sum[0], balance: data.sum[0].incomes_sum - data.sum[0].expenses_sum},
               });
            }
         })
         .catch(error => {
            console.log(error)
         })
      }
      getEntries()
   },[year, month])

   function getMonthNumber (monthName){
      const yearMonths = [
         'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
         'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ];
      const monthNumber = yearMonths.indexOf(monthName) + 1;
      return monthNumber < 10 ? `0${monthNumber}` : monthNumber;
   }
   return { entriesData };
   
}