'use client'
import { useState, useEffect } from "react";
import { useTableStore } from "../zustand/useTablesStore";

export function usePage() {
   const { data, setData, setCategories } = useTableStore();
   // ?year=${selectedTable.year}&month=${selectedTable.month}
   useEffect(() => {
      const getDta = async () => {
         try {
            const res = await fetch(`/api`)
            const resolve = await res.json();
            if(!resolve) throw new Error ("Falha ao buscar os dados!")
            
            setData(resolve.years);
           setCategories(resolve.categories);
         } catch (error) {
            
         }
      }
      getDta();
   }, [])
   return { data };
}