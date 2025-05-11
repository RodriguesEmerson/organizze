import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";
import { useUtils } from "../useUtils";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";

export function useGetYearlySumary(year){

   const [yearlySummary, setYearlySummary] = useState(null);
   const setAuth = useAuthStatus((state) => state.setAuth);
   const { getMonthName } = useUtils();
   
   useEffect(() => {
      const getEntries = async () => {
         setYearlySummary({loading: true})
         await fetch(`http://localhost/organizze-bk/public/entries.php?year=${year}&reportType=yearly`, {
            method: 'GET',
            credentials: 'include'
         })
         .then(async response => {
            const data = await response.json();
            
            if(response.status == 200){
               const yearData = {
                  months: {},
                  highestValues: {
                     income:{ month: '', value: 0},
                     expense:{ month: '', value: 0},
                     balance: { month: '', value: 0}
                  },
                  summary: {income: 0, expense: 0, balance: 0}
               }

               data.forEach(month => {
                  const monthName = getMonthName(`${month.month}-01`);

                  //Cria o mês se ainda não existir em yearData.months
                  if(!yearData.months.hasOwnProperty(monthName)){
                     yearData.months[monthName] = {};
                  } 
                  
                  yearData.months[monthName][month.type] = month.total; //Adiciona o valor por tipo em cada mês.
                  yearData.summary[month.type] = yearData.summary[month.type] + month.total; //Soma o valor anual de cada tipo.
                  
                  //Adiciona o saldo e mês por tipo com o valor mais alto do ano.
                  if(month.total > yearData.highestValues[month.type].value){
                     yearData.highestValues[month.type].month = monthName;
                     yearData.highestValues[month.type].value = month.total;
                  }

                  if(yearData.months[monthName].hasOwnProperty('income') && yearData.months[monthName].hasOwnProperty('expense')){
                     const balance = yearData.months[monthName]['income'] - yearData.months[monthName]['expense'];//Obtem o Saldo do mês
                     yearData.months[monthName].balance = balance; //Adiciona o saldo de cada mês.
                     yearData.summary.balance = yearData.summary.balance + balance; //Soma balanço anual.

                     //Adiciona o saldo e mês com o valor mais alto do ano.
                     if(balance > yearData.highestValues.balance.value){
                        yearData.highestValues.balance.month = monthName;
                        yearData.highestValues.balance.value = balance;
                     }
                  }
               });
               setYearlySummary(yearData);
            }
            if(response.status == 401){
               setAuth(false);
               window.location.href ='http://localhost:3000/signin';
               return;
            }
         })
         .catch(error => {
            setYearlySummary({erro: true})
            console.log(error)   
         })
      }
      getEntries()
   },[year])

   return { yearlySummary };
}