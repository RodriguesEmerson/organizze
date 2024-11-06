'use client'
import { useState, useEffect } from "react";
import { useTableStore } from "../zustand/useTablesStore";

export function usePage() {
   const { data, setData } = useTableStore();

   useEffect(() => {
      const getDta = async () => {
      
         try {
            const res = await fetch("/api")
            const resolve = await res.json();
            if(!res) throw new Error ("Falha ao buscar os dados!")
            
            setData(resolve);
            console.log(resolve)
         } catch (error) {
            
         }
      }
      getDta();
   }, [])

   return { data };
}