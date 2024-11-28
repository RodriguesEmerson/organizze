'use client';
import { useState } from "react";
import { useTableStore } from "../zustand/useTablesStore";

export function useSideBar(){
   const data = useTableStore(state => state.data);
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
      }
   }

   return { sideBarHandler }
}