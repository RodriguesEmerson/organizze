'use client';
import { useState } from "react";

export function useSideBar(){
   const sideBarHandler = {
      getTables: function(data){
         const tables = {};
         for(const year in data){
            tables[year] = Object.keys(data[year].months)
         };

         return tables;
      },
      getCurrentTable: function(){

      }
   }

   return { sideBarHandler }
}