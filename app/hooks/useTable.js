'use client';

import { useTableStore } from "../zustand/useTablesStore"

export function useTable(){
   const { data, selectedTable } = useTableStore();
   const tableHandler = {
      getSelectedMonthData: function(){
         if(!data) return;

         //Current selected year and month.
         const { year, month } = selectedTable;
         if(!data[year] || !data[year].months[month]) return false;
         
         //Cria uma copia da tabela.
         const currentTable = {...data[year].months[month]};
         
         //Ordena as os item das tabelas por data em ordem crescente.
         currentTable.expenses.sort((prev, curr) => new Date(prev.date) - new Date(curr.date));
         currentTable.incomes.sort((prev, curr) => new Date(prev.date) - new Date(curr.date));

         return currentTable;
      }
   }

   const tablesHeaders =  ['Descrição', 'Categ.', 'Data', 'Valor'];
   return { tableHandler, tablesHeaders }
}