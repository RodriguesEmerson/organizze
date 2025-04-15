'use client'
import { useState, useEffect } from "react";
import { useTableStore } from "../zustand/useTablesStore";

export function useMonthlyPage(year, month) {
   const data = useTableStore((state) => state.data);
   const setData = useTableStore((state) => state.setData);
   const setCategories = useTableStore((state) => state.setCategories);
   const selectedTable = useTableStore((state) => state.selectedTable);

   useEffect(() => {
      const getData = async () => {
         try {
            const res = await fetch(`/api`);
            const resolve = await res.json();
            if(!resolve) throw new Error ("Falha ao buscar os dados!")
            
            setData(resolve.years);
            setCategories(resolve.categories);
         } catch (error) {
         }
      }
      getData();
   }, [])

   function getTotalExpenses(onlyValue){
      if(!data)  return;
      const expenses = data[selectedTable?.year].months[selectedTable.month]?.expenses;
      const expensesValues = [];

      expenses.forEach(expense => {
         expensesValues.push(Number(expense.value))
      });

      const totalExpenses = expensesValues.reduce((prev, curr) => prev + curr, 0);
      if(onlyValue) return totalExpenses;

      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalExpenses);
   }
   function getTotalIncomes(onlyValue){
      if(!data) return;
      const incomes = data[selectedTable.year].months[selectedTable.month].incomes;
      const incomesValues = [];

      incomes.forEach(expense => {
         incomesValues.push(Number(expense.value))
      });

      const totalIncomes = incomesValues.reduce((prev, curr) => prev + curr, 0);
      if(onlyValue) return totalIncomes;

      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalIncomes);
   }

   function getBalance(){  
      const totalExpenses = getTotalExpenses(true);
      const totalIncomes = getTotalIncomes(true);

      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalIncomes - totalExpenses);
   }
   return { data, getTotalExpenses, getTotalIncomes, getBalance };
}