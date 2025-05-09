import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";

export function useGetEntries(year, month){

   const [entriesData, setEntriesData] = useState(null);
   const setEntriesDataStore = useEntriesDataStore(state => state.setEntriesDataStore);
   const setAuth = useAuthStatus((state) => state.setAuth);
   
   useEffect(() => {
      const getEntries = async () => {
         setEntriesData({loading: true})
         await fetch(`http://localhost/organizze-bk/public/entries.php?year=${year}&month=${getMonthNumber(month)}`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const data = await response.json();

            if(response.status == 200){
               const incomes = [];
               const expenses = [];
               
               data.entries.forEach(entry => {
                  if(entry.type == 'income'){
                     incomes.push(entry);
                  }else{
                     expenses.push(entry);
                  }
               });

               const sortedIncomes = incomes.sort((curr, prev) => { 
                  return new Date(prev.date).getTime() - new Date(curr.date).getTime();
               });
               const sortedExpenses = expenses.sort((curr, prev) => { 
                  return new Date(prev.date).getTime() - new Date(curr.date).getTime();
               });
               
               setEntriesData({
                  entries: {
                     incomes: sortedIncomes,
                     expenses: sortedExpenses
                  },
                  sum: {...data.sum[0], balance: data.sum[0].incomes_sum - data.sum[0].expenses_sum},
               }); 

               setEntriesDataStore({
                  entries: {
                     incomes: sortedIncomes,
                     expenses: sortedExpenses
                  },
                  sum: {...data.sum[0], balance: data.sum[0].incomes_sum - data.sum[0].expenses_sum},
               });
            }
            if(response.status == 401){
               setAuth(false);
               window.location.href ='http://localhost:3000/signin';
               return;
            }
         })
         .catch(error => {
            setEntriesData({erro: true})
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