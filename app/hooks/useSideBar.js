'use client';
import { useState } from "react";
import { useTableStore } from "../zustand/useTablesStore";
import { useNewRelease } from "./useNewRelease";
import { useUtilsStore } from "../zustand/useUtilsStore";

export function useSideBar(){
   const data = useTableStore(state => state.data);
   const months = useTableStore((state) => state.months);
   const changeTable = useTableStore(state => state.changeTable);
   const { releaseHandler } = useNewRelease();
   const setShowOkNotification = useUtilsStore((state) => state.setShowOkNotification);

   const sideBarHandler = {
      getTables: function(data){
         const tables = {};
         for(const year in data){
            tables[year] = Object.keys(data[year].months)
         };

         return tables;
      },

      getCurrentTable: function(CurrentYear){
         const table = {};
         table[CurrentYear] = Object.keys(data[CurrentYear].months)

         return table;
      },

      availableMonthsToNewTable: function(year){
         if(!data) return;
         if(!data[year]) return months;
         const monthsInSelectedYear = Object.keys(data[year].months);

         return months.filter(month => !monthsInSelectedYear.includes(month));
      },
      creteNewTable: function(data, year, month){
         releaseHandler.ensureYearAndMonthExist(data, year, month);
         changeTable(year, month);

         setShowOkNotification('Nova tabela criada!', true);
      }
   }

   return { sideBarHandler }
}