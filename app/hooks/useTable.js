'use client';

import { useTableStore } from "../zustand/useTablesStore"

export function useTable() {
   
   //re-renderização granulada, so renderiza o componente quando a vairavel que o usa em si mudar.
   const data = useTableStore((state) => state.data);
   const selectedTable = useTableStore((state) => state.selectedTable);

   const tableHandler = {
      getSelectedMonthData: function () {
         if (!data) return;

         //Atual data selecioanda.
         const { year, month } = selectedTable;
         if (!data[year] || !data[year].months[month]) return false;

         //Cria uma copia da tabela.
         const currentTable = { ...data[year].months[month] };

         //Ordena as os item das tabelas por data em ordem crescente.
         currentTable.expenses.sort((prev, curr) => new Date(prev.date) - new Date(curr.date));
         currentTable.incomes.sort((prev, curr) => new Date(prev.date) - new Date(curr.date));

         return currentTable;
      }
   }

   const tablesHeaders = ['Descrição', 'Categ.', 'Data', 'Valor'];
   return { tableHandler, tablesHeaders }
}