'use client';
import { useState } from "react";

export function useSideBar(){
   const sideBarHandler = {
      getTables: function(data){
         const tables = {};
         for(const year in data){
            tables[year] = Object.keys(data[year].months)
         };

         return (tables);
      }
      
   }

   const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
   ]

   return { sideBarHandler }
}