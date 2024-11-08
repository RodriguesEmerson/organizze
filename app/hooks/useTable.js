'use client';

import { useTableStore } from "../zustand/useTablesStore"

export function useTable(){
   const { data, selectedTable } = useTableStore();
   const tableHandler = {
      getSelectedMonthData: function(){
         if(!data) return;

         //Current selected year and month.
         const { year, month } = selectedTable;

         return data[year].months[month];
      }
   }

   const tablesHeaders =  ['Descrição', 'Categ.', 'Data', 'Valor'];
   return { tableHandler, tablesHeaders }
}