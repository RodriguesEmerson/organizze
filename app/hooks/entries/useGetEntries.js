import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";
import { getEntriesService } from "@/app/services/entries/getEntriesService";

/**
 * Hook para buscar e armazenar entries por ano e mês.
 * 
 * @param {string|number} year - Ano desejado
 * @param {string} month - Nome do mês em português (ex: "janeiro")
 * @returns {{ entriesData: object|null }}
 */
export function useGetEntries(year, month) {
   const [entriesData, setEntriesData] = useState(null);
   const setEntriesDataStore = useEntriesDataStore(state => state.setEntriesDataStore);
   const setAuth = useAuthStatus(state => state.setAuth);
   const [selectedTable, setSelectedTable] = useState(null)



   useEffect(() => {
      //Evita buscar novamente os dados do mês ao clicar no link do mês já selecionado.
      if (!entriesData || selectedTable?.month != month || selectedTable?.year != year) {

         async function getEntries() {
            setEntriesData({ loading: true });

            try {
               const monthNumber = getMonthNumber(month);
               const data = await getEntriesService(year, monthNumber);
               setSelectedTable({ month: month, year: year })

               const incomes = [];
               const expenses = [];
               const all = data.entries.sort((a, b) => new Date(b.date) - new Date(a.date));

               data.entries.forEach(entry => {
                  if (entry.type === 'income') {
                     incomes.push(entry);
                  } else {
                     expenses.push(entry);
                  }
               });

               //Coloca os dados organizados pela data descrescente
               const sortedIncomes = incomes.sort((a, b) => new Date(b.date) - new Date(a.date));
               const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

               const formattedData = {
                  entries: {
                     incomes: sortedIncomes,
                     expenses: sortedExpenses,
                     all: all,
                  },
                  sum: {
                     expenses_sum: data.sum[0]?.expenses_sum ?? 0,
                     incomes_sum: data.sum[0]?.incomes_sum ?? 0,
                     balance: (data.sum[0]?.incomes_sum ?? 0) - (data.sum[0]?.expenses_sum ?? 0),
                  },
               };

               setEntriesData(formattedData);
               setEntriesDataStore(formattedData);

            } catch (error) {
               if (error.message === '401') {
                  setAuth(false);
                  window.location.href = 'http://localhost:3000/signin';
                  return;
               }
               setEntriesData({ error: true });
               console.error(error);
            }
         }

         getEntries();
      }

   }, [year, month]);

   function getMonthNumber(monthName) {
      const yearMonths = [
         'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
         'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ];
      const monthNumber = yearMonths.indexOf(monthName.toLowerCase()) + 1;
      return monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
   }

   return { entriesData };
}
