import { useState, useEffect } from "react";
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useUtils } from "../useUtils";
import { getYearlySumaryService } from "@/app/services/entries/getYearlySummaryService";

/**
 * Hook para buscar e manipular o resumo financeiro anual (incomes, expenses, balance).
 *
 * @param {number|string} year - Ano para o qual o resumo será buscado.
 * @returns {{ yearlySummary: object|null }} Objeto com os dados do resumo anual, ou estados de carregamento/erro.
 */
export function useGetYearlySummary(year) {
   const [yearlySummary, setYearlySummary] = useState(null);
   const setAuth = useAuthStatus(state => state.setAuth);
   const { getMonthName } = useUtils();

   useEffect(() => {
      /**
       * Busca os dados do resumo anual e atualiza o estado.
       * Trata autenticação e erros da requisição.
       */
      async function getEntries() {
         setYearlySummary({ loading: true });

         try {
            const data = await getYearlySumaryService(year);

            const yearData = {
               months: {},
               highestValues: {
                  income: { month: '', value: 0 },
                  expense: { month: '', value: 0 },
                  balance: { month: '', value: 0 },
               },
               summary: { income: 0, expense: 0, balance: 0 },
            };

            data.forEach(month => {
               const monthName = getMonthName(`${month.month}-01`);

               // Inicializa o mês, caso ainda não exista no objeto.
               if (!yearData.months.hasOwnProperty(monthName)) {
                  yearData.months[monthName] = {};
               }

               // Define o total do tipo (income/expense) para o mês.
               yearData.months[monthName][month.type] = month.total;

               // Soma o total anual por tipo.
               yearData.summary[month.type] += month.total;

               // Atualiza o maior valor anual por tipo.
               if (month.total > yearData.highestValues[month.type].value) {
                  yearData.highestValues[month.type] = { month: monthName, value: month.total };
               }

               // Calcula e adiciona o saldo mensal se possível.
               if (yearData.months[monthName].income !== undefined && yearData.months[monthName].expense !== undefined) {
                  const balance = yearData.months[monthName].income - yearData.months[monthName].expense;
                  yearData.months[monthName].balance = balance;

                  // Atualiza o saldo anual.
                  yearData.summary.balance += balance;

                  // Atualiza o maior saldo anual.
                  if (balance > yearData.highestValues.balance.value) {
                     yearData.highestValues.balance = { month: monthName, value: balance };
                  }
               }
            });

            setYearlySummary(yearData);

         } catch (error) {
            // Se erro for de autenticação, desloga usuário.
            if (error.message === '401') {
               setAuth(false);
               window.location.href = 'http://localhost:3000/signin';
               return;
            }

            // Marca erro genérico no estado.
            setYearlySummary({ error: true });
            console.error(error);
         }
      }

      getEntries();
   }, [year]);

   return { yearlySummary };
}
